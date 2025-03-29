"use client";

import AddPharmacyPromo from "@/components/promo/AddPharmacyPromo";
import Hero from "@/components/layout/Hero";
import MarqueeSection from "@/components/promo/Marquee";
import PromoBanners from "@/components/promo/PromoBanners";
import MedicineNearestStores from "@/components/medicine/MedicineNearestStores";
import Reviews from "@/components/reviews/Reviews";

const metadata = {
  title: "E-Pharmacy — Online Pharmacy",
  description:
    "Order medicines, medical supplies, and accessories with delivery via E-Pharmacy.",
  keywords: "medicines, medical supplies, online pharmacy, medicine delivery",
};

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
