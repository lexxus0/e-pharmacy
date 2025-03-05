import mobImg from "@/public/home/medicinepromo.png";
import tabImg from "@/public/home/tabmedicinepromo.png";
import Image from "next/image";

export default function AddPharmacyPromo() {
  return (
    <section className="container text-[#f1f1f1] mb-10 md:mb-16">
      <div className="green rounded-4xl p-5 md:px-12 md:py-10 xxl:flex xxl:px-20">
        <div className="xxl:flex xxl:flex-col">
          <h2 className="tracking-[-0.01em] !text-left my-5 md:pt-16 md:pb-6 xxl:pt-0">
            Add the medicines you need online now
          </h2>
          <p className="text-sm mb-10 md:text-base">
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through our online
            platform.
          </p>
          <button
            type="button"
            className="rounded-[60px] border-[rgba(241,241,241,0.5)] border px-8 py-3 text-sm font-medium bg-inherit mb-10 md:px-[50px] md:leading-[125%] inline xxl:w-[190px] xxl:px-10"
          >
            Buy medicine
          </button>
        </div>
        <picture>
          <source srcSet={tabImg.src} media="(min-width: 768px)" />
          <source srcSet={mobImg.src} media="(max-width: 767px)" />
          <Image
            src={tabImg}
            alt="Girl looking at the medicine picture"
            className="mt-10 md:mt-20 xxl:mt-0"
          />
        </picture>
      </div>
    </section>
  );
}
