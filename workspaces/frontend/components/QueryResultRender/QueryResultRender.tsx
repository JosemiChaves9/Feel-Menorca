import { QueryResult } from "@apollo/client";

export interface QueryResultsObject {
  dataQuery: QueryResult;
  dataKey: string;
}

interface Props {
  queryResults: QueryResultsObject[];
  children: (data: any) => JSX.Element;
}

export const QueryResultRender = ({ queryResults, children }: Props) => {
  const isLoading = queryResults.some(({ dataQuery }) => dataQuery.loading);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const hasErrors = queryResults.filter(({ dataQuery }) => dataQuery.error);

  if (!!hasErrors.length) {
    return (
      <>
        {hasErrors.map(({ dataQuery }) => (
          <p>Error: {dataQuery.error.message}</p>
        ))}
      </>
    );
  }

  return children(
    queryResults.map(({ dataQuery, dataKey }) => dataQuery.data[dataKey])
  );
};
