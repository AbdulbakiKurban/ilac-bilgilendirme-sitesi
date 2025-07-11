import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, XCircle, Search, Plus, X, Info, Shield, Heart, Clock } from 'lucide-react'
import { drugs, type Drug } from '../data/drugs'

interface Interaction {
  severity: 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  riskLevel: string
  symptoms: string[]
  alternatives: string[]
}

interface InteractionResult {
  totalRisk: 'high' | 'medium' | 'low'
  interactions: Interaction[]
  summary: string
  recommendations: string[]
}

const DrugInteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [interactionResult, setInteractionResult] = useState<InteractionResult | null>(null)
  const [showDetails, setShowDetails] = useState(false)

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
      const updatedDrugs = [...selectedDrugs, drug]
      setSelectedDrugs(updatedDrugs)
      setSearchTerm('')
      setFilteredDrugs([])
      setShowSearch(false)
      checkInteractions(updatedDrugs)
    }
  }

  // İlaç çıkarma
  const removeDrug = (drugId: number) => {
    const updatedDrugs = selectedDrugs.filter(d => d.id !== drugId)
    setSelectedDrugs(updatedDrugs)
    checkInteractions(updatedDrugs)
  }

  // Gelişmiş etkileşim kontrolü
  const checkInteractions = (drugList: Drug[]) => {
    if (drugList.length < 2) {
      setInteractionResult(null)
      return
    }

    const interactions: Interaction[] = []
    let highRiskCount = 0
    let mediumRiskCount = 0
    let lowRiskCount = 0

    // Detaylı etkileşim kuralları
    for (let i = 0; i < drugList.length; i++) {
      for (let j = i + 1; j < drugList.length; j++) {
        const drug1 = drugList[i]
        const drug2 = drugList[j]

        // Ağrı kesici + Ağrı kesici
        if (drug1.category === 'Ağrı Kesici' && drug2.category === 'Ağrı Kesici') {
          interactions.push({
            severity: 'medium',
            description: `${drug1.name} ve ${drug2.name} birlikte kullanıldığında mide tahrişi ve kanama riski artabilir.`,
            recommendation: 'Doktorunuza danışarak kullanın. Mide koruyucu ilaç almayı düşünün.',
            riskLevel: 'Orta Risk',
            symptoms: ['Mide ağrısı', 'Mide bulantısı', 'Kanama riski'],
            alternatives: ['Tek ağrı kesici kullanın', 'Mide koruyucu ekleyin', 'Alternatif tedavi yöntemleri']
          })
          mediumRiskCount++
        }

        // Antibiyotik + Vitamin
        if (drug1.category === 'Antibiyotik' && drug2.category === 'Vitamin') {
          interactions.push({
            severity: 'low',
            description: `${drug1.name} ve ${drug2.name} arasında hafif etkileşim olabilir. Vitamin emilimi azalabilir.`,
            recommendation: 'İlaçları farklı saatlerde almayı deneyin. Vitamin alımını antibiyotik tedavisi sonrasına erteleyin.',
            riskLevel: 'Düşük Risk',
            symptoms: ['Vitamin emiliminde azalma', 'Hafif mide rahatsızlığı'],
            alternatives: ['2 saat ara ile alın', 'Vitamin alımını erteleyin', 'Sıvı formda vitamin kullanın']
          })
          lowRiskCount++
        }

        // Reçeteli + Reçeteli
        if (drug1.prescription && drug2.prescription) {
          interactions.push({
            severity: 'high',
            description: `${drug1.name} ve ${drug2.name} reçeteli ilaçlardır. Güçlü etkileşim riski vardır.`,
            recommendation: 'Mutlaka doktor kontrolünde kullanın. Düzenli kan testleri yaptırın.',
            riskLevel: 'Yüksek Risk',
            symptoms: ['Güçlü yan etkiler', 'İlaç etkinliğinde değişim', 'Toksik etki riski'],
            alternatives: ['Doktor kontrolü', 'Alternatif ilaçlar', 'Doz ayarlaması']
          })
          highRiskCount++
        }

        // Kardiyovasküler + Diüretik
        if ((drug1.category === 'Kardiyovasküler' && drug2.category === 'Gastrointestinal') ||
            (drug1.category === 'Gastrointestinal' && drug2.category === 'Kardiyovasküler')) {
          interactions.push({
            severity: 'medium',
            description: `${drug1.name} ve ${drug2.name} birlikte kullanıldığında elektrolit dengesi bozulabilir.`,
            recommendation: 'Düzenli kan testleri yaptırın. Doktor kontrolünde kullanın.',
            riskLevel: 'Orta Risk',
            symptoms: ['Baş dönmesi', 'Halsizlik', 'Kas krampları'],
            alternatives: ['Elektrolit takibi', 'Doz ayarlaması', 'Alternatif ilaçlar']
          })
          mediumRiskCount++
        }

        // Psikiyatrik + Alkol (simülasyon)
        if (drug1.category === 'Psikiyatrik' || drug2.category === 'Psikiyatrik') {
          interactions.push({
            severity: 'high',
            description: `${drug1.name} ve ${drug2.name} birlikte kullanıldığında merkezi sinir sistemi baskılanması riski vardır.`,
            recommendation: 'Alkol kullanımından kaçının. Araç kullanmayın. Doktor kontrolünde kullanın.',
            riskLevel: 'Yüksek Risk',
            symptoms: ['Aşırı uyku hali', 'Solunum baskılanması', 'Koordinasyon bozukluğu'],
            alternatives: ['Alkol kullanmayın', 'Araç kullanmayın', 'Doktor kontrolü']
          })
          highRiskCount++
        }
      }
    }

    // Toplam risk hesaplama
    let totalRisk: 'high' | 'medium' | 'low' = 'low'
    if (highRiskCount > 0) {
      totalRisk = 'high'
    } else if (mediumRiskCount > 0) {
      totalRisk = 'medium'
    }

    // Özet ve öneriler
    const summary = `${interactions.length} etkileşim tespit edildi. ${highRiskCount} yüksek, ${mediumRiskCount} orta, ${lowRiskCount} düşük riskli etkileşim.`
    
    const recommendations = [
      'Tüm ilaçlarınızı doktorunuza bildirin',
      'Reçeteli ilaçları doktor kontrolünde kullanın',
      'Yan etki belirtilerini takip edin',
      'Düzenli kan testleri yaptırın',
      'Alkol kullanımından kaçının'
    ]

    setInteractionResult({
      totalRisk,
      interactions,
      summary,
      recommendations
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200'
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200'
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

  const getTotalRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-white'
      case 'low':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="space-y-6">
      {/* Seçili İlaçlar */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary-600" />
          Seçili İlaçlar
        </h3>
        
        {selectedDrugs.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <p className="text-secondary-600">
              Etkileşim kontrolü için ilaç ekleyin
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDrugs.map((drug) => (
              <motion.div
                key={drug.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg border border-secondary-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {drug.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{drug.name}</p>
                    <p className="text-sm text-secondary-600">{drug.genericName}</p>
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mt-1">
                      {drug.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeDrug(drug.id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
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
                        <div className="text-right">
                          <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                            {drug.category}
                          </span>
                          {drug.prescription && (
                            <div className="text-xs text-red-600 mt-1">Reçeteli</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Etkileşim Sonuçları */}
      <AnimatePresence>
        {interactionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-6"
          >
            {/* Risk Özeti */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary-900 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary-600" />
                Etkileşim Analizi
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTotalRiskColor(interactionResult.totalRisk)}`}>
                {interactionResult.totalRisk === 'high' ? 'Yüksek Risk' : 
                 interactionResult.totalRisk === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
              </div>
            </div>

            {/* Özet */}
            <div className="bg-secondary-50 p-4 rounded-lg mb-6">
              <p className="text-secondary-700 text-sm">{interactionResult.summary}</p>
            </div>

            {/* Etkileşimler */}
            <div className="space-y-4">
              {interactionResult.interactions.map((interaction, index) => (
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
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-secondary-900">{interaction.riskLevel}</h4>
                      </div>
                      <p className="text-sm text-secondary-700 mb-2">{interaction.description}</p>
                      <p className="text-sm font-medium text-secondary-900 mb-2">Öneri:</p>
                      <p className="text-sm text-secondary-700 mb-3">{interaction.recommendation}</p>
                      
                      {/* Detaylar */}
                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            <div>
                              <p className="text-xs font-medium text-secondary-700 mb-1">Belirtiler:</p>
                              <div className="flex flex-wrap gap-1">
                                {interaction.symptoms.map((symptom, idx) => (
                                  <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-secondary-700 mb-1">Alternatifler:</p>
                              <div className="flex flex-wrap gap-1">
                                {interaction.alternatives.map((alt, idx) => (
                                  <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    {alt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {showDetails ? 'Detayları Gizle' : 'Detayları Göster'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Genel Öneriler */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Genel Öneriler
              </h4>
              <ul className="space-y-1">
                {interactionResult.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-700 flex items-start">
                    <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uyarı */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Önemli Uyarı</h4>
            <p className="text-yellow-700 text-sm">
              Bu analiz sadece bilgilendirme amaçlıdır. İlaç etkileşimleri kişisel faktörlere göre değişebilir. 
              Mutlaka doktorunuza danışın ve reçeteli ilaçları doktor kontrolünde kullanın.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrugInteractionChecker 