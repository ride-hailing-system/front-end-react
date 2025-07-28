import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { client } from "./graphql/client";

import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "./context/userContext.tsx";
import { Toaster } from "react-hot-toast";
import { ConfirmationModalProvider } from "./context/confirmationModalContext.tsx";
import { LoadingProvider } from "./context/loadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4a5565",
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
          <ConfirmationModalProvider>
            <LoadingProvider>
              <Toaster />
              <App />
            </LoadingProvider>
          </ConfirmationModalProvider>
        </UserProvider>
      </ApolloProvider>
    </ConfigProvider>
  </StrictMode>
);
