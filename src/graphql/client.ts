import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.DEV
    ? 'http://localhost:4000/graphql'
    : 'http://localhost:4000/graph',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
