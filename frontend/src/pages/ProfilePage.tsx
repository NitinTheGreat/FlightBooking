"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  AlertCircle,
  Bookmark,
  Calendar,
  CreditCard,
  Edit,
  Mail,
  MapPin,
  Phone,
  Plane,
  Shield,
  User,
  ChevronRight,
  ArrowRight,
  Check,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface UserProfile {
  _id: string
  name: string
  email: string
  mobile: string
  createdAt: string
  isVerified: boolean
}

interface Booking {
  _id: string
  bookingReference: string
  status: string
  createdAt: string
  flightDetails: {
    flightNumber: string
    departure: string
    arrival: string
    departureTime: string
    arrivalTime: string
  }
  passengerDetails: {
    name: string
    email: string
    phone: string
  }
}

const ProfilePage = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

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

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("No authentication token found")
        }
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch profile data")
        }

        const data = await response.json()
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching profile:", err)
      } finally {
        setProfileLoading(false)
      }
    }

    if (isAuthenticated && !isLoading) {
      fetchProfile()
    } else if (!isLoading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, isLoading, navigate])

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setBookingsLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("No authentication token found")
        }

        const response = await fetch(`${API_URL}/api/payment/bookings`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch bookings data")
        }

        const data = await response.json()
        setBookings(data)
      } catch (err) {
        console.error("Error fetching bookings:", err)
        // Don't set error state here to avoid blocking the profile display
      } finally {
        setBookingsLoading(false)
      }
    }

    if (isAuthenticated && !isLoading) {
      fetchBookings()
    }
  }, [isAuthenticated, isLoading])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-4 border-purple-400 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-2 border-purple-200 opacity-30"></div>
          </div>
          <p className="mt-4 text-purple-200 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-red-900/40 p-3 rounded-full mb-4">
            <AlertCircle className="text-red-400 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Profile</h2>
          <p className="text-purple-200 mb-6">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "bookings", label: "Bookings" },
    { id: "payments", label: "Payments" },
    { id: "security", label: "Security" },
  ]

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
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center">
            <motion.div variants={heroTextVariants} className="mb-2">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full text-purple-100 border border-purple-400/30">
                Your Account
              </span>
            </motion.div>
            <motion.h1 variants={heroTextVariants} className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Welcome Back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 relative">
                {profile?.name}
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.span>
              </span>
            </motion.h1>
            <motion.p variants={heroTextVariants} className="text-xl text-purple-100 max-w-2xl mx-auto mb-3 my-12">
                Discover your personalized dashboard, where you can manage your bookings, payments, and account settings with ease.
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex overflow-x-auto no-scrollbar space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 font-medium text-lg border-b-2 transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - User Info Card */}
          <motion.div
            className="md:col-span-4 lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-24"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white text-center">
                <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm p-6 rounded-full mb-4">
                  <User className="text-white text-4xl" />
                </div>
                <h2 className="text-2xl font-bold">{profile?.name}</h2>
                <p className="text-purple-100 mt-1">{profile?.email}</p>
                {profile?.isVerified && (
                  <div className="inline-flex items-center mt-2 bg-green-500/20 px-3 py-1 rounded-full">
                    <Shield className="text-green-100 mr-1" size={14} />
                    <span className="text-sm text-green-100">Verified Account</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Mail className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{profile?.email}</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Phone className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{profile?.mobile}</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Calendar className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-gray-900">{profile?.createdAt ? formatDate(profile.createdAt) : "N/A"}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8">
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 rounded-lg font-medium transition-all duration-300 flex justify-center items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit className="mr-2" size={18} />
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard */}
          <div className="md:col-span-8 lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <Plane className="text-purple-500 text-2xl" />,
                        title: "Flights Booked",
                        value: bookings.length.toString(),
                      },
                      {
                        icon: <MapPin className="text-purple-500 text-2xl" />,
                        title: "Destinations",
                        value: new Set(bookings.map((booking) => booking.flightDetails.arrival)).size.toString(),
                      },
                      {
                        icon: <Bookmark className="text-purple-500 text-2xl" />,
                        title: "Saved Trips",
                        value: "3",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center transition-all duration-300"
                      >
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4">
                          {stat.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Bookings Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">Recent Bookings</h3>
                      <button
                        onClick={() => setActiveTab("bookings")}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
                      >
                        View All
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>

                    <div className="p-6">
                      {bookingsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="w-8 h-8 relative">
                            <div className="absolute inset-0 rounded-full border-t-2 border-purple-400 animate-spin"></div>
                          </div>
                        </div>
                      ) : bookings.length > 0 ? (
                        bookings.slice(0, 3).map((booking, index) => (
                          <motion.div
                            key={booking._id}
                            className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg ${
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } mb-2 last:mb-0`}
                            whileHover={{
                              backgroundColor: "rgba(168, 85, 247, 0.05)",
                            }}
                          >
                            <div className="flex items-center mb-3 md:mb-0">
                              <div className="bg-purple-100 p-2 rounded-full mr-4">
                                <Plane className="text-purple-600" size={18} />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {booking.flightDetails.departure} to {booking.flightDetails.arrival}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {formatDate(booking.flightDetails.departureTime)} •{" "}
                                  {booking.flightDetails.flightNumber}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                {booking.status}
                              </span>
                              <button className="ml-4 text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
                                Details
                                <ChevronRight size={16} className="ml-1" />
                              </button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="inline-flex items-center justify-center bg-purple-100 p-3 rounded-full mb-4">
                            <Plane className="text-purple-600 text-2xl" />
                          </div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h4>
                          <p className="text-gray-500 mb-4">Start your journey by booking your first flight</p>
                          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-300">
                            Book a Flight
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Payment Methods Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
                      <button
                        onClick={() => setActiveTab("payments")}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
                      >
                        Manage
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-full mr-4">
                            <CreditCard className="text-purple-600" size={18} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">•••• •••• •••• 4242</h4>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Default
                        </span>
                      </div>

                      <motion.button
                        className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-all duration-300 flex justify-center items-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CreditCard className="mr-2" size={18} />
                        Add Payment Method
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">Your Bookings</h3>
                  </div>

                  <div className="p-6">
                    {bookingsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="w-8 h-8 relative">
                          <div className="absolute inset-0 rounded-full border-t-2 border-purple-400 animate-spin"></div>
                        </div>
                      </div>
                    ) : bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.map((booking, index) => (
                          <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                          >
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 border-b border-gray-100 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="bg-purple-100 p-2 rounded-full mr-3">
                                  <Plane className="text-purple-600" size={18} />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Booking Reference</p>
                                  <p className="font-medium text-gray-900">{booking.bookingReference}</p>
                                </div>
                              </div>
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                {booking.status}
                              </span>
                            </div>
                            <div className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div className="mb-3 md:mb-0">
                                  <h4 className="font-semibold text-lg text-gray-900">
                                    {booking.flightDetails.departure} to {booking.flightDetails.arrival}
                                  </h4>
                                  <p className="text-gray-500">
                                    {booking.flightDetails.flightNumber} •{" "}
                                    {formatDate(booking.flightDetails.departureTime)}
                                  </p>
                                </div>
                                <div className="flex space-x-2">
                                  <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                                    View E-Ticket
                                  </button>
                                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                                <div>Booked on {formatDate(booking.createdAt)}</div>
                                <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                                  View Details
                                  <ArrowRight size={14} className="ml-1" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center bg-purple-100 p-3 rounded-full mb-4">
                          <Plane className="text-purple-600 text-2xl" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h4>
                        <p className="text-gray-500 mb-4">Start your journey by booking your first flight</p>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-300">
                          Book a Flight
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-full mr-4">
                              <CreditCard className="text-purple-600" size={18} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">•••• •••• •••• 4242</h4>
                              <p className="text-sm text-gray-500">Expires 12/25</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                              Default
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 rounded-lg font-medium transition-all duration-300 flex justify-center items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CreditCard className="mr-2" size={18} />
                      Add New Payment Method
                    </motion.button>

                    <div className="mt-8 bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Shield className="text-purple-600 mr-2" size={18} />
                        Secure Payments
                      </h4>
                      <p className="text-sm text-gray-600">
                        Your payment information is encrypted and securely stored. We never share your details with
                        third parties.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">Account Security</h3>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-full mr-4">
                            <Shield className="text-purple-600" size={18} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Password</h4>
                            <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                          </div>
                        </div>
                        <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                          Change
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-full mr-4">
                            <Phone className="text-purple-600" size={18} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Enhance your account security</p>
                          </div>
                        </div>
                        <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                          Enable
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-full mr-4">
                            <Mail className="text-purple-600" size={18} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-500">Receive alerts for account activity</p>
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="toggle"
                            id="toggle"
                            defaultChecked
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label
                            htmlFor="toggle"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Shield className="text-purple-600 mr-2" size={18} />
                        Security Tips
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                          Use a strong, unique password for your account
                        </li>
                        <li className="flex items-start">
                          <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                          Enable two-factor authentication for extra security
                        </li>
                        <li className="flex items-start">
                          <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                          Regularly check your account for suspicious activity
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Custom CSS for toggle switch */}
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #a855f7;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #a855f7;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: all 0.3s;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default ProfilePage

