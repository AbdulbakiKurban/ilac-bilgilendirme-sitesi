import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Pill, AlertTriangle, Info, FileText, Baby, Shield, Clock, TrendingUp, Sparkles, Zap, Heart, Target, Award, ArrowRight, Star, Users, BookOpen, Download, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, ChevronLeft, ChevronRight, CheckCircle, Globe, Database, Lock, Eye, Brain, Activity, Leaf, Coffee, Moon, Sun, Droplets, Wind, Phone, Mail, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  // const [isMuted, setIsMuted] = useState(false)
  // const [isFullscreen, setIsFullscreen] = useState(false)

  // Helper function to render icon component
  const renderIcon = (iconComponent: any, className: string) => {
    const IconComponent = iconComponent;
    return <IconComponent className={className} />;
  };

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
        duration: 0.5,
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

  // Hero slider data
  const heroSlides = [
    {
      title: "İlaç Bilgi Merkezi",
      subtitle: "Türkiye'nin en kapsamlı ve güvenilir ilaç bilgi platformu",
      description: "1000+ ilaç hakkında detaylı bilgi, uzman görüşleri ve güncel KÜB PDF'leri",
      bgGradient: "from-blue-600 via-purple-600 to-indigo-600",
      icon: Pill,
      actionText: "İlaç Ara",
      actionLink: "/search"
    },
    {
      title: "Güvenli İlaç Kullanımı",
      subtitle: "Etkileşim kontrolü ile güvenli tedavi",
      description: "İlaçlarınız arasındaki etkileşimleri kontrol edin ve güvenli kullanım sağlayın",
      bgGradient: "from-green-600 via-emerald-600 to-teal-600",
      icon: Shield,
      actionText: "Etkileşim Kontrolü",
      actionLink: "/interaction"
    },
    {
      title: "Uzman Sağlık Rehberi",
      subtitle: "Sağlıklı yaşam için profesyonel öneriler",
      description: "Uzman doktorlar tarafından hazırlanmış kapsamlı sağlık rehberi",
      bgGradient: "from-red-600 via-pink-600 to-rose-600",
      icon: Heart,
      actionText: "Sağlık Rehberi",
      actionLink: "/guide"
    }
  ]

  const features = [
    {
      icon: Search,
      title: 'Gelişmiş Arama',
      description: 'İlaç adı, etken madde veya kategori ile hızlı arama yapın',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      icon: Pill,
      title: 'Detaylı Bilgiler',
      description: 'Her ilaç için kapsamlı kullanım bilgileri ve yan etkiler',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: AlertTriangle,
      title: 'Güvenlik Uyarıları',
      description: 'Önemli güvenlik bilgileri ve kontrendikasyonlar',
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      icon: FileText,
      title: 'KÜB PDF\'leri',
      description: 'Resmi Kısa Ürün Bilgisi dokümanlarına anında erişim',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Uzman Görüşleri',
      description: 'Doktor ve uzman değerlendirmeleri',
      color: 'from-indigo-500 to-blue-500',
      gradient: 'bg-gradient-to-r from-indigo-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Güvenilir Kaynak',
      description: 'TİTCK onaylı güncel ve doğru bilgiler',
      color: 'from-teal-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-teal-500 to-cyan-500'
    }
  ]

  const stats = [
    { number: '1000+', label: 'İlaç Bilgisi', icon: Pill, color: 'from-blue-500 to-purple-600' },
    { number: '24/7', label: 'Erişim', icon: Clock, color: 'from-green-500 to-emerald-600' },
    { number: '100%', label: 'Güvenilir', icon: Shield, color: 'from-purple-500 to-pink-600' },
    { number: '50K+', label: 'Kullanıcı', icon: Users, color: 'from-indigo-500 to-blue-600' }
  ]

  const testimonials = [
    {
      name: "Dr. Ahmet Yılmaz",
      role: "Kardiyoloji Uzmanı",
      content: "Bu platform sayesinde hastalarım ilaçları hakkında güvenilir bilgilere kolayca ulaşabiliyor.",
      rating: 5,
      avatar: "AY"
    },
    {
      name: "Ayşe Demir",
      role: "Hemşire",
      content: "İlaç etkileşim kontrolü özelliği çok faydalı. Hasta güvenliği için mükemmel bir araç.",
      rating: 5,
      avatar: "AD"
    },
    {
      name: "Mehmet Kaya",
      role: "Eczacı",
      content: "KÜB PDF'lerine anında erişim sağlamak büyük kolaylık. Çok kullanışlı bir platform.",
      rating: 5,
      avatar: "MK"
    }
  ]

  const latestNews = [
    {
      title: "Yeni İlaç Güvenlik Uyarısı",
      excerpt: "FDA'dan gelen yeni güvenlik uyarıları platformumuzda yayınlandı.",
      date: "2024-01-15",
      category: "Güvenlik",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "KÜB Güncellemeleri",
      excerpt: "100+ ilaç için KÜB dokümanları güncellendi.",
      date: "2024-01-12",
      category: "Güncelleme",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Yeni Özellik: Etkileşim Kontrolü",
      excerpt: "Gelişmiş ilaç etkileşim kontrolü özelliği eklendi.",
      date: "2024-01-10",
      category: "Yeni Özellik",
      color: "from-green-500 to-emerald-500"
    }
  ]

  // Auto-play slider
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section with Slider */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-16"
        >
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} flex items-center`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 w-full px-8 md:px-16 text-white">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="mr-4"
                        >
                          <Sparkles className="h-8 w-8 text-white" />
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                          {heroSlides[currentSlide].title}
                        </h1>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="ml-4"
                        >
                          <Zap className="h-8 w-8 text-white" />
                        </motion.div>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
                        {heroSlides[currentSlide].subtitle}
                      </h2>
                      
                      <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                        {heroSlides[currentSlide].description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={heroSlides[currentSlide].actionLink}
                            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            {renderIcon(heroSlides[currentSlide].icon, "mr-2 h-5 w-5")}
                            {heroSlides[currentSlide].actionText}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to="/about"
                            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/50 text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                          >
                            <Info className="mr-2 h-5 w-5" />
                            Daha Fazla
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="hidden lg:flex justify-center"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-64 h-64 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                        >
                          {renderIcon(heroSlides[currentSlide].icon, "h-32 w-32 text-white")}
                        </motion.div>
                        
                        {/* Orbiting elements */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0"
                        >
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
                          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
                          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              
              <div className="flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-full shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi Tercih Ediyorsunuz?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Güvenilir, güncel ve kullanıcı dostu ilaç bilgi platformu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 h-full relative overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uzman Görüşleri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sağlık profesyonellerinin platformumuz hakkındaki değerlendirmeleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Latest News Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Son Güncellemeler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Platformumuzdaki en son gelişmeler ve güncellemeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${news.color} text-white mb-4`}>
                  {news.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{news.date}</span>
                                     <motion.button
                     whileHover={{ scale: 1.05 }}
                     className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                   >
                     Devamını Oku <ArrowRight className="inline h-4 w-4" />
                   </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-12 border-2 border-blue-200 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-400/10 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/10 rounded-full animate-pulse delay-500"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-6"
              >
                <Heart className="h-16 w-16 text-red-500 mx-auto" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sağlığınız Bizim Önceliğimiz
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Güvenilir ilaç bilgilerine anında erişim ile sağlıklı yaşamınızı destekliyoruz. 
                Her zaman doktorunuza danışmayı unutmayın.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/search"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg font-semibold rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Hemen Başlayın
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 text-lg font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-lg"
                  >
                    <Info className="mr-2 h-5 w-5" />
                    Hakkımızda
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-xl">
            <div className="flex items-start space-x-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Shield className="h-8 w-8 text-yellow-600" />
              </motion.div>
              <div>
                <h4 className="font-bold text-yellow-800 mb-2 text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Önemli Güvenlik Uyarısı
                </h4>
                <p className="text-yellow-700 leading-relaxed">
                  Bu platformdaki bilgiler sadece bilgilendirme amaçlıdır. İlaç kullanımı öncesi mutlaka doktorunuza danışın. 
                  Reçeteli ilaçları doktor reçetesi olmadan kullanmayın. Sağlığınız bizim en değerli varlığımızdır.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home 