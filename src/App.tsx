import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import {
  useGetPersonQuery,
  useCreatePersonMutation,
  useInfiniteGetPeopleQuery,
} from "./gql/__generate__";

const queryClient = new QueryClient();
const graphqlClient = new GraphQLClient("/graphql");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

function Content() {
  const { data, isLoading } = useGetPersonQuery(graphqlClient, {
    id: "1",
  });

  const { data: createdData, mutate } = useCreatePersonMutation(
    graphqlClient,
    {}
  );

  const {
    data: infiniteData,
    isLoading: isInfiniteLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetPeopleQuery(
    graphqlClient,
    { nextToken: "" },
    {
      initialPageParam: "",
      getNextPageParam: (lastPage) => {
        if (!lastPage.people?.nextToken) return null;
        return {
          nextToken: lastPage.people?.nextToken,
        };
      },
    }
  );

  return (
    <>
      <h3>Query</h3>
      <p>{isLoading && "loading....."}</p>
      <pre>{data && "data: " + JSON.stringify(data)}</pre>
      <br />
      <h3>Mutation</h3>
      <button onClick={() => mutate({ name: "Neil Chen" })}>
        create person
      </button>
      <pre>{createdData && "createdData: " + JSON.stringify(createdData)}</pre>
      <br />
      <h3>Infinite Query</h3>
      <p>{(isInfiniteLoading || isFetchingNextPage) && "loading....."}</p>
      <pre>
        {infiniteData &&
          "infiniteData: " + JSON.stringify(infiniteData, null, 2)}
      </pre>
      {hasNextPage && (
        <button onClick={async () => fetchNextPage()}>get next page</button>
      )}
    </>
  );
}

export default App;
