# MediGuide - İlaç Bilgilendirme Platformu

Türkiye'nin en kapsamlı ve güvenilir ilaç bilgilendirme platformu. Modern web teknolojileri ile geliştirilmiş, kullanıcı dostu arayüz ile sağlığınız için doğru bilgilere ulaşmanızı sağlıyoruz.

## 🚀 Özellikler

- **📱 Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **🔍 Gelişmiş Arama**: İlaç adı, etken madde veya hastalık ile arama
- **📚 Kapsamlı Bilgi**: Dozaj, yan etkiler, etkileşimler ve uyarılar
- **⚡ Hızlı Performans**: Modern teknolojiler ile optimize edilmiş
- **🎨 Modern UI/UX**: Kullanıcı dostu ve estetik arayüz
- **🔒 Güvenli**: HTTPS ve güvenlik standartları
- **📖 Sağlık Rehberi**: Genel sağlık bilgileri ve ipuçları

## 🛠️ Teknolojiler

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/mediguide.git
   cd mediguide
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 🚀 Kullanım

### Geliştirme

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview

# Linting
npm run lint

# Linting düzeltme
npm run lint:fix
```

### Production

```bash
# Build oluştur
npm run build

# Build klasörünü kontrol et
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── Navbar.tsx      # Navigasyon çubuğu
│   └── Footer.tsx      # Alt bilgi
├── pages/              # Sayfa bileşenleri
│   ├── Home.tsx        # Ana sayfa
│   ├── DrugSearch.tsx  # İlaç arama
│   ├── DrugDetail.tsx  # İlaç detay
│   ├── HealthGuide.tsx # Sağlık rehberi
│   └── About.tsx       # Hakkımızda
├── App.tsx             # Ana uygulama bileşeni
├── main.tsx           # Uygulama giriş noktası
└── index.css          # Global stiller
```

## 🎨 Tasarım Sistemi

### Renkler

- **Primary**: Mavi tonları (#0ea5e9)
- **Secondary**: Gri tonları (#64748b)
- **Success**: Yeşil (#10b981)
- **Warning**: Sarı (#f59e0b)
- **Error**: Kırmızı (#ef4444)

### Tipografi

- **Font**: Inter
- **Başlıklar**: Bold (700)
- **Alt başlıklar**: Semibold (600)
- **Normal metin**: Regular (400)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Konfigürasyon

### Environment Variables

```env
VITE_APP_TITLE=MediGuide
VITE_APP_DESCRIPTION=İlaç Bilgilendirme Platformu
```

### Tailwind CSS

Proje Tailwind CSS ile stillendirilmiştir. Özel renkler ve animasyonlar `tailwind.config.js` dosyasında tanımlanmıştır.

## 🚀 Deployment

### GitHub Pages

1. **Repository ayarlarına gidin**
2. **Pages sekmesini seçin**
3. **Source olarak GitHub Actions seçin**
4. **Workflow dosyası otomatik oluşturulacak**

### Netlify

1. **Netlify'a projeyi bağlayın**
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`

### Vercel

1. **Vercel'e projeyi import edin**
2. **Framework preset**: Vite
3. **Build command otomatik algılanacak**

## 🤝 Katkıda Bulunma

1. **Fork yapın**
2. **Feature branch oluşturun** (`git checkout -b feature/amazing-feature`)
3. **Değişikliklerinizi commit edin** (`git commit -m 'Add amazing feature'`)
4. **Branch'inizi push edin** (`git push origin feature/amazing-feature`)
5. **Pull Request oluşturun**

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **E-posta**: info@mediguide.com
- **Telefon**: +90 212 555 0123
- **Adres**: İstanbul, Türkiye

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - UI kütüphanesi
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animasyon kütüphanesi
- [Lucide](https://lucide.dev/) - İkon kütüphanesi
- [Vite](https://vitejs.dev/) - Build tool

## ⚠️ Önemli Uyarı

Bu platform sadece bilgilendirme amaçlıdır. İlaç kullanımı öncesi mutlaka doktorunuza danışınız. Bu site tıbbi tavsiye yerine geçmez.

---

**MediGuide** ile sağlığınız için doğru bilgilere ulaşın! 💊✨ 