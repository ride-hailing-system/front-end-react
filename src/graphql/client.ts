import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
const uri: string = import.meta.env.DEV
    ? 'http://localhost:4000/graphql'
    : 'https://ride-hailing-backend.vercel.app/graphql'

const httpLink = new HttpLink({
  uri: uri, 
  credentials: 'include',
});

export const client = new ApolloClient({
  uri: uri,
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
