import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import {
  useGetPersonQuery,
  useCreatePersonMutation,
  useInfiniteGetPersonQuery,
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

  const { data: infiniteData } = useInfiniteGetPersonQuery(graphqlClient, {
    id: "1",
  });

  return (
    <>
      <h3>Query</h3>
      <p>{isLoading && "loading....."}</p>
      <p>{data && "data: " + JSON.stringify(data)}</p>
      <br />
      <h3>Mutation</h3>
      <button onClick={() => mutate({ name: "Neil Chen" })}>
        create person
      </button>
      <p>{createdData && "createdData: " + JSON.stringify(createdData)}</p>
      <br />
      <h3>Infinite Query</h3>
      <p>
        {infiniteData &&
          "infiniteData: " + JSON.stringify(infiniteData, null, 2)}
      </p>
    </>
  );
}

export default App;
