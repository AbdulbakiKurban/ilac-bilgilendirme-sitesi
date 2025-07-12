import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Plus, 
  Minus, 
  Zap, 
  Shield, 
  Heart, 
  Brain, 
  Activity, 
  Sparkles, 
  Target, 
  Award, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Globe, 
  Database, 
  Lock, 
  Eye, 
  Info, 
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
  HelpCircle
} from 'lucide-react'
import DrugInteractionChecker from '../components/DrugInteractionChecker'

const DrugInteraction = () => {
  const [activeTab, setActiveTab] = useState('checker')
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

  const features = [
    {
      icon: Zap,
      title: 'Anında Kontrol',
      description: 'İlaçlarınız arasındaki etkileşimleri saniyeler içinde kontrol edin',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Güvenli Sonuçlar',
      description: 'TİTCK onaylı veritabanından gelen güvenilir bilgiler',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: 'Akıllı Analiz',
      description: 'Yapay zeka destekli etkileşim analizi ve öneriler',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: AlertTriangle,
      title: 'Uyarı Sistemi',
      description: 'Kritik etkileşimler için anında uyarı sistemi',
      color: 'from-red-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-red-500 to-orange-500'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Kontrol Edilen', icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
    { number: '1000+', label: 'İlaç Veritabanı', icon: Database, color: 'from-blue-500 to-purple-600' },
    { number: '99.9%', label: 'Doğruluk Oranı', icon: Award, color: 'from-purple-500 to-pink-600' },
    { number: '24/7', label: 'Erişim', icon: Clock, color: 'from-indigo-500 to-blue-600' }
  ]

  const tips = [
    {
      icon: Info,
      title: 'Etkileşim Nedir?',
      description: 'İki veya daha fazla ilacın birlikte kullanıldığında birbirlerinin etkilerini değiştirmesi durumudur.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: AlertTriangle,
      title: 'Dikkat Edilmesi Gerekenler',
      description: 'Reçetesiz ilaçlar, bitkisel ürünler ve vitaminler de etkileşime girebilir.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: CheckCircle,
      title: 'Güvenli Kullanım',
      description: 'Her zaman doktorunuza danışın ve ilaçlarınızı reçetede belirtilen şekilde kullanın.',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const tabs = [
    { id: 'checker', label: 'Etkileşim Kontrolü', icon: Search },
    { id: 'guide', label: 'Kullanım Rehberi', icon: BookOpen },
    { id: 'faq', label: 'Sık Sorulan Sorular', icon: HelpCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={rotateVariants}
          animate="animate"
          className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-purple-200 rounded-full opacity-30"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-20"
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
                <Zap className="h-4 w-4 mr-2" />
                Güvenli İlaç Kullanımı
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                İlaç Etkileşim
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Kontrol Merkezi
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                İlaçlarınız arasındaki etkileşimleri kontrol edin, güvenli tedavi sağlayın.
                Yapay zeka destekli analiz ile anında sonuç alın.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('checker')}
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Hemen Kontrol Et
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('guide')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/50 text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Rehberi İncele
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
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
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
              {activeTab === 'checker' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Checker */}
                  <div className="lg:col-span-2">
                    <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                          <Search className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">İlaç Etkileşim Kontrolü</h3>
                      </div>
                      
          <DrugInteractionChecker />
        </motion.div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Features */}
        <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h3>
                      
            <div className="space-y-4">
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-lg mr-3 flex-shrink-0`}>
                              <feature.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                              <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                              <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
                          </motion.div>
                        ))}
              </div>
                    </motion.div>

                    {/* Tips */}
                    <motion.div
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Önemli İpuçları</h3>
                      
                      <div className="space-y-4">
                        {tips.map((tip, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
                          >
                            <div className="flex items-start">
                              <div className={`p-2 bg-gradient-to-r ${tip.color} rounded-lg mr-3 flex-shrink-0`}>
                                <tip.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                                <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                                <p className="text-gray-600 text-xs">{tip.description}</p>
                </div>
              </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                </div>
                </div>
              )}

              {activeTab === 'guide' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Guide Content */}
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
                      <h3 className="text-2xl font-bold text-gray-900">Güvenli İlaç Kullanım Rehberi</h3>
            </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                              Doğru Kullanım
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              <li>• İlaçları reçetede belirtilen dozda kullanın</li>
                              <li>• Zamanında alın ve düzenli kullanın</li>
                              <li>• Aç/tok karnına alma talimatlarına uyun</li>
                              <li>• İlaçları uygun koşullarda saklayın</li>
                            </ul>
          </div>

                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Shield className="h-5 w-5 text-green-500 mr-2" />
                              Güvenlik Önlemleri
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              <li>• Doktorunuza tüm ilaçlarınızı bildirin</li>
                              <li>• Alerjilerinizi mutlaka belirtin</li>
                              <li>• Hamilelik/emzirme durumunu bildirin</li>
                              <li>• Yan etkileri takip edin</li>
                            </ul>
                </div>
              </div>
                        
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                              Dikkat Edilmesi Gerekenler
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              <li>• Reçetesiz ilaçları doktorunuza danışın</li>
                              <li>• Bitkisel ürünleri bildirin</li>
                              <li>• Vitamin ve takviyeleri unutmayın</li>
                              <li>• Alkol kullanımını belirtin</li>
                            </ul>
                </div>
                          
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Info className="h-5 w-5 text-purple-500 mr-2" />
                              Acil Durumlar
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              <li>• Şiddetli yan etkilerde acil servise gidin</li>
                              <li>• Alerjik reaksiyonlarda hemen müdahale</li>
                              <li>• Aşırı doz durumunda zehir danışma hattı</li>
                              <li>• İlaç hatırlatıcıları kullanın</li>
                            </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* FAQ Content */}
        <motion.div
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={cardHoverVariants}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200"
                  >
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mr-4">
                        <HelpCircle className="h-6 w-6 text-white" />
              </div>
                      <h3 className="text-2xl font-bold text-gray-900">Sık Sorulan Sorular</h3>
              </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          question: "İlaç etkileşimi nedir?",
                          answer: "İki veya daha fazla ilacın birlikte kullanıldığında birbirlerinin etkilerini değiştirmesi durumudur. Bu durum ilaçların etkinliğini azaltabilir veya yan etkileri artırabilir."
                        },
                        {
                          question: "Hangi ilaçlar etkileşime girebilir?",
                          answer: "Reçeteli ilaçlar, reçetesiz ilaçlar, bitkisel ürünler, vitaminler ve takviyeler etkileşime girebilir. Hatta bazı gıdalar da ilaçlarla etkileşime girebilir."
                        },
                        {
                          question: "Etkileşim kontrolü ne kadar güvenilir?",
                          answer: "Sistemimiz TİTCK onaylı veritabanını kullanır ve %99.9 doğruluk oranına sahiptir. Ancak her zaman doktorunuza danışmanız önerilir."
                        },
                        {
                          question: "Yan etki yaşarsam ne yapmalıyım?",
                          answer: "Hafif yan etkiler için doktorunuza danışın. Şiddetli yan etkiler, alerjik reaksiyonlar veya nefes darlığı durumunda acil servise başvurun."
                        }
                      ].map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200"
                        >
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Info className="h-5 w-5 text-blue-500 mr-2" />
                            {faq.question}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      ))}
          </div>
        </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default DrugInteraction 
