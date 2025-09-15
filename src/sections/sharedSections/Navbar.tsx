import { useEffect, useState, type JSX, type MouseEvent } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../components/sharedComponents/Logo";
import X from "../../svg/X";
import WavyBackdrop from "../../svg/WavyBackdrop";
import LightDarkBtn from "../../components/kit/LightDarkBtn";
import { BANNER_PATH } from "../../svg/Paths";

type NavItem = {
  name: string;
  path: string;
};

const navLinks: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Properties", path: "/properties" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    toggleMenu();
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    const baseStyles =
      "text-White xl:py-3.5 md:py-3 transition-all ease-in-out duration-1000";
    const activeStyles = "bg-Grey-08 border-Grey-15 md:px-5 xl:px-6 rounded-lg";
    const inactiveStyles = "border-Grey-10";

    return isActive
      ? `${baseStyles} ${activeStyles}`
      : `${baseStyles} ${inactiveStyles}`;
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Dismissible Top Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 w-full px-4 lg:px-8 bg-Grey-10 border-b border-Grey-15 z-[1100] h-[49px] xl:h-[63px] flex items-center overflow-hidden">
          <div className="relative w-full h-full text-center flex">
            <div className="absolute inset-0 w-[300%] -left-[100%] md:w-[110%] h-[1150%] -top-[410%] md:-left-[5%] object-cover">
              <WavyBackdrop paths={BANNER_PATH} />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full xl:text-lg md:text-sm xs:text-[12px] pr-6.5 text-[10px]">
              <span className=" text-White xl:pr-2.5 pr-1.5">
                ✨Discover Your Dream Property with Estatein
              </span>
              <Link
                to="/properties"
                className="underline text-White hover:text-Purple-75 transition-colors duration-200 cursor-pointer"
              >
                Learn More
              </Link>
            </div>
            <button
              aria-label="Close banner"
              onClick={() => setShowBanner(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-White hover:text-Purple-75 rounded-full w-6.5 xl:w-8 h-6.5 xl:h-8 flex items-center justify-center bg-White/10"
            >
              <X className="w-[9px] h-[9px] xl:w-3 xl:h-3 text-inherit" />
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed md:hidden top-0 left-0 w-screen h-screen bg-Grey-10 opacity-60 z-40"
          onClick={handleOverlayClick}
        />
      )}

      <nav
        className={`fixed left-0 w-full xl:h-[99px] md:h-[77px] z-[1000] flex justify-between items-center px-4 md:px-[5.5555%] xl:px-[8.4375%] xl:py-0 md:py-0 py-5 bg-Grey-10 shadow transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
          showBanner ? "top-[49px] xl:top-[63px]" : "top-0"
        }`}
      >
        {/* Logo */}
        <Logo />

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex gap-6 xl:text-lg items-center absolute left-1/2 transform -translate-x-1/2" data-aos="fade-up">
          {navLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={navLinkStyles}
              onClick={scrollTop}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Contact Link (Desktop) */}
        <div className="hidden md:flex items-center gap-4 w-max">
          {!isMenuOpen && <LightDarkBtn />}
          <NavLink
            to="/contact"
            className={({ isActive }: { isActive: boolean }) =>
              `${
                isActive ? "text-white bg-Purple-60" : "xl:text-lg text-White"
              } xl:py-4 xl:px-6 md:py-3.5 md:px-5 rounded-lg border border-Grey-15 hover:bg-gradient-to-br hover:from-40%
              hover:from-Purple-75 hover:via-50% hover:via-Purple-90 hover:to-70% hover:to-Purple-75
              dark:hover:from-Purple-65/65 dark:hover:via-Purple-75 dark:hover:to-Purple-65/65 
                bg-[length:200%_200%] bg-[position:0%_0%] transition-[background-position] duration-500 ease-in-out hover:bg-[position:100%_100%]`
            }
            onClick={scrollTop}
          >
            Contact Us
          </NavLink>
        </div>

        <div className="flex items-center gap-4 justify-end w-max md:hidden">
          <LightDarkBtn />
          {/* Hamburger Icon (Mobile) */}
          <div
            className="flex justify-center items-center w-7 rounded-full cursor-pointer transition-all duration-300"
            onClick={toggleMenu}
          >
            <div className="w-[21px] h-[14px] flex flex-col justify-between items-center">
              <span
                className={`block w-full h-[2px] rounded-full transition-all duration-300 ${
                  isMenuOpen
                    ? "rotate-45 translate-y-[6px] bg-White"
                    : "bg-White"
                }`}
              />
              <span
                className={`block w-full h-[2px] rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "bg-White"
                }`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isMenuOpen
                    ? "rotate-[-45deg] -translate-y-[6px] w-full bg-White"
                    : "w-[54%] self-end bg-White"
                }`}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed right-0 w-1/2 bg-Grey-10 z-50 transform transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] md:hidden ${
          showBanner
            ? "top-[49px] xl:top-[63px] h-[calc(100%-49px)] xl:h-[calc(100%-63px)]"
            : "top-0 h-screen"
        } ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mt-[68.58px] flex flex-col items-start">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `w-full p-5 text-White ${
                  isActive ? "border-l-2 border-Purple-75 font-semibold" : ""
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
