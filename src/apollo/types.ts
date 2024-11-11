// https://www.graphql-code-generator.com/
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Date: any;
  NonEmptyString: any;
  JSONObject: any;
  Currency: any;
  DateTimeFlexible: any;
};

export type Query = {
  __typename?: 'Query';
  _placeholder?: Maybe<Scalars['Boolean']>;
  dfsps: Array<DFSP>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transferSummary: Array<TransferSummary>;
};

export type QueryTransferArgs = {
  transferId: Scalars['String'];
};

export type QueryTransfersArgs = {
  filter: TransferFilter;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryTransferSummaryArgs = {
  filter?: Maybe<TransferSummaryFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _placeholder?: Maybe<Scalars['Boolean']>;
};

export type DFSP = {
  __typename?: 'DFSP';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  active: Scalars['Boolean'];
  currencies: Array<Scalars['NonEmptyString']>;
};

export type TransferFilter = {
  startDate: Scalars['DateTimeFlexible'];
  endDate: Scalars['DateTimeFlexible'];
  errorCode?: Maybe<Scalars['Int']>;
  payer?: Maybe<PartyFilter>;
  payee?: Maybe<PartyFilter>;
  currency?: Maybe<Scalars['Currency']>;
  transferState?: Maybe<TransferState>;
  settlementWindowId?: Maybe<Scalars['Int']>;
  settlementId?: Maybe<Scalars['Int']>;
};

export type PartyFilter = {
  dfsp?: Maybe<Scalars['String']>;
  idType?: Maybe<PartyIdType>;
  idValue?: Maybe<Scalars['String']>;
};

export type Transfer = {
  __typename?: 'Transfer';
  id: Scalars['Int'];
  transferId: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  quoteId?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['Int']>;
  sourceCurrency?: Maybe<Scalars['Currency']>;
  targetAmount?: Maybe<Scalars['Int']>;
  targetCurrency?: Maybe<Scalars['Currency']>;
  createdAt?: Maybe<Scalars['String']>;
  baseUseCase?: Maybe<Scalars['String']>;
  transferState?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
  errorCode?: Maybe<Scalars['Int']>;
  settlementWindowId?: Maybe<Scalars['Int']>;
  settlementId?: Maybe<Scalars['Int']>;
  payerDFSP?: Maybe<DFSP>;
  payeeDFSP?: Maybe<DFSP>;
  payerParty?: Maybe<Party>;
  payeeParty?: Maybe<Party>;
  transferTerms?: Maybe<TransferTerms>;
  conversions?: Maybe<Conversion>;
  conversionTerms?: Maybe<ConversionTerms>;
  partyLookupEvents?: Maybe<Scalars['JSONObject']>;
  quoteEvents?: Maybe<Scalars['JSONObject']>;
  transferEvents?: Maybe<Scalars['JSONObject']>;
  settlementEvents?: Maybe<Scalars['JSONObject']>;
  lastUpdated?: Maybe<Scalars['DateTime']>;
  transferStateChanges?: Maybe<Scalars['String']>;
  transferSettlementWindowId?: Maybe<Scalars['Int']>;
  payerDFSPProxy?: Maybe<Scalars['String']>;
  payeeDFSPProxy?: Maybe<Scalars['String']>;
  positionChanges?: Maybe<Scalars['Int']>;
  payerPartyId?: Maybe<Scalars['Int']>;
  payeePartyId?: Maybe<Party>;
  quoteRequestId?: Maybe<Scalars['Int']>;
  quoteRequest?: Maybe<TransferTerms>;
  transferTermsId?: Maybe<Scalars['Int']>;
  fxQuoteEvents?: Maybe<Scalars['JSONObject']>;
  fxTransferEvents?: Maybe<Scalars['JSONObject']>;
  fxSettlementEvents?: Maybe<Scalars['JSONObject']>;
};

export type TransferTerms = {
  quoteAmount?: Maybe<Amount>;
  quoteAmountType?: Maybe<Scalars['String']>;
  transferAmount?: Maybe<Amount>;
  payeeReceiveAmount?: Maybe<Amount>;
  payeeFspCommission?: Maybe<Amount>;
  payeeFspFee?: Maybe<Amount>;
  expiration: Maybe<Scalars['DateTimeFlexible']>;
  geoCode?: Maybe<GeoCode>;
  ilpPacket?: Maybe<Scalars['Currency']>;
};

export type Conversion = {
  conversionRequestId?: Maybe<Scalars['String']>;
  conversionId?: Maybe<Scalars['String']>;
  conversionCommitRequestId?: Maybe<Scalars['String']>;
  conversionState?: Maybe<Scalars['String']>;
  conversionStateChanges?: Maybe<ConversionStateChanges>;
  counterPartyFSP?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTimeFlexible']>;
  conversionSettlementWindowId?: Maybe<Scalars['Int']>;
  conversionType?: Maybe<Scalars['String']>;
  counterPartyProxy?: Maybe<Scalars['String']>;
};

export type ConversionTerms = {
  determiningTransferId?: Maybe<Scalars['String']>;
  initiatingFsp?: Maybe<Scalars['String']>;
  counterPartyFsp?: Maybe<Scalars['String']>;
  amountType?: Maybe<Scalars['String']>;
  expiration?: Maybe<Scalars['DateTimeFlexible']>;
  charges?: Maybe<Charges>;
  ilpPacket?: Maybe<Scalars['String']>;
  conversionIdRef?: Maybe<Scalars['Int']>;
  payeeReceiveAmount?: Maybe<Amount>;
  payeeFspCommission?: Maybe<Amount>;
  sourceAmount?: Maybe<Amount>;
  targetAmount?: Maybe<Amount>;
  payeeFspFee?: Maybe<Amount>;
};

export type Amount = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['Currency']>;
};

