import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { client } from "./graphql/client";

import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "#77DD77",
          // colorPrimaryActive: "#77DD77",
          // colorPrimaryTextActive: "#77DD77",
          // colorPrimaryTextHover: "#77DD77",
          // colorLink: "#77DD77",
          // colorFillSecondary: "#014737",
        },
      }}
    >
      <ApolloProvider client={client}>
        <UserProvider>
          <App />
        </UserProvider>
      </ApolloProvider>
    </ConfigProvider>
  </StrictMode>
);
