"use client";

import AddPharmacyPromo from "@/components/promo/AddPharmacyPromo";
import Hero from "@/components/layout/Hero";
import MarqueeSection from "@/components/promo/Marquee";
import PromoBanners from "@/components/promo/PromoBanners";
import MedicineNearestStores from "@/components/medicine/MedicineNearestStores";
import Reviews from "@/components/reviews/Reviews";
// import ChatWidget from "@/components/ChatWidget";
import ChatWidget from "chat-widget-itzeyz";

export default function HomePage() {
  return (
    <div>
      <ChatWidget />
      <Hero />
      <PromoBanners />
      <MedicineNearestStores />
      <AddPharmacyPromo />
      <MarqueeSection />
      <Reviews />
    </div>
  );
}
