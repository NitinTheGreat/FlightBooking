"use client"

import { motion } from "framer-motion"
import { Calendar, Check, Clock, Download, Home, Mail, MapPin, Phone, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const BookingSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    // Set page as loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.state) {
      setBookingDetails(location.state)
    } else {
      navigate("/")
    }
  }, [location, navigate])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateDuration = (departure: string, arrival: string) => {
    const departureTime = new Date(departure).getTime()
    const arrivalTime = new Date(arrival).getTime()
    const durationMs = arrivalTime - departureTime
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

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

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-4 border-purple-400 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-2 border-purple-200 opacity-30"></div>
          </div>
          <p className="mt-4 text-purple-600 font-medium">Loading your booking details...</p>
        </div>
      </div>
    )
  }

  const { bookingId, flightDetails, passengerDetails } = bookingDetails

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-16 mb-12 overflow-hidden">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg"
            >
              <Check className="text-green-500 text-3xl" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 text-white">Booking Confirmed!</h1>
            <p className="text-xl text-purple-100  ">Your flight has been successfully booked</p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30 my-12 mb-6">
              Booking ID: <span className="font-mono font-bold  text-white">{bookingId}</span>
            </div>
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isPageLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="mr-3 text-purple-600" size={20} />
                  Flight Details
                </h2>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <div className="text-sm text-gray-500 flex items-center mb-1">
                        <Calendar className="mr-1" size={14} />
                        {formatDate(flightDetails.departure.scheduled)}
                      </div>
                      <div className="text-xl font-bold text-gray-900 bg-white inline-block px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                        {flightDetails.flight.iata}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatTime(flightDetails.departure.scheduled)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center justify-center">
                          <MapPin className="mr-1" size={14} />
                          {flightDetails.departure.airport}
                        </div>
                      </div>

                      <div className="mx-4 flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-1">
                          {calculateDuration(flightDetails.departure.scheduled, flightDetails.arrival.scheduled)}
                        </div>
                        <div className="relative w-24 md:w-32">
                          <div className="h-0.5 bg-gray-200 w-full"></div>
                          <div className="absolute -top-1.5 -left-1 w-3 h-3 rounded-full bg-purple-600"></div>
                          <div className="absolute -top-1.5 -right-1 w-3 h-3 rounded-full bg-indigo-600"></div>
                          <motion.div
                            className="absolute -top-2 w-4 h-4"
                            initial={{ left: "0%" }}
                            animate={{ left: "100%" }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "linear",
                            }}
                            style={{ translateX: "-50%" }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 4H6.54C6.19 4 5.89 4.21 5.76 4.54L3 11L5.76 17.46C5.89 17.79 6.19 18 6.54 18H21C21.55 18 22 17.55 22 17V5C22 4.45 21.55 4 21 4Z"
                                fill="#a855f7"
                              />
                              <path d="M3 11V13H5.76C6.11 13 6.41 12.79 6.54 12.46L9.3 6H6.54L3 11Z" fill="#a855f7" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="text-xs text-purple-600 mt-1 font-medium">Direct Flight</div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatTime(flightDetails.arrival.scheduled)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center justify-center">
                          <MapPin className="mr-1" size={14} />
                          {flightDetails.arrival.airport}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-purple-200">
                    <div className="flex items-center">
                      <Clock className="text-purple-600 mr-2" size={16} />
                      <span className="text-sm text-gray-700">
                        Flight duration:{" "}
                        <span className="font-medium">
                          {calculateDuration(flightDetails.departure.scheduled, flightDetails.arrival.scheduled)}
                        </span>
                      </span>
                    </div>
                    <div className="text-xl font-bold text-purple-600">₹{flightDetails.price.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="mr-3 text-purple-600" size={20} />
                  Passenger Information
                </h2>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                      <User className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Passenger Name</div>
                      <div className="font-medium text-gray-900 mt-1">{passengerDetails.name}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                      <Mail className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium text-gray-900 mt-1">{passengerDetails.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                      <Phone className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium text-gray-900 mt-1">{passengerDetails.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center bg-white border border-purple-200 hover:bg-purple-50 text-purple-600 py-3 px-4 rounded-lg font-medium transition-all duration-300"
                >
                  <Download className="mr-2" size={18} />
                  Download E-Ticket
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/")}
                  className="flex-1 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300"
                >
                  <Home className="mr-2" size={18} />
                  Back to Home
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-block bg-purple-50 rounded-full px-4 py-2 border border-purple-100">
              <p className="text-gray-700">Thank you for choosing SkyQuest!</p>
              <p className="text-sm text-gray-500 mt-1">For any assistance, please contact our customer support.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default BookingSuccessPage

