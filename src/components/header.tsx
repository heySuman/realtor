import { Link } from "react-router-dom";
import { HeaderNavLink } from "./activeNavLink";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

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
          ].map(([title, url]) => (
            <HeaderNavLink title={title} url={url} key={title} />
          ))}

          <HeaderNavLink title={pageState} url={"/profile"} />
        </menu>
      </nav>
    </header>
  );
}
