import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createPerson: Person;
};


export type MutationCreatePersonArgs = {
  name: Scalars['String']['input'];
};

export type PeopleConnection = {
  __typename?: 'PeopleConnection';
  items: Array<Person>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  people?: Maybe<PeopleConnection>;
  person?: Maybe<Person>;
};


export type QueryPeopleArgs = {
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};

export type GetPersonQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', id: string, name: string } | null };

export type CreatePersonMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson: { __typename?: 'Person', id: string, name: string } };

export type GetPeopleQueryVariables = Exact<{
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPeopleQuery = { __typename?: 'Query', people?: { __typename?: 'PeopleConnection', nextToken?: string | null, items: Array<{ __typename?: 'Person', id: string, name: string }> } | null };


export const GetPersonDocument = `
    query GetPerson($id: ID!) {
  person(id: $id) {
    id
    name
  }
}
    `;
export const useGetPersonQuery = <
      TData = GetPersonQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPersonQueryVariables,
      options?: UseQueryOptions<GetPersonQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPersonQuery, TError, TData>(
      {
    queryKey: ['GetPerson', variables],
    queryFn: fetcher<GetPersonQuery, GetPersonQueryVariables>(client, GetPersonDocument, variables, headers),
    ...options
  }
    );
useGetPersonQuery.document = GetPersonDocument;


useGetPersonQuery.getKey = (variables: GetPersonQueryVariables) => ['GetPerson', variables];


export const useInfiniteGetPersonQuery = <
      TData = GetPersonQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPersonQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPersonQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPersonQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetPersonQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetPerson.infinite', variables],
      queryFn: (metaData) => fetcher<GetPersonQuery, GetPersonQueryVariables>(client, GetPersonDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    );


useInfiniteGetPersonQuery.getKey = (variables: GetPersonQueryVariables) => ['GetPerson.infinite', variables];


useGetPersonQuery.fetcher = (client: GraphQLClient, variables: GetPersonQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPersonQuery, GetPersonQueryVariables>(client, GetPersonDocument, variables, headers);
export const CreatePersonDocument = `
    mutation CreatePerson($name: String!) {
  createPerson(name: $name) {
    id
    name
  }
}
    `;
export const useCreatePersonMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePersonMutation, TError, CreatePersonMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePersonMutation, TError, CreatePersonMutationVariables, TContext>(
      {
    mutationKey: ['CreatePerson'],
    mutationFn: (variables?: CreatePersonMutationVariables) => fetcher<CreatePersonMutation, CreatePersonMutationVariables>(client, CreatePersonDocument, variables, headers)(),
    ...options
  }
    );
useCreatePersonMutation.getKey = () => ['CreatePerson'];

useCreatePersonMutation.fetcher = (client: GraphQLClient, variables: CreatePersonMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePersonMutation, CreatePersonMutationVariables>(client, CreatePersonDocument, variables, headers);
export const GetPeopleDocument = `
    query GetPeople($nextToken: String) {
  people(nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
    `;
export const useGetPeopleQuery = <
      TData = GetPeopleQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPeopleQueryVariables,
      options?: UseQueryOptions<GetPeopleQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPeopleQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPeople'] : ['GetPeople', variables],
    queryFn: fetcher<GetPeopleQuery, GetPeopleQueryVariables>(client, GetPeopleDocument, variables, headers),
    ...options
  }
    );
useGetPeopleQuery.document = GetPeopleDocument;


useGetPeopleQuery.getKey = (variables?: GetPeopleQueryVariables) => variables === undefined ? ['GetPeople'] : ['GetPeople', variables];


export const useInfiniteGetPeopleQuery = <
      TData = GetPeopleQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPeopleQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPeopleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPeopleQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetPeopleQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPeople.infinite'] : ['GetPeople.infinite', variables],
      queryFn: (metaData) => fetcher<GetPeopleQuery, GetPeopleQueryVariables>(client, GetPeopleDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    );


useInfiniteGetPeopleQuery.getKey = (variables?: GetPeopleQueryVariables) => variables === undefined ? ['GetPeople.infinite'] : ['GetPeople.infinite', variables];


useGetPeopleQuery.fetcher = (client: GraphQLClient, variables?: GetPeopleQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPeopleQuery, GetPeopleQueryVariables>(client, GetPeopleDocument, variables, headers);