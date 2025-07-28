import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', 
  credentials: 'include',
});

export const client = new ApolloClient({
  uri: import.meta.env.DEV
    ? 'http://localhost:4000/graphql'
    : 'http://localhost:4000/graph',
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
