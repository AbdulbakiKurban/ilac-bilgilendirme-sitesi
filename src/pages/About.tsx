import { motion } from 'framer-motion'
import { Heart, Shield, Users, Award, Mail, Phone, MapPin, Globe, Clock } from 'lucide-react'

const About = () => {
  const team = [
    {
      name: 'Dr. Ahmet Yılmaz',
      role: 'Baş Hekim',
      description: '20 yıllık deneyim ile kardiyoloji uzmanı',
      image: 'https://via.placeholder.com/150x150/0ea5e9/ffffff?text=AY'
    },
    {
      name: 'Dr. Ayşe Demir',
      role: 'Farmakoloji Uzmanı',
      description: 'İlaç etkileşimleri konusunda uzman',
      image: 'https://via.placeholder.com/150x150/0ea5e9/ffffff?text=AD'
    },
    {
      name: 'Mehmet Kaya',
      role: 'Yazılım Geliştirici',
      description: 'Sağlık teknolojileri uzmanı',
      image: 'https://via.placeholder.com/150x150/0ea5e9/ffffff?text=MK'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Tüm bilgiler uzman doktorlar tarafından onaylanır'
    },
    {
      icon: Heart,
      title: 'Hasta Odaklı',
      description: 'Kullanıcılarımızın sağlığı her zaman önceliğimizdir'
    },
    {
      icon: Users,
      title: 'Topluluk',
      description: 'Sağlık bilincini artırmak için çalışıyoruz'
    },
    {
      icon: Award,
      title: 'Kalite',
      description: 'En yüksek kalitede bilgi ve hizmet sunuyoruz'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'İlaç Bilgisi', icon: Globe },
    { number: '50,000+', label: 'Mutlu Kullanıcı', icon: Users },
    { number: '99.9%', label: 'Doğruluk Oranı', icon: Award },
    { number: '24/7', label: 'Erişim', icon: Clock }
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
            Hakkımızda
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            MediGuide, Türkiye'nin en güvenilir ilaç bilgilendirme platformudur. 
            Sağlığınız için doğru bilgilere ulaşmanızı sağlıyoruz.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Misyonumuz
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Herkesin güvenilir, doğru ve güncel ilaç bilgilerine kolayca ulaşabilmesini sağlamak. 
              Sağlık okuryazarlığını artırarak toplumun genel sağlık durumunu iyileştirmek.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Vizyonumuz
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Türkiye'nin ve bölgenin en kapsamlı ve güvenilir sağlık bilgi platformu olmak. 
              Teknoloji ile sağlığı birleştirerek herkes için erişilebilir sağlık hizmeti sunmak.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="card p-6 text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <Icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-secondary-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Ekibimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-secondary-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="card p-8"
        >
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">
            İletişim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-1">E-posta</h3>
              <p className="text-secondary-600">info@mediguide.com</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-1">Telefon</h3>
              <p className="text-secondary-600">+90 212 555 0123</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-1">Adres</h3>
              <p className="text-secondary-600">İstanbul, Türkiye</p>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 card p-8"
        >
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">
            Hikayemiz
          </h2>
          <div className="prose prose-lg text-secondary-700">
            <p className="mb-4">
              MediGuide, 2024 yılında sağlık teknolojileri alanında uzmanlaşmış bir ekip tarafından kuruldu. 
              Amacımız, insanların ilaçlar hakkında güvenilir bilgilere kolayca ulaşabilmesini sağlamaktı.
            </p>
            <p className="mb-4">
              Günümüzde internet üzerinde yanlış ve yanıltıcı sağlık bilgileri yaygın. 
              Bu durum insanların sağlığını tehlikeye atabiliyor. Bu sorunu çözmek için 
              uzman doktorlar ve teknoloji uzmanları bir araya geldi.
            </p>
            <p>
              Bugün MediGuide, Türkiye'nin en kapsamlı ilaç bilgilendirme platformu olarak 
              binlerce kullanıcıya hizmet veriyor. Sürekli güncellenen veritabanımız ve 
              kullanıcı dostu arayüzümüz ile sağlığınız için doğru bilgilere ulaşmanızı sağlıyoruz.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About 