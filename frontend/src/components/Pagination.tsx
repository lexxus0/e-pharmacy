import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useMediaQuery } from "react-responsive";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isTablet = useMediaQuery({ minWidth: 768 });

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const pages: number[] = [];
  if (currentPage < totalPages) {
    pages.push(currentPage);
    pages.push(currentPage + 1);
    if (isTablet && currentPage + 2 <= totalPages) {
      pages.push(currentPage + 2);
    }
  } else {
    pages.push(currentPage - 1);
    pages.push(currentPage);
  }

  return (
    <div className="flex items-center justify-center mx-auto mb-22 md:mb-20">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className="rounded-full border border-gray-300 p-1.5 text-sm !mr-2 disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-full border border-gray-300 p-1.5 text-sm !mr-3 disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`rounded-full border border-gray-300  text-sm !mr-1 w-7 h-7 text-center font-bold ${
            page === currentPage
              ? "bg-yellow-500 text-white"
              : "bg-white text-black"
          }
          `}
        >
          {page}
        </button>
      ))}

      {currentPage + (isTablet ? 3 : 2) < totalPages && (
        <span className="mr-[11px] text-[#262626]">
          <p className="text-lg rounded-full border border-[rgba(38,38,38,0.2)] size-7.5 text-center">
            ...
          </p>
        </span>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`rounded-full border border-gray-300 p-1.5 text-sm !mr-2 disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-gray-400
           ${currentPage + (isTablet ? 3 : 2) < totalPages ? "" : "!ml-3"}
            
            `}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="rounded-full border border-gray-300 p-1.5 text-sm disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
}
