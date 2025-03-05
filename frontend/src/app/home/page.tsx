import AddPharmacyPromo from "@/components/AddPharmacyPromo";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/Marquee";
import MedicineStores from "@/components/MedicineStores";
import PromoBanners from "@/components/PromoBanners";
import Reviews from "@/components/Reviews";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <PromoBanners />
      <MedicineStores />
      <AddPharmacyPromo />
      <MarqueeSection />
      <Reviews />
    </div>
  );
}
