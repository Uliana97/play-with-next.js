import type { AppProps } from "next/app";

import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-provider";

import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
