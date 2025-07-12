import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Brain, 
  Activity, 
  Shield, 
  Clock, 
  Star, 
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
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Globe,
  Database,
  Lock,
  Eye,
  Info,
  AlertTriangle,
  CheckCircle,
  Zap,
  Sparkles,
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
  Calculator
} from 'lucide-react'

const HealthGuide = () => {
  const [activeTab, setActiveTab] = useState('general')
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

  const categories = [
    {
      id: 'general',
      label: 'Genel Sağlık',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'mental',
      label: 'Ruh Sağlığı',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'nutrition',
      label: 'Beslenme',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'exercise',
      label: 'Egzersiz',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'prevention',
      label: 'Koruyucu Hekimlik',
      icon: Shield,
      color: 'from-orange-500 to-yellow-500'
    }
  ]

  const guides = {
    general: [
      {
        title: 'Günlük Sağlık Rutini',
        description: 'Sağlıklı bir gün için yapmanız gerekenler',
      icon: Clock,
        color: 'from-blue-500 to-cyan-500',
        tips: [
          'Günde 7-8 saat uyuyun',
          'Kahvaltıyı atlamayın',
          'Günde 8 bardak su için',
          'Düzenli egzersiz yapın'
        ]
      },
      {
        title: 'Bağışıklık Sistemi Güçlendirme',
        description: 'Doğal yollarla bağışıklığınızı güçlendirin',
        icon: Shield,
        color: 'from-green-500 to-emerald-500',
        tips: [
          'C vitamini açısından zengin besinler tüketin',
          'Düzenli uyku uyuyun',
          'Stresten uzak durun',
          'Probiyotik besinler tüketin'
        ]
      },
      {
        title: 'Kalp Sağlığı',
        description: 'Kalbinizi korumak için öneriler',
        icon: Heart,
        color: 'from-red-500 to-pink-500',
        tips: [
          'Düzenli kardiyovasküler egzersiz yapın',
          'Tuz tüketimini azaltın',
          'Omega-3 açısından zengin besinler tüketin',
          'Sigara ve alkolden uzak durun'
        ]
      }
    ],
    mental: [
      {
        title: 'Stres Yönetimi',
        description: 'Günlük stresle başa çıkma yöntemleri',
        icon: Brain,
        color: 'from-purple-500 to-indigo-500',
        tips: [
          'Meditasyon ve nefes egzersizleri yapın',
          'Hobilerinize zaman ayırın',
          'Sosyal bağlantılarınızı güçlendirin',
          'Profesyonel destek almayı düşünün'
        ]
      },
      {
        title: 'Uyku Kalitesi',
        description: 'Daha iyi uyku için ipuçları',
        icon: Moon,
        color: 'from-indigo-500 to-purple-500',
        tips: [
          'Düzenli uyku saatleri belirleyin',
          'Yatak odanızı serin ve karanlık tutun',
          'Elektronik cihazları yatak odasından çıkarın',
          'Yatmadan önce rahatlatıcı aktiviteler yapın'
        ]
      }
    ],
    nutrition: [
      {
        title: 'Dengeli Beslenme',
        description: 'Sağlıklı beslenme için temel kurallar',
        icon: Leaf,
        color: 'from-green-500 to-emerald-500',
        tips: [
          'Meyve ve sebze tüketimini artırın',
          'Protein açısından zengin besinler tüketin',
          'İşlenmiş gıdalardan uzak durun',
          'Porsiyon kontrolü yapın'
        ]
      },
      {
        title: 'Vitamin ve Mineraller',
        description: 'Vücudunuzun ihtiyaç duyduğu besinler',
        icon: Pill,
        color: 'from-yellow-500 to-orange-500',
        tips: [
          'D vitamini için güneş ışığından faydalanın',
          'Demir açısından zengin besinler tüketin',
          'Kalsiyum için süt ürünlerini tercih edin',
          'B vitaminleri için tam tahıllı ürünler tüketin'
        ]
      }
    ],
    exercise: [
      {
        title: 'Kardiyovasküler Egzersiz',
        description: 'Kalp sağlığı için egzersiz önerileri',
        icon: Activity,
        color: 'from-blue-500 to-cyan-500',
        tips: [
          'Haftada 150 dakika orta şiddetli egzersiz yapın',
          'Yürüyüş, koşu veya bisiklet sürün',
          'Egzersiz öncesi ısınmayı unutmayın',
          'Düzenli olarak egzersiz yapın'
        ]
      },
      {
        title: 'Güç Antrenmanı',
        description: 'Kas gücü ve kemik sağlığı için',
        icon: Target,
        color: 'from-red-500 to-orange-500',
        tips: [
          'Haftada 2-3 kez güç antrenmanı yapın',
          'Tüm kas gruplarını çalıştırın',
          'Doğru form ve teknik kullanın',
          'Aşamalı olarak ağırlığı artırın'
        ]
      }
    ],
    prevention: [
      {
        title: 'Düzenli Kontroller',
        description: 'Önleyici sağlık kontrolleri',
        icon: Stethoscope,
        color: 'from-green-500 to-teal-500',
        tips: [
          'Yıllık genel sağlık kontrolü yaptırın',
          'Kan basıncınızı düzenli ölçtürün',
          'Kolesterol seviyenizi kontrol ettirin',
          'Aşılarınızı güncel tutun'
        ]
      },
      {
        title: 'Hijyen ve Temizlik',
        description: 'Hastalıklardan korunma yöntemleri',
        icon: Shield,
        color: 'from-blue-500 to-indigo-500',
        tips: [
          'Ellerinizi sık sık yıkayın',
          'Kişisel hijyeninize dikkat edin',
          'Çevrenizi temiz tutun',
          'Hasta kişilerle yakın temastan kaçının'
        ]
      }
    ]
  }

  const stats = [
    { number: '1000+', label: 'Sağlık Rehberi', icon: BookOpen, color: 'from-blue-500 to-purple-600' },
    { number: '50+', label: 'Uzman Doktor', icon: Users, color: 'from-green-500 to-emerald-600' },
    { number: '99%', label: 'Güvenilir Bilgi', icon: Award, color: 'from-purple-500 to-pink-600' },
    { number: '24/7', label: 'Erişim', icon: Clock, color: 'from-indigo-500 to-blue-600' }
  ]

  const tabs = [
    { id: 'general', label: 'Genel Sağlık', icon: Heart },
    { id: 'mental', label: 'Ruh Sağlığı', icon: Brain },
    { id: 'nutrition', label: 'Beslenme', icon: Leaf },
    { id: 'exercise', label: 'Egzersiz', icon: Activity },
    { id: 'prevention', label: 'Koruyucu Hekimlik', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-400 to-green-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={rotateVariants}
          animate="animate"
          className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-green-200 rounded-full opacity-30"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20"
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
                <Heart className="h-4 w-4 mr-2" />
                Uzman Sağlık Rehberi
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
            Sağlık Rehberi
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Merkezi
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Uzman doktorlar tarafından hazırlanmış kapsamlı sağlık rehberi.
                Sağlıklı yaşam için profesyonel öneriler ve ipuçları.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('general')}
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Rehberi Keşfet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('prevention')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/50 text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Koruyucu Hekimlik
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
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
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
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {guides[activeTab as keyof typeof guides]?.map((guide, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-green-300 transition-all duration-300 h-full relative overflow-hidden group"
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${guide.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`p-4 bg-gradient-to-r ${guide.color} rounded-2xl shadow-lg`}
                        >
                          <guide.icon className="h-8 w-8 text-white" />
                        </motion.div>
                  </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      {guide.title}
                      </h3>
                      
                      <p className="text-gray-600 text-center leading-relaxed mb-6">
                      {guide.description}
                    </p>
                      
                      <div className="space-y-3">
                        {guide.tips.map((tip, tipIndex) => (
                          <motion.div
                            key={tipIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: tipIndex * 0.1 }}
                            className="flex items-start p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{tip}</span>
                          </motion.div>
                      ))}
                    </div>
                  </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ek Sağlık Kaynakları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sağlığınız için faydalı olabilecek ek kaynaklar ve araçlar
              </p>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Calculator,
                  title: 'BMI Hesaplayıcı',
                  description: 'Vücut kitle indeksinizi hesaplayın',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Activity,
                  title: 'Kalori Takipçisi',
                  description: 'Günlük kalori alımınızı takip edin',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Clock,
                  title: 'Uyku Takipçisi',
                  description: 'Uyku kalitenizi izleyin',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Heart,
                  title: 'Kalp Sağlığı Testi',
                  description: 'Kalp sağlığınızı değerlendirin',
                  color: 'from-red-500 to-orange-500'
                }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-r ${resource.color} rounded-full shadow-lg`}>
                      <resource.icon className="h-6 w-6 text-white" />
                </div>
              </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {resource.description}
                  </p>
                </motion.div>
              ))}
          </div>
        </motion.div>

          {/* Expert Advice Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Uzman Tavsiyeleri
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sağlık profesyonellerinden özel öneriler ve ipuçları
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Dr. Ahmet Yılmaz",
                    specialty: "Kardiyoloji",
                    advice: "Günde en az 30 dakika yürüyüş yapın ve tuz tüketimini azaltın.",
                    avatar: "AY"
                  },
                  {
                    name: "Dr. Ayşe Demir",
                    specialty: "Beslenme Uzmanı",
                    advice: "Mevsiminde sebze ve meyve tüketin, işlenmiş gıdalardan uzak durun.",
                    avatar: "AD"
                  },
                  {
                    name: "Dr. Mehmet Kaya",
                    specialty: "Spor Hekimliği",
                    advice: "Düzenli egzersiz yapın ve vücudunuzu dinleyin, aşırıya kaçmayın.",
                    avatar: "MK"
                  }
                ].map((expert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {expert.avatar}
                      </div>
            <div>
                        <h4 className="font-bold text-gray-900">{expert.name}</h4>
                        <p className="text-sm text-gray-600">{expert.specialty}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{expert.advice}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          </div>
      </div>
    </div>
  )
}

export default HealthGuide 
