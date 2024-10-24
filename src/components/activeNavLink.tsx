import { NavLink } from "react-router-dom";

export const HeaderNavLink = ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive
          ? "border-b-2 border-orange-400 text-black font-semibold h-full flex items-center"
          : "border-b-2 border-white text-gray-400 font-semibold h-full flex items-center"
      }
    >
      {title}
    </NavLink>
  );
};
