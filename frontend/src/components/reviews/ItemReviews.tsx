import { convertReviewDate } from "@/helpers/convertReviewDate";
import { GetReviewRating } from "@/helpers/getReviewRating";
import { IReviews } from "@/interfaces/interfaces";
import Image from "next/image";

interface ItemReviewsProps {
  reviews: IReviews[];
}

export default function ItemReviews({ reviews }: ItemReviewsProps) {
  return (
    <div>
      <ul className="flex flex-col gap-5">
        {reviews.map((review) => {
          return (
            <li
              key={review._id}
              className="border border-[#f1f1f1] rounded-[20px] px-7 py-3.5"
            >
              <div className="flex mb-3.5">
                <div className="flex gap-3">
                  <Image
                    src={review.avatar}
                    alt={`${review.name}'s picture`}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <div className="flex-col gap-1">
                    <p className="font-semibold text-base text-[#1d1e21] max-w-[138px] truncate md:max-w-full md:text-lg">
                      {review.name}
                    </p>
                    <p className="font-normal text-xs text-[rgba(29,30,33,0.6)]">
                      {convertReviewDate(review.date)}
                    </p>
                  </div>
                </div>
                <GetReviewRating score={review.score} />
              </div>
              <p className="text-sm text-[#6a6a6f] md:text-base">
                {review.testimonial}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
