import * as Factory from 'factory.ts';
import faker from 'faker';
import { MATCH_ANY_PARAMETERS, WildcardMockedResponse } from 'wildcard-mock-link';
import {
  GET_TRANSFERS_WITH_EVENTS,
  GET_TRANSFER_SUMMARY_BY_CURRENCY,
  GET_TRANSFER_SUMMARY_BY_PAYEE_DFSP,
  GET_TRANSFER_SUMMARY_BY_PAYER_DFSP,
  GET_TRANSFER_SUMMARY,
} from './query';
import {
  Transfer,
  DFSP,
  Party,
  PartyIdType,
  TransactionType,
  TransferState,
  TransferSummary,
  TransferTerms,
  Conversion,
  ConversionTerms,
} from './types';

export const PartyMock = Factory.Sync.makeFactory<Party>({
  __typename: 'Party',
  id: Factory.each(() => faker.datatype.number()),
  firstName: Factory.each(() => faker.name.firstName()),
  lastName: Factory.each(() => faker.name.lastName()),
  middleName: Factory.each(() => faker.name.middleName()),
  dateOfBirth: Factory.each(() => faker.datatype.datetime().toJSON()),
  idType: Factory.each(() =>
    faker.random.arrayElement([
      PartyIdType.Msisdn,
      PartyIdType.Email,
      PartyIdType.PersonalId,
      PartyIdType.Business,
      PartyIdType.Device,
      PartyIdType.AccountId,
      PartyIdType.Iban,
      PartyIdType.Alias,
    ]),
  ),
  idValue: Factory.each(() => faker.datatype.string()),
  supportedCurrency: Factory.each(() =>
    faker.random.arrayElement(['USD', 'EUR', 'CNY', 'MMK', 'TZS']),
  ),
});

export const TransferTermsMock = Factory.Sync.makeFactory<TransferTerms>({
  quoteAmount: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  quoteAmountType: Factory.each(() => faker.random.arrayElement(['fixed', 'variable'])),
  transferAmount: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  payeeReceiveAmount: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  payeeFspCommission: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  payeeFspFee: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  expiration: Factory.each(() => faker.datatype.datetime().toJSON()),
  geoCode: Factory.each(() => ({
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  })),
  ilpPacket: Factory.each(() => faker.random.arrayElement(['USD', 'EUR'])),
});

export const ConversionMock = Factory.Sync.makeFactory<Conversion>({
  conversionRequestId: Factory.each(() => faker.datatype.uuid()),
  conversionId: Factory.each(() => faker.datatype.uuid()),
  conversionCommitRequestId: Factory.each(() => faker.datatype.uuid()),
  conversionState: Factory.each(() =>
    faker.random.arrayElement(['pending', 'completed', 'failed']),
  ),
  counterPartyFSP: Factory.each(() => faker.datatype.string()),
  createdAt: Factory.each(() => faker.datatype.datetime().toJSON()),
  conversionSettlementWindowId: Factory.each(() => faker.datatype.number()),
  conversionType: Factory.each(() => faker.random.arrayElement(['type1', 'type2'])),
  counterPartyProxy: Factory.each(() => faker.datatype.string()),
});

export const ConversionTermsMock = Factory.Sync.makeFactory<ConversionTerms>({
  determiningTransferId: Factory.each(() => faker.datatype.uuid()),
  initiatingFsp: Factory.each(() => faker.company.companyName()),
  counterPartyFsp: Factory.each(() => faker.datatype.string()),
  amountType: Factory.each(() => faker.random.arrayElement(['fixed', 'variable'])),
  expiration: Factory.each(() => faker.datatype.datetime().toJSON()),
  charges: Factory.each(() => ({
    totalSourceCurrencyCharges: { amount: faker.datatype.number(), currency: 'USD' },
    totalTargetCurrencyCharges: { amount: faker.datatype.number(), currency: 'USD' },
  })),
  ilpPacket: Factory.each(() => faker.datatype.string()),
  conversionIdRef: Factory.each(() => faker.datatype.number()),
  payeeReceiveAmount: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  payeeFspCommission: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  sourceAmount: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  targetAmount: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
  payeeFspFee: Factory.each(() => ({ amount: faker.datatype.number(), currency: 'USD' })),
});

export const DfspMock = Factory.Sync.makeFactory<DFSP>({
  __typename: 'DFSP',
  id: Factory.each(() => faker.datatype.number()),
  name: Factory.each(() => faker.company.companyName()),
  description: Factory.each(() => faker.company.catchPhrase()),
  active: Factory.each(() => faker.datatype.boolean()),
  currencies: ['USD', 'EUR', 'CNY', 'MMK', 'TZS'],
});

