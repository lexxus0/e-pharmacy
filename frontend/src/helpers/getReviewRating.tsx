import { useMediaQuery } from "react-responsive";
import { IoIosStar } from "react-icons/io";

interface ReviewRatingProps {
  score: number;
}

export const GetReviewRating: React.FC<ReviewRatingProps> = ({ score }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const maxScore = 5;

  return (
    <div className="flex gap-1 ml-auto md:mt-0">
      {isDesktop ? (
        <>
          {Array.from({ length: score }, (_, i) => (
            <IoIosStar key={i} className="text-orange-400 mt-[2px]" />
          ))}
          {Array.from({ length: maxScore - score }, (_, i) => (
            <IoIosStar key={`empty-${i}`} className="text-[#f1f1f1] mt-[2px]" />
          ))}
        </>
      ) : (
        <span className="text-orange-400 md:mt-0.5">
          <IoIosStar />
        </span>
      )}
      <p className="md:text-sm md:font-medium">{score}</p>
    </div>
  );
};
