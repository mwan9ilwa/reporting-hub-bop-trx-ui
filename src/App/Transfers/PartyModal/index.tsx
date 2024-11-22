import React, { FC } from 'react';
import { FormField, Modal } from 'components';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { ReduxContext } from 'store';
import { actions } from '../slice';
import * as selectors from '../selectors';
import { PartyModalData } from '../types';

const stateProps = (state: State) => ({
  partyModalData: selectors.getSelectedPartyModalData(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.partyModalClose()),
});

interface ConnectorProps {
  partyModalData: PartyModalData;
  onModalCloseClick: () => void;
}

const JsonModal: FC<ConnectorProps> = ({ partyModalData, onModalCloseClick }) => {
  return (
    <Modal
      title={`${partyModalData.type} Information`}
      className="partyDetailsModal"
      onClose={onModalCloseClick}
    >
      <FormField.Container direction="row">
        <FormField disabled type="text" label="Id Type" value={partyModalData.party.partyIdType || ''} />
        <FormField
          disabled
          type="text"
          label="Id Value"
          value={partyModalData.party.partyIdentifier?.toString() || ''}
        />
      </FormField.Container>
      <FormField.Container direction="row">
        <FormField
          disabled
          type="text"
          label="Full Name"
          value={partyModalData.party.partyName || ''}
        />
        <FormField
          disabled
          type="text"
          label="FSP Id"
          value={partyModalData.party.idValue || ''}
        />
      </FormField.Container>
    </Modal>
  );
};

export default connect(stateProps, dispatchProps, null, { context: ReduxContext })(JsonModal);
