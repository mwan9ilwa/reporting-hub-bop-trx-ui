import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxContext } from 'store';
import { Row } from 'antd';
import ErrorsByPayeeChart from './ErrorsByPayeeChart';
import ErrorsByPayerChart from './ErrorsByPayerChart';
import TransfersByPayeeChart from './TransfersByPayeeChart';
import TransfersByPayerChart from './TransfersByPayerChart';
import TransferTotalSummary from './TransferTotalSummary';
import TransfersBySourceCurrencyChart from './TransfersBySourceCurrencyChart';
import TransfersByTargetCurrencyChart from './TransfersByTargetCurrencyChart';
import ErrorSummary from './ErrorSummary';
import ErrorsByErrorCodeChart from './ErrorsByErrorCodeChart';

const stateProps = () => ({});

const dispatchProps = () => ({});

interface ConnectorProps {}

const Dashboard: FC<ConnectorProps> = () => {
  return (
    <div>
      <Row style={{ marginBottom: 10, gap: 20 }}>
        <TransferTotalSummary />
        <TransfersBySourceCurrencyChart />
        <TransfersByTargetCurrencyChart />
        <div style={{ marginLeft: '55px' }}>
          <TransfersByPayerChart />
        </div>
        <TransfersByPayeeChart />
      </Row>
      <Row style={{ marginBottom: 30, gap: 20 }}>
        <ErrorSummary />
        <ErrorsByErrorCodeChart />
        <ErrorsByPayerChart />
        <div style={{ marginLeft: '55px' }}>
          <ErrorsByPayeeChart />
        </div>
      </Row>
    </div>
  );
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(Dashboard);
