import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
 import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#004672] text-white py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              src="/assets/Logo.svg"
              alt="MyVkard Logo"
              className="h-20 w-auto mb-4"
            />
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#004672] p-2 rounded-full hover:bg-gray-200 transition"
              >
                <FaFacebookF size={29} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram size={40} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaXTwitter size={40} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#004672] p-2 rounded-full hover:bg-gray-200 transition"
              >
                <FaLinkedinIn size={29} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold underline decoration-2 underline-offset-2 mb-4">
              QUICK LINKS
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                {/* <a
                  href="#"
                  className="hover:text-orange-400 no-underline transition-colors"
                >
                  ABOUT
                </a> */}

<Link to="/about">
  <button className="hover:text-orange-400 no-underline transition-colors">
    ABOUT
  </button>
</Link>


              </li>
              <li>
                {/* <a
                  href="#"
                  className="hover:text-orange-400 no-underline transition-colors"
                >
                  BLOG
                </a> */}

<Link to="/blog">
  <button className="hover:text-orange-400 no-underline transition-colors">
    BLOG
  </button>
</Link>

                
              </li>
              <li>
                {/* <a
                  href="#"
                  className="hover:text-orange-400 no-underline transition-colors"
                >
                  TERMS AND SERVICES
                </a> */}
<Link to="/terms-and-conditions">
  <button className="hover:text-orange-400 no-underline transition-colors">
    TERMS AND CONDITIONS
  </button>
</Link>

              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-4 font-semibold underline decoration-2 underline-offset-2">
              CONTACT US
            </h4>

            {/* Address */}
            <p className="text-sm mb-2 flex items-center justify-center sm:justify-start space-x-2">
              <FaLandmark className="text-white" />
              <span>100 Citi Bank Street, NY, USA</span>
            </p>

            {/* Email */}
            <p className="text-sm mb-2 flex items-center justify-center sm:justify-start space-x-2">
              <HiOutlineMail className="text-white" />
              <a
                href="mailto:support@myvkard.com"
                className="hover:text-orange-400 no-underline break-all transition-colors"
              >
                support@myvkard.com
              </a>
            </p>

            {/* Phone */}
            <p className="text-sm flex items-center justify-center sm:justify-start space-x-2">
              <HiOutlinePhone className="text-white" />
              <a
                href="tel:+12345678901"
                className="hover:text-orange-400 no-underline transition-colors"
              >
                +1-234-567-8901
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-sm">LEGAL: © 2025 MYVKARD. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
