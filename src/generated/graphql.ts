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
  about?: Maybe<Scalars['String']>;
  appointments: Array<Appointment>;
  createdOn: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['Int'];
  instagram?: Maybe<Scalars['String']>;
  items: Array<Item>;
  location?: Maybe<Scalars['String']>;
  modifiedOn: Scalars['DateTime'];
  transactions: Array<Transaction>;
};

export type CustomerCreate = {
  about?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  instagram?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
};

export type CustomerUpdate = {
  about?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['Int'];
  instagram?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
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

export type InvoiceCreate = {
  isPaid?: InputMaybe<Scalars['Boolean']>;
  isReceived?: InputMaybe<Scalars['Boolean']>;
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
};

export type InvoiceUpdate = {
  id: Scalars['Int'];
  isPaid?: InputMaybe<Scalars['Boolean']>;
  isReceived?: InputMaybe<Scalars['Boolean']>;
  scheduledAt: Scalars['DateTime'];
  total: Scalars['Float'];
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

export type ItemCreate = {
  appointmentId?: InputMaybe<Scalars['Float']>;
  customerId?: InputMaybe<Scalars['Float']>;
  invoiceId?: InputMaybe<Scalars['Float']>;
  title: Scalars['String'];
  total: Scalars['Float'];
};

export type ItemUpdate = {
  appointmentId?: InputMaybe<Scalars['Float']>;
  customerId?: InputMaybe<Scalars['Float']>;
  id: Scalars['Int'];
  invoiceId?: InputMaybe<Scalars['Float']>;
  title: Scalars['String'];
  total: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomerToAppointment: Appointment;
  createAppointment: Appointment;
  createCustomer: Customer;
  createInvoice: Invoice;
  createItem: Item;
  createTransaction: Transaction;
  login: UserResponse;
  logout: Scalars['Boolean'];
  removeCustomerToAppointment: Appointment;
  removeTransaction?: Maybe<Transaction>;
  updateAppointment: Appointment;
  updateCustomer: Customer;
  updateInvoice: Invoice;
  updateItem: Item;
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
  customer: CustomerCreate;
};


export type MutationCreateInvoiceArgs = {
  invoice: InvoiceCreate;
};


export type MutationCreateItemArgs = {
  item: ItemCreate;
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


export type MutationRemoveTransactionArgs = {
  transactionId: Scalars['Int'];
};


export type MutationUpdateAppointmentArgs = {
  appointment: AppointmentUpdate;
};


export type MutationUpdateCustomerArgs = {
  customer: CustomerUpdate;
};


export type MutationUpdateInvoiceArgs = {
  invoice: InvoiceUpdate;
};


export type MutationUpdateItemArgs = {
  item: ItemUpdate;
};


export type MutationUpdateTransactionArgs = {
  transaction: TransactionUpdate;
};

export type Query = {
  __typename?: 'Query';
  appointment?: Maybe<Appointment>;
  appointments: Array<Appointment>;
  customer?: Maybe<Customer>;
  customers: Array<Customer>;
  invoice?: Maybe<Invoice>;
  invoices: Array<Invoice>;
  item?: Maybe<Item>;
  items: Array<Item>;
  me?: Maybe<User>;
  transactions: Array<Transaction>;
};


export type QueryAppointmentArgs = {
  appointmentId: Scalars['Int'];
};


export type QueryCustomerArgs = {
  customerId: Scalars['Int'];
};


export type QueryInvoiceArgs = {
  invoiceId: Scalars['Int'];
};


export type QueryItemArgs = {
  itemId: Scalars['Int'];
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

export type CreateCustomerMutationVariables = Exact<{
  customer: CustomerCreate;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'Customer', id: number } };

export type UpdateCustomerMutationVariables = Exact<{
  customer: CustomerUpdate;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename?: 'Customer', id: number } };

export type CreateInvoiceMutationVariables = Exact<{
  invoice: InvoiceCreate;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: { __typename?: 'Invoice', id: number } };

export type UpdateInvoiceMutationVariables = Exact<{
  invoice: InvoiceUpdate;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'Invoice', id: number } };

export type CreateItemMutationVariables = Exact<{
  item: ItemCreate;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: number } };

export type UpdateItemMutationVariables = Exact<{
  item: ItemUpdate;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: number } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  userEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string } | null | undefined } };

export type CreateTransactionMutationVariables = Exact<{
  transaction: TransactionCreate;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string, customerId?: number | null | undefined, appointmentId?: number | null | undefined, invoiceId?: number | null | undefined } };

export type DeleteTransactionMutationVariables = Exact<{
  transactionId: Scalars['Int'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', removeTransaction?: { __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string, customerId?: number | null | undefined, appointmentId?: number | null | undefined, invoiceId?: number | null | undefined } | null | undefined };

export type UpdateTransactionMutationVariables = Exact<{
  transaction: TransactionUpdate;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string, appointmentId?: number | null | undefined } };

export type AppointmentQueryVariables = Exact<{
  appointmentId: Scalars['Int'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment?: { __typename?: 'Appointment', id: number, title: string, scheduledAt: any, customers: Array<{ __typename?: 'Customer', fullName: string, id: number, transactions: Array<{ __typename?: 'Transaction', id: number, appointmentId?: number | null | undefined, total: number, isPaid: boolean, scheduledAt: any, customerId?: number | null | undefined, invoiceId?: number | null | undefined, type: string }> }>, transactions: Array<{ __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, customerId?: number | null | undefined, type: string }>, items: Array<{ __typename?: 'Item', id: number, title: string, total: number, customerId?: number | null | undefined }> } | null | undefined };

export type AppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id: number, scheduledAt: any, title: string }> };

