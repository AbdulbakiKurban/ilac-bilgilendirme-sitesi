# PDF'den Veri Çıkarma ve JSON'a Dönüştürme Rehberi

## 📋 Adım Adım PDF'den Veri Çıkarma

### 1. PDF'yi İnceleyin
PDF'deki ilaç bilgilerini şu kategorilere ayırın:

#### Temel Bilgiler
- İlaç adı
- Jenerik ad
- Kategori
- Açıklama
- Üretici firma

#### Teknik Bilgiler
- Etken madde
- Güç/dozaj
- Dozaj formu (tablet, kapsül, vb.)
- Paket boyutu
- Ruhsat numarası
- Son kullanma tarihi

#### Güvenlik Bilgileri
- Yan etkiler
- İlaç etkileşimleri
- Uyarılar
- Kontrendikasyonlar

### 2. Veri Çıkarma Tablosu

PDF'deki her ilaç için şu tabloyu doldurun:

| Alan | PDF'den Çıkarılan Veri | JSON Alanı |
|------|------------------------|------------|
| İlaç Adı | | `name` |
| Jenerik Ad | | `genericName` |
| Kategori | | `category` |
| Açıklama | | `description` |
| Üretici | | `manufacturer` |
| Etken Madde | | `activeIngredient` |
| Güç | | `strength` |
| Dozaj Formu | | `dosageForm` |
| Paket Boyutu | | `packageSize` |
| Ruhsat No | | `licenseNumber` |
| Ruhsat Sahibi | | `licenseHolder` |
| Erişkin Dozu | | `dosage.adults` |
| Çocuk Dozu | | `dosage.children` |
| Yaşlı Dozu | | `dosage.elderly` |
| Maksimum Günlük | | `dosage.maxDaily` |

### 3. JSON Formatına Dönüştürme

Çıkarılan verileri şu formatta JSON dosyasına kaydedin:

```json
{
  "name": "PDF'den çıkarılan ilaç adı",
  "genericName": "PDF'den çıkarılan jenerik ad",
  "category": "PDF'den çıkarılan kategori",
  "description": "PDF'den çıkarılan açıklama",
  "manufacturer": "PDF'den çıkarılan üretici",
  "activeIngredient": "PDF'den çıkarılan etken madde",
  "strength": "PDF'den çıkarılan güç",
  "dosageForm": "PDF'den çıkarılan dozaj formu",
  "packageSize": "PDF'den çıkarılan paket boyutu",
  "licenseNumber": "PDF'den çıkarılan ruhsat no",
  "licenseHolder": "PDF'den çıkarılan ruhsat sahibi",
  "dosage": {
    "adults": "PDF'den çıkarılan erişkin dozu",
    "children": "PDF'den çıkarılan çocuk dozu",
    "elderly": "PDF'den çıkarılan yaşlı dozu",
    "maxDaily": "PDF'den çıkarılan maksimum günlük"
  },
  "sideEffects": [
    "PDF'den çıkarılan yan etki 1",
    "PDF'den çıkarılan yan etki 2"
  ],
  "interactions": [
    "PDF'den çıkarılan etkileşim 1",
    "PDF'den çıkarılan etkileşim 2"
  ],
  "warnings": [
    "PDF'den çıkarılan uyarı 1",
    "PDF'den çıkarılan uyarı 2"
  ],
  "howToUse": "PDF'den çıkarılan kullanım talimatları",
  "storage": "PDF'den çıkarılan saklama koşulları",
  "prescription": false,
  "approvalStatus": "approved",
  "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop"
}
```

## 🛠️ Otomatik PDF İşleme Araçları

### 1. Python ile PDF İşleme
```python
import PyPDF2
import json
import re

def extract_drug_data_from_pdf(pdf_path):
    """PDF'den ilaç verilerini çıkarır"""
    
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        
        for page in pdf_reader.pages:
            text += page.extract_text()
    
    # İlaç verilerini çıkar
    drugs = []
    
    # Regex pattern'ları ile veri çıkarma
    drug_patterns = {
        'name': r'İlaç Adı[:\s]+([^\n]+)',
        'genericName': r'Jenerik[:\s]+([^\n]+)',
        'category': r'Kategori[:\s]+([^\n]+)',
        'manufacturer': r'Üretici[:\s]+([^\n]+)',
        'strength': r'Güç[:\s]+([^\n]+)',
        'dosageForm': r'Form[:\s]+([^\n]+)',
        'licenseNumber': r'Ruhsat[:\s]+([^\n]+)'
    }
    
    # Her ilaç için veri çıkar
    for pattern_name, pattern in drug_patterns.items():
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            print(f"{pattern_name}: {matches[0]}")
    
    return drugs

# Kullanım
pdf_path = "ilac_verileri.pdf"
drugs = extract_drug_data_from_pdf(pdf_path)
```

### 2. Online PDF to JSON Dönüştürücüler
- **Adobe Acrobat**: PDF'yi metin olarak çıkar
- **PDF24**: PDF'yi Word'e dönüştür, sonra JSON'a çevir
- **SmallPDF**: PDF'yi Excel'e dönüştür

### 3. OCR ile Görsel PDF İşleme
```python
import pytesseract
from PIL import Image
import pdf2image

def extract_from_image_pdf(pdf_path):
    """Görsel PDF'lerden OCR ile veri çıkarır"""
    
    # PDF'yi resme dönüştür
    pages = pdf2image.convert_from_path(pdf_path)
    
    for page in pages:
        # OCR ile metin çıkar
        text = pytesseract.image_to_string(page, lang='tur')
        print(text)
```

## 📝 Pratik Örnek

PDF'de şu veri varsa:
```
İlaç Adı: Parol
Jenerik Ad: Parasetamol
Kategori: Ağrı Kesici
Üretici: Abdi İbrahim
Güç: 500mg
Form: Tablet
Ruhsat: TR-2023-001
```

JSON'a dönüştürün:
```json
{
  "name": "Parol",
  "genericName": "Parasetamol", 
  "category": "Ağrı Kesici",
  "manufacturer": "Abdi İbrahim",
  "strength": "500mg",
  "dosageForm": "Tablet",
  "licenseNumber": "TR-2023-001",
  "description": "Ateş düşürücü ve ağrı kesici etkili ilaç",
  "prescription": false,
  "approvalStatus": "approved"
}
```

## 🚀 Hızlı Başlangıç

1. **PDF'yi açın** ve ilk ilacın verilerini çıkarın
2. **Yukarıdaki JSON formatını kullanın**
3. **Dosyayı `ilac-verisi.json` olarak kaydedin**
4. **Sitede "+" butonuna tıklayın**
5. **JSON dosyasını yükleyin**

## ⚠️ Önemli Notlar

- **Doğruluk**: Manuel çıkarma en güvenilir yöntemdir
- **Format**: Tarihleri YYYY-MM-DD formatında yazın
- **Karakterler**: Türkçe karakterleri doğru kullanın
- **Boş Alanlar**: Bilinmeyen alanları boş bırakın

## 📞 Yardım

PDF'nizin formatı farklıysa:
1. PDF'nin bir sayfasının ekran görüntüsünü paylaşın
2. Hangi alanları çıkarmak istediğinizi belirtin
3. Size özel bir çıkarma scripti yazalım 