import AddPharmacyPromo from "@/components/AddPharmacyPromo";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/Marquee";
import MedicineNearestStores from "@/components/MedicineNearestStores";
import PromoBanners from "@/components/PromoBanners";
import Reviews from "@/components/Reviews";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <PromoBanners />
      <MedicineNearestStores />
      <AddPharmacyPromo />
      <MarqueeSection />
      <Reviews />
    </div>
  );
}
