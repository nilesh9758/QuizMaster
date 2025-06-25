// pages/_app.js
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
//import WatermarkBackground from "@/components/WatermarkBackground";
import { PointsProvider } from "@/context/PointContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <PointsProvider>
            <Component {...pageProps} />
          </PointsProvider>
        </main>
        <Footer />
      </div>
  );
}
