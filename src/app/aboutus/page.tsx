"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Shield,
  Truck,
  CreditCard,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Nav from "../components/nav";
import Footer from "../components/footer";

const AboutUsPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const PolicySection = ({
    title,
    icon: Icon,
    children,
    sectionKey,
    id,
  }: any) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6" id={id}>
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-amber-700" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        {activeSection === sectionKey ? (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600" />
        )}
      </button>
      {activeSection === sectionKey && (
        <div className="px-6 py-4 text-gray-700 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div>
        <Nav />
      </div>
      <div className="relative bg-gradient-to-r via-orange-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Morning Brew</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Crafting exceptional coffee experiences while maintaining
            transparency and trust with our valued customers
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4">
                Morning Brew Pvt Ltd is a premium coffee company registered
                under the Companies Act, 1956. We are passionate about
                delivering the finest coffee experience to our customers across
                India.
              </p>
              <p className="text-gray-600 mb-6">
                Our services are available in selected areas of India, and we're
                committed to expanding our reach while maintaining the highest
                quality standards.
              </p>
              <div className="flex items-center space-x-2 text-amber-700">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">
                  Serving Premium Coffee Since Our Inception
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Office Address:</p>
                    <p className="text-gray-600">
                      IS 16 – 1601, URBTECH TRADE CENTRE
                      <br />
                      SECTOR-132, NOIDA, DIST – GAUTAM BUDDHA NAGAR
                      <br />
                      U.P., INDIA, PINCODE - 201301
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-amber-700" />
                  <span className="text-gray-600">
                    customercare@morningbrew.in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            Age Requirements
          </h3>
          <ul className="text-amber-700 space-y-1">
            <li>• You must be 18+ to make purchases independently</li>
            <li>
              • Ages 13-18 may use our website under parent/guardian supervision
            </li>
            <li>
              • All users must be legally capable of entering contracts under
              Indian Contract Act, 1872
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <PolicySection
            title="Privacy Policy"
            icon={Shield}
            sectionKey="privacy"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Information We Collect
                </h4>
                <p className="mb-2">
                  We collect information through various channels:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Through use of our website, stores, or events</li>
                  <li>Automatically via cookies, web logs, and beacons</li>
                  <li>
                    Provided during registration, purchases, and participation
                    in offers
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Types of Personal Data
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>
                    Basic information: Name, address, email, phone, date of
                    birth, gender
                  </li>
                  <li>
                    Account details: Login credentials, payment and billing
                    information
                  </li>
                  <li>
                    Purchase history, preferences, and contact details for
                    gifts/messages
                  </li>
                  <li>
                    User-generated content, social media information, and
                    geo-location data
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  How We Use Your Information
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Operate our website and deliver services</li>
                  <li>Process purchases, returns, and manage accounts</li>
                  <li>Improve services and develop new products</li>
                  <li>Communicate promotions, events, and offers</li>
                  <li>Tailor advertisements and administer loyalty programs</li>
                  <li>Fulfill legal obligations and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Your Rights
                </h4>
                <p className="text-gray-600">
                  You can contact us to update, access, or remove your personal
                  data. By using our site, you consent to data collection and
                  processing as outlined in this policy.
                </p>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            title="Shipping & Delivery"
            icon={Truck}
            sectionKey="shipping"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Delivery Timeline
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • Orders dispatched within 2 working days after payment
                  </li>
                  <li>• Maximum delivery time: 15 days (location dependent)</li>
                  <li>• Delivery hours: Monday-Saturday, 9 AM – 7 PM</li>
                  <li>• No deliveries on Sundays & public holidays</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Shipping Details
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Shipped via reputed national courier services</li>
                  <li>• Tracking details sent via email & SMS</li>
                  <li>
                    • Delays may occur due to weather, strikes, or courier
                    issues
                  </li>
                  <li>
                    • Group orders together to avoid multiple shipping fees
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Cash on Delivery (COD)
              </h4>
              <p className="text-amber-700">
                Available for orders between Rs. 100 – Rs. 1000, with a Rs. 50
                processing charge
              </p>
            </div>
          </PolicySection>

          <PolicySection
            title="Payment Methods"
            icon={CreditCard}
            sectionKey="payments"
            id="terms"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Accepted Payment Methods
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    "Credit Cards",
                    "Debit Cards",
                    "Net Banking",
                    "UPI",
                    "Digital Wallets",
                  ].map((method) => (
                    <div
                      key={method}
                      className="bg-amber-50 p-3 rounded-lg text-center text-sm font-medium text-amber-800"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Payment Issues?
                </h4>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>
                    • For unrecognized charges, check with family/business
                    associates first
                  </li>
                  <li>
                    • Report unauthorized charges within 30 days to
                    customercare@morningbrew.in
                  </li>
                  <li>
                    • For payment failures, retry after checking payment info
                    and internet connection
                  </li>
                  <li>
                    • If amount is debited, refund usually processed within 7
                    business days
                  </li>
                </ul>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            title="Returns & Exchanges"
            // id="terms"
            icon={RotateCcw}
            sectionKey="returns"
          >
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Return Conditions
                </h4>
                <ul className="text-blue-700 space-y-1">
                  <li>
                    • Returns accepted only for defective or damaged products
                  </li>
                  <li>• Must be initiated within 7 days of delivery</li>
                  <li>• Product must be unused and in original condition</li>
                  <li>• Only same item exchange is allowed</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Return Process
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>
                    Contact customercare@morningbrew.in with order number and
                    photos/videos
                  </li>
                  <li>A ticket number will be generated</li>
                  <li>We respond within 48 working hours</li>
                  <li>
                    After approval, self-courier the product to our address
                  </li>
                  <li>Customer bears return shipping charges</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Return Address
                </h4>
                <address className="text-gray-600 not-italic">
                  MORNING BREW PVT LTD
                  <br />
                  IS 16 – 1601, URBTECH TRADE CENTRE
                  <br />
                  SECTOR-132, NOIDA, DIST – GAUTAM BUDDHA NAGAR
                  <br />
                  U.P., INDIA, PINCODE - 201301
                </address>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            title="Refunds & Cancellations"
            icon={Phone}
            // id="terms"
            sectionKey="refunds"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Refund Process
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Processed after receiving returned products</li>
                  <li>• Credited to original payment source within 30 days</li>
                  <li>• COD orders refunded via cheque or IMPS</li>
                  <li>• Shipping charges are non-refundable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Cancellation Policy
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Allowed within 12 hours of placing order</li>
                  <li>
                    • Cannot cancel after dispatch/tracking info is shared
                  </li>
                  <li>• Contact customer care immediately for cancellations</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Late or Missing Refunds?
              </h4>
              <p className="text-yellow-700">
                Check your bank account first, then contact your bank. If still
                unresolved, email customercare@morningbrew.in
              </p>
            </div>
          </PolicySection>

          <PolicySection
            title="Terms & Conditions"
            icon={Shield}
            // id="terms"
            sectionKey="terms"
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Data Collection & Privacy
                </h4>
                <p className="text-gray-600 mb-2">
                  When you register or browse our website, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>
                    Your name, email, phone number, address, and postal code
                  </li>
                  <li>
                    Your age, gender, occupation, education, and browsing
                    behavior
                  </li>
                  <li>Cookies and data related to your use of the website</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Your Account Responsibilities
                </h4>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • You're responsible for keeping your login details safe
                    </li>
                    <li>• If you suspect misuse, inform us immediately</li>
                    <li>
                      • All information you provide must be true and up to date
                    </li>
                    <li>
                      • You may use the website on behalf of someone else only
                      if you have legal authority to do so
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    What You're Allowed To Do
                  </h4>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <ul className="space-y-1 text-green-700">
                      <li>
                        ✓ Access and use the website for personal,
                        non-commercial purposes
                      </li>
                      <li>✓ Browse and purchase our products</li>
                      <li>✓ Create an account and manage your profile</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    What You're NOT Allowed To Do
                  </h4>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <ul className="space-y-1 text-red-700">
                      <li>
                        ✗ Copy, reproduce, or modify content for commercial use
                      </li>
                      <li>
                        ✗ Use bots, scraping tools, or meta tags to exploit the
                        website
                      </li>
                      <li>
                        ✗ Frame or misuse our logos, trademarks, or content
                        without permission
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Pricing & Payment Terms
                </h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-blue-700">
                    <li>• All product prices are in Indian Rupees (INR)</li>
                    <li>
                      • Taxes and delivery charges will be shown at checkout
                    </li>
                    <li>
                      • Prices are current and subject to change without notice
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Your Commitments as a User
                </h4>
                <p className="text-gray-600 mb-2">
                  By using our website, you agree that:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>You will provide accurate information</li>
                  <li>
                    You are using the website at your own risk and discretion
                  </li>
                  <li>
                    If there's a delivery failure due to incorrect details,
                    you'll bear the extra cost
                  </li>
                  <li>
                    You'll follow all applicable laws while using the website
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Product Colors Disclaimer
                </h4>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-yellow-700">
                    We try our best to show accurate colors on our website, but
                    actual product colors may vary depending on your screen
                    display settings and device specifications.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  User-Generated Content Policy
                </h4>
                <p className="text-gray-600 mb-2">
                  If you upload or share any content on our platform:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • You grant us a royalty-free, worldwide license to use it
                    </li>
                    <li>
                      • You agree not to post anything illegal, offensive,
                      harmful, misleading, or that violates someone else's
                      rights
                    </li>
                    <li>
                      • We reserve the right to remove any content at our
                      discretion
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">
                  ⚠️ Important Notice
                </h4>
                <p className="text-red-700 text-sm">
                  Violation of any of these terms may lead to suspension of your
                  access to our website. Continued use of our website implies
                  acceptance of any updates to these terms and conditions.
                </p>
              </div>
            </div>
          </PolicySection>
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Intellectual Property & Copyright
          </h3>
          <p className="text-gray-600 mb-4">
            All content on our website—text, images, logos, software, layout—is
            owned by Morning Brew Pvt Ltd and protected under intellectual
            property laws. You may not use our brand, designs, or content
            without written permission.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">
              Copyright Infringement Contact:
            </h4>
            <div className="text-gray-600">
              <p className="font-medium">Mr. Raj Nandan Chandra</p>
              <p>Email: marketing@morningbrew.in</p>
              <p>Phone: +91 9667946833</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Need Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-amber-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600">customercare@morningbrew.in</p>
              <p className="text-sm text-gray-500 mt-1">
                Include your order number
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-amber-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600">Customer Manager</p>
              <p className="text-sm text-gray-500 mt-1">
                (Contact details to be updated)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-amber-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">
                URBTECH TRADE CENTRE
                <br />
                Noida, UP 201301
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUsPage;
