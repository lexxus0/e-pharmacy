import Marquee from "react-fast-marquee";
import { PiLightningBold } from "react-icons/pi";

export default function MarqueeSection() {
  return (
    <section className="container mb-20 overflow-hidden md:mb-30">
      <Marquee gradient={false} speed={45}>
        <span className="mx-4 font-semibold text-base flex gap-1.5 items-center xxl:mx-10">
          <PiLightningBold className="text-[#59b17a]" /> Take user orders from
          online
        </span>
        <span className="mx-4 font-semibold text-base flex gap-1.5 items-center xxl:mx-10">
          <PiLightningBold className="text-[#59b17a]" /> Create your shop
          profile
        </span>
        <span className="mx-4 font-semibold text-base flex gap-1.5 items-center xxl:mx-10">
          <PiLightningBold className="text-[#59b17a]" /> Manage your store
        </span>
        <span className="mx-4 font-semibold text-base flex gap-1.5 items-center xxl:mx-10">
          <PiLightningBold className="text-[#59b17a]" /> Get more orders
        </span>
        <span className="mx-4 font-semibold text-base flex gap-1.5 items-center xxl:mx-10">
          <PiLightningBold className="text-[#59b17a]" /> Storage shed
        </span>
      </Marquee>
    </section>
  );
}
