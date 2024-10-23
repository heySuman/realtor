import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white px-4 lg:p-0">
      <nav className="sm:w-full md:w-2/3 h-[50px] flex items-center justify-between mx-auto ">
        <Link to={"/"}>
          <img src="/logo.svg" alt="logo" className="w-[150px]" />
        </Link>
        <menu className="flex gap-5 items-center justify-center h-full">
          {[
            ["Home", "/"],
            ["Offers", "/offers"],
            ["Sign In", "/signin"],
          ].map(([title, url]) => (
            <NavLink
              to={url}
              key={title}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-400 text-black font-semibold h-full flex items-center"
                  : "border-b-2 border-white text-gray-400 font-semibold h-full flex items-center"
              }
            >
              {title}
            </NavLink>
          ))}
        </menu>
      </nav>
    </header>
  );
}
