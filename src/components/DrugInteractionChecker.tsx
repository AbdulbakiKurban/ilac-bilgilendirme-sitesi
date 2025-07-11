import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, XCircle, Search, Plus, X } from 'lucide-react'
import { drugs, type Drug } from '../data/drugs'

interface Interaction {
  severity: 'high' | 'medium' | 'low'
  description: string
  recommendation: string
}

const DrugInteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [interactions, setInteractions] = useState<Interaction[]>([])

  // Arama fonksiyonu
  const handleSearch = (query: string) => {
    setSearchTerm(query)
    if (query.trim()) {
      const filtered = drugs.filter(drug =>
        drug.name.toLowerCase().includes(query.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredDrugs(filtered)
    } else {
      setFilteredDrugs([])
    }
  }

  // İlaç ekleme
  const addDrug = (drug: Drug) => {
    if (!selectedDrugs.find(d => d.id === drug.id)) {
      setSelectedDrugs([...selectedDrugs, drug])
      setSearchTerm('')
      setFilteredDrugs([])
      setShowSearch(false)
      checkInteractions([...selectedDrugs, drug])
    }
  }

  // İlaç çıkarma
  const removeDrug = (drugId: number) => {
    const updatedDrugs = selectedDrugs.filter(d => d.id !== drugId)
    setSelectedDrugs(updatedDrugs)
    checkInteractions(updatedDrugs)
  }

  // Etkileşim kontrolü (basit simülasyon)
  const checkInteractions = (drugList: Drug[]) => {
    if (drugList.length < 2) {
      setInteractions([])
      return
    }

    const newInteractions: Interaction[] = []

    // Basit etkileşim kuralları
    for (let i = 0; i < drugList.length; i++) {
      for (let j = i + 1; j < drugList.length; j++) {
        const drug1 = drugList[i]
        const drug2 = drugList[j]

        // Örnek etkileşim kuralları
        if (drug1.category === 'Ağrı Kesici' && drug2.category === 'Ağrı Kesici') {
          newInteractions.push({
            severity: 'medium',
            description: `${drug1.name} ve ${drug2.name} birlikte kullanıldığında mide tahrişi riski artabilir.`,
            recommendation: 'Doktorunuza danışarak kullanın.'
          })
        }

        if (drug1.category === 'Antibiyotik' && drug2.category === 'Vitamin') {
          newInteractions.push({
            severity: 'low',
            description: `${drug1.name} ve ${drug2.name} arasında hafif etkileşim olabilir.`,
            recommendation: 'İlaçları farklı saatlerde almayı deneyin.'
          })
        }

        if (drug1.prescription && drug2.prescription) {
          newInteractions.push({
            severity: 'high',
            description: `${drug1.name} ve ${drug2.name} reçeteli ilaçlardır.`,
            recommendation: 'Mutlaka doktor kontrolünde kullanın.'
          })
        }
      }
    }

    setInteractions(newInteractions)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Seçili İlaçlar */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Seçili İlaçlar
        </h3>
        
        {selectedDrugs.length === 0 ? (
          <p className="text-secondary-600 text-center py-8">
            Etkileşim kontrolü için ilaç ekleyin
          </p>
        ) : (
          <div className="space-y-3">
            {selectedDrugs.map((drug) => (
              <div key={drug.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {drug.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{drug.name}</p>
                    <p className="text-sm text-secondary-600">{drug.genericName}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeDrug(drug.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* İlaç Ekleme */}
        <div className="mt-4">
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="btn-secondary inline-flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              İlaç Ekle
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="İlaç adı ara..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              
              {filteredDrugs.length > 0 && (
                <div className="max-h-48 overflow-y-auto border border-secondary-200 rounded-lg">
                  {filteredDrugs.map((drug) => (
                    <button
                      key={drug.id}
                      onClick={() => addDrug(drug)}
                      className="w-full p-3 text-left hover:bg-secondary-50 border-b border-secondary-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">{drug.name}</p>
                          <p className="text-sm text-secondary-600">{drug.genericName}</p>
                        </div>
                        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                          {drug.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => setShowSearch(false)}
                className="text-secondary-600 hover:text-secondary-800 text-sm"
              >
                İptal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Etkileşim Sonuçları */}
      {selectedDrugs.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Etkileşim Analizi
          </h3>
          
          {interactions.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-green-600 font-medium">Bilinen bir etkileşim bulunamadı</p>
              <p className="text-secondary-600 text-sm mt-1">
                Yine de doktorunuza danışmanızı öneririz
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {interactions.map((interaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${getSeverityColor(interaction.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getSeverityIcon(interaction.severity)}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{interaction.description}</p>
                      <p className="text-sm opacity-90">{interaction.recommendation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Uyarı */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">
              Önemli Uyarı
            </h4>
            <p className="text-yellow-700 text-sm">
              Bu etkileşim kontrolü sadece bilgilendirme amaçlıdır. Kesin sonuçlar için 
              mutlaka doktorunuza danışınız. Bu sistem tıbbi tavsiye yerine geçmez.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrugInteractionChecker 