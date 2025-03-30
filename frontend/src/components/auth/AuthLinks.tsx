import { usePathname } from "next/navigation";

interface AuthLinksProps {
  location?: boolean;
}

export default function AuthLinks({ location }: AuthLinksProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div className="flex flex-col items-center gap-3.5 text-center text-[#f1f1f1] text-sm md:flex-row md:justify-center">
      <a
        href="/register"
        className={`rounded-[60px] border px-8 py-3 bg-inherit ${
          isHomePage || location
            ? "border-[rgba(241,241,241,0.5)] text-white"
            : "text-black border-black"
        }`}
      >
        Register
      </a>
      <a
        href="/login"
        className={`underline ${
          !isHomePage ? (location ? "text-white" : "text-black") : ""
        }`}
      >
        Login
      </a>
    </div>
  );
}
