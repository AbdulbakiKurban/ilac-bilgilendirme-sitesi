import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Filter, Pill, AlertTriangle, Info, FileText, Baby, Shield } from 'lucide-react'
import { searchDrugs, categories, type Drug } from '../data/drugs'

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const filtered = searchDrugs(searchTerm, selectedCategory)
    setFilteredDrugs(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            İlaç Arama
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            İlaç adı, etken madde veya hastalık adı ile arama yapabilirsiniz
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
            <input
              type="text"
              placeholder="İlaç adı, etken madde veya hastalık ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 pr-4 py-4 text-lg"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary inline-flex items-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtreler
              </button>
              {selectedCategory !== 'Tümü' && (
                <span className="text-sm text-secondary-600">
                  Kategori: {selectedCategory}
                </span>
              )}
            </div>
            <div className="text-secondary-600">
              {filteredDrugs.length} ilaç bulundu
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white rounded-lg shadow-lg"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          {filteredDrugs.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                İlaç Bulunamadı
              </h3>
              <p className="text-secondary-600">
                Arama kriterlerinize uygun ilaç bulunamadı. Farklı anahtar kelimeler deneyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrugs.map((drug, index) => (
                <motion.div
                  key={drug.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={drug.image}
                      alt={drug.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                                         <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                         <h3 className="text-lg font-semibold text-secondary-900">
                           {drug.name}
                         </h3>
                         {drug.prescription && (
                           <div className="relative">
                             <FileText className="h-4 w-4 text-red-500" />
                             <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                               Reçeteli
                             </span>
                           </div>
                         )}
                       </div>
                       <p className="text-sm text-secondary-600 mb-2">
                         {drug.genericName}
                       </p>
                       <div className="flex items-center space-x-2 mb-3">
                         <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                           {drug.category}
                         </span>
                         {drug.price && (
                           <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                             {drug.price}
                           </span>
                         )}
                       </div>
                       <p className="text-sm text-secondary-700 mb-3 line-clamp-2">
                         {drug.description}
                       </p>
                                             <div className="flex items-center justify-between">
                         <div className="flex items-center text-xs text-secondary-500">
                           <Info className="h-3 w-3 mr-1" />
                           {drug.dosage.adults}
                         </div>
                         <Link
                           to={`/drug/${drug.id}`}
                           className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                         >
                           Detayları Gör →
                         </Link>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Önemli Uyarı
              </h4>
              <p className="text-sm text-yellow-700">
                Bu sitedeki bilgiler sadece bilgilendirme amaçlıdır. İlaç kullanımı öncesi mutlaka 
                doktorunuza danışınız. Kendi kendinize ilaç kullanmayınız.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DrugSearch 