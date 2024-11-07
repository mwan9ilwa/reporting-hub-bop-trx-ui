/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import { Modal, Tabs, Tab, TabPanel, FormField, Button } from 'components';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { ReduxContext } from 'store';
import { Transfer } from 'apollo/types';
import moment from 'moment';
import { actions } from '../slice';
import * as selectors from '../selectors';
import { JsonModalData, PartyType, PartyModalData } from '../types';

const stateProps = (state: State) => ({
  transferDetails: selectors.getSelectedTransfer(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.transferDetailsModalClose()),
  onsetJsonModalData: (json: JsonModalData) => dispatch(actions.setJsonModalData(json)),
  onsetPartyModalData: (party: PartyModalData) => dispatch(actions.setPartyModalData(party)),
});

interface ConnectorProps {
  transferDetails: Transfer;
  onModalCloseClick: () => void;
  onsetJsonModalData: (json: JsonModalData) => void;
  onsetPartyModalData: (party: PartyModalData) => void;
}

const TransferDetails: FC<ConnectorProps> = ({
  transferDetails,
  onModalCloseClick,
  onsetJsonModalData,
  onsetPartyModalData,
}) => {
  const [copyColor, setCopyColor] = useState('#acacac');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyColor('#4fc7e7');
    setTimeout(() => setCopyColor('#acacac'), 2000);
  };

  let errorCodeField;
  if (transferDetails.errorCode) {
    errorCodeField = (
      <FormField
        disabled
        type="text"
        label="Error Code"
        value={transferDetails.errorCode.toString()}
      />
    );
  }

  const TechnicalDetailsTab = (
    <TabPanel className="technicalDetailsTab">
      <FormField.Container direction="row" align="top left">
        <FormField.Container direction="column">
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <FormField
              disabled
              type="text"
              label="Transfer ID"
              value={transferDetails.transferId!}
              style={{ paddingRight: '30px' }}
            />
            <button
              onClick={() => handleCopy(transferDetails.transferId!)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy Transfer ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <FormField
              disabled
              type="text"
              label="Transaction ID"
              value={transferDetails.transactionId!}
              style={{ paddingRight: '30px' }}
            />
            <button
              onClick={() => handleCopy(transferDetails.transactionId!)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <FormField
              disabled
              type="text"
              label="Quote ID"
              value={transferDetails.quoteId?.toString() || ''}
              style={{ paddingRight: '30px' }}
            />
            <button
              onClick={() => handleCopy(transferDetails.quoteId?.toString() || '')}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy Transfer ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
          <FormField
            disabled
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
          />
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <FormField
              disabled
              type="text"
              label="Conversion Request ID"
              value={transferDetails.conversions?.conversionRequestId?.toString() || ''}
              style={{ paddingRight: '30px' }}
            />
            <button
              onClick={() =>
                handleCopy(transferDetails.conversions?.conversionRequestId?.toString() || '')
              }
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy Transfer ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
          <FormField
            disabled
            type="text"
            label="Conversion State"
            value={transferDetails.conversions?.conversionState || ''}
          />
          <FormField
            disabled
            type="text"
            label="Commit Request ID"
            value={transferDetails.conversions?.conversionCommitRequestId || ''}
          />
          {errorCodeField || <div />}
        </FormField.Container>

        <FormField.Container direction="column">
          <h3> Party Information </h3>
          <FormField.Container direction="row">
            <Button
              className="partyInfo"
              size="small"
              kind="primary"
              label="Payer Information"
              onClick={() => {
                onsetPartyModalData({
                  type: PartyType.PAYER,
                  party: transferDetails.payerParty || {},
                });
              }}
            />
            <Button
              className="partyInfo"
              size="small"
              kind="primary"
              label="Payee Information"
              onClick={() => {
                onsetPartyModalData({
                  type: PartyType.PAYEE,
                  party: transferDetails.payeeParty || {},
                });
              }}
            />
          </FormField.Container>
          <h3> View Message Details </h3>
          <Button
            size="small"
            kind="primary"
            label="Party Lookup Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Party Lookup Events',
                json: transferDetails.partyLookupEvents || {},
              });
            }}
          />
          <Button
            size="small"
            kind="primary"
            label="Quote Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Quote Events',
                json: transferDetails.quoteEvents || {},
              });
            }}
          />
          <Button
            size="small"
            kind="primary"
            label="Transfer Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Transfer Events',
                json: transferDetails.transferEvents || {},
              });
            }}
          />
          <Button
            size="small"
            kind="primary"
            label="Settlement Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Settlement Events',
                json: transferDetails.settlementEvents || {},
              });
            }}
          />
          <Button
            size="small"
            kind="primary"
            label="Fx Quote Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Fx Quote Events',
                json: transferDetails.fxQuoteEvents || {},
              });
            }}
          />
          <Button
            size="small"
            kind="primary"
            label="Fx Transfer Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Fx Transfer Events',
                json: transferDetails.fxTransferEvents || {},
              });
            }}
          />
          <Button
            size="small"
            kind="primary"
            label="Fx Settlement Events"
            onClick={() => {
              onsetJsonModalData({
                title: 'Fx Settlement Events',
                json: transferDetails.fxSettlementEvents || {},
              });
            }}
          />
        </FormField.Container>
      </FormField.Container>
    </TabPanel>
  );

  const TransferDetailsTab = (
    <TabPanel className="transferDetailsTab">
      <FormField.Container direction="row" align="top left">
        <FormField.Container direction="column">
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            <FormField
              disabled
              type="text"
              label="Transfer ID"
              value={transferDetails.transferId!}
              // style={{ paddingRight: '30px' }}
            />
            <button
              onClick={() => handleCopy(transferDetails.transferId!)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy Transfer ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
          <FormField
            disabled
            type="text"
            label="Source Amount"
            value={transferDetails.sourceAmount?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Target Amount"
            value={transferDetails.targetAmount?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Counter Party"
            value={transferDetails.conversions?.counterPartyFSP?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payer Identifier"
            value={`${transferDetails.payerParty?.firstName || ''} ${
              transferDetails.payerParty?.lastName || ''
            }`}
          />
          <FormField
            disabled
            type="text"
            label="Payee Identifier"
            value={`${transferDetails.payeeParty?.firstName || ''} ${
              transferDetails.payeeParty?.lastName || ''
            }`}
          />
        </FormField.Container>
        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
          />
          <FormField
            disabled
            type="text"
            label="Source Currency"
            value={transferDetails.sourceCurrency?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Target Currency"
            value={transferDetails.targetCurrency?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Conversion Type"
            value={transferDetails.conversions?.conversionType?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payer Identifier Type"
            value={`${transferDetails.payerParty?.idType || ''} ${
              transferDetails.payerParty?.idValue || ''
            }`}
          />
          <FormField
            disabled
            type="text"
            label="Payee Identifier Type"
            value={`${transferDetails.payeeParty?.idType || ''} ${
              transferDetails.payeeParty?.idValue || ''
            }`}
          />
        </FormField.Container>
        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Base Use Case"
            value={transferDetails.baseUseCase?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Submitted Date"
            value={
              transferDetails.createdAt ? moment(transferDetails.createdAt).local().format() : ''
            }
          />
          <FormField
            disabled
            type="text"
            label="Conversion Submitted Date"
            value={
              transferDetails.createdAt
                ? moment(transferDetails.conversions?.createdAt).local().format()
                : ''
            }
          />
          <FormField
            disabled
            type="text"
            label="Conversion State"
            value={transferDetails.conversions?.conversionState?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payer DFSP"
            value={transferDetails.payerDFSP?.name?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payee DFSP"
            value={transferDetails.payeeDFSP?.name?.toString() || ''}
          />
        </FormField.Container>
        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Transaction Type"
            value={transferDetails.transactionType || ''}
          />
          <FormField
            disabled
            type="text"
            label="Transfer Settlement Batch ID"
            value={transferDetails.settlementWindowId?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Conversion Settlement Batch ID"
            value={transferDetails.conversions?.conversionSettlementWindowId?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Counter Party Proxy"
            value={transferDetails.conversions?.counterPartyProxy?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payer DFSP Proxy"
            value={transferDetails.payerDFSPProxy?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payee DFSP Proxy"
            value={transferDetails.payeeDFSPProxy?.toString() || ''}
          />
        </FormField.Container>
      </FormField.Container>
    </TabPanel>
  );

  const TransferTermsTab = (
    <TabPanel className="transferTermsTab">
      <FormField.Container
        direction="row"
        align="top left"
        style={{
          flexWrap: 'wrap',
          gap: '1px',
        }}
      >
        <FormField.Container
          direction="column"
          style={{
            width: '200px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <FormField
              disabled
              type="text"
              label="Transfer ID"
              value={transferDetails.transferId!}
              style={{ paddingRight: '30px', width: '100px' }}
            />
            <button
              onClick={() => handleCopy(transferDetails.transferId!)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy Transfer ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
        </FormField.Container>

        <FormField.Container
          direction="column"
          style={{
            width: '200px',
          }}
        >
          <FormField
            disabled
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
            style={{
              width: '100px',
            }}
          />
        </FormField.Container>

        <FormField.Container
          direction="column"
          style={{
            width: '200px',
          }}
        >
          <FormField
            disabled={true}
            type="text"
            label="Quote Amount"
            value={transferDetails.transferTerms?.quoteAmount?.amount?.toString() || ''}
            style={{
              width: '100px',
            }}
          />
        </FormField.Container>

        <FormField.Container
          direction="column"
          style={{
            width: '200px',
          }}
        >
          <FormField
            disabled={true}
            type="text"
            label="Quote Currency"
            value={transferDetails.transferTerms?.quoteAmount?.currency}
            style={{
              width: '80px',
            }}
          />
        </FormField.Container>

        <FormField.Container
          direction="column"
          style={{
            width: '200px',
          }}
        >
          <FormField
            disabled={true}
            type="text"
            label="Quote Amount Type"
            value={transferDetails.transferTerms?.quoteAmountType?.toString() || ''}
            style={{
              width: '80px',
            }}
          />
        </FormField.Container>
        <FormField.Container
          direction="column"
          style={{
            width: '200px',
          }}
        >
          <FormField
            disabled={true}
            type="text"
            label="Conversion Type"
            value={transferDetails.conversions?.conversionType?.toString() || ''}
            style={{
              width: '80px',
            }}
          />
        </FormField.Container>
      </FormField.Container>
      <FormField.Container direction="row" style={{ width: '100%', height: '100%' }}>
        <FormField.Container style={{ width: '100%', flexGrow: 1 }} direction="column">
          <FormField.Container
            style={{
              width: '100%',
              marginTop: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              boxSizing: 'border-box',
              flexGrow: 1,
              display: 'flex',
              height: '350px',
              flexDirection: 'column',
            }}
            direction="column"
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px', textAlign: 'center' }}>
              Transfer Terms
            </div>
            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Transfer Amount
              </div>
              <FormField
                disabled
                type="text"
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
                value={transferDetails.transferTerms?.transferAmount?.amount?.toString() || ''}
              />
              <FormField
                disabled
                type="text"
                value={transferDetails.transferTerms?.transferAmount?.currency}
                style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
              />
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Payee Receive Amount
              </div>
              <FormField
                disabled
                type="text"
                value={transferDetails.transferTerms?.payeeReceiveAmount?.amount?.toString() || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />
              <FormField
                disabled
                type="text"
                value={transferDetails.transferTerms?.payeeReceiveAmount?.currency}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Payee DFSP Fee
              </div>
              <FormField
                disabled
                type="text"
                value={transferDetails.transferTerms?.payeeFspFee?.amount?.toString() || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.transferTerms?.payeeFspFee?.currency}
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div>
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Payee DFSP Commission
              </div>
              <FormField
                disabled
                type="text"
                value={transferDetails.transferTerms?.payeeFspCommission?.amount?.toString() || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.transferTerms?.payeeFspCommission?.currency}
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div>
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Expriry Date Time
              </div>
              <FormField
                disabled
                type="text"
                value={transferDetails.transferTerms?.expiration || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />
            </FormField.Container>
          </FormField.Container>
        </FormField.Container>

        <FormField.Container style={{ width: '100%', flexGrow: 1 }} direction="column">
          <FormField.Container
            style={{
              width: '100%',
              marginTop: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              boxSizing: 'border-box',
              flexGrow: 1,
              display: 'flex',
              height: '350px',
              flexDirection: 'column',
            }}
            direction="column"
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px', textAlign: 'center' }}>
              Conversion Terms
            </div>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Source Amount
              </div>
              <FormField
                disabled
                type="text"
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
                value={transferDetails.conversionTerms?.sourceAmount?.amount?.toString() || ''}
              />
              <FormField
                disabled
                type="text"
                value={transferDetails.conversionTerms?.sourceAmount?.currency}
                style={{ width: '100%', marginRight: '10px', marginBottom: 0 }}
              />
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Target Amount
              </div>
              <FormField
                disabled
                type="text"
                value={transferDetails.conversionTerms?.targetAmount?.amount?.toString() || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.conversionTerms?.targetAmount?.currency}
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div>
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Source Charges
              </div>
              <FormField
                disabled
                type="text"
                value={
                  transferDetails.conversionTerms?.charges?.totalSourceCurrencyCharges?.amount?.toString() ||
                  ''
                }
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={
                    transferDetails.conversionTerms?.charges?.totalSourceCurrencyCharges?.currency
                  }
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div>
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Target Charges
              </div>
              <FormField
                disabled
                type="text"
                value={
                  transferDetails.conversionTerms?.charges?.totalTargetCurrencyCharges?.amount?.toString() ||
                  ''
                }
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={
                    transferDetails.conversionTerms?.charges?.totalTargetCurrencyCharges?.currency
                  }
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div>
            </FormField.Container>

            <FormField.Container
              direction="row"
              style={{ overflow: 'hidden', gap: '50px', marginLeft: '5px' }}
            >
              <div style={{ flex: '0 0 150px', textAlign: 'left', marginRight: '10px' }}>
                Expriry Date Time
              </div>
              <FormField
                disabled
                type="text"
                value={transferDetails.conversionTerms?.expiration}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />
            </FormField.Container>
          </FormField.Container>
        </FormField.Container>
      </FormField.Container>
    </TabPanel>
  );

  const TransferPartiesTab = (
    <TabPanel className="transferPartiesTab">
      <FormField.Container direction="row" align="top left">
        <FormField.Container direction="column">
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <FormField
              disabled
              type="text"
              label="Transfer ID"
              value={transferDetails.transferId!}
              style={{ paddingRight: '30px' }}
            />
            <button
              onClick={() => handleCopy(transferDetails.transferId!)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="Copy ID"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
                fill={copyColor}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
          />
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Transfer Type"
            value={transferDetails.transactionType || ''}
          />
        </FormField.Container>
      </FormField.Container>

      <div
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '20px' }}
      >
        <div style={{ flex: '0 0 48%', border: '1px solid #ccc', padding: '10px' }}>
          <FormField.Container direction="column">
            <h6>Payer Details</h6>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Payer Identifier</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.idValue || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Payer Identifier Type</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.idType || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>First Name</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.firstName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Middle Name</label>
              <FormField
                disabled
                type="text"
                value={String(transferDetails.payerParty?.middleName || '')}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Last Name</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.lastName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Supported Currencies</label>
              <FormField
                disabled
                type="text"
                value={transferDetails.payerParty?.supportedCurrency || ''}
              />
            </div>
          </FormField.Container>
        </div>

        <div style={{ flex: '0 0 48%', border: '1px solid #ccc', padding: '10px' }}>
          <FormField.Container direction="column">
            <h6>Payee Details</h6>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Payee Identifier</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.idValue || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Payee Identifier Type</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.idType || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>First Name</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.firstName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Middle Name</label>
              <FormField
                disabled
                type="text"
                value={String(transferDetails.payeeParty?.middleName)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Last Name</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.lastName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', width: '100px' }}>Supported Currencies</label>
              <FormField
                disabled
                type="text"
                value={transferDetails.payeeParty?.supportedCurrency || ''}
              />
            </div>
          </FormField.Container>
        </div>
      </div>
    </TabPanel>
  );

  return (
    <Modal title={`Transfer ${transferDetails.transferId} Details`} onClose={onModalCloseClick}>
      <div>
        <Tabs>
          <Tab>Transfer Details</Tab>
          <Tab>Transfer Terms</Tab>
          <Tab>Transfer Parties</Tab>
          <Tab>Technical Details</Tab>
          {TransferDetailsTab}
          {TransferTermsTab}
          {TransferPartiesTab}
          {TechnicalDetailsTab}
        </Tabs>
      </div>
    </Modal>
  );
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(TransferDetails);
