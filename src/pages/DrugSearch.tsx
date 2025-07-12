import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Filter, Pill, AlertTriangle, Info, FileText, Baby, Shield, Clock, TrendingUp, ZoomIn, Star, CheckCircle, BookOpen, Download, Sparkles, Zap, Heart, Target, Award } from 'lucide-react'

// Reçete rengi yardımcı fonksiyonları
const getPrescriptionColor = (color?: string) => {
  switch (color) {
    case 'blue': return 'text-blue-500'
    case 'red': return 'text-red-500'
    case 'green': return 'text-green-500'
    case 'yellow': return 'text-yellow-500'
    case 'purple': return 'text-purple-500'
    case 'orange': return 'text-orange-500'
    case 'pink': return 'text-pink-500'
    case 'brown': return 'text-amber-600'
    case 'gray': return 'text-gray-500'
    case 'black': return 'text-gray-800'
    case 'white': return 'text-gray-400'
    default: return 'text-blue-500'
  }
}

const getPrescriptionBgColor = (color?: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-600'
    case 'red': return 'bg-red-600'
    case 'green': return 'bg-green-600'
    case 'yellow': return 'bg-yellow-600'
    case 'purple': return 'bg-purple-600'
    case 'orange': return 'bg-orange-600'
    case 'pink': return 'bg-pink-600'
    case 'brown': return 'bg-amber-700'
    case 'gray': return 'bg-gray-600'
    case 'black': return 'bg-gray-800'
    case 'white': return 'bg-gray-200'
    default: return 'bg-blue-600'
  }
}

import { searchDrugs, categories, type Drug } from '../data/drugs'
import ImageZoom from '../components/ImageZoom'

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const filteredDrugs = searchDrugs(searchTerm, selectedCategory)

  // Popüler aramalar
  const popularSearches = ['Ağrı Kesici', 'Antibiyotik', 'Vitamin', 'Kardiyovasküler', 'Lidodeks', 'Parol']

  // Arama geçmişini kaydet
  const saveSearch = (term: string) => {
    if (term.trim() && !recentSearches.includes(term)) {
      const updated = [term, ...recentSearches.slice(0, 4)]
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
    }
  }

  // Arama geçmişini yükle
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Dışarı tıklama ile önerileri kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    saveSearch(term)
    setShowSuggestions(false)
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6 flex-wrap">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-4 mb-2"
            >
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-center leading-tight">
              İlaç Bilgi Merkezi
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="ml-4 mb-2"
            >
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Güvenilir, kapsamlı ve güncel ilaç bilgilerine anında erişim. 
            <span className="text-blue-600 font-semibold"> 1000+ ilaç</span> hakkında detaylı bilgi.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
          ref={searchRef}
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="İlaç adı, etken madde veya kategori ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
              />
              <motion.div
                animate={{ scale: searchTerm ? 1 : 0.8 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Target className="h-5 w-5 text-blue-500" />
              </motion.div>
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && (searchTerm || recentSearches.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                >
                  {recentSearches.length > 0 && (
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Son Aramalar
                      </h3>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ backgroundColor: "#f3f4f6" }}
                            onClick={() => handleSearch(search)}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {search}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Popüler Aramalar
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((search, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary inline-flex items-center bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtreler
              </motion.button>
              {selectedCategory !== 'Tümü' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full shadow-lg"
                >
                  {selectedCategory}
                </motion.span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
              >
                <option value="name">İsme Göre</option>
                <option value="category">Kategoriye Göre</option>
              </select>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <span className="font-semibold text-blue-600">{filteredDrugs.length}</span> ilaç bulundu
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-blue-600" />
                  Kategoriler
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border-2 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredDrugs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="mb-6"
              >
                <AlertTriangle className="h-20 w-20 text-gray-400 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                İlaç Bulunamadı
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Arama kriterlerinize uygun ilaç bulunamadı. Farklı anahtar kelimeler deneyebilirsiniz.
              </p>
              <div className="flex justify-center space-x-3">
                {popularSearches.slice(0, 3).map((search, index) => (
                  <motion.button
                    key={search}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch(search)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDrugs.map((drug, index) => (
                <motion.div
                  key={drug.id}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group"
                >
                  <motion.div
                    variants={cardHoverVariants}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={drug.image}
                              alt={drug.name}
                              className="w-20 h-20 object-cover rounded-xl shadow-md"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-1.5 shadow-lg"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </motion.div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <motion.h3
                              whileHover={{ color: "#3b82f6" }}
                              className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                            >
                              {drug.name}
                            </motion.h3>
                            {drug.prescription && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative group"
                              >
                                <FileText className={`h-5 w-5 ${getPrescriptionColor(drug.prescriptionColor)}`} />
                                <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${getPrescriptionBgColor(drug.prescriptionColor)} text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg`}>
                                  Reçeteli
                                </span>
                              </motion.div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 font-medium">
                            {drug.genericName}
                          </p>
                          
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-medium mb-3"
                          >
                            {drug.category}
                          </motion.div>
                          
                          <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                            {drug.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <Info className="h-3 w-3 mr-1" />
                              <span className="line-clamp-1">{drug.dosage.adults}</span>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                to={`/drug/${drug.id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center group-hover:underline transition-all duration-200"
                              >
                                Detayları Gör
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  →
                                </motion.div>
                              </Link>
                            </motion.div>
                          </div>
                          
                          {/* KÜB PDF Link */}
                          {drug.prescription && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="mt-3"
                            >
                              <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href={drug.name === 'Lidodeks' ? 'https://titck.gov.tr/storage/kubKtAttachments/lIuHIb0hrWwWX.pdf' : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs rounded-full hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                              >
                                <BookOpen className="h-3 w-3 mr-1" />
                                KÜB PDF
                                <Download className="h-3 w-3 ml-1" />
                              </motion.a>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Enhanced Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
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
                  <Heart className="h-5 w-5 mr-2" />
                  Önemli Güvenlik Uyarısı
                </h4>
                <p className="text-yellow-700 leading-relaxed">
                  Bu bilgiler sadece bilgilendirme amaçlıdır. İlaç kullanımı öncesi mutlaka doktorunuza danışın. 
                  Reçeteli ilaçları doktor reçetesi olmadan kullanmayın. Sağlığınız bizim önceliğimizdir.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DrugSearch 