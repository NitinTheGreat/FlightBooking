"use client"

import { motion } from "framer-motion"
import { Users, Globe, Award, Shield, Star, Check, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AboutPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    // Set page as loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "With over 15 years in the travel industry, Sarah founded SkyQuest with a vision to transform the flight booking experience.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Michael leads our technology team, ensuring our platform delivers a seamless and innovative booking experience.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Customer Experience",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Priya ensures every customer interaction exceeds expectations, from booking to post-flight support.",
    },
    {
      name: "David Wilson",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "David brings creative strategies to connect travelers with their dream destinations through compelling campaigns.",
    },
  ]

  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "SkyQuest was established with a mission to simplify flight bookings.",
    },
    {
      year: "2017",
      title: "1 Million Customers",
      description: "Reached our first major milestone of serving one million travelers.",
    },
    {
      year: "2019",
      title: "Global Expansion",
      description: "Expanded operations to cover over 100 countries worldwide.",
    },
    {
      year: "2021",
      title: "Technology Innovation",
      description: "Launched our AI-powered recommendation engine for personalized travel suggestions.",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Named 'Best Flight Booking Platform' at the Global Travel Awards.",
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-20 mb-12 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate={isPageLoaded ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={heroTextVariants} className="mb-2">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full text-purple-100 border border-purple-400/30">
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={heroTextVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white"
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 relative">
                SkyQuest
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.span>
              </span>
            </motion.h1>
            <motion.p variants={heroTextVariants} className="text-xl text-purple-100 max-w-3xl mx-auto mb-3 my-12">
              Transforming the way you discover and book flights since 2015
            </motion.p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </motion.svg>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                alt="Airplane view"
                className="rounded-2xl shadow-xl relative z-10 w-full h-auto object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg shadow-lg z-20">
                <div className="flex items-center">
                  <Star className="text-yellow-300 fill-yellow-300 mr-1" size={18} />
                  <Star className="text-yellow-300 fill-yellow-300 mr-1" size={18} />
                  <Star className="text-yellow-300 fill-yellow-300 mr-1" size={18} />
                  <Star className="text-yellow-300 fill-yellow-300 mr-1" size={18} />
                  <Star className="text-yellow-300 fill-yellow-300" size={18} />
                </div>
                <p className="text-sm mt-1">Trusted by 10,000+ travelers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Making Travel Accessible for Everyone</h2>
            <p className="text-lg text-gray-600 mb-6">
              At SkyQuest, we believe that travel should be accessible to everyone. Our mission is to simplify the
              flight booking process, making it easier for people to explore the world, connect with loved ones, and
              create unforgettable memories.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We're committed to providing transparent pricing, exceptional customer service, and innovative technology
              that puts the power of travel in your hands.
            </p>
            <div className="space-y-4">
              {[
                "Global network of 500+ airlines",
                "24/7 customer support in multiple languages",
                "Transparent pricing with no hidden fees",
                "Secure and hassle-free booking experience",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">The Principles That Guide Us</h2>
            <p className="text-lg text-gray-600">
              Our core values shape everything we do, from how we build our platform to how we interact with our
              customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="text-purple-600" size={24} />,
                title: "Customer First",
                description: "We prioritize our customers' needs in every decision we make.",
              },
              {
                icon: <Globe className="text-purple-600" size={24} />,
                title: "Global Perspective",
                description: "We embrace diversity and think globally in our approach to travel.",
              },
              {
                icon: <Shield className="text-purple-600" size={24} />,
                title: "Trust & Security",
                description: "We maintain the highest standards of security and transparency.",
              },
              {
                icon: <Award className="text-purple-600" size={24} />,
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Journey Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Milestones That Define Us</h2>
          <p className="text-lg text-gray-600">
            From our humble beginnings to becoming a leading flight booking platform, here's our journey so far.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-100"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} md:justify-between`}
              >
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-purple-600 z-10`}
                ></div>

                <div
                  className={`w-5/12 md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} ${index % 2 !== 0 ? "hidden md:block" : ""}`}
                >
                  {index % 2 === 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <div className="text-purple-600 font-bold text-xl mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  )}
                </div>

                <div
                  className={`w-5/12 md:w-5/12 ${index % 2 !== 0 ? "md:text-left md:pl-8" : "md:text-right md:pr-8"} ${index % 2 === 0 ? "hidden md:block" : ""}`}
                >
                  {index % 2 !== 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <div className="text-purple-600 font-bold text-xl mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  )}
                </div>

                {/* Mobile view (single column) */}
                <div className="md:hidden w-full pl-12">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="text-purple-600 font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet the People Behind SkyQuest</h2>
            <p className="text-lg text-gray-600">
              Our diverse team of experts is passionate about transforming the travel industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-16 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Experience the SkyQuest Difference?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Whether you have questions or are ready to book your next adventure, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-50 transition-all duration-300 flex items-center"
              >
                Contact Us
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/flights/search"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300"
              >
                Book a Flight
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

