import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Inter, Jost,Outfit } from "next/font/google";
import Providers from "../utils/provider";
import Navbar from "../components/navbar/Navbar";
import { ReduxProvider } from "../redux/provider";
import Footer from "../components/footer/Footer";
import NewsLetter from "../components/newsletter/NewsLetter";
import FeaturesHeader from "../components/navbar/categories/FeaturesHeader";
import GoToTop from "../components/GoToTop/GoToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shein Style",
  description: "Generated by create next app",
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable:"--font-outfit"

});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      {/* <link
        rel="stylesheet"
        type="text/css"
        href="../assets/flaticons/flaticon_farmacy.css"
      /> */}
      <script async src="//www.instagram.com/embed.js"></script>
      <body className="font-outfit relative">
        {/* <NavSearch/> */}
        <ReduxProvider>
          <Providers>
            {/* <SearchHeader/> */}
            <Navbar />
            <FeaturesHeader/>
            {children}
            {/* <NewsLetter /> */}
            <Footer />
            <GoToTop className='hidden sm:flex'/>
            <ToastContainer />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
