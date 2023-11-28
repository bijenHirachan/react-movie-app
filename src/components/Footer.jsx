import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-primary text-beige flex flex-col items-center p-8 gap-8">
      <ul className="flex flex-col items-center gap-1 sm:flex-row sm:gap-8 font-semibold text-sm">
        <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
          Terms of use
        </li>
        <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
          Privacy Policy
        </li>
        <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
          About
        </li>
        <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
          Blog
        </li>
        <li className="hover:text-tertiary transition-all delay-75 cursor-pointer">
          FAQ
        </li>
      </ul>

      <p className="text-sm text-center text-beige">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
        possimus ad, modi quia ut fugiat ipsa pariatur, culpa iure consequatur
        ex dolorem, molestias vel vero maiores. Sequi unde tempora aliquid
        ratione, eaque cupiditate eos.
      </p>

      <ul className="flex gap-8">
        <li>
          <FaFacebookF
            size={22}
            className="hover:text-tertiary cursor-pointer transition-all delay-75"
          />
        </li>
        <li>
          <FaInstagram
            size={22}
            className="hover:text-tertiary cursor-pointer transition-all delay-75"
          />
        </li>
        <li>
          <FaTwitter
            size={22}
            className="hover:text-tertiary cursor-pointer transition-all delay-75"
          />
        </li>
        <li>
          <FaLinkedin
            size={22}
            className="hover:text-tertiary cursor-pointer transition-all delay-75"
          />
        </li>
      </ul>
    </div>
  );
};

export default Footer;