export const TransferMock = Factory.Sync.makeFactory<Transfer>({
  __typename: 'Transfer',
  transferId: Factory.each(() => faker.datatype.uuid()),
  transactionId: Factory.each(() => faker.datatype.uuid()),
  quoteId: Factory.each(() => faker.datatype.uuid()),
  sourceAmount: Factory.each(() => faker.datatype.float()),
  targetAmount: Factory.each(() => faker.datatype.float()),
  sourceCurrency: Factory.each(() =>
    faker.random.arrayElement(['USD', 'EUR', 'CNY', 'MMK', 'TZS']),
  ),
  targetCurrency: Factory.each(() =>
    faker.random.arrayElement(['USD', 'EUR', 'CNY', 'MMK', 'TZS']),
  ),
  createdAt: Factory.each(() => faker.datatype.datetime().toJSON()),
  baseUseCase: Factory.each(() => faker.datatype.string()),
  transferState: Factory.each(() =>
    faker.random.arrayElement([
      TransferState.Aborted,
      TransferState.Committed,
      TransferState.Reserved,
      TransferState.Settled,
    ]),
  ),
  transactionType: Factory.each(() =>
    faker.random.arrayElement([
      TransactionType.Transfer,
      TransactionType.Deposit,
      TransactionType.Withdrawal,
      TransactionType.Payment,
      TransactionType.Refund,
    ]),
  ),
  errorCode: Factory.each(() => faker.datatype.number()),
  settlementWindowId: Factory.each(() => faker.datatype.number()),
  settlementId: Factory.each(() => faker.datatype.number()),
  payerDFSP: Factory.each(() => DfspMock.build()),
  payeeDFSP: Factory.each(() => DfspMock.build()),
  payerParty: Factory.each(() => PartyMock.build()),
  payeeParty: Factory.each(() => PartyMock.build()),
  transferTerms: Factory.each(() => TransferTermsMock.build()),
  conversions: Factory.each(() => ConversionMock.build()),
  conversionTerms: Factory.each(() => ConversionTermsMock.build()),
  partyLookupEvents: Factory.each(() => {
    return JSON.parse(faker.datatype.json());
  }),
  quoteEvents: Factory.each(() => {
    return JSON.parse(JSON.stringify({ data: faker.datatype.string(1000) }));
  }),
  transferEvents: Factory.each(() => {
    return JSON.parse(faker.datatype.json());
  }),
  settlementEvents: Factory.each(() => {
    return JSON.parse(faker.datatype.json());
  }),
  lastUpdated: Factory.each(() => faker.datatype.datetime().toJSON()),
  transferStateChanges: Factory.each(() => faker.datatype.string()),
  transferSettlementWindowId: Factory.each(() => faker.datatype.number()),
  payerDFSPProxy: Factory.each(() => faker.datatype.string()),
  payeeDFSPProxy: Factory.each(() => faker.datatype.string()),
  positionChanges: Factory.each(() => faker.datatype.number()),
  quoteRequestId: Factory.each(() => faker.datatype.number()),
  quoteRequest: Factory.each(() => TransferTermsMock.build()),
  transferTermsId: Factory.each(() => faker.datatype.number()),
  fxQuoteEvents: Factory.each(() => {
    return JSON.parse(faker.datatype.json());
  }),
  fxTransferEvents: Factory.each(() => {
    return JSON.parse(faker.datatype.json());
  }),
  fxSettlementEvents: Factory.each(() => {
    return JSON.parse(faker.datatype.json());
  }),
  id: 0,
});

export const TransferSummaryMock = Factory.Sync.makeFactory<TransferSummary>({
  __typename: 'TransferSummary',
  count: Factory.each(() => faker.datatype.number()),
  payerDFSP: Factory.each(() => faker.company.companyName()),
  payeeDFSP: Factory.each(() => faker.company.companyName()),
  sourceCurrency: Factory.each(() =>
    faker.random.arrayElement(['USD', 'EUR', 'CNY', 'MMK', 'TZS']),
  ),
  targetCurrency: Factory.each(() =>
    faker.random.arrayElement(['USD', 'EUR', 'CNY', 'MMK', 'TZS']),
  ),
  errorCode: Factory.each(() => faker.datatype.number()),
  id: 0,
});

