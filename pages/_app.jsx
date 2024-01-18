import Theme from "@/context/FontContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

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
      <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
