# 🚀 Sağlık AI Sistemi Kurulum Rehberi

Bu rehber, tamamen ücretsiz ve sürdürülebilir sağlık AI sisteminin nasıl kurulacağını açıklar.

## 📋 Sistem Bileşenleri

1. **HealthAIChatbot** - Web sitesi chatbot arayüzü
2. **AI Server** - HuggingFace modellerini kullanan Python API
3. **N8N Automation** - Otomatik PDF indirme ve işleme
4. **PDF Processor** - PDF'lerden metin çıkarma ve AI'ye gönderme

## 🛠️ Kurulum Adımları

### 1. Gereksinimler

- Docker ve Docker Compose
- Git
- Node.js (web sitesi için)
- Python 3.9+ (AI server için)

### 2. Projeyi İndirin

```bash
git clone https://github.com/AbdulbakiKurban/ilac-bilgilendirme-sitesi.git
cd ilac-bilgilendirme-sitesi
```

### 3. Web Sitesini Başlatın

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Veya production build
npm run build
npm run preview
```

### 4. AI Server'ı Başlatın

```bash
# Python bağımlılıklarını yükleyin
pip install -r requirements_ai.txt

# AI server'ı başlatın
python ai_server.py
```

### 5. Docker ile Tüm Sistemi Başlatın

```bash
# Tüm servisleri başlatın
docker-compose up -d

# Logları kontrol edin
docker-compose logs -f
```

## 🌐 Erişim Noktaları

- **Web Sitesi**: http://localhost:5173
- **AI API**: http://localhost:5000
- **N8N Dashboard**: http://localhost:5678
  - Kullanıcı adı: `admin`
  - Şifre: `drugsystem2024`

## 🔧 Konfigürasyon

### AI Server Konfigürasyonu

`ai_server.py` dosyasında aşağıdaki ayarları değiştirebilirsiniz:

```python
# HuggingFace model seçimi
qa_pipeline = pipeline(
    "question-answering",
    model="mrm8488/bert-small-finetuned-squadv2"  # Model değiştirilebilir
)
```

### N8N Workflow Konfigürasyonu

1. N8N dashboard'una giriş yapın
2. `n8n-workflow.json` dosyasını import edin
3. Cron trigger'ı istediğiniz zamanlamaya ayarlayın
4. Google Sheets bağlantısını yapılandırın

### Chatbot Konfigürasyonu

`src/components/HealthAIChatbot.tsx` dosyasında:

```typescript
// AI server URL'ini değiştirin
const AI_SERVER_URL = 'http://localhost:5000';

// Mock response yerine gerçek API çağrısı yapın
const response = await fetch(`${AI_SERVER_URL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userInput })
});
```

## 📊 Sistem Monitörü

### Health Check

```bash
# AI server sağlık kontrolü
curl http://localhost:5000/api/health

# N8N sağlık kontrolü
curl http://localhost:5678/healthz
```

### Log Kontrolü

```bash
# AI server logları
docker-compose logs ai-server

# N8N logları
docker-compose logs n8n

# PDF worker logları
docker-compose logs pdf-worker
```

## 🔄 Otomatik Güncelleme

### PDF İndirme Otomasyonu

N8N workflow'u şu işlemleri otomatik yapar:

1. **Cron Trigger**: Her 6 saatte bir çalışır
2. **TİTCK Sayfası**: PDF linklerini çeker
3. **PDF İndirme**: Yeni PDF'leri indirir
4. **Metin Çıkarma**: PDF'lerden metin çıkarır
5. **AI İşleme**: AI'ye gönderir ve yapılandırılmış veri alır
6. **Veri Kaydetme**: Google Sheets'e kaydeder

### Manuel PDF İşleme

```bash
# Tek PDF işleme
python pdf_processor.py dosya.pdf

# Dizin işleme
python pdf_processor.py /path/to/pdfs/
```

## 🚀 Production Deployment

### Render.com (Ücretsiz)

1. Render.com'da hesap oluşturun
2. GitHub repo'nuzu bağlayın
3. Web Service olarak deploy edin
4. Environment variables ayarlayın

### Railway.app (Ücretsiz)

1. Railway.app'de hesap oluşturun
2. GitHub repo'nuzu bağlayın
3. Docker Compose ile deploy edin

### Vercel (Web Sitesi için)

```bash
# Vercel CLI yükleyin
npm i -g vercel

# Deploy edin
vercel
```

## 🔒 Güvenlik

### Environment Variables

```bash
# .env dosyası oluşturun
AI_SERVER_URL=http://localhost:5000
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_secure_password
GOOGLE_SHEETS_CREDENTIALS=your_credentials.json
```

### API Güvenliği

```python
# Rate limiting ekleyin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
```

## 📈 Performans Optimizasyonu

### AI Model Optimizasyonu

```python
# Daha küçük model kullanın
model = "distilbert-base-uncased"  # Daha hızlı

# Model caching
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained(model, cache_dir="./cache")
```

### Database Optimizasyonu

```python
# Redis cache ekleyin
import redis
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Cache kullanımı
def get_cached_response(query):
    cached = redis_client.get(query)
    if cached:
        return cached.decode('utf-8')
    return None
```

## 🐛 Sorun Giderme

### Yaygın Sorunlar

1. **AI Model Yükleme Hatası**
   ```bash
   # GPU kullanımını kapatın
   export CUDA_VISIBLE_DEVICES=""
   ```

2. **N8N Bağlantı Hatası**
   ```bash
   # PostgreSQL bağlantısını kontrol edin
   docker-compose logs postgres
   ```

3. **PDF İşleme Hatası**
   ```bash
   # Poppler utils yükleyin
   sudo apt-get install poppler-utils
   ```

### Debug Modu

```bash
# AI server debug modu
FLASK_ENV=development python ai_server.py

# N8N debug modu
N8N_LOG_LEVEL=debug docker-compose up n8n
```

## 📞 Destek

Sorun yaşarsanız:

1. GitHub Issues açın
2. Log dosyalarını kontrol edin
3. Health check endpoint'lerini test edin
4. Docker container'larını yeniden başlatın

## 🎯 Sonraki Adımlar

1. **Daha İyi AI Modelleri**: BioGPT, PubMedBERT entegrasyonu
2. **Mobil Uygulama**: React Native ile mobil versiyon
3. **Premium Özellikler**: Abonelik sistemi
4. **Çoklu Dil Desteği**: İngilizce, Arapça vb.
5. **Telegram Bot**: Telegram entegrasyonu

---

**🎉 Tebrikler!** Artık tamamen ücretsiz ve sürdürülebilir bir sağlık AI sisteminiz var! 