"use client";

import Image from "next/image";
import { colors } from "../design-system/colors";
import { AiFillLinkedin, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: colors.primary[300] }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-start">
              <div className="mr-4">
                <Image src="/logo-pelindo.png" alt="Pelindo" width={120} height={48} style={{ filter: "brightness(0) invert(1)" }} />
              </div>
            </div>
            <p className="mt-4 text-sm text-indigo-100">Digital transformation for more efficient and professional contract management.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="text-sm space-y-3 text-white">
              <li className="flex items-center">
                <FiPhone className="mr-3" /> <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3" /> <span>info@ilcs.co.id</span>
              </li>
              <li className="flex items-center">
                <FiMapPin className="mr-3" /> <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="text-sm space-y-2 text-indigo-100">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="text-sm space-y-2 text-indigo-100">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-600 mt-8 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-indigo-100">© {new Date().getFullYear()} PT Indonesia Logistic and Cargo Services. All rights reserved.</div>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:opacity-90">
                <AiFillLinkedin size={18} />
              </a>
              <a href="#" className="text-white hover:opacity-90">
                <AiOutlineTwitter size={18} />
              </a>
              <a href="#" className="text-white hover:opacity-90">
                <AiFillInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
