/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client';

export const GET_TRANSFER = gql`
  query GetTransfer($transferId: String!) {
    transfer(transferId: $transferId) {
      transferId
      transactionId
      sourceAmount
      sourceCurrency
      targetAmount
      targetCurrency
      createdAt
      lastUpdated
      baseUseCase
      transferState
      transferStateChanges
      transactionType
      conversionState
      settlementId
      settlementWindowId
      conversionSettlementWindowId
      submittedDate
      conversionSubmittedDate
      quoteRequest {
        quoteId
        amountType
        amount {
          amount
          currency
        }
        fees {
          amount
          currency
        }
      }
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
      }
      payeeDFSPProxy
      payerDFSP {
        id
        name
        description
      }
      payerDFSPProxy
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
        conversionType
        createdAt
        conversionSettlementWindowId
        counterPartyProxy
        conversionTerms {
          conversionId
          determiningTransferId
          initiatingFsp
          counterPartyFsp
          amountType
          sourceAmount
          targetAmount
          expiration
          charges {
            chargeType
            sourceAmount {
              amount
              currency
            }
            targetAmount {
              amount
              currency
            }
          }
          ilpPacket
        }
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
      sourceAmount
      sourceCurrency
      targetAmount
      targetCurrency
      settlementId
      createdAt
      quoteRequest {
        quoteId
        amountType
        amount {
          amount
          currency
        }
        fees {
          amount
          currency
        }
      }
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
        conversionType
        createdAt
        conversionSettlementWindowId
        counterPartyProxy
        conversionTerms {
          conversionId
          determiningTransferId
          initiatingFsp
          counterPartyFsp
          amountType
          sourceAmount
          targetAmount
          expiration
          charges {
            chargeType
            sourceAmount {
              amount
              currency
            }
            targetAmount {
              amount
              currency
            }
          }
          ilpPacket
        }
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
      sourceCurrency
      targetCurrency
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
