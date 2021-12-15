import {ApolloClient, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';

const token = '<token-jwt>';

const authLink = setContext(() => {
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apollo = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: '<api-url>',
    }),
  ),
  cache: new InMemoryCache(),
});
