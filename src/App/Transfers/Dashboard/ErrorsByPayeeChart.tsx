import { useQuery } from '@apollo/client';
import { TransferSummary } from 'apollo/types';
import { MessageBox, Spinner } from 'components';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { ReduxContext, State, Dispatch } from 'store';
import { GET_TRANSFER_SUMMARY_BY_PAYEE_DFSP } from 'apollo/query';
import { map, groupBy, sumBy } from 'lodash';
import { FilterChangeValue, TransfersFilter } from '../types';
import { actions } from '../slice';
import * as selectors from '../selectors';
import { RED_CHART_GRADIENT_COLORS, renderActiveShape, renderRedLegend } from './utils';

const stateProps = (state: State) => ({
  filtersModel: selectors.getTransfersFilter(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onFilterChange: (field: string, value: FilterChangeValue | string) =>
    dispatch(actions.setTransferFinderFilter({ field, value })),
});

interface ConnectorProps {
  filtersModel: TransfersFilter;
  onFilterChange: (field: string, value: FilterChangeValue | string) => void;
}

const ByPayeeChart: FC<ConnectorProps> = ({ filtersModel, onFilterChange }) => {
  const { loading, error, data } = useQuery(GET_TRANSFER_SUMMARY_BY_PAYEE_DFSP, {
    fetchPolicy: 'no-cache',
    variables: {
      startDate: filtersModel.from,
      endDate: filtersModel.to,
    },
  });

  const [activeIndex, setActiveIndex] = useState<number>();

  const onPieEnter = (_pieData: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  let content = null;
  if (error) {
    content = <MessageBox kind="danger">Error fetching transfers: {error.message}</MessageBox>;
  } else if (loading) {
    content = <Spinner center />;
  } else {
    const prunedSummary = data.transferSummary.filter(
      (obj: TransferSummary) => obj.group.payeeDFSP && obj.sum.targetAmount > 0,
    );

    const summary = map(
      groupBy(prunedSummary, (ts: any) => ts.group.payeeDFSP),
      (ts: any, payeeDFSP: string) => {
        return {
          payeeDFSP,
          targetAmount: sumBy(ts, 'sum.targetAmount'),
        };
      },
    ).sort((a: TransferSummary, b: TransferSummary) => b.targetAmount - a.targetAmount);

    const firstThree = summary.slice(0, 3);
    const remainingSummary = {
      payeeDFSP: 'Other',
      targetAmount: summary.slice(3).reduce((n: number, { targetAmount }: TransferSummary) => n + targetAmount, 0),
    };
    if (remainingSummary.targetAmount > 0) {
      firstThree.push(remainingSummary);
    }

    content = (
      <PieChart id="ErrorsByPayeeChart" width={300} height={120}>
        <Legend
          id="ErrorsByPayeeChartLegend"
          name="Payee"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          width={50}
          height={100}
          iconSize={0}
          content={renderRedLegend}
        />
        <Pie
          data={firstThree}
          dataKey="targetAmount"
          nameKey="payeeDFSP"
          innerRadius={30}
          outerRadius={50}
          blendStroke
          onClick={(value) => {
            if (value.name !== 'Other') {
              onFilterChange('payeeFSPId', value.name);
            }
          }}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {firstThree.map((_entry: any, index: number) => (
            <Cell
              key={`${_entry.payeeDFSP}`}
              fill={RED_CHART_GRADIENT_COLORS[index % RED_CHART_GRADIENT_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
  return content;
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(ByPayeeChart);
