import Hero from "@/components/Hero";
import MedicineStores from "@/components/MedicineStores";
import PromoBanners from "@/components/PromoBanners";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <PromoBanners />
      <MedicineStores />
    </div>
  );
}
