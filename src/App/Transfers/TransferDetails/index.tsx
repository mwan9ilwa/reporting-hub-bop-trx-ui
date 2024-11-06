/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
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
          <FormField disabled type="text" label="Transfer ID" value={transferDetails.transferId!} />
          <FormField
            className={!transferDetails.fxTransfers ? 'disabled-field' : ''}
            disabled={!transferDetails.fxTransfers}
            type="text"
            label="Transaction ID"
            value={transferDetails.fxTransfers?.fxTransferId || ''}
          />
          <FormField
            disabled
            type="text"
            label="Quote ID"
            value={transferDetails.quoteId?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
          />
          <FormField
            disabled={!transferDetails.fxTransfers}
            type="text"
            label="Conversion Request ID"
            value={transferDetails.fxTransfers?.fxQuoteId?.toString() || ''}
          />
          <FormField
            disabled={!transferDetails.fxTransfers}
            type="text"
            label="Conversion State"
            value={transferDetails.fxTransfers?.fxTransferState || ''}
          />
          <FormField
            disabled={!transferDetails.fxTransfers}
            type="text"
            label="Commit Request ID"
            value={transferDetails.fxTransfers?.fxQuoteId?.toString() || ''}
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
            disabled={!transferDetails.fxQuoteEvents}
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
            disabled={!transferDetails.fxTransferEvents}
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
            disabled={!transferDetails.fxSettlementEvents}
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
          <FormField disabled type="text" label="Transfer ID" value={transferDetails.transferId!} />
          <FormField
            disabled
            type="text"
            label="Amount"
            value={transferDetails.amount?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Source Amount"
            value={transferDetails.amount?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="FXP"
            value={transferDetails.conversions?.counterPartyFSP || ''}
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
              transferDetails.toString() || ''
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
          <FormField disabled type="text" label="Currency" value={transferDetails.currency || ''} />
          <FormField
            disabled
            type="text"
            label="Source Currency"
            value={transferDetails.currency || ''}
          />
          <FormField
            disabled
            type="text"
            label="Conversion Type"
            value={transferDetails.settlementId?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payer Identifier Type"
            value={`${transferDetails.payerParty?.idType || ''} ${
              transferDetails.payerParty?.idValue?.toString() || ''
            }`}
          />
          <FormField
            disabled
            type="text"
            label="Payee Identifier Type"
            value={`${transferDetails.payeeParty?.idType || ''} ${
              transferDetails.payeeParty?.idValue?.toString() || ''
            }`}
          />
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Base Use Case"
            value={transferDetails.transactionType || ''}
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
              transferDetails.createdAt ? moment(transferDetails.createdAt).local().format() : ''
            }
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
            label="Payer DFSP Proxy"
            value={transferDetails.transaction?.payerDFSPProxy?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Payee DFSP Proxy"
            value={transferDetails.transaction?.payeeDFSPProxy?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="FXP Proxy"
            value={transferDetails.toString() || ''}
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
          gap: '40px',
        }}
      >
        <FormField.Container direction="column">
          <FormField
            disabled={true}
            type="text"
            label="Transfer ID"
            value={transferDetails.transferId!}
            style={{
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled={true}
            style={{
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginRight: 5,
            }}
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
          />
        </FormField.Container>

        <FormField.Container direction="column">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormField
              disabled={true}
              type="text"
              label="Quote Amount"
              // value={model.transferTerms?.quoteAmount?.amount?.toString() || ''}
            />
          </div>
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled={true}
            type="text"
            label="Quote Currency"
            // value={model.transferTerms?.quoteAmount?.currency || ''}
          />
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled={true}
            type="text"
            label="Quote Amount Type"
            // value={model.transferTerms?.quoteAmountType || ''}
          />
        </FormField.Container>
        <FormField.Container direction="column">
          <FormField
            disabled={true}
            type="text"
            label="Conversion Type"
            // value={model.transferTerms?.quoteAmountType || ''}
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
                value={transferDetails.amount?.toString() || ''}
              />
              <FormField
                disabled
                type="text"
                value={transferDetails.currency || ''}
                // style={{ width: '100%', marginRight: '10px', marginBottom: 0 }}
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
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />
              <FormField
                disabled
                type="text"
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.payerParty?.lastName || ''}
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div> */}
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
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.payerParty?.lastName || ''}
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
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.payerParty?.lastName || ''}
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
                value={transferDetails.payerParty?.lastName || ''}
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
                Transfer Amount
              </div>
              <FormField
                disabled
                type="text"
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
                value={transferDetails.amount?.toString() || ''}
              />
              <FormField
                disabled
                type="text"
                value={transferDetails.currency || ''}
                style={{ width: '100%', marginRight: '10px', marginBottom: 0 }}
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
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.payerParty?.lastName || ''}
                  style={{ marginBottom: 0, flex: '0 0 20%', marginRight: '5px' }}
                />
              </div>
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
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.payerParty?.lastName || ''}
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
                value={transferDetails.payerParty?.lastName || ''}
                style={{ flex: 1, marginBottom: 0, padding: '8px 10px', marginRight: '10px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  disabled
                  type="text"
                  value={transferDetails.payerParty?.lastName || ''}
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
                value={transferDetails.payerParty?.lastName || ''}
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
          <FormField disabled type="text" label="Transfer ID" value={transferDetails.transferId!} />
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
              <label style={{ marginRight: '30px' }}>Payer Identifier</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.idValue || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '0px' }}>Payer Identifier Type</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.idType || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '60px' }}>Payer DFSP</label>
              <FormField
                disabled
                type="text"
                value={String(transferDetails.payerParty?.id || '')}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '60px' }}>First Name</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.firstName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '60px' }}>Last Name</label>
              <FormField disabled type="text" value={transferDetails.payerParty?.lastName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '1px' }}>Supported Currencies</label>
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
              <label style={{ marginRight: '35px' }}>Payee Identifier</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.idValue || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' }}>Payee Identifier Type</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.idType || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '60px' }}>Payee DFSP</label>
              <FormField
                disabled
                type="text"
                value={String(transferDetails.payerParty?.id || '')}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '60px' }}>First Name</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.firstName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '60px' }}>Last Name</label>
              <FormField disabled type="text" value={transferDetails.payeeParty?.lastName || ''} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '1px' }}>Supported Currencies</label>
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
