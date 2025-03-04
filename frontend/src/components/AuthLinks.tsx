export default function AuthLinks() {
  return (
    <div className="flex flex-col items-center gap-3.5 text-center text-[#f1f1f1] text-sm">
      <a
        href="/register"
        className="rounded-[60px] border-[rgba(241,241,241,0.5)] border px-8 py-3 bg-inherit"
      >
        Register
      </a>
      {/* <a
        href="/home"
        className="rounded-[60px] border-[rgba(241,241,241,0.5)] border px-7.5 py-3 bg-inherit"
      >
        Log out
      </a> */}
      <a href="/login" className="underline">
        Login
      </a>
    </div>
  );
}
