import { Link } from 'react-router-dom'
import { Pill, Heart, Shield, Users, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MediGuide</span>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              Güvenilir ilaç bilgileri ve sağlık rehberi ile sizlere en iyi hizmeti sunuyoruz.
            </p>
            <div className="flex space-x-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Shield className="h-4 w-4" />
              </div>
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-4 w-4" />
              </div>
              <div className="bg-primary-600 p-2 rounded-lg">
                <Users className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-secondary-300 hover:text-white transition-colors">
                  İlaç Ara
                </Link>
              </li>
              <li>
                <Link to="/interaction" className="text-secondary-300 hover:text-white transition-colors">
                  Etkileşim Kontrolü
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-secondary-300 hover:text-white transition-colors">
                  Sağlık Rehberi
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İlaç Kategorileri</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?category=antibiotics" className="text-secondary-300 hover:text-white transition-colors">
                  Antibiyotikler
                </Link>
              </li>
              <li>
                <Link to="/search?category=painkillers" className="text-secondary-300 hover:text-white transition-colors">
                  Ağrı Kesiciler
                </Link>
              </li>
              <li>
                <Link to="/search?category=vitamins" className="text-secondary-300 hover:text-white transition-colors">
                  Vitaminler
                </Link>
              </li>
              <li>
                <Link to="/search?category=supplements" className="text-secondary-300 hover:text-white transition-colors">
                  Takviyeler
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">info@mediguide.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">+90 212 555 0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2024 MediGuide. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Gizlilik Politikası
              </Link>
              <Link to="/terms" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 