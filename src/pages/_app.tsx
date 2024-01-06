import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
