#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF'den İlaç Verisi Çıkarma Aracı
Bu script PDF dosyalarından ilaç bilgilerini çıkarır ve JSON formatına dönüştürür.
"""

import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional

try:
    import PyPDF2  # type: ignore
except ImportError:
    print("PyPDF2 kütüphanesi bulunamadı. Yüklemek için: pip install PyPDF2")
    sys.exit(1)

class DrugDataExtractor:
    """PDF'den ilaç verilerini çıkaran sınıf"""
    
    def __init__(self):
        # Türkçe ilaç verisi pattern'ları
        self.patterns = {
            'name': [
                r'İlaç\s*Adı[:\s]*([^\n\r]+)',
                r'İlaç[:\s]*([^\n\r]+)',
                r'Ad[:\s]*([^\n\r]+)'
            ],
            'genericName': [
                r'Jenerik\s*Ad[:\s]*([^\n\r]+)',
                r'Jenerik[:\s]*([^\n\r]+)',
                r'Etken\s*Madde[:\s]*([^\n\r]+)'
            ],
            'category': [
                r'Kategori[:\s]*([^\n\r]+)',
                r'Grup[:\s]*([^\n\r]+)',
                r'Sınıf[:\s]*([^\n\r]+)'
            ],
            'manufacturer': [
                r'Üretici[:\s]*([^\n\r]+)',
                r'Firma[:\s]*([^\n\r]+)',
                r'Üretici\s*Firma[:\s]*([^\n\r]+)'
            ],
            'strength': [
                r'Güç[:\s]*([^\n\r]+)',
                r'Dozaj[:\s]*([^\n\r]+)',
                r'Konsantrasyon[:\s]*([^\n\r]+)'
            ],
            'dosageForm': [
                r'Form[:\s]*([^\n\r]+)',
                r'Şekil[:\s]*([^\n\r]+)',
                r'Dozaj\s*Formu[:\s]*([^\n\r]+)'
            ],
            'licenseNumber': [
                r'Ruhsat[:\s]*([^\n\r]+)',
                r'Ruhsat\s*No[:\s]*([^\n\r]+)',
                r'Kayıt[:\s]*([^\n\r]+)'
            ],
            'activeIngredient': [
                r'Etken\s*Madde[:\s]*([^\n\r]+)',
                r'Aktif\s*Madde[:\s]*([^\n\r]+)',
                r'İçerik[:\s]*([^\n\r]+)'
            ],
            'packageSize': [
                r'Paket[:\s]*([^\n\r]+)',
                r'Boyut[:\s]*([^\n\r]+)',
                r'Miktar[:\s]*([^\n\r]+)'
            ]
        }
        
        # Dozaj pattern'ları
        self.dosage_patterns = {
            'adults': [
                r'Erişkin[:\s]*([^\n\r]+)',
                r'Yetişkin[:\s]*([^\n\r]+)',
                r'Büyük[:\s]*([^\n\r]+)'
            ],
            'children': [
                r'Çocuk[:\s]*([^\n\r]+)',
                r'Pediatrik[:\s]*([^\n\r]+)',
                r'Küçük[:\s]*([^\n\r]+)'
            ],
            'elderly': [
                r'Yaşlı[:\s]*([^\n\r]+)',
                r'Geriatrik[:\s]*([^\n\r]+)',
                r'İleri\s*yaş[:\s]*([^\n\r]+)'
            ],
            'maxDaily': [
                r'Maksimum[:\s]*([^\n\r]+)',
                r'Günlük\s*maksimum[:\s]*([^\n\r]+)',
                r'En\s*yüksek[:\s]*([^\n\r]+)'
            ]
        }

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """PDF'den metin çıkarır"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page_num, page in enumerate(pdf_reader.pages):
                    print(f"Sayfa {page_num + 1} işleniyor...")
                    page_text = page.extract_text()
                    text += page_text + "\n"
                
                return text
        except Exception as e:
            print(f"PDF okuma hatası: {e}")
            return ""

    def extract_field(self, text: str, patterns: List[str]) -> Optional[str]:
        """Belirtilen pattern'larla alan çıkarır"""
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE | re.MULTILINE)
            if matches:
                # İlk eşleşmeyi al ve temizle
                result = matches[0].strip()
                if result and result != "":
                    return result
        return None

    def extract_dosage_info(self, text: str) -> Dict[str, str]:
        """Dozaj bilgilerini çıkarır"""
        dosage = {}
        for field, patterns in self.dosage_patterns.items():
            value = self.extract_field(text, patterns)
            if value:
                dosage[field] = value
        
        return dosage

    def extract_side_effects(self, text: str) -> List[str]:
        """Yan etkileri çıkarır"""
        side_effects = []
        
        # Yan etki pattern'ları
        patterns = [
            r'Yan\s*Etki[:\s]*([^\n\r]+)',
            r'Yan\s*Etkiler[:\s]*([^\n\r]+)',
            r'Advers[:\s]*([^\n\r]+)'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE | re.MULTILINE)
            for match in matches:
                # Noktalama işaretlerine göre böl
                effects = re.split(r'[,;.]', match)
                for effect in effects:
                    effect = effect.strip()
                    if effect and len(effect) > 3:
                        side_effects.append(effect)
        
        return list(set(side_effects))  # Tekrarları kaldır

    def extract_interactions(self, text: str) -> List[str]:
        """İlaç etkileşimlerini çıkarır"""
        interactions = []
        
        patterns = [
            r'Etkileşim[:\s]*([^\n\r]+)',
            r'İnteraksiyon[:\s]*([^\n\r]+)',
            r'Uyumsuzluk[:\s]*([^\n\r]+)'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE | re.MULTILINE)
            for match in matches:
                effects = re.split(r'[,;.]', match)
                for effect in effects:
                    effect = effect.strip()
                    if effect and len(effect) > 3:
                        interactions.append(effect)
        
        return list(set(interactions))

    def extract_warnings(self, text: str) -> List[str]:
        """Uyarıları çıkarır"""
        warnings = []
        
        patterns = [
            r'Uyarı[:\s]*([^\n\r]+)',
            r'Dikkat[:\s]*([^\n\r]+)',
            r'Önlem[:\s]*([^\n\r]+)'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE | re.MULTILINE)
            for match in matches:
                effects = re.split(r'[,;.]', match)
                for effect in effects:
                    effect = effect.strip()
                    if effect and len(effect) > 3:
                        warnings.append(effect)
        
        return list(set(warnings))

    def extract_drug_data(self, pdf_path: str) -> Dict:
        """PDF'den ilaç verilerini çıkarır"""
        print(f"PDF dosyası işleniyor: {pdf_path}")
        
        # PDF'den metin çıkar
        text = self.extract_text_from_pdf(pdf_path)
        if not text:
            return {}
        
        print("Metin çıkarıldı, veriler analiz ediliyor...")
        
        # Temel alanları çıkar
        drug_data = {}
        
        for field, patterns in self.patterns.items():
            value = self.extract_field(text, patterns)
            if value:
                drug_data[field] = value
                print(f"✓ {field}: {value}")
        
        # Dozaj bilgilerini çıkar
        dosage = self.extract_dosage_info(text)
        if dosage:
            drug_data['dosage'] = dosage
            print(f"✓ Dozaj bilgileri çıkarıldı")
        
        # Yan etkileri çıkar
        side_effects = self.extract_side_effects(text)
        if side_effects:
            drug_data['sideEffects'] = side_effects
            print(f"✓ {len(side_effects)} yan etki çıkarıldı")
        
        # Etkileşimleri çıkar
        interactions = self.extract_interactions(text)
        if interactions:
            drug_data['interactions'] = interactions
            print(f"✓ {len(interactions)} etkileşim çıkarıldı")
        
        # Uyarıları çıkar
        warnings = self.extract_warnings(text)
        if warnings:
            drug_data['warnings'] = warnings
            print(f"✓ {len(warnings)} uyarı çıkarıldı")
        
        # Varsayılan değerler ekle
        drug_data.setdefault('prescription', False)
        drug_data.setdefault('approvalStatus', 'approved')
        drug_data.setdefault('image', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop')
        
        return drug_data

    def save_to_json(self, drug_data: Dict, output_path: str):
        """Verileri JSON dosyasına kaydeder"""
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(drug_data, f, ensure_ascii=False, indent=2)
            print(f"✓ Veriler kaydedildi: {output_path}")
        except Exception as e:
            print(f"Kaydetme hatası: {e}")

def main():
    """Ana fonksiyon"""
    print("=" * 50)
    print("PDF'den İlaç Verisi Çıkarma Aracı")
    print("=" * 50)
    
    if len(sys.argv) < 2:
        print("Kullanım: python pdf_extractor.py <pdf_dosyası>")
        print("Örnek: python pdf_extractor.py ilac_verileri.pdf")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    
    if not Path(pdf_path).exists():
        print(f"Hata: {pdf_path} dosyası bulunamadı!")
        sys.exit(1)
    
    # Çıkarıcıyı oluştur
    extractor = DrugDataExtractor()
    
    # Verileri çıkar
    drug_data = extractor.extract_drug_data(pdf_path)
    
    if not drug_data:
        print("Hiç veri çıkarılamadı!")
        sys.exit(1)
    
    # Çıkarılan verileri göster
    print("\n" + "=" * 50)
    print("ÇIKARILAN VERİLER:")
    print("=" * 50)
    print(json.dumps(drug_data, ensure_ascii=False, indent=2))
    
    # JSON dosyasına kaydet
    output_path = Path(pdf_path).stem + "_extracted.json"
    extractor.save_to_json(drug_data, output_path)
    
    print("\n" + "=" * 50)
    print("SONUÇ:")
    print("=" * 50)
    print(f"1. PDF dosyası: {pdf_path}")
    print(f"2. Çıkarılan veriler: {output_path}")
    print(f"3. Sisteme eklemek için: {output_path} dosyasını yükleyin")
    print("\nSisteme eklemek için:")
    print("1. Sitenin sağ alt köşesindeki '+' butonuna tıklayın")
    print("2. 'JSON Dosyası Yükle' seçeneğini seçin")
    print("3. Bu dosyayı yükleyin")

if __name__ == "__main__":
    main() 