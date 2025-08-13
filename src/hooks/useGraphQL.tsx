import { useLazyQuery, useMutation, type DocumentNode } from '@apollo/client';
import toast from 'react-hot-toast';
import { ApolloErrorFormatter } from '../graphql/apolloErrorFormatter';

type GraphQLQueryArgs = {
  queryStr: DocumentNode;
  onSuccess?: (data: any) => void;
  onError?: () => void;
};

export const useGraphQLQuery = ({
  queryStr,
  onSuccess,
  onError,
}: GraphQLQueryArgs) => {
  const [runQuery, { loading }] = useLazyQuery(queryStr, {
    fetchPolicy: 'network-only',
    onCompleted: onSuccess,
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
      onError?.();
    },
  });
  return { runQuery, loading };
};

type GraphQLMutationArgs = {
  mutationStr: DocumentNode;
  refetchStr?: DocumentNode;
  onSuccess?: (data: any) => void;
  onError?: () => void;
};

export const useGraphQLMutation = ({
  mutationStr,
  refetchStr,
  onSuccess,
  onError,
}: GraphQLMutationArgs) => {
  const [runMutation, { loading }] = useMutation(mutationStr, {
    refetchQueries: refetchStr ? [refetchStr] : [],
    onCompleted: onSuccess,
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
      onError?.();
    },
  });

  return { runMutation, loading };
};
