import React from 'react';
import { Wallet, Facebook, Twitter, Instagram } from 'lucide-react';
import logo from '../../assets/iou_blue.png';

export function Footer() {
  return (
    <footer className="bg-white border-t">

      


      <div className="container mx-auto px-6 py-8 flex flex-col items-center">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 w-full text-center md:text-left">
          {/* Logo and Description */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <img src={logo} alt="IOU Logo" className="h-12" />
            </div>
            <p className="text-gray-600 text-center md:text-left">
              Because math is hard, and friendships are fragile..
            </p>
          </div>

          {/* Support Links */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4"> </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Privacy Policy</li>
              <li> </li>
              <li>Contact Us</li>
            </ul>
          </div>


          {/* Support Links */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4"> </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Terms of Service</li>
              <li> </li>
              <li>About us</li>
            </ul>
          </div>


          {/* Connect Links */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Facebook className="text-gray-600 hover:text-middle-blue cursor-pointer" size={30} />
              <Twitter className="text-gray-600 hover:text-middle-blue cursor-pointer" size={30} />
              <Instagram className="text-gray-600 hover:text-middle-blue cursor-pointer" size={30} />
              
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t pt-8 w-full text-center">
          <p className="text-gray-600">© 2025 IOU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
