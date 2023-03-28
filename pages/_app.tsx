import type { AppProps } from "next/app";

import Layout from "@/components/layout/layout";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
