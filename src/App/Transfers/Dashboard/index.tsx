import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxContext } from 'store';
import { Row } from 'antd';
import ErrorsByPayeeChart from './ErrorsByPayeeChart';
import ErrorsByPayerChart from './ErrorsByPayerChart';
import TransfersByPayeeChart from './TransfersByPayeeChart';
import TransfersByPayerChart from './TransfersByPayerChart';
import TransferTotalSummary from './TransferTotalSummary';
import BySourceCurrencyChart from './TransfersBySourceCurrencyChart';
import ByTargetCurrencyChart from './TransfersByTargetCurrencyChart';
import ErrorsBySourceCurrencyChart from './ErrorsBySourceCurrencyChart';
import ErrorsByTargetCurrencyChart from './ErrorsByTargetCurrencyChart';
import ErrorSummary from './ErrorSummary';

const stateProps = () => ({});

const dispatchProps = () => ({});

interface ConnectorProps {}

const Dashboard: FC<ConnectorProps> = () => {
  return (
    <div>
      <Row style={{ marginBottom: 10 }}>
        <TransferTotalSummary />
        <BySourceCurrencyChart />
        <ByTargetCurrencyChart />
        <TransfersByPayerChart />
        <TransfersByPayeeChart />
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <ErrorSummary />
        <ErrorsBySourceCurrencyChart />
        <ErrorsByTargetCurrencyChart />
        <ErrorsByPayerChart />
        <ErrorsByPayeeChart />
      </Row>
    </div>
  );
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(Dashboard);
