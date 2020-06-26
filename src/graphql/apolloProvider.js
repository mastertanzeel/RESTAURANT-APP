import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error';
import { getToken, deleteToken } from '../services/token';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const errorLink = onError(({ graphQLErrors, operation, response, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError && networkError.statusCode === 401) {
		// If token is unauthorized graphQL returns 401.
		// Do logic here to logout user and remove token and state or request a new token.
    deleteToken();
  }
});

const link = ApolloLink.from([
  authLink,
  errorLink,
  httpLink
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: false //Removes unwanted __typename.
  })
});

// HOC apollo provider.
export default function apolloProvider({ children }) {
  return (
    <ApolloProvider client={client}>
			{children}
    </ApolloProvider>
  )
}