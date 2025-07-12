# PDF'den İlaç Verisi Entegrasyonu

Bu dokümantasyon, PDF'den çıkarılan ilaç bilgilerini dünyanın en iyi ilaç bilgi web sitesi uygulamamıza nasıl ekleyeceğinizi açıklar.

## 📋 Gerekli Veri Alanları

### Zorunlu Alanlar
- `name`: İlaç adı
- `genericName`: Jenerik ad
- `category`: İlaç kategorisi
- `description`: İlaç açıklaması

### Temel Bilgiler
- `image`: İlaç resmi URL'i
- `prescription`: Reçeteli mi? (boolean)
- `manufacturer`: Üretici firma
- `howToUse`: Kullanım şekli
- `storage`: Saklama koşulları

### Dozaj Bilgileri
```json
"dosage": {
  "adults": "Erişkin dozu",
  "children": "Çocuk dozu", 
  "elderly": "Yaşlı dozu",
  "maxDaily": "Maksimum günlük doz"
}
```

### Güvenlik Bilgileri
- `sideEffects`: Yan etkiler (array)
- `interactions`: İlaç etkileşimleri (array)
- `warnings`: Uyarılar (array)

## 🆕 PDF'den Gelen Yeni Alanlar

### Onay ve Ruhsat Bilgileri
- `tickImage`: Onay/tick resmi URL'i
- `boxImage`: İlaç kutusu resmi URL'i
- `approvalStatus`: Onay durumu ("approved", "pending", "rejected")
- `approvalDate`: Onay tarihi
- `licenseNumber`: Ruhsat numarası
- `licenseHolder`: Ruhsat sahibi

### Teknik Bilgiler
- `activeIngredient`: Etken madde
- `strength`: Güç/dozaj
- `dosageForm`: Dozaj formu (tablet, kapsül, vb.)
- `packageSize`: Paket boyutu
- `expiryDate`: Son kullanma tarihi
- `batchNumber`: Parti numarası
- `registrationNumber`: Kayıt numarası
- `atcCode`: ATC kodu

### Güvenlik ve Kullanım
- `pregnancy`: Gebelik bilgisi
- `breastfeeding`: Emzirme bilgisi
- `driving`: Araç kullanımı
- `alcohol`: Alkol etkileşimi
- `foodInteractions`: Gıda etkileşimleri (array)
- `contraindications`: Kontrendikasyonlar (array)

### Klinik Bilgiler
- `overdose`: Aşırı doz bilgisi
- `pharmacokinetics`: Farmakokinetik bilgiler
- `clinicalTrials`: Klinik çalışma bilgileri
- `costEffectiveness`: Maliyet etkinliği

### Değerlendirmeler
- `alternatives`: Alternatif ilaçlar (array)
- `patientReviews`: Hasta yorumları (array)
- `medicalReviews`: Doktor değerlendirmeleri (array)

## 📝 Veri Formatı Örneği