export type GeoCode = {
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
};

export type ConversionStateChanges = {
  conversionState?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTimeFlexible']>;
  reason?: Maybe<Scalars['String']>;
};

export type Charges = {
  totalSourceCurrencyCharges?: Maybe<Amount>;
  totalTargetCurrencyCharges?: Maybe<Amount>;
};

export enum TransactionType {
  Transfer = 'TRANSFER',
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL',
  Payment = 'PAYMENT',
  Refund = 'REFUND',
}

export enum TransferState {
  Aborted = 'ABORTED',
  Committed = 'COMMITTED',
  Reserved = 'RESERVED',
  Settled = 'SETTLED',
}

export type Party = {
  __typename?: 'Party';
  id?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  idType?: Maybe<PartyIdType>;
  idValue?: Maybe<Scalars['String']>;
  supportedCurrency?: Maybe<Scalars['String']>;
};

export enum PartyIdType {
  Msisdn = 'MSISDN',
  Email = 'EMAIL',
  PersonalId = 'PERSONAL_ID',
  Business = 'BUSINESS',
  Device = 'DEVICE',
  AccountId = 'ACCOUNT_ID',
  Iban = 'IBAN',
  Alias = 'ALIAS',
}

export type TransferSummaryFilter = {
  startDate?: Maybe<Scalars['DateTimeFlexible']>;
  endDate?: Maybe<Scalars['DateTimeFlexible']>;
  errorCode?: Maybe<Scalars['Int']>;
  payerDFSP?: Maybe<Scalars['String']>;
  payeeDFSP?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['Currency']>;
  targetCurrency?: Maybe<Scalars['Currency']>;
};

export type TransferSummary = {
  __typename?: 'TransferSummary';
  count: Scalars['Int'];
  id: Scalars['Int'];
  sourceAmount?: Maybe<Scalars['Int']>;
  targetAmount?: Maybe<Scalars['Int']>;
  errorCode?: Maybe<Scalars['Int']>;
  payerDFSP?: Maybe<Scalars['String']>;
  payeeDFSP?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['Currency']>;
  targetCurrency?: Maybe<Scalars['Currency']>;
};

export type TransferStateChange = {
  id: Scalars['Int'];
  transferState?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['Int']>;
};

export type PositionChange = {
  id: Scalars['Int'];
  participantName?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  ledgerType?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['DateTime']>;
  updatedPosition?: Maybe<Scalars['String']>;
  change?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['Int']>;
};

export type SettlementWindow = {
  id: Scalars['Int'];
  settlementWindowId?: Maybe<Scalars['Int']>;
  settlementId?: Maybe<Scalars['Int']>;
  Settlement?: Maybe<Settlement>;
};

export type Settlement = {
  id: Scalars['Int'];
  settlementId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  lastUpdatedAt?: Maybe<Scalars['DateTime']>;
  settlementModel?: Maybe<Scalars['String']>;
  settlementStatus?: Maybe<Scalars['String']>;
  SettlementWindows?: Maybe<SettlementWindow>;
};
