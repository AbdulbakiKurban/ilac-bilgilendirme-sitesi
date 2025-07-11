# MediGuide - Deployment Talimatları

## 🚀 GitHub'da Yayınlama

### 1. GitHub Repository Oluşturma

1. GitHub'da yeni bir repository oluşturun
2. Repository adı: `mediguide` (veya istediğiniz bir isim)
3. Public repository seçin
4. README dosyası oluşturmayın (zaten var)

### 2. Projeyi GitHub'a Yükleme

```bash
# Git kurulumu (eğer kurulu değilse)
# Windows için: https://git-scm.com/download/win

# Proje klasöründe terminal açın
git init
git add .
git commit -m "Initial commit: MediGuide İlaç Bilgilendirme Platformu"

# GitHub repository'nizi ekleyin
git remote add origin https://github.com/KULLANICI_ADINIZ/mediguide.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages Ayarları

1. Repository'nizin **Settings** sekmesine gidin
2. Sol menüden **Pages** seçin
3. **Source** olarak **GitHub Actions** seçin
4. Otomatik olarak deployment başlayacak

### 4. Alternatif Deployment Seçenekleri

#### Netlify
1. [Netlify](https://netlify.com)'a gidin
2. **New site from Git** seçin
3. GitHub repository'nizi bağlayın
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Vercel
1. [Vercel](https://vercel.com)'e gidin
2. **New Project** seçin
3. GitHub repository'nizi import edin
4. Framework preset: **Vite** seçin
5. Deploy edin

## 📁 Proje Yapısı

```
mediguide/
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   │   ├── Navbar.tsx      # Navigasyon çubuğu
│   │   ├── Footer.tsx      # Alt bilgi
│   │   └── DrugInteractionChecker.tsx # Etkileşim kontrolü
│   ├── pages/              # Sayfa bileşenleri
│   │   ├── Home.tsx        # Ana sayfa
│   │   ├── DrugSearch.tsx  # İlaç arama
│   │   ├── DrugDetail.tsx  # İlaç detay
│   │   ├── DrugInteraction.tsx # Etkileşim kontrolü
│   │   ├── HealthGuide.tsx # Sağlık rehberi
│   │   └── About.tsx       # Hakkımızda
│   ├── data/               # Veri dosyaları
│   │   └── drugs.ts        # İlaç veritabanı
│   ├── App.tsx             # Ana uygulama
│   ├── main.tsx           # Giriş noktası
│   └── index.css          # Global stiller
├── public/                 # Statik dosyalar
│   └── favicon.svg        # Site ikonu
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml         # Deployment workflow
├── package.json           # Proje bağımlılıkları
├── vite.config.ts         # Vite konfigürasyonu
├── tailwind.config.js     # Tailwind CSS konfigürasyonu
├── tsconfig.json          # TypeScript konfigürasyonu
├── README.md              # Proje dokümantasyonu
└── DEPLOYMENT.md          # Bu dosya
```

## 🛠️ Geliştirme Komutları

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu başlat
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview

# Linting
npm run lint
```

## 🌐 Canlı Site

Deployment tamamlandıktan sonra siteniz şu adreste yayınlanacak:
- **GitHub Pages**: `https://KULLANICI_ADINIZ.github.io/mediguide`
- **Netlify**: `https://mediguide.netlify.app` (veya özel domain)
- **Vercel**: `https://mediguide.vercel.app` (veya özel domain)

## 📱 Özellikler

✅ **Tamamlanan Özellikler:**
- Modern responsive tasarım
- İlaç arama ve filtreleme
- Detaylı ilaç bilgi sayfaları
- İlaç etkileşim kontrolü
- Sağlık rehberi
- Kapsamlı ilaç veritabanı
- Animasyonlu geçişler
- Mobile-first tasarım
- SEO optimizasyonu
- GitHub Pages deployment

## 🔧 Teknik Detaylar

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Deployment**: GitHub Actions + GitHub Pages
- **Package Manager**: npm

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. GitHub Issues'da sorun bildirin
2. README.md dosyasını kontrol edin
3. Proje dokümantasyonunu inceleyin

---

**MediGuide** ile sağlığınız için doğru bilgilere ulaşın! 💊✨ 