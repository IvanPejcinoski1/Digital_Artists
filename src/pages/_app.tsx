import "src/styles/globals.css";
import "src/styles/styling.css";

import type { AppProps } from "next/app";
import Navbar from "src/components/Navbar";
import { CartProvider } from "../../src/context/CartContext";
import Footer from "src/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </>
  );
}
