import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img className="h-8 w-8" src="./logo.png" alt="Gather Up Logo" />
              <span className="ml-2 text-xl font-bold text-white">
                Gather Up
              </span>
            </div>
            <p className="text-gray-400">
              Connecting people through memorable events. Discover, create, and
              share experiences that matter.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Add Event
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  My Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Event Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tech Conferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Music Festivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sports Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community Meetups
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                <span>123 Event Street, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <a
                  href="mailto:info@gatherup.com"
                  className="hover:text-white transition-colors"
                >
                  info@gatherup.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <a
                  href="tel:+11234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Gather Up. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
