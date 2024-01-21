import Theme from "@/context/FontContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { CommonAPiContextProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "arial",
          },
        }}
      />
      <CommonAPiContextProvider>
        <Component {...pageProps} />
      </CommonAPiContextProvider>
    </Theme>
  );
}

export default MyApp;
