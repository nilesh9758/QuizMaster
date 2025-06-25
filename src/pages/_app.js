// /pages/_app.js
import { PointsProvider } from "@/context/PointContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <PointsProvider>
      <Component {...pageProps} />
    </PointsProvider>
  );
}
