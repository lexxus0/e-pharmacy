import { usePathname } from "next/navigation";

export default function AuthLinks() {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";
  return (
    <div className="flex flex-col items-center gap-3.5 text-center text-[#f1f1f1] text-sm md:flex-row md:justify-center">
      <a
        href="/register"
        className={`rounded-[60px] border px-8 py-3 bg-inherit ${
          isHomePage
            ? "border-[rgba(241,241,241,0.5)] text-white"
            : "text-black border-black"
        }`}
      >
        Register
      </a>
      <a
        href="/login"
        className={`underline ${!isHomePage ? "text-black" : ""}`}
      >
        Login
      </a>
    </div>
  );
}
