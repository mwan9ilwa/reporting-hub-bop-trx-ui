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
      transferState
      transactionType
      baseUseCase
      errorCode
      transferSettlementWindowId
      payerDFSP
      payerDFSPProxy
      payeeDFSP
      payeeDFSPProxy
      payerParty {
        partyIdType
        partyIdentifier
        partyName
        supportedCurrencies
      }
      payeeParty {
        partyIdType
        partyIdentifier
        partyName
        supportedCurrencies
      }
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
      transferTerms {
        transferAmount {
          amount
          currency
        }
        payeeFspFee {
          amount
          currency
        }
        payeeFspCommission {
          amount
          currency
        }
        payeeReceiveAmount {
          amount
          currency
        }
        geoCode {
          latitude
          longitude
        }
        expiration
        ilpPacket
      }
      conversions {
        conversionRequestId
        conversionId
        conversionCommitRequestId
        conversionSettlementWindowId
        conversionState
        conversionType
        conversionStateChanges {
          conversionState
          dateTime
          reason
        }
        counterPartyFSP
        conversionTerms {
          conversionId
          determiningTransferId
          initiatingFsp
          counterPartyFsp
          amountType
          sourceAmount {
            amount
            currency
          }
          targetAmount {
            amount
            currency
          }
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
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
    $transactionType: String
    $transferState: String
    $conversionState: String
    $targetCurrency: String
    $sourceCurrency: String
    $payerIdType: String
    $payerIdentifier: String
    $payeeIdType: String
    $payeeIdentifier: String
  ) {
    transfers(
      limit: $limit
      offset: $offset
      filter: {
        startDate: $startDate
        endDate: $endDate
        transactionType: $transactionType
        transferState: $transferState
        conversionState: $conversionState
        targetCurrency: $targetCurrency
        sourceCurrency: $sourceCurrency
        payer: { partyIdType: $payerIdType, partyIdentifier: $payerIdentifier }
        payee: { partyIdType: $payeeIdType, partyIdentifier: $payeeIdentifier }
      }
    ) {
      transferId
      transactionId
      sourceAmount
      sourceCurrency
      targetAmount
      targetCurrency
      createdAt
      lastUpdated
      transferState
      transactionType
      errorCode
      transferSettlementWindowId
      payerDFSP
      payerDFSPProxy
      payeeDFSP
      payeeDFSPProxy
      payerParty {
        partyIdType
        partyIdentifier
        partyName
        supportedCurrencies
      }
      payeeParty {
        partyIdType
        partyIdentifier
        partyName
        supportedCurrencies
      }
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
      transferTerms {
        transferAmount {
          amount
          currency
        }
        payeeFspFee {
          amount
          currency
        }
        payeeFspCommission {
          amount
          currency
        }
        payeeReceiveAmount {
          amount
          currency
        }
        geoCode {
          latitude
          longitude
        }
        expiration
        ilpPacket
      }
      conversions {
        conversionRequestId
        conversionId
        conversionCommitRequestId
        conversionState
        conversionType
        conversionStateChanges {
          conversionState
          dateTime
          reason
        }
        counterPartyFSP
        conversionSettlementWindowId
        conversionTerms {
          conversionId
          determiningTransferId
          initiatingFsp
          counterPartyFsp
          amountType
          sourceAmount {
            amount
            currency
          }
          targetAmount {
            amount
            currency
          }
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

export const GET_TRANSFER_SUMMARY_TOTAL = gql`
  query GetTransferSummary(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
    ) {
      count
      group {
        errorCode
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;
export const GET_TRANSFER_SUMMARY = gql`
  query GetTransferSummary(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["errorCode"]
    ) {
      count
      group {
        errorCode
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_CURRENCY = gql`
  query GetTransferSummaryByCurrency(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["sourceCurrency", "targetCurrency"]
    ) {
      count
      group {
        sourceCurrency
        targetCurrency
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_SOURCE_CURRENCY = gql`
  query GetTransferSummaryByCurrency(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["sourceCurrency"]
    ) {
      count
      group {
        sourceCurrency
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_TARGET_CURRENCY = gql`
  query GetTransferSummaryByCurrency(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["targetCurrency"]
    ) {
      count
      group {
        targetCurrency
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_PAYER_DFSP = gql`
  query GetTransferSummaryByPayerDFSP(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["payerDFSP"]
    ) {
      count
      group {
        payerDFSP
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;
export const GET_TRANSFER_SUMMARY_BY_PAYER = gql`
  query GetTransferSummaryByPayerDFSP(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["errorCode", "payerDFSP"]
    ) {
      count
      group {
        payerDFSP
        errorCode
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_PAYEE = gql`
  query GetTransferSummaryByPayerDFSP(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["errorCode", "payeeDFSP"]
    ) {
      count
      group {
        payeeDFSP
        errorCode
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;

export const GET_TRANSFER_SUMMARY_BY_PAYEE_DFSP = gql`
  query GetTransferSummaryByPayeeDFSP(
    $limit: Int = 100
    $offset: Int = 0
    $startDate: DateTimeFlexible!
    $endDate: DateTimeFlexible!
  ) {
    transferSummary(
      limit: $limit
      offset: $offset
      filter: { startDate: $startDate, endDate: $endDate }
      groupBy: ["payeeDFSP"]
    ) {
      count
      group {
        payeeDFSP
      }
      sum {
        sourceAmount
        targetAmount
      }
    }
  }
`;
