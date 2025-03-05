export default function PromoBanners() {
  const items = [
    { title: "Huge Sale", sale: "70%", action: "Show now", id: "1" },
    { title: "Secure delivery", sale: "100%", action: "Read more", id: "2" },
    { title: "Off", sale: "35%", action: "Show now", id: "3" },
  ];
  return (
    <section className="container mb-20 md:mb-30">
      <div className=" md:px-4">
        <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-7 xxl:justify-center">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-[#fdfdfd] pl-4.5 py-3.5 pr-auto rounded-2xl shadow-[0_-1px_14px_0_rgba(29,30,33,0.02)] md:pr-[50px] md:w-[321px]"
            >
              <div className="flex gap-3 items-center mb-3.5">
                <div className="rounded-full bg-[rgba(231,241,237,0.4)] px-5 py-3 size-[54px]">
                  <p className="font-medium text-2xl text-[#59b17a]">
                    {item.id}
                  </p>
                </div>
                <p className="font-medium text-base md:text-xl">{item.title}</p>
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-medium text-2xl">{item.sale}</p>
                <p className="text-xs text-[#93939a]">{item.action}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
