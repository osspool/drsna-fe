// import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/layout/navbar/navbar";

export default function HomeLayout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