```json
{
  "name": "İlaç Adı",
  "genericName": "Jenerik Ad",
  "category": "Ağrı Kesici",
  "description": "İlaç açıklaması",
  "image": "https://example.com/ilac-resmi.jpg",
  "prescription": false,
  "dosage": {
    "adults": "500-1000mg, 4-6 saatte bir",
    "children": "10-15mg/kg, 4-6 saatte bir",
    "elderly": "500mg, 6-8 saatte bir",
    "maxDaily": "4 gram"
  },
  "sideEffects": ["Yan etki 1", "Yan etki 2"],
  "interactions": ["Etkileşim 1", "Etkileşim 2"],
  "warnings": ["Uyarı 1", "Uyarı 2"],
  "howToUse": "Kullanım talimatları",
  "storage": "Saklama koşulları",
  "manufacturer": "Üretici Firma",
  
  "tickImage": "/images/approved-tick.svg",
  "boxImage": "/images/ilac-kutusu.jpg",
  "approvalStatus": "approved",
  "approvalDate": "2024-01-15",
  "licenseNumber": "TR-2024-001",
  "licenseHolder": "İlaç Sanayi A.Ş.",
  "activeIngredient": "Etken Madde",
  "strength": "500mg",
  "dosageForm": "Tablet",
  "packageSize": "20 tablet",
  "expiryDate": "2026-12-31",
  "batchNumber": "B2024001",
  "registrationNumber": "TR-REG-2024-001",
  "atcCode": "N02BE01",
  "pregnancy": "Gebelik bilgisi",
  "breastfeeding": "Emzirme bilgisi",
  "driving": "Araç kullanımı bilgisi",
  "alcohol": "Alkol etkileşimi",
  "foodInteractions": ["Gıda etkileşimi 1", "Gıda etkileşimi 2"],
  "contraindications": ["Kontrendikasyon 1", "Kontrendikasyon 2"],
  "overdose": "Aşırı doz bilgisi",
  "pharmacokinetics": "Farmakokinetik bilgiler",
  "clinicalTrials": "Klinik çalışma bilgileri",
  "costEffectiveness": "Maliyet etkinliği",
  "alternatives": ["Alternatif 1", "Alternatif 2"],
  "patientReviews": [
    {
      "rating": 5,
      "comment": "Hasta yorumu",
      "date": "2024-01-15"
    }
  ],
  "medicalReviews": [
    {
      "doctor": "Dr. Ad Soyad",
      "specialty": "Uzmanlık",
      "review": "Doktor değerlendirmesi",
      "date": "2024-01-20"
    }
  ]
}
```

## 🚀 Veri Ekleme Yöntemleri

### 1. JSON Dosyası Yükleme
1. PDF'den çıkarılan verileri yukarıdaki formatta JSON dosyası olarak kaydedin
2. Sitenin sağ alt köşesindeki "+" butonuna tıklayın
3. "JSON Dosyası Yükle" seçeneğini seçin
4. JSON dosyanızı yükleyin
5. Verileri kontrol edin ve "İlaç Ekle" butonuna tıklayın

### 2. Manuel Veri Girişi
1. Sitenin sağ alt köşesindeki "+" butonuna tıklayın
2. "Manuel Giriş" seçeneğini seçin
3. Form alanlarını doldurun
4. "İlaç Ekle" butonuna tıklayın

## ✅ Veri Doğrulama

Sistem aşağıdaki kontrolleri yapar:
- Zorunlu alanların dolu olması
- Tarih formatlarının doğru olması
- Array alanlarının doğru formatta olması
- URL'lerin geçerli olması

## 🎨 Görsel Öğeler

### Onay Durumu Göstergeleri
- ✅ Yeşil tick: Onaylı
- ⏳ Sarı saat: Beklemede
- ❌ Kırmızı uyarı: Reddedildi

### İlaç Kutusu Görüntüleme
- İlaç kutusu resmi büyük boyutta gösterilir
- Teknik bilgiler yanında listelenir

### Detaylı Bilgi Kartları
- Güvenlik bilgileri ayrı kartlarda
- Klinik bilgiler organize edilmiş
- Hasta ve doktor yorumları ayrı bölümlerde

## 🔧 Teknik Detaylar

### Veri Yapısı
- TypeScript interface'leri kullanılır
- Tüm alanlar opsiyonel (zorunlu alanlar hariç)
- Array alanları boş array olarak başlatılır

### Performans
- Lazy loading ile büyük resimler
- Animasyonlu geçişler
- Responsive tasarım

### Güvenlik
- Veri doğrulama
- XSS koruması
- Input sanitization

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Veri formatını kontrol edin
2. Zorunlu alanların dolu olduğundan emin olun
3. JSON syntax'ını doğrulayın
4. Gerekirse manuel giriş yöntemini kullanın

---

**Not**: Bu sistem sadece eğitim amaçlıdır. Gerçek ilaç kullanımı öncesi mutlaka doktorunuza danışınız. 