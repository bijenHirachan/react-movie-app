import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";
import logo from "../assets/logo.png";

const Header = () => {
  const navRef = useRef();

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (!query) return;

    navigate(`/search/${query}`);
  };

  const openSearchBar = () => {
    gsap.fromTo(
      navRef.current,
      {
        y: -160,
      },
      {
        duration: 1,
        y: 160,
      }
    );
  };

  const closeSearchBar = () => {
    gsap.fromTo(
      navRef.current,
      {
        y: 180,
      },
      {
        duration: 1,
        y: -180,
      }
    );
  };
  return (
    <div className="">
      <header className="fixed top-0  z-[500] opacity-90 w-full px-8 sm:px-16 md:px-24 xl:px-40 py-8 bg-primary flex  justify-between items-center">
        <Link to={"/"} className="text-tertiary font-[600] text-3xl">
          <img src={logo} alt="" className="h-6" />
        </Link>
        <ul className="flex gap-8 items-center font-semibold text-beige">
          <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
            <Link to={"/explore/movie"}>Movies</Link>
          </li>
          <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
            <Link to={"/explore/tv"}>TV</Link>
          </li>
          <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
            <HiOutlineSearch size={18} onClick={openSearchBar} />
          </li>
        </ul>
      </header>
      <form
        onSubmit={searchHandler}
        ref={navRef}
        className="flex gap-4 z-[600] fixed shadow-xl  top-[-180px] w-full  bg-secondary items-center justify-center p-16"
      >
        <input
          placeholder="Search a Movie or a TV show"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="w-4/6 sm:w-3/6 lg:w-2/6 h-10 border-none focus:outline-none px-4 py-2 rounded-full"
        />
        <HiOutlineSearch
          size={24}
          className="text-beige cursor-pointer hover:text-primary transition-all duration-75"
        />

        <AiOutlineClose
          onClick={closeSearchBar}
          size={24}
          className="text-beige absolute top-6 right-16 cursor-pointer hover:text-primary transition-all duration-75"
        />
      </form>
    </div>
  );
};

export default Header;
