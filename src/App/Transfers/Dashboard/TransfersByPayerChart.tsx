import { useQuery } from '@apollo/client';
import { GET_TRANSFER_SUMMARY_BY_PAYER_DFSP } from 'apollo/query';
import { MessageBox, Spinner } from 'components';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { ReduxContext, Dispatch, State } from 'store';
import { TransferSummary } from 'apollo/types';
import { map, groupBy, sumBy } from 'lodash';
import { FilterChangeValue, TransfersFilter } from '../types';
import { actions } from '../slice';
import * as selectors from '../selectors';
import { GREEN_CHART_GRADIENT_COLORS, renderActiveShape, renderGreenLegend } from './utils';

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

const ByPayerChart: FC<ConnectorProps> = ({ filtersModel, onFilterChange }) => {
  const { loading, error, data } = useQuery(GET_TRANSFER_SUMMARY_BY_PAYER_DFSP, {
    fetchPolicy: 'no-cache',
    variables: {
      startDate: filtersModel.from,
      endDate: filtersModel.to,
    },
  });

  const [activeIndex, setActiveIndex] = useState<number>();

  const onPieEnter = (_: any, index: number) => {
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
      (obj: TransferSummary) => obj.group.payerDFSP && obj.sum.sourceAmount > 0,
    );

    const summary = map(
      groupBy(prunedSummary, (ts: any) => ts.group.payerDFSP),
      (ts: any, payerDFSP: string) => {
        return {
          payerDFSP,
          sourceAmount: sumBy(ts, (t: any) => t.sum.sourceAmount), 
        };
      },
    ).sort((a: any, b: any) => b.sourceAmount - a.sourceAmount);

    const firstThree = summary.slice(0, 3);
    const remainingSummary = {
      payerDFSP: 'Other',
      sourceAmount: summary.slice(3).reduce((n: number, { sourceAmount }: any) => n + sourceAmount, 0),
    };

    if (remainingSummary.sourceAmount > 0) {
      firstThree.push(remainingSummary);
    }

    content = (
      <PieChart id="TransfersByPayerChart" width={300} height={120}>
        <Legend
          id="TransfersByPayerChartLegend"
          name="Payer DFSP"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          width={165}
          height={100}
          iconSize={0}
          content={renderGreenLegend}
          wrapperStyle={{
            paddingLeft: '30px',
            marginLeft: '30px',
          }}
        />
        <Pie
          data={firstThree}
          dataKey="sourceAmount"  
          nameKey="payerDFSP" 
          innerRadius={30}
          outerRadius={50}
          blendStroke
          onClick={(value) => {
            if (value.name !== 'Other') {
              onFilterChange('payerFSPId', value.name);
            }
          }}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {firstThree.map((_entry: any, index: number) => (
            <Cell
              key={`${_entry.payerDFSP}`}
              fill={GREEN_CHART_GRADIENT_COLORS[index % GREEN_CHART_GRADIENT_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any) => value.toFixed(2)} 
          labelFormatter={(label: string) => `${label}`} 
        />
      </PieChart>
    );
  }

  return content;
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(ByPayerChart);
