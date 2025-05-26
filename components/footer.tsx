import Link from "next/link"
import { Hammer, Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SHIVSHAKTI</h3>
                <p className="text-sm text-gray-400">Precision Works Pvt Ltd</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Providing reliable labor services for construction, industrial, and logistics needs. Your trusted partner
              for skilled and unskilled workforce solutions across India.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:+919309160690" className="text-gray-300 hover:text-white transition-colors">
                    +91 9309160690
                  </a>
                  <span className="text-gray-500 mx-2">|</span>
                  <a href="tel:+916392286456" className="text-gray-300 hover:text-white transition-colors">
                    +91 6392286456
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:ssppl24consultant@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  ssppl24consultant@gmail.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>Amar Jyoti Apartment, Flat no-5, S.No-99</p>
                  <p>Telco Road, Yashwantnagar, Pimpri</p>
                  <p>Pune - 411018, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>Home</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>About Us</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>Services</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/client"
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>Our Clients</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>Contact</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>• Construction Labor</li>
              <li>• Industrial Workers</li>
              <li>• Loading & Unloading</li>
              <li>• Skilled Technicians</li>
            </ul>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="h-4 w-4 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Business Hours</h4>
              </div>
              <div className="text-xs text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Emergency Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Shiv Shakti Precision Works Pvt Ltd. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <span>GST Registered</span>
              <span>ISO Certified</span>
              <span>Labor Law Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
