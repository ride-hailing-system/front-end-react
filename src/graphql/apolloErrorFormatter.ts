import { ApolloError } from '@apollo/client';
import { message } from 'antd';

export const ApolloErrorFormatter = (
  error: any,
  returnString: boolean = false
) => {
  let result: string;
  if (error instanceof ApolloError) {
    if (error.graphQLErrors.length > 0) {
      result = error.graphQLErrors.map((err) => err.message).join(', ');
      return returnString ? result : message.error(result);
    } else if (error.networkError) {
      result = 'Network error occurred: ' + error.networkError.message;
      return returnString ? result : message.error(result);
    } else {
      result = 'An unexpected error occurred';
      return returnString ? result : message.error(result);
    }
  } else {
    result = 'An unexpected error occurred';
    return returnString ? result : message.error(result);
  }
};
