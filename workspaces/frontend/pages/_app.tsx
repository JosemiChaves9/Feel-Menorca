import "../styles/globals.scss";
import { UserProvider } from "../components/UserProvider/UserProvider";
import { client } from "../services/ApolloConnection";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
