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
  id: Scalars['Int'];
  items: Array<Item>;
  modifiedOn: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  title: Scalars['String'];
  transactions: Array<Transaction>;
};

export type AppointmentCreate = {
  scheduledAt: Scalars['DateTime'];
  title: Scalars['String'];
};

export type AppointmentUpdate = {
  id: Scalars['Int'];
  scheduledAt: Scalars['DateTime'];
  title: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  about: Scalars['String'];
  appointments: Array<Appointment>;
  createdOn: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  instagram: Scalars['String'];
  items: Array<Item>;
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

export type Invoice = {
  __typename?: 'Invoice';
  createdOn: Scalars['DateTime'];
  id: Scalars['Int'];
  isPaid: Scalars['Boolean'];
  isReceived: Scalars['Boolean'];
  items: Array<Item>;
  modifiedOn: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
  transactions: Array<Transaction>;
};

export type Item = {
  __typename?: 'Item';
  appointment?: Maybe<Appointment>;
  appointmentId?: Maybe<Scalars['Float']>;
  createdOn: Scalars['DateTime'];
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  invoice?: Maybe<Invoice>;
  invoiceId?: Maybe<Scalars['Float']>;
  modifiedOn: Scalars['DateTime'];
  title: Scalars['String'];
  total: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomerToAppointment: Appointment;
  createAppointment: Appointment;
  createCustomer: Customer;
  createTransaction: Transaction;
  login: UserResponse;
  logout: Scalars['Boolean'];
  removeCustomerToAppointment: Appointment;
  updateAppointment: Appointment;
  updateTransaction: Transaction;
};


export type MutationAddCustomerToAppointmentArgs = {
  appointmentId: Scalars['Float'];
  customerId: Scalars['Float'];
};


export type MutationCreateAppointmentArgs = {
  appointment: AppointmentCreate;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateTransactionArgs = {
  transaction: TransactionCreate;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userEmail: Scalars['String'];
};


export type MutationRemoveCustomerToAppointmentArgs = {
  appointmentId: Scalars['Float'];
  customerId: Scalars['Float'];
};


export type MutationUpdateAppointmentArgs = {
  appointment: AppointmentUpdate;
};


export type MutationUpdateTransactionArgs = {
  transaction: TransactionUpdate;
};

export type Query = {
  __typename?: 'Query';
  appointment?: Maybe<Appointment>;
  appointments: Array<Appointment>;
  customers: Array<Customer>;
  items: Array<Item>;
  me?: Maybe<User>;
  transactions: Array<Transaction>;
};


export type QueryAppointmentArgs = {
  appointmentId: Scalars['Int'];
};

export type Transaction = {
  __typename?: 'Transaction';
  appointment?: Maybe<Appointment>;
  appointmentId?: Maybe<Scalars['Float']>;
  createdOn: Scalars['DateTime'];
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  invoice?: Maybe<Invoice>;
  invoiceId?: Maybe<Scalars['Float']>;
  isPaid: Scalars['Boolean'];
  modifiedOn: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
  type: Scalars['String'];
};

export type TransactionCreate = {
  appointmentId?: InputMaybe<Scalars['Float']>;
  customerId?: InputMaybe<Scalars['Float']>;
  invoiceId?: InputMaybe<Scalars['Float']>;
  isPaid?: InputMaybe<Scalars['Boolean']>;
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
  type: TransactionType;
};

/** The basic directions */
export enum TransactionType {
  /** Marks transaction as income. */
  In = 'IN',
  /** Marks transaction as expense. */
  Out = 'OUT'
}

export type TransactionUpdate = {
  appointmentId?: InputMaybe<Scalars['Float']>;
  customerId?: InputMaybe<Scalars['Float']>;
  id: Scalars['Int'];
  invoiceId?: InputMaybe<Scalars['Float']>;
  isPaid?: InputMaybe<Scalars['Boolean']>;
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
  type: TransactionType;
};

export type User = {
  __typename?: 'User';
  createdOn: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  modifiedOn: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AddCustomerToAppointmentMutationVariables = Exact<{
  appointmentId: Scalars['Float'];
  customerId: Scalars['Float'];
}>;


export type AddCustomerToAppointmentMutation = { __typename?: 'Mutation', addCustomerToAppointment: { __typename?: 'Appointment', id: number, customers: Array<{ __typename?: 'Customer', id: number }> } };

export type CreateAppointmentMutationVariables = Exact<{
  appointment: AppointmentCreate;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'Appointment', id: number, scheduledAt: any, title: string } };

export type RemoveCustomerToAppointmentMutationVariables = Exact<{
  appointmentId: Scalars['Float'];
  customerId: Scalars['Float'];
}>;


export type RemoveCustomerToAppointmentMutation = { __typename?: 'Mutation', removeCustomerToAppointment: { __typename?: 'Appointment', id: number, customers: Array<{ __typename?: 'Customer', id: number }> } };

export type UpdateAppointmentMutationVariables = Exact<{
  appointment: AppointmentUpdate;
}>;


export type UpdateAppointmentMutation = { __typename?: 'Mutation', updateAppointment: { __typename?: 'Appointment', id: number, title: string, scheduledAt: any } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  userEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string } | null | undefined } };

