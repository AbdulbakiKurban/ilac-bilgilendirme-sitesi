import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Zap, 
  CheckCircle, 
  Star, 
  Globe, 
  Database, 
  Lock, 
  ArrowRight, 
  ChevronDown, 
  ChevronRight,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  Save,
  Share2,
  Printer,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Eye,
  Info,
  AlertTriangle,
  Target,
  Leaf,
  Coffee,
  Moon,
  Sun,
  Droplets,
  Wind,
  Pill,
  Baby,
  Stethoscope,
  Thermometer,
  Syringe,
  Microscope,
  Building,
  GraduationCap,
  Medal,
  Trophy,
  Crown,
  Lightbulb,
  Rocket,
  Compass,
  Flag,
  Home,
  Search,
  Activity,
  Brain
} from 'lucide-react'

const About = () => {
  const [activeTab, setActiveTab] = useState('mission')
  const [isExpanded, setIsExpanded] = useState(false)

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

  const stats = [
    { number: '1M+', label: 'Kullanıcı', icon: Users, color: 'from-blue-500 to-purple-600' },
    { number: '50K+', label: 'İlaç Veritabanı', icon: Database, color: 'from-green-500 to-emerald-600' },
    { number: '99.9%', label: 'Doğruluk Oranı', icon: Award, color: 'from-purple-500 to-pink-600' },
    { number: '24/7', label: 'Erişim', icon: Clock, color: 'from-indigo-500 to-blue-600' }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'TİTCK onaylı veritabanı ve uzman doktorlar tarafından doğrulanmış bilgiler',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Kullanıcı Odaklı',
      description: 'Kullanıcı deneyimini ön planda tutan, kolay ve anlaşılır arayüz',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Hızlı Erişim',
      description: 'Anında sonuç veren, yapay zeka destekli akıllı arama sistemi',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Kapsamlı Bilgi',
      description: 'Türkiye\'deki tüm ilaçlar hakkında detaylı ve güncel bilgiler',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const team = [
    {
      name: 'Dr. Ahmet Yılmaz',
      role: 'Kurucu & CEO',
      specialty: 'Kardiyoloji Uzmanı',
      avatar: 'AY',
      description: '20+ yıl deneyimli kardiyoloji uzmanı, dijital sağlık alanında öncü',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Dr. Ayşe Demir',
      role: 'Tıbbi Direktör',
      specialty: 'İç Hastalıkları Uzmanı',
      avatar: 'AD',
      description: 'İlaç etkileşimleri ve güvenliği konusunda uzmanlaşmış hekim',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Mehmet Kaya',
      role: 'Teknoloji Direktörü',
      specialty: 'Yazılım Mühendisi',
      avatar: 'MK',
      description: 'Sağlık teknolojileri alanında 15+ yıl deneyimli teknoloji uzmanı',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Fatma Özkan',
      role: 'Kullanıcı Deneyimi',
      specialty: 'UX/UI Tasarımcısı',
      avatar: 'FÖ',
      description: 'Kullanıcı odaklı tasarım ve kullanılabilirlik konularında uzman',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const achievements = [
    {
      year: '2023',
      title: 'Yılın Sağlık Uygulaması',
      description: 'Türkiye Dijital Sağlık Ödülleri',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      year: '2023',
      title: 'En İyi Kullanıcı Deneyimi',
      description: 'Web Tasarım Ödülleri',
      icon: Award,
      color: 'from-blue-500 to-purple-500'
    },
    {
      year: '2022',
      title: 'İnovasyon Ödülü',
      description: 'Türkiye Teknoloji Zirvesi',
      icon: Lightbulb,
      color: 'from-green-500 to-emerald-500'
    },
    {
      year: '2022',
      title: 'Güvenilirlik Sertifikası',
      description: 'TİTCK Onaylı Veritabanı',
      icon: Award,
      color: 'from-red-500 to-pink-500'
    }
  ]

  const tabs = [
    { id: 'mission', label: 'Misyon & Vizyon', icon: Target },
    { id: 'team', label: 'Ekibimiz', icon: Users },
    { id: 'achievements', label: 'Başarılarımız', icon: Trophy },
    { id: 'contact', label: 'İletişim', icon: Mail }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 blur-xl"
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
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={rotateVariants}
          animate="animate"
          className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-indigo-200 rounded-full opacity-30"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium mb-6"
              >
                <Building className="h-4 w-4 mr-2" />
                Hakkımızda
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                İlaç Bilgi Merkezi
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Hakkında
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Türkiye'nin en kapsamlı ve güvenilir ilaç bilgi platformu.
                Sağlığınız için teknoloji ve uzmanlığı birleştiriyoruz.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('mission')}
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Misyonumuzu Keşfet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('team')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/50 text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Ekibimizi Tanıyın
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
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
            >
              {activeTab === 'mission' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  {/* Mission & Vision */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-4">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Misyonumuz</h3>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Türkiye'deki her bireyin güvenilir, doğru ve güncel ilaç bilgilerine 
                        kolayca erişebilmesini sağlamak. Sağlık okuryazarlığını artırarak 
                        güvenli ilaç kullanımını desteklemek.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Güvenilir bilgi kaynağı olmak</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Kullanıcı dostu platform sağlamak</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Sağlık okuryazarlığını artırmak</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Vizyonumuz</h3>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Türkiye'nin ve bölgenin en kapsamlı dijital sağlık platformu olmak. 
                        Yapay zeka teknolojileri ile kişiselleştirilmiş sağlık deneyimi sunmak.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Lider dijital sağlık platformu</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Yapay zeka destekli hizmetler</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Global erişim ve etki</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Values */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Çalışmalarımızı yönlendiren temel değerler ve prensipler
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-center mb-4">
                          <div className={`p-3 bg-gradient-to-r ${value.color} rounded-full shadow-lg`}>
                            <value.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {value.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Ekibimiz</h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Uzman doktorlar, teknoloji uzmanları ve sağlık profesyonellerinden oluşan deneyimli ekibimiz
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-center mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {member.avatar}
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-sm font-semibold text-indigo-600 mb-1">
                          {member.role}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          {member.specialty}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {member.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Başarılarımız</h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Kısa sürede elde ettiğimiz önemli başarılar ve aldığımız ödüller
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start">
                          <div className={`p-3 bg-gradient-to-r ${achievement.color} rounded-xl mr-4 flex-shrink-0`}>
                            <achievement.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                                {achievement.year}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                              {achievement.title}
                            </h4>
                            <p className="text-gray-600">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'contact' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçin
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <h4 className="text-xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3">
                            <Mail className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">E-posta</p>
                            <p className="text-gray-600">info@ilacbilgimerkezi.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-3">
                            <Phone className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Telefon</p>
                            <p className="text-gray-600">+90 (212) 555 0123</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Adres</p>
                            <p className="text-gray-600">İstanbul, Türkiye</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <h4 className="text-xl font-bold text-gray-900 mb-6">Sosyal Medya</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Instagram, label: 'Instagram', color: 'from-pink-500 to-purple-500' },
                          { icon: Twitter, label: 'Twitter', color: 'from-blue-500 to-cyan-500' },
                          { icon: Facebook, label: 'Facebook', color: 'from-blue-600 to-indigo-600' },
                          { icon: Youtube, label: 'YouTube', color: 'from-red-500 to-pink-500' }
                        ].map((social, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center p-4 bg-gradient-to-r ${social.color} text-white rounded-xl font-semibold transition-all duration-300`}
                          >
                            <social.icon className="h-5 w-5 mr-2" />
                            {social.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default About 
