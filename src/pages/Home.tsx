import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Shield, Heart, BookOpen, TrendingUp, Users, Award, Zap } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Güvenilir Bilgi',
      description: 'Uzman doktorlar tarafından onaylanmış, güncel ilaç bilgileri'
    },
    {
      icon: Heart,
      title: 'Kullanıcı Dostu',
      description: 'Kolay kullanım ve anlaşılır arayüz ile hızlı bilgi erişimi'
    },
    {
      icon: BookOpen,
      title: 'Detaylı Rehber',
      description: 'Yan etkiler, dozaj bilgileri ve kullanım talimatları'
    },
    {
      icon: TrendingUp,
      title: 'Güncel Veriler',
      description: 'Sürekli güncellenen ilaç veritabanı ve sağlık bilgileri'
    },
    {
      icon: Shield,
      title: 'Etkileşim Kontrolü',
      description: 'İlaçlar arası etkileşimleri kontrol edin ve güvenli kullanım sağlayın'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'İlaç Bilgisi', icon: Award },
    { number: '50,000+', label: 'Mutlu Kullanıcı', icon: Users },
    { number: '99.9%', label: 'Doğruluk Oranı', icon: Zap },
    { number: '24/7', label: 'Erişim', icon: Shield }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                İlaç Bilgilerine
                <span className="block text-primary-200">Güvenli Erişim</span>
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Türkiye'nin en kapsamlı ilaç bilgilendirme platformu. Güvenilir, 
                güncel ve kullanıcı dostu arayüz ile sağlığınız için doğru bilgilere ulaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search" className="btn-primary inline-flex items-center justify-center">
                  <Search className="mr-2 h-5 w-5" />
                  İlaç Ara
                </Link>
                <Link to="/interaction" className="btn-secondary inline-flex items-center justify-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Etkileşim Kontrolü
                </Link>
                <Link to="/guide" className="btn-secondary inline-flex items-center justify-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Sağlık Rehberi
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Güvenli ve Doğru</h3>
                      <p className="text-primary-100">Uzman onaylı bilgiler</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Heart className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Kullanıcı Odaklı</h3>
                      <p className="text-primary-100">Kolay ve anlaşılır arayüz</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Kapsamlı Rehber</h3>
                      <p className="text-primary-100">Detaylı kullanım bilgileri</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Neden MediGuide?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Sağlığınız için en güvenilir ve kapsamlı ilaç bilgilendirme platformu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 text-center"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <Icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-secondary-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Sağlığınız İçin Doğru Bilgiyi Bulun
            </h2>
            <p className="text-xl text-primary-100">
              Hemen aramaya başlayın ve ilaçlarınız hakkında detaylı bilgi edinin
            </p>
            <Link to="/search" className="btn-primary inline-flex items-center">
              <Search className="mr-2 h-5 w-5" />
              İlaç Aramaya Başla
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 