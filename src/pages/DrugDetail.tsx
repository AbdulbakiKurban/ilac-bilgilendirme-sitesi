import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getDrugById } from '../data/drugs'
import { 
  ArrowLeft, 
  Pill, 
  AlertTriangle, 
  FileText, 
  Download, 
  Star, 
  Clock, 
  Shield, 
  Heart, 
  Brain, 
  Activity, 
  Zap, 
  Sparkles, 
  CheckCircle, 
  ExternalLink,
  Info,
  Eye,
  Target,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Globe,
  Database,
  Lock,
  Leaf,
  Coffee,
  Moon,
  Sun,
  Droplets,
  Wind,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react'
import ImageZoom from '../components/ImageZoom'

const DrugDetail = () => {
  const { id } = useParams()
  const drug = getDrugById(Number(id))
  const [activeTab, setActiveTab] = useState('overview')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardHoverVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  // Reçete rengi yardımcı fonksiyonları
  const getPrescriptionColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      red: 'bg-red-500 text-white',
      green: 'bg-green-500 text-white',
      yellow: 'bg-yellow-500 text-black',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      pink: 'bg-pink-500 text-white',
      brown: 'bg-amber-700 text-white',
      gray: 'bg-gray-500 text-white',
      black: 'bg-black text-white',
      white: 'bg-white text-gray-800 border border-gray-300'
    }
    return colors[color as keyof typeof colors] || 'bg-blue-500 text-white'
  }

  const getPrescriptionText = (color: string) => {
    const texts = {
      blue: 'Mavi Reçete',
      red: 'Kırmızı Reçete',
      green: 'Yeşil Reçete',
      yellow: 'Sarı Reçete',
      purple: 'Mor Reçete',
      orange: 'Turuncu Reçete',
      pink: 'Pembe Reçete',
      brown: 'Kahverengi Reçete',
      gray: 'Gri Reçete',
      black: 'Siyah Reçete',
      white: 'Beyaz Reçete'
    }
    return texts[color as keyof typeof texts] || 'Reçeteli'
  }

  if (!drug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <AlertTriangle className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">İlaç Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Aradığınız ilaç sistemimizde mevcut değil.</p>
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            İlaç Aramaya Dön
          </Link>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: Eye },
    { id: 'dosage', label: 'Dozaj Bilgileri', icon: Pill },
    { id: 'sideEffects', label: 'Yan Etkiler', icon: AlertTriangle },
    { id: 'interactions', label: 'Etkileşimler', icon: Zap },
    { id: 'warnings', label: 'Uyarılar', icon: AlertTriangle },
    { id: 'reviews', label: 'Değerlendirmeler', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={rotateVariants}
          animate="animate"
          className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-blue-200 rounded-full opacity-30"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link
                to="/search"
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri Dön
              </Link>
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="flex items-center space-x-2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Canlı Veri</span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium mb-4"
                >
                  <Pill className="h-4 w-4 mr-2" />
                  {drug.category}
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {drug.name}
                </h1>
                
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                  {drug.genericName}
                </p>
                
                <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                  {drug.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {drug.prescription && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm ${getPrescriptionColor(drug.prescriptionColor || 'blue')}`}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {getPrescriptionText(drug.prescriptionColor || 'blue')}
                    </motion.div>
                  )}
                  
                  {drug.approvalStatus === 'approved' && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full font-semibold text-sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Onaylı İlaç
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
                >
                  <div className="relative">
                    <ImageZoom
                      src={drug.image}
                      alt={drug.name}
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                    
                    {drug.approvalStatus === 'approved' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-4 left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CheckCircle className="h-6 w-6 text-white" />
                      </motion.div>
                    )}
                  </div>

                  
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {tab.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {activeTab === 'overview' && (
                    <>
                      {/* Basic Information */}
                      <motion.div
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        variants={cardHoverVariants}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                      >
                        <div className="flex items-center mb-6">
                          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4">
                            <Info className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Temel Bilgiler</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Target className="h-5 w-5 text-blue-500 mr-3" />
                              <span className="font-semibold text-gray-700">Etken Madde:</span>
                              <span className="ml-2 text-gray-600">{drug.activeIngredient || 'Bilinmiyor'}</span>
                            </div>
                            <div className="flex items-center">
                              <Zap className="h-5 w-5 text-purple-500 mr-3" />
                              <span className="font-semibold text-gray-700">Güç:</span>
                              <span className="ml-2 text-gray-600">{drug.strength || 'Bilinmiyor'}</span>
                            </div>
                            <div className="flex items-center">
                              <Pill className="h-5 w-5 text-green-500 mr-3" />
                              <span className="font-semibold text-gray-700">Form:</span>
                              <span className="ml-2 text-gray-600">{drug.dosageForm || 'Bilinmiyor'}</span>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-indigo-500 mr-3" />
                              <span className="font-semibold text-gray-700">Üretici:</span>
                              <span className="ml-2 text-gray-600">{drug.manufacturer}</span>
                            </div>
                            <div className="flex items-center">
                              <Database className="h-5 w-5 text-orange-500 mr-3" />
                              <span className="font-semibold text-gray-700">ATC Kodu:</span>
                              <span className="ml-2 text-gray-600">{drug.atcCode || 'Bilinmiyor'}</span>
                            </div>
                            <div className="flex items-center">
                              <Shield className="h-5 w-5 text-red-500 mr-3" />
                              <span className="font-semibold text-gray-700">Ruhsat No:</span>
                              <span className="ml-2 text-gray-600">{drug.licenseNumber || 'Bilinmiyor'}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* How to Use */}
                      <motion.div
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        variants={cardHoverVariants}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                      >
                        <div className="flex items-center mb-6">
                          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Kullanım Talimatları</h3>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                          <p className="text-gray-700 leading-relaxed">{drug.howToUse}</p>
                        </div>
                      </motion.div>

                      {/* Storage */}
                      <motion.div
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        variants={cardHoverVariants}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                      >
                        <div className="flex items-center mb-6">
                          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mr-4">
                            <Leaf className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Saklama Koşulları</h3>
                        </div>
                        
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                          <p className="text-gray-700 leading-relaxed">{drug.storage}</p>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {activeTab === 'dosage' && (
                    <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-4">
                          <Pill className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Dozaj Bilgileri</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Users className="h-5 w-5 text-blue-500 mr-2" />
                              Yetişkinler
                            </h4>
                            <p className="text-gray-700">{drug.dosage.adults}</p>
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Heart className="h-5 w-5 text-green-500 mr-2" />
                              Çocuklar
                            </h4>
                            <p className="text-gray-700">{drug.dosage.children}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Clock className="h-5 w-5 text-purple-500 mr-2" />
                              Yaşlılar
                            </h4>
                            <p className="text-gray-700">{drug.dosage.elderly}</p>
                          </div>
                          
                          {drug.dosage.maxDaily && (
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                                Maksimum Günlük Doz
                              </h4>
                              <p className="text-gray-700">{drug.dosage.maxDaily}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'sideEffects' && (
                    <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl mr-4">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Yan Etkiler</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {drug.sideEffects.map((effect, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200"
                          >
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{effect}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'interactions' && (
                    <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">İlaç Etkileşimleri</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {drug.interactions.map((interaction, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                          >
                            <Zap className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{interaction}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'warnings' && (
                    <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mr-4">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Önemli Uyarılar</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {drug.warnings.map((warning, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                          >
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{warning}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      {/* Patient Reviews */}
                      {drug.patientReviews && drug.patientReviews.length > 0 && (
                        <motion.div
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                          variants={cardHoverVariants}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                        >
                          <div className="flex items-center mb-6">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-4">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Hasta Değerlendirmeleri</h3>
                          </div>
                          
                          <div className="space-y-4">
                            {drug.patientReviews.map((review, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Medical Reviews */}
                      {drug.medicalReviews && drug.medicalReviews.length > 0 && (
                        <motion.div
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                          variants={cardHoverVariants}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                        >
                          <div className="flex items-center mb-6">
                            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4">
                              <Award className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Uzman Değerlendirmeleri</h3>
                          </div>
                          
                          <div className="space-y-4">
                            {drug.medicalReviews.map((review, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{review.doctor}</h4>
                                    <p className="text-sm text-gray-600">{review.specialty}</p>
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <p className="text-gray-700">{review.review}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={cardHoverVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h3>
                  
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      PDF İndir
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Etkileşim Kontrolü
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    >
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Yan Etki Bildir
                    </motion.button>
                  </div>
                </motion.div>

                {/* Drug Stats */}
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={cardHoverVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">İlaç İstatistikleri</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Popülerlik</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{drug.popularity || 4.5}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Değerlendirme</span>
                      <span className="font-semibold">{drug.patientReviews?.length || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Uzman Görüşü</span>
                      <span className="font-semibold">{drug.medicalReviews?.length || 0}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Related Drugs */}
                {drug.alternatives && drug.alternatives.length > 0 && (
                  <motion.div
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={cardHoverVariants}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Alternatif İlaçlar</h3>
                    
                    <div className="space-y-3">
                      {drug.alternatives.slice(0, 5).map((alternative, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 cursor-pointer"
                        >
                          <Pill className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="text-gray-700">{alternative}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default DrugDetail 
