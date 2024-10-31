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
            disabled
            type="text"
            label="Quote Id"
            value={transferDetails.quoteId?.toString() || ''}
          />
          <FormField
            disabled
            type="text"
            label="Transfer State"
            value={transferDetails.transferState || ''}
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
        </FormField.Container>
      </FormField.Container>
    </TabPanel>
  );

  const BasicInformationTab = (
    <TabPanel className="basicInformationTab">
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
            label="Payer"
            value={`${transferDetails.payerParty?.firstName || ''} ${
              transferDetails.payerParty?.lastName || ''
            }`}
          />
          <FormField
            disabled
            type="text"
            label="Payee"
            value={`${transferDetails.payeeParty?.firstName || ''} ${
              transferDetails.payeeParty?.lastName || ''
            }`}
          />
          <FormField
            disabled
            type="text"
            label="Settlement Batch Id"
            value={transferDetails.settlementId?.toString() || ''}
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
            label="Payer Details"
            value={`${transferDetails.payerParty?.idType || ''} ${
              transferDetails.payerParty?.idValue?.toString() || ''
            }`}
          />
          <FormField
            disabled
            type="text"
            label="Payee Details"
            value={`${transferDetails.payeeParty?.idType || ''} ${
              transferDetails.payeeParty?.idValue?.toString() || ''
            }`}
          />
        </FormField.Container>

        <FormField.Container direction="column">
          <FormField
            disabled
            type="text"
            label="Transfer Type"
            value={transferDetails.transactionType || ''}
          />
          <FormField
            disabled
            type="text"
            label="Date Submitted"
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
          <Tab>Basic Information</Tab>
          <Tab>Technical Details</Tab>
          <Tab>Transfer Parties</Tab>
          {BasicInformationTab}
          {TechnicalDetailsTab}
          {TransferPartiesTab}
        </Tabs>
      </div>
    </Modal>
  );
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(TransferDetails);
