"use client";

import { fetchReviews } from "@/store/reviews/operations";
import { selectReviews } from "@/store/reviews/selectors";
import { IReviews } from "@/interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Reviews() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchReviews()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const reviews = useAppSelector(selectReviews);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mb-18">
      <h2 className="mb-3.5 text-center">Reviews</h2>
      <p className="text-sm text-center text-[#93939a] mb-4 md:text-base md:mb-8">
        Search for Medicine, Filter by your location
      </p>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        loopAdditionalSlides={6}
        className="pb-10"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((review: IReviews) => (
          <SwiperSlide key={review._id} className="overflow-visible">
            <div className="bg-[#fdfdfd] px-4 pt-0 pb-10 rounded-3xl border border-[#f1f1f1] text-center max-w-md mx-auto mt-8.5 xxl:h-[200px]">
              <Image
                src={review.avatar}
                alt="Reviewer picture"
                width={64}
                height={64}
                className="rounded-full mx-auto mt-[-30px] mb-3.5"
              />
              <p className="text-lg font-medium mb-4">{review.name}</p>
              <p className="text-sm text-[#93939a]">{review.testimonial}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