export const TransferSummaryMockByErrorCode = Factory.Sync.makeFactory<TransferSummary>({
  __typename: 'TransferSummary',
  count: Factory.each(() => faker.datatype.number()),
  errorCode: Factory.each(() => faker.datatype.number()),
  id: 0,
});

export const TransferSummaryMockByCurrency = Factory.Sync.makeFactory<TransferSummary>({
  __typename: 'TransferSummary',
  count: Factory.each(() => faker.datatype.number()),
  sourceCurrency: Factory.each(() => faker.datatype.string(3)),
  targetCurrency: Factory.each(() => faker.datatype.string(3)),
  errorCode: Factory.each(() => faker.datatype.number()),
  id: 0,
});

export const TransferSummaryMockByPayeeDFSP = Factory.Sync.makeFactory<TransferSummary>({
  __typename: 'TransferSummary',
  count: Factory.each(() => faker.datatype.number()),
  payeeDFSP: Factory.each(() => faker.company.companyName()),
  errorCode: Factory.each(() => faker.datatype.number()),
  id: 0,
});

export const TransferSummaryMockByPayerDFSP = Factory.Sync.makeFactory<TransferSummary>({
  __typename: 'TransferSummary',
  count: Factory.each(() => faker.datatype.number()),
  payerDFSP: Factory.each(() => faker.company.companyName()),
  errorCode: Factory.each(() => faker.datatype.number()),
  id: 0,
});

export const transfersQueryMock: WildcardMockedResponse = {
  request: {
    query: GET_TRANSFERS_WITH_EVENTS,
    variables: MATCH_ANY_PARAMETERS,
  },
  result: {
    data: {
      transfers: TransferMock.buildList(100),
      dfsps: [],
      transferSummary: [],
    },
  },
  nMatches: Number.POSITIVE_INFINITY,
};

export const transferSummary: WildcardMockedResponse = {
  request: {
    query: GET_TRANSFER_SUMMARY,
    variables: MATCH_ANY_PARAMETERS,
  },
  result: {
    data: {
      transfers: [],
      dfsps: [],
      transferSummary: [
        {
          count: 1000000,
          errorCode: null,
        },
        ...TransferSummaryMock.buildList(10),
      ],
    },
  },
  nMatches: Number.POSITIVE_INFINITY,
};

export const transferSummaryByCurrencyQueryMock: WildcardMockedResponse = {
  request: {
    query: GET_TRANSFER_SUMMARY_BY_CURRENCY,
    variables: MATCH_ANY_PARAMETERS,
  },
  result: {
    data: {
      transfers: [],
      dfsps: [],
      transferSummary: [
        {
          count: 1000000,
          sourceCurrency: 'USD',
          targetCurrency: 'USD',
          errorCode: null,
        },
        {
          count: 2000000,
          sourceCurrency: 'EUR',
          targetCurrency: 'EUR',
          errorCode: null,
        },
        {
          count: 40000,
          sourceCurrency: 'USD',
          targetCurrency: 'USD',
          errorCode: 3100,
        },
        ...TransferSummaryMockByCurrency.buildList(10),
      ],
    },
  },
  nMatches: Number.POSITIVE_INFINITY,
};

export const transferSummaryByPayerDFSPQueryMock: WildcardMockedResponse = {
  request: {
    query: GET_TRANSFER_SUMMARY_BY_PAYER_DFSP,
    variables: MATCH_ANY_PARAMETERS,
  },
  result: {
    data: {
      transfers: [],
      dfsps: [],
      transferSummary: [
        {
          count: 1000000,
          payerDFSP: 'dfspa',
          errorCode: null,
        },
        {
          count: 1000000,
          payerDFSP: 'dfspb',
          errorCode: null,
        },
        ...TransferSummaryMockByPayerDFSP.buildList(10),
      ],
    },
  },
  nMatches: Number.POSITIVE_INFINITY,
};

export const transferSummaryByPayeeDFSPQueryMock: WildcardMockedResponse = {
  request: {
    query: GET_TRANSFER_SUMMARY_BY_PAYEE_DFSP,
    variables: MATCH_ANY_PARAMETERS,
  },
  result: {
    data: {
      transfers: [],
      dfsps: [],
      transferSummary: [
        {
          count: 1000000,
          payeeDFSP: 'payeea',
          errorCode: null,
        },
        {
          count: 1000000,
          payeeDFSP: 'payeeb',
          errorCode: null,
        },
        ...TransferSummaryMockByPayeeDFSP.buildList(10),
      ],
    },
  },
  nMatches: Number.POSITIVE_INFINITY,
};
