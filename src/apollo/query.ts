/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client';

export const GET_TRANSFER = gql`
  query GetTransfer($transferId: String!) {
    transfer(transferId: $transferId) {
      transferId
      transferState
      baseUseCase
      transactionType
      sourceAmount
      sourceCurrency
      targetAmount
      targetCurrency
      conversionType
      conversionState
      settlementId
      conversionSettlementWindowId
      submittedDate
      conversionSubmittedDate
      createdAt
      quoteId
      partyLookupEvents
      quoteEvents
      transferEvents
      settlementEvents
      transferSettlementWindowId
      fxp
      fxpProxy
      payeeDFSP {
        id
        name
        description
        proxy
      }
      payerDFSP {
        id
        name
        description
        proxy
      }
      payerParty {
        id
        firstName
        lastName
        middleName
        dateOfBirth
        idType
        idValue
        supportedCurrency
      }
      payeeParty {
        id
        firstName
        lastName
        middleName
        dateOfBirth
        idType
        idValue
        supportedCurrency
      }
      transferTerms {
        quoteAmount
        quoteAmountType
        transferAmount
        payeeReceiveAmount
        payeeFspFee
        payeeFspCommission
        expiration
        geoCode
        ilpPacket
        transactionId
      }
      conversions {
        conversionRequestId
        conversionId
        conversionCommitRequestId
        conversionState
        conversionStateChanges
        counterPartyFSP
        conversionSettlementWindowId
      }
      conversionTerms {
        conversionId
        determiningTransferId
        initiatingFsp
        counterPartyFsp
        amountType
        transferAmount
        payeeReceiveAmount
        payeeFspFee
        payeeFspCommission
        expiration
        charges {
          totalSourceCurrencyCharges {
            amount
            currency
          }
          totalTargetCurrencyCharges {
            amount
            currency
          }
        }
      }
      fxQuotes {
        Amount
      }
      fxTransfers {
        Amount
      }
    }
  }
`;

export const GET_TRANSFERS_WITH_EVENTS = gql`
  query GetTransfersWithEvents(
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
    $currency: Currency
    $transferState: TransferState
    $payeeFSPId: String
    $payerFSPId: String
    $payeeIdType: PartyIDType
    $payerIdType: PartyIDType
    $payeeIdValue: String
    $payerIdValue: String
  ) {
    transfers(
      filter: {
        startDate: $startDate
        endDate: $endDate
        currency: $currency
        transferState: $transferState
        payer: { dfsp: $payerFSPId, idType: $payerIdType, idValue: $payerIdValue }
        payee: { dfsp: $payeeFSPId, idType: $payeeIdType, idValue: $payeeIdValue }
      }
    ) {
      errorCode
      transferId
      transferState
      transactionType
      currency
      amount
      settlementId
      createdAt
      quoteId
      partyLookupEvents
      quoteEvents
      transferEvents
      settlementEvents
      payeeDFSP {
        id
        name
        description
      }
      payerDFSP {
        id
        name
        description
      }
      payerParty {
        id
        firstName
        lastName
        middleName
        dateOfBirth
        idType
        idValue
      }
      payeeParty {
        id
        firstName
        lastName
        middleName
        dateOfBirth
        idType
        idValue
      }
      transferTerms {
        quoteAmount
        quoteAmountType
        transferAmount
        payeeReceiveAmount
        payeeFspFee
        payeeFspCommission
        expiration
        geoCode
        ilpPacket
        transactionId
      }
      conversions {
        conversionRequestId
        conversionId
        conversionCommitRequestId
        conversionState
        conversionStateChanges
        counterPartyFSP
        conversionSettlementWindowId
      }
      conversionTerms {
        conversionId
        determiningTransferId
        initiatingFsp
        counterPartyFsp
        amountType
        transferAmount
        payeeReceiveAmount
        payeeFspFee
        payeeFspCommission
        expiration
        charges {
          totalSourceCurrencyCharges {
            amount
            currency
          }
          totalTargetCurrencyCharges {
            amount
            currency
          }
        }
      }
      fxQuotes {
        Amount
      }
      fxTransfers {
        Amount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY = gql`
  query GetTransferSummary($startDate: DateTimeFlexible, $endDate: DateTimeFlexible) {
    transferSummary(filter: { startDate: $startDate, endDate: $endDate }) {
      count
      errorCode
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_CURRENCY = gql`
  query GetTransferSummaryByCurrency($startDate: DateTimeFlexible, $endDate: DateTimeFlexible) {
    transferSummary(filter: { startDate: $startDate, endDate: $endDate }) {
      count
      errorCode
      currency
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_PAYER_DFSP = gql`
  query GetTransferSummaryByPayerDFSP($startDate: DateTimeFlexible, $endDate: DateTimeFlexible) {
    transferSummary(filter: { startDate: $startDate, endDate: $endDate }) {
      count
      errorCode
      payerDFSP
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_PAYEE_DFSP = gql`
  query GetTransferSummaryByPayeeDFSP($startDate: DateTimeFlexible, $endDate: DateTimeFlexible) {
    transferSummary(filter: { startDate: $startDate, endDate: $endDate }) {
      count
      errorCode
      payeeDFSP
    }
  }
`;
