import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Search, Plus, CheckCircle } from 'lucide-react'
import DrugInteractionChecker from '../components/DrugInteractionChecker'

const DrugInteraction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            İlaç Etkileşim Kontrolü
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Kullandığınız ilaçların birbirleriyle etkileşimini kontrol edin ve güvenli kullanım için öneriler alın
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="card p-6 text-center">
            <Search className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Kolay Arama
            </h3>
            <p className="text-secondary-600 text-sm">
              İlaç adı veya etken madde ile hızlı arama yapın
            </p>
          </div>
          <div className="card p-6 text-center">
            <Plus className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Çoklu İlaç
            </h3>
            <p className="text-secondary-600 text-sm">
              Birden fazla ilacı aynı anda kontrol edin
            </p>
          </div>
          <div className="card p-6 text-center">
            <CheckCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Anında Sonuç
            </h3>
            <p className="text-secondary-600 text-sm">
              Etkileşim analizi anında gerçekleşir
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <DrugInteractionChecker />
        </motion.div>

        {/* Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* How It Works */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Nasıl Çalışır?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900">İlaçları Seçin</h4>
                  <p className="text-secondary-600 text-sm">
                    Kullandığınız ilaçları arama kutusundan bulup ekleyin
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900">Analiz Edin</h4>
                  <p className="text-secondary-600 text-sm">
                    Sistem ilaçlar arasındaki etkileşimleri kontrol eder
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900">Sonuçları İnceleyin</h4>
                  <p className="text-secondary-600 text-sm">
                    Etkileşim riskleri ve önerileri görüntüleyin
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Levels */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Risk Seviyeleri
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-secondary-900">Yüksek Risk</h4>
                  <p className="text-secondary-600 text-sm">
                    Ciddi etkileşim riski, mutlaka doktora danışın
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-secondary-900">Orta Risk</h4>
                  <p className="text-secondary-600 text-sm">
                    Dikkatli kullanım gerekli, doktor kontrolü önerilir
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-secondary-900">Düşük Risk</h4>
                  <p className="text-secondary-600 text-sm">
                    Hafif etkileşim, genellikle güvenli kullanım
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 card p-8"
        >
          <h3 className="text-xl font-semibold text-secondary-900 mb-6">
            Güvenli İlaç Kullanımı İpuçları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-700 text-sm">
                  Tüm ilaçlarınızı doktorunuza bildirin
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-700 text-sm">
                  Reçeteli ve reçetesiz ilaçları birlikte kontrol edin
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-700 text-sm">
                  Bitkisel takviyeleri de dahil edin
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-700 text-sm">
                  İlaçları önerilen saatlerde alın
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-700 text-sm">
                  Yan etki belirtilerini takip edin
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-700 text-sm">
                  Şüpheli durumlarda hemen doktora başvurun
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DrugInteraction 