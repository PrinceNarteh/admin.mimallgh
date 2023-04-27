import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Poppins } from "next/font/google";
import { Layout } from "@/components";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <div className={`${poppins.className} bg-gray-800`}>
      <SessionProvider session={session}>
        {router.pathname.startsWith("/auth") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
      <Toaster />
    </div>
  );
}
