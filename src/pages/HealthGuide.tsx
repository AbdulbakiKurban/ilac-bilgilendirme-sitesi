import { motion } from 'framer-motion'
import { Heart, Shield, BookOpen, AlertTriangle, Info, Clock, Users, Award } from 'lucide-react'

const HealthGuide = () => {
  const guides = [
    {
      id: 1,
      title: 'İlaç Kullanımında Dikkat Edilecekler',
      description: 'İlaçlarınızı güvenli bir şekilde nasıl kullanacağınızı öğrenin',
      icon: Shield,
      color: 'bg-blue-100 text-blue-600',
      content: [
        'İlaçları doktorunuzun önerdiği dozda kullanın',
        'İlaçları aç/tok karnına kullanım talimatlarına uyun',
        'İlaçları oda sıcaklığında ve kuru yerde saklayın',
        'Son kullanma tarihlerini kontrol edin',
        'İlaçları çocukların ulaşamayacağı yerde saklayın'
      ]
    },
    {
      id: 2,
      title: 'Yan Etkiler ve Belirtiler',
      description: 'İlaç yan etkilerini nasıl tanıyacağınızı ve ne yapacağınızı öğrenin',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      content: [
        'Yan etki belirtilerini takip edin',
        'Ciddi yan etkilerde hemen doktora başvurun',
        'Alerjik reaksiyon belirtilerini öğrenin',
        'İlaç etkileşimlerini kontrol edin',
        'Yan etkileri doktorunuza bildirin'
      ]
    },
    {
      id: 3,
      title: 'Sağlıklı Yaşam İpuçları',
      description: 'Genel sağlığınızı korumak için öneriler',
      icon: Heart,
      color: 'bg-green-100 text-green-600',
      content: [
        'Düzenli egzersiz yapın',
        'Sağlıklı beslenin',
        'Yeterli uyku alın',
        'Stres yönetimi yapın',
        'Düzenli sağlık kontrolleri yaptırın'
      ]
    },
    {
      id: 4,
      title: 'İlaç Etkileşimleri',
      description: 'Hangi ilaçların birlikte kullanılmaması gerektiğini öğrenin',
      icon: Info,
      color: 'bg-purple-100 text-purple-600',
      content: [
        'Alkol ile ilaç etkileşimlerini öğrenin',
        'Bitkisel takviyelerle etkileşimleri kontrol edin',
        'Yemek ile etkileşimleri öğrenin',
        'Diğer ilaçlarla etkileşimleri kontrol edin',
        'Doktorunuza tüm ilaçlarınızı bildirin'
      ]
    }
  ]

  const tips = [
    {
      icon: Clock,
      title: 'Zamanında Kullanım',
      description: 'İlaçlarınızı doktorunuzun önerdiği saatlerde kullanın'
    },
    {
      icon: Users,
      title: 'Doktor Kontrolü',
      description: 'Düzenli olarak doktor kontrolüne gidin'
    },
    {
      icon: Award,
      title: 'Kaliteli İlaç',
      description: 'Sadece güvenilir kaynaklardan ilaç alın'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Sağlık Rehberi
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            İlaç kullanımı, sağlıklı yaşam ve güvenli tedavi hakkında kapsamlı bilgiler
          </p>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {tips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div key={index} className="card p-6 text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-secondary-600">
                  {tip.description}
                </p>
              </div>
            )
          })}
        </motion.div>

        {/* Health Guides */}
        <div className="space-y-8">
          {guides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${guide.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                      {guide.title}
                    </h2>
                    <p className="text-lg text-secondary-600 mb-6">
                      {guide.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {guide.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-secondary-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Emergency Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 p-8 bg-red-50 border border-red-200 rounded-xl"
        >
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-4">
                Acil Durumlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Ne Zaman Acil Servise Gitmelisiniz?</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• Şiddetli alerjik reaksiyon</li>
                    <li>• Nefes darlığı</li>
                    <li>• Bilinç kaybı</li>
                    <li>• Şiddetli kanama</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Acil Telefon Numaraları</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• Acil Servis: 112</li>
                    <li>• Zehir Danışma: 114</li>
                    <li>• Sağlık Bakanlığı: 184</li>
                    <li>• Polis: 155</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Önemli Not
              </h4>
              <p className="text-yellow-700 text-sm">
                Bu rehberdeki bilgiler genel bilgilendirme amaçlıdır. Kişisel sağlık durumunuz için 
                mutlaka doktorunuza danışınız. Bu bilgiler tıbbi tavsiye yerine geçmez.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HealthGuide 