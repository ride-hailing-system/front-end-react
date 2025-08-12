import { useLazyQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../graphql/apolloErrorFormatter";

export const useGraphQL = () => {
  const mutation = ({
    mutationStr,
    refetchStr,
    onSuccess,
    onError,
  }: {
    mutationStr: any;
    refetchStr?: any;
    onSuccess: (data: any) => void;
    onError?: () => void;
  }) => {
    const [runMutation, { loading }] = useMutation(mutationStr, {
      refetchQueries: refetchStr ? [refetchStr] : [],
      onCompleted: (data: any) => {
        onSuccess(data);
      },
      onError: (error: any) => {
        toast.error(ApolloErrorFormatter(error, true).toString());
        onError && onError();
      },
    });

    return { runMutation, loading };
  };

  const query = ({
    queryStr,
    onSuccess,
    onError,
  }: {
    queryStr: any;
    onSuccess: (data: any) => void;
    onError?: () => void;
  }) => {
    const [runQuery, { loading }] = useLazyQuery(queryStr, {
      fetchPolicy: "network-only",
      onCompleted: (data: any) => {
        onSuccess(data);
      },
      onError: (error: any) => {
        toast.error(ApolloErrorFormatter(error, true).toString());
        onError && onError();
      },
    });

    return { runQuery, loading };
  };

  return { mutation, query };
};
