"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import FlightSearch from "../components/flight/FlightSearch"
import { 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiShield, 
  FiChevronRight, 
  FiStar,
  FiArrowRight,
  FiArrowDown,
  FiCheck
} from "react-icons/fi"

const HomePage = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    // Set hero as loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsHeroLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: "easeOut"
      }
    }
  }

  const heroImageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }

  const features = [
    {
      icon: <FiMapPin className="text-purple-500 text-2xl" />,
      title: "Global Destinations",
      description: "Access flights to over 5,000 destinations worldwide with our comprehensive network.",
    },
    {
      icon: <FiClock className="text-purple-500 text-2xl" />,
      title: "Real-time Updates",
      description: "Get instant notifications about flight status, delays, and gate changes.",
    },
    {
      icon: <FiDollarSign className="text-purple-500 text-2xl" />,
      title: "Best Price Guarantee",
      description: "We ensure you get the most competitive prices for your flight bookings.",
    },
    {
      icon: <FiShield className="text-purple-500 text-2xl" />,
      title: "Secure Booking",
      description: "Your payment and personal information are protected with industry-standard security.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "SkyQuest has transformed my business travel experience. The booking process is seamless, and their customer service is exceptional.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Adventure Seeker",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "I've booked multiple international flights through SkyQuest, and they consistently offer the best prices and smoothest experience.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Family Vacationer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "Planning family trips is so much easier with SkyQuest. Their interface is intuitive, and they have great family package deals.",
      rating: 4,
    },
  ]

  const destinations = [
    {
      city: "New York",
      country: "USA",
      price: "₹45,000",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "London",
      country: "UK",
      price: "₹52,000",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Tokyo",
      country: "Japan",
      price: "₹65,000",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Paris",
      country: "France",
      price: "₹48,000",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Sydney",
      country: "Australia",
      price: "₹72,000",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      city: "Dubai",
      country: "UAE",
      price: "₹38,000",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
  ]

  return (
    <div className="min-h-screen overflow-hidden mt-10 md:mt-8 xl:mt-0">
      {/* Hero Section - Enhanced with parallax and more animations */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated background with parallax effect */}
        <motion.div
          initial="hidden"
          animate={isHeroLoaded ? "visible" : "hidden"}
          variants={heroImageVariants}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          ></motion.div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                style={{
                  width: Math.random() * 10 + 5 + "px",
                  height: Math.random() * 10 + 5 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  y: [0, -(Math.random() * 100 + 50)],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={isHeroLoaded ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-white"
            >
              <motion.div variants={heroTextVariants} className="mb-2">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full text-purple-200 border border-purple-400/30">
                  #1 Flight Booking Platform
                </span>
              </motion.div>
              <motion.h1 
                variants={heroTextVariants} 
                className="text-5xl md:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              >
                Discover the World with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 relative">
                  SkyQuest
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  ></motion.span>
                </span>
              </motion.h1>
              <motion.p 
                variants={heroTextVariants} 
                className="text-xl text-gray-200 mb-8 max-w-lg"
              >
                Seamless flight bookings to your dream destinations. Experience travel like never before.
              </motion.p>
              <motion.div 
                variants={heroTextVariants}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/flights/search"
                  className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center relative overflow-hidden"
                >
                  <span className="relative z-10">Book Now</span>
                  <motion.span 
                    className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <FiChevronRight />
                  </motion.span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></motion.span>
                </Link>
                <Link
                  to="/about"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300 group"
                >
                  <span>Learn More</span>
                  <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>

              <motion.div 
                variants={heroTextVariants}
                className="mt-12 flex items-center space-x-6"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                    >
                      <img
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i * 10}.jpg`}
                        alt={`User ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5 + star * 0.1, duration: 0.3 }}
                      >
                        <FiStar className="text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">Trusted by 10,000+ travelers</p>
                </motion.div>
              </motion.div>
              
              {/* Animated scroll indicator */}
              <motion.div 
                className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 items-center flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <FiArrowDown className="text-white/70" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isHeroLoaded ? "visible" : "hidden"}
              variants={heroTextVariants}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-10 -left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                // animate={floatingAnimation}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"
               
              ></motion.div>
              
              {/* Flight search card with enhanced styling */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl relative z-10">
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6 relative">
                    <h2 className="text-white text-xl font-semibold">Find Your Flight</h2>
                    
                    {/* Animated plane icon */}
                    <motion.div
                      className="absolute right-6 top-1/2 -translate-y-1/2"
                      animate={{
                        x: [0, 10, 0],
                        rotate: [0, -5, 0, 5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.5H8C7.17 16.5 6.5 15.83 6.5 15V9C6.5 8.17 7.17 7.5 8 7.5H22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 19.5L22 16.5L17 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 7.5H6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 10.5H4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 13.5H3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <FlightSearch />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced wave divider with animation */}
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
      </section>

      {/* Features Section - Enhanced with better animations */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4"
            >
              Why Choose Us
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              The SkyQuest Advantage
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 text-lg">
              We offer the best flight booking experience with features designed for your convenience and peace of mind.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-md transition-all duration-300 hover:border-purple-200 relative"
              >
                {/* Animated check mark that appears on hover */}
                <motion.div 
                  className="absolute top-4 right-4 text-green-500 opacity-0 scale-0"
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiCheck className="text-lg" />
                </motion.div>
                
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="mb-4 p-4 bg-purple-50 rounded-full"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(168, 85, 247, 0.2)" 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Section - Enhanced with better card effects */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "60px 60px"
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              Explore
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Popular Destinations</h2>
            <p className="text-gray-600 text-lg">Discover our most sought-after flight routes and dream destinations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-80">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.city}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Enhanced overlay with better animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex justify-between items-end">
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        >
                          <h3 className="text-2xl font-bold text-white mb-1">{destination.city}</h3>
                          <p className="text-gray-200">{destination.country}</p>
                        </motion.div>
                        <motion.div 
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          whileHover={{ 
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            y: -5
                          }}
                        >
                          <span className="text-white font-medium">from {destination.price}</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* "Book Now" button that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.button
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium shadow-lg flex items-center"
                    >
                      Book Now <FiArrowRight className="ml-2" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/flights/search"
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 bg-white rounded-full hover:bg-purple-50 transition-colors duration-300 font-medium group"
            >
              View All Destinations
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <FiChevronRight />
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with carousel effect */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-40 right-0 w-72 h-72 bg-purple-50 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it. Hear from our satisfied travelers around the world.
            </p>
          </motion.div>

          {/* Enhanced testimonial carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-gray-50 rounded-2xl p-8 shadow-md border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-purple-200">
                          <img
                            src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                            alt={testimonials[activeTestimonial].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <motion.div 
                          className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <FiStar className="text-white fill-current" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`${
                              i < testimonials[activeTestimonial].rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            } mr-1`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic text-lg mb-4">"{testimonials[activeTestimonial].quote}"</p>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                        <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? "bg-purple-600 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-600 pointer-events-auto"
                aria-label="Previous testimonial"
              >
                <FiChevronRight className="rotate-180" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-600 pointer-events-auto"
                aria-label="Next testimonial"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with better visual effects */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        
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
                repeat: Infinity,
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
            className="text-center max-w-3xl mx-auto text-white"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready for Your Next Adventure?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 text-purple-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Book your next flight today and experience the SkyQuest difference.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/flights/search"
                className="group bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-50 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Book Now</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></motion.span>
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300 group"
              >
                Contact Us
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