export type CustomersBaseQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersBaseQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: number, fullName: string, location?: string | null | undefined, about?: string | null | undefined, email?: string | null | undefined, instagram?: string | null | undefined, createdOn: any, modifiedOn: any }> };

export type CustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: number, fullName: string, transactions: Array<{ __typename?: 'Transaction', customerId?: number | null | undefined, id: number, total: number, type: string }> }> };

export type CustomerQueryVariables = Exact<{
  customerId: Scalars['Int'];
}>;


export type CustomerQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: number, fullName: string, location?: string | null | undefined, about?: string | null | undefined, email?: string | null | undefined, instagram?: string | null | undefined, createdOn: any, modifiedOn: any, appointments: Array<{ __typename?: 'Appointment', id: number, scheduledAt: any, title: string }>, transactions: Array<{ __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string }>, items: Array<{ __typename?: 'Item', id: number, title: string, total: number }> } | null | undefined };

export type InvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesQuery = { __typename?: 'Query', invoices: Array<{ __typename?: 'Invoice', id: number, total: number, isReceived: boolean, isPaid: boolean, scheduledAt: any, createdOn: any, modifiedOn: any }> };

export type InvoiceQueryVariables = Exact<{
  invoiceId: Scalars['Int'];
}>;


export type InvoiceQuery = { __typename?: 'Query', invoice?: { __typename?: 'Invoice', id: number, total: number, isReceived: boolean, isPaid: boolean, scheduledAt: any, createdOn: any, modifiedOn: any, transactions: Array<{ __typename?: 'Transaction', id: number, total: number, isPaid: boolean, scheduledAt: any, type: string }>, items: Array<{ __typename?: 'Item', id: number, title: string, total: number }> } | null | undefined };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, title: string, total: number, customerId?: number | null | undefined }> };

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
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($customer: CustomerCreate!) {
  createCustomer(customer: $customer) {
    id
  }
}
    `;

export function useCreateCustomerMutation() {
  return Urql.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument);
};
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($customer: CustomerUpdate!) {
  updateCustomer(customer: $customer) {
    id
  }
}
    `;

export function useUpdateCustomerMutation() {
  return Urql.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument);
};
export const CreateInvoiceDocument = gql`
    mutation CreateInvoice($invoice: InvoiceCreate!) {
  createInvoice(invoice: $invoice) {
    id
  }
}
    `;

export function useCreateInvoiceMutation() {
  return Urql.useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CreateInvoiceDocument);
};
export const UpdateInvoiceDocument = gql`
    mutation UpdateInvoice($invoice: InvoiceUpdate!) {
  updateInvoice(invoice: $invoice) {
    id
  }
}
    `;

export function useUpdateInvoiceMutation() {
  return Urql.useMutation<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(UpdateInvoiceDocument);
};
export const CreateItemDocument = gql`
    mutation CreateItem($item: ItemCreate!) {
  createItem(item: $item) {
    id
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const UpdateItemDocument = gql`
    mutation UpdateItem($item: ItemUpdate!) {
  updateItem(item: $item) {
    id
  }
}
    `;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
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
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($transactionId: Int!) {
  removeTransaction(transactionId: $transactionId) {
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

export function useDeleteTransactionMutation() {
  return Urql.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument);
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
        type
      }
    }
    transactions {
      id
      total
      isPaid
      scheduledAt
      customerId
      type
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
    about
    email
    instagram
    createdOn
    modifiedOn
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
      type
    }
  }
}
    `;

export function useCustomersQuery(options: Omit<Urql.UseQueryArgs<never, CustomersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomersQuery>({ query: CustomersDocument, ...options });
};
export const CustomerDocument = gql`
    query Customer($customerId: Int!) {
  customer(customerId: $customerId) {
    id
    fullName
    location
    about
    email
    instagram
    appointments {
      id
      scheduledAt
      title
    }
    transactions {
      id
      total
      isPaid
      scheduledAt
      type
    }
    items {
      id
      title
      total
    }
    createdOn
    modifiedOn
  }
}
    `;

export function useCustomerQuery(options: Omit<Urql.UseQueryArgs<never, CustomerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomerQuery>({ query: CustomerDocument, ...options });
};
export const InvoicesDocument = gql`
    query Invoices {
  invoices {
    id
    total
    isReceived
    isPaid
    scheduledAt
    createdOn
    modifiedOn
  }
}
    `;

export function useInvoicesQuery(options: Omit<Urql.UseQueryArgs<never, InvoicesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InvoicesQuery>({ query: InvoicesDocument, ...options });
};
export const InvoiceDocument = gql`
    query Invoice($invoiceId: Int!) {
  invoice(invoiceId: $invoiceId) {
    id
    total
    isReceived
    isPaid
    scheduledAt
    transactions {
      id
      total
      isPaid
      scheduledAt
      type
    }
    items {
      id
      title
      total
    }
    createdOn
    modifiedOn
  }
}
    `;

export function useInvoiceQuery(options: Omit<Urql.UseQueryArgs<never, InvoiceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InvoiceQuery>({ query: InvoiceDocument, ...options });
};
export const ItemsDocument = gql`
    query Items {
  items {
    id
    title
    total
    customerId
  }
}
    `;

export function useItemsQuery(options: Omit<Urql.UseQueryArgs<never, ItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ItemsQuery>({ query: ItemsDocument, ...options });
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