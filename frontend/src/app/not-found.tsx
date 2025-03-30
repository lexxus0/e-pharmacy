import pill from "@/public/authpill.webp";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-9xl font-bold flex">
        4
        <Image
          src={pill}
          alt="Decorative pill image"
          width={120}
          height={105}
        />
        4
      </h1>
      <p className="text-3xl mt-4">Page not found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-pink-400 rounded-3xl text-[#F0F0F0]"
      >
        To home page
      </Link>
    </div>
  );
}
