// src\app\(global)\contact\page.tsx
"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Users, Award, Heart } from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Constants for easy management
const CONTACT_INFO = {
  phone: '011-23075126',
  telefax: '011-23075226',
  email: 'npcindia@paralympicindia.com',
  correspondenceOffice: {
    name: 'Correspondence Office',
    address: 'Jaisalmer House, 26 Mansingh Road, New Delhi - 110011 (India)'
  },
  registeredOffice: {
    name: 'Registered Office Address',
    address: '28, Sports Authority of Karnataka Building, Gate no. 2, Sree Kanteerava Stadium, Kasturba Road, Bengaluru 560001 (India)'
  }
};

const TEAM_MEMBERS = [
  { name: 'Mr. Rahul Swami', designation: 'Chief Executive Officer', email: 'ceo@paralympicindia.com' },
  { name: 'Col Amrik Singh', designation: 'Chief Administrator', email: 'cao@paralympicindia.com' },
  { name: 'Mr. Manish Rana', designation: 'Director Sports Development and Performance', email: 'director.performance@paralympicindia.com' },
  { name: 'Mr. Vivek Saini', designation: 'Director Sports Operations And Management', email: 'director.sportsops@paralympicindia.com' },
  { name: 'Mr. Shubham Arya', designation: 'Director Marketing', email: 'director.marketing@paralympicindia.com' },
  { name: 'Ms. Parul Mahajan Oberoi', designation: 'Chief Brand and Communication Officer', email: 'communication@paralympicindia.com' },
  { name: 'Mr. Ravi Kumar', designation: 'Accounts Officer', email: 'accounts@paralympicindia.com' },
  { name: 'Mr. Satyanarayana', designation: 'Chairman Para - Athletics', email: 'chairmanparaathletics@paralympicindia.com' },
  { name: 'Mr. Jitender Pal Singh', designation: 'Chairman Para - Powerlifting', email: 'chairmanparapowerlifting@paralympicindia.com' },
  { name: 'Mr. Jaiprakash Nautiyal', designation: 'Chairman Para - Shooting', email: 'chairmanparashooting@paralympicindia.com' },
  { name: 'Mr. Virender Kumar Dabas', designation: 'Chairman Para - Swimming', email: 'chairmanparaswimming@paralympicindia.com' }
];

// Header Component
const ContactHeader = () => (
  <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
      <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
        We&apos;re here to support Paralympic sports in India. Reach out to us for any queries, partnerships, or information.
      </p>
    </div>
  </div>
);

// Quick Contact Component
const QuickContact = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Contact Information</h2>
        <p className="text-lg text-gray-600">Get in touch with us through multiple channels</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone & Fax</h3>
          <p className="text-gray-600 mb-2">Phone: <a href={`tel:${CONTACT_INFO.phone}`} className="text-blue-600 hover:underline">{CONTACT_INFO.phone}</a></p>
          <p className="text-gray-600">Telefax: {CONTACT_INFO.telefax}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-600">
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-green-600 hover:underline break-all">
              {CONTACT_INFO.email}
            </a>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Hours</h3>
          <p className="text-gray-600">Monday - Friday</p>
          <p className="text-gray-600">9:00 AM - 6:00 PM IST</p>
        </div>
      </div>
    </div>
  </div>
);

// Office Addresses Component
const OfficeAddresses = () => (
  <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Office Locations</h2>
        <p className="text-lg text-gray-600">Visit us at our offices across India</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{CONTACT_INFO.correspondenceOffice.name}</h3>
              <p className="text-gray-600 leading-relaxed">{CONTACT_INFO.correspondenceOffice.address}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start mb-4">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{CONTACT_INFO.registeredOffice.name}</h3>
              <p className="text-gray-600 leading-relaxed">{CONTACT_INFO.registeredOffice.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Team Directory Component
const TeamDirectory = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
        <p className="text-lg text-gray-600">Connect directly with our dedicated team members</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">{member.designation}</p>
            <a 
              href={`mailto:${member.email}`} 
              className="text-blue-600 hover:underline text-sm break-all"
            >
              {member.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add form validation and submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
          <p className="text-lg text-gray-600">Have a question or want to get involved? We&apos;d love to hear from you!</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="athlete">Athlete Support</option>
                  <option value="media">Media & Press</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Support Section Component
const SupportSection = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Can Help</h2>
        <p className="text-lg text-gray-600">Discover the various ways we support Paralympic sports and athletes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Athlete Development</h3>
          <p className="text-gray-600">Comprehensive support for Paralympic athletes including training, coaching, and performance enhancement programs.</p>
        </div>
        
        <div className="text-center p-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Engagement</h3>
          <p className="text-gray-600">Building awareness and promoting Paralympic sports across communities to inspire the next generation of athletes.</p>
        </div>
        
        <div className="text-center p-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Partnership & Sponsorship</h3>
          <p className="text-gray-600">Collaborating with organizations and sponsors to create opportunities and support for Paralympic sports in India.</p>
        </div>
      </div>
    </div>
  </div>
);

// Main Contact Us Page Component
const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <ContactHeader />
      <QuickContact />
      <OfficeAddresses />
      <TeamDirectory />
      {/* <ContactForm /> */}
      <SupportSection />
      <Footer/>
    </div>
  );
};

export default ContactUsPage;