export type CreateTransactionMutationVariables = Exact<{
  transaction: TransactionCreate;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string, customerId?: number | null | undefined, appointmentId?: number | null | undefined, invoiceId?: number | null | undefined } };

export type UpdateTransactionMutationVariables = Exact<{
  transaction: TransactionUpdate;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string, appointmentId?: number | null | undefined } };

export type AppointmentQueryVariables = Exact<{
  appointmentId: Scalars['Int'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment?: { __typename?: 'Appointment', id: number, title: string, scheduledAt: any, customers: Array<{ __typename?: 'Customer', fullName: string, id: number, transactions: Array<{ __typename?: 'Transaction', id: number, appointmentId?: number | null | undefined, total: number, isPaid: boolean, scheduledAt: any, customerId?: number | null | undefined, invoiceId?: number | null | undefined }> }>, transactions: Array<{ __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, customerId?: number | null | undefined }>, items: Array<{ __typename?: 'Item', id: number, title: string, total: number, customerId?: number | null | undefined }> } | null | undefined };

export type AppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id: number, scheduledAt: any, title: string }> };

export type CustomersBaseQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersBaseQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: number, fullName: string, location: string, instagram: string, email: string, about: string }> };

export type CustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: number, fullName: string, transactions: Array<{ __typename?: 'Transaction', customerId?: number | null | undefined, id: number, total: number }> }> };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string } | null | undefined };


export const AddCustomerToAppointmentDocument = gql`
    mutation AddCustomerToAppointment($appointmentId: Float!, $customerId: Float!) {
  addCustomerToAppointment(appointmentId: $appointmentId, customerId: $customerId) {
    id
    customers {
      id
    }
  }
}
    `;

export function useAddCustomerToAppointmentMutation() {
  return Urql.useMutation<AddCustomerToAppointmentMutation, AddCustomerToAppointmentMutationVariables>(AddCustomerToAppointmentDocument);
};
export const CreateAppointmentDocument = gql`
    mutation CreateAppointment($appointment: AppointmentCreate!) {
  createAppointment(appointment: $appointment) {
    id
    scheduledAt
    title
  }
}
    `;

export function useCreateAppointmentMutation() {
  return Urql.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument);
};
export const RemoveCustomerToAppointmentDocument = gql`
    mutation RemoveCustomerToAppointment($appointmentId: Float!, $customerId: Float!) {
  removeCustomerToAppointment(
    appointmentId: $appointmentId
    customerId: $customerId
  ) {
    id
    customers {
      id
    }
  }
}
    `;

export function useRemoveCustomerToAppointmentMutation() {
  return Urql.useMutation<RemoveCustomerToAppointmentMutation, RemoveCustomerToAppointmentMutationVariables>(RemoveCustomerToAppointmentDocument);
};
export const UpdateAppointmentDocument = gql`
    mutation UpdateAppointment($appointment: AppointmentUpdate!) {
  updateAppointment(appointment: $appointment) {
    id
    title
    scheduledAt
  }
}
    `;

export function useUpdateAppointmentMutation() {
  return Urql.useMutation<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>(UpdateAppointmentDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $userEmail: String!) {
  login(password: $password, userEmail: $userEmail) {
    errors {
      message
    }
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($transaction: TransactionCreate!) {
  createTransaction(transaction: $transaction) {
    id
    total
    isPaid
    scheduledAt
    type
    customerId
    appointmentId
    invoiceId
  }
}
    `;

export function useCreateTransactionMutation() {
  return Urql.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument);
};
export const UpdateTransactionDocument = gql`
    mutation UpdateTransaction($transaction: TransactionUpdate!) {
  updateTransaction(transaction: $transaction) {
    id
    total
    isPaid
    scheduledAt
    type
    appointmentId
  }
}
    `;

export function useUpdateTransactionMutation() {
  return Urql.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(UpdateTransactionDocument);
};
export const AppointmentDocument = gql`
    query Appointment($appointmentId: Int!) {
  appointment(appointmentId: $appointmentId) {
    id
    title
    scheduledAt
    customers {
      fullName
      id
      transactions {
        id
        appointmentId
        total
        isPaid
        scheduledAt
        customerId
        invoiceId
      }
    }
    transactions {
      id
      total
      isPaid
      scheduledAt
      customerId
    }
    items {
      id
      title
      total
      customerId
    }
  }
}
    `;

export function useAppointmentQuery(options: Omit<Urql.UseQueryArgs<never, AppointmentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppointmentQuery>({ query: AppointmentDocument, ...options });
};
export const AppointmentsDocument = gql`
    query Appointments {
  appointments {
    id
    scheduledAt
    title
  }
}
    `;

export function useAppointmentsQuery(options: Omit<Urql.UseQueryArgs<never, AppointmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AppointmentsQuery>({ query: AppointmentsDocument, ...options });
};
export const CustomersBaseDocument = gql`
    query CustomersBase {
  customers {
    id
    fullName
    location
    instagram
    email
    about
  }
}
    `;

export function useCustomersBaseQuery(options: Omit<Urql.UseQueryArgs<never, CustomersBaseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomersBaseQuery>({ query: CustomersBaseDocument, ...options });
};
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
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;

export function useLogOutMutation() {
  return Urql.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<never, MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};