import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IceCreamSlider from "@/components/IceCreamSlider";
export default function Home() {
  return (
    <div className="h-screen overflow-hidden overflow md:hidden">
      <Header />
      <IceCreamSlider />
      <Footer/>
    </div>
  );
}
