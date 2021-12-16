import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Appointment = {
  __typename?: 'Appointment';
  createdOn: Scalars['DateTime'];
  customers: Array<Customer>;
  id: Scalars['ID'];
  items: Array<Item>;
  modifiedOn: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  title: Scalars['String'];
  transactions: Array<Transaction>;
};

export type Customer = {
  __typename?: 'Customer';
  about: Scalars['String'];
  createdOn: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  instagram: Scalars['String'];
  location: Scalars['String'];
  modifiedOn: Scalars['DateTime'];
  transactions: Array<Transaction>;
};

export type CustomerInput = {
  about: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  instagram: Scalars['String'];
  location: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  modifiedOn: Scalars['DateTime'];
  title: Scalars['String'];
  total: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: Customer;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userEmail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  appointments: Array<Appointment>;
  customers: Array<Customer>;
  transactions: Array<Transaction>;
};

export type Transaction = {
  __typename?: 'Transaction';
  createdOn: Scalars['DateTime'];
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  isPaid: Scalars['Boolean'];
  modifiedOn: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdOn: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  modifiedOn: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: string, fullName: string, transactions: Array<{ __typename?: 'Transaction', customerId?: number | null | undefined, id: string, total: number }> }> };


export const CustomersDocument = gql`
    query Customers {
  customers {
    id
    fullName
    transactions {
      customerId
      id
      total
    }
  }
}
    `;

export function useCustomersQuery(options: Omit<Urql.UseQueryArgs<never, CustomersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomersQuery>({ query: CustomersDocument, ...options });
};