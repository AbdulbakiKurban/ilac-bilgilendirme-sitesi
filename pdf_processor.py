#!/usr/bin/env python3
"""
PDF İşleme Scripti
TİTCK PDF'lerini indirir, metin çıkarır ve AI'ye gönderir
"""

import sys
import os
import json
import requests
import PyPDF2
import re
from typing import Dict, List, Optional
import logging
from datetime import datetime

# Logging ayarları
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class PDFProcessor:
    def __init__(self, ai_server_url: str = "http://localhost:5000"):
        self.ai_server_url = ai_server_url
        self.processed_files = set()
        self.load_processed_files()
    
    def load_processed_files(self):
        """İşlenmiş dosyaları yükle"""
        try:
            if os.path.exists('processed_files.json'):
                with open('processed_files.json', 'r') as f:
                    self.processed_files = set(json.load(f))
                logger.info(f"İşlenmiş dosyalar yüklendi: {len(self.processed_files)} dosya")
        except Exception as e:
            logger.error(f"İşlenmiş dosyalar yüklenirken hata: {e}")
    
    def save_processed_files(self):
        """İşlenmiş dosyaları kaydet"""
        try:
            with open('processed_files.json', 'w') as f:
                json.dump(list(self.processed_files), f)
        except Exception as e:
            logger.error(f"İşlenmiş dosyalar kaydedilirken hata: {e}")
    
    def extract_text_from_pdf(self, pdf_path: str) -> Optional[str]:
        """PDF'den metin çıkar"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text() + "\n"
                
                logger.info(f"PDF metni çıkarıldı: {len(text)} karakter")
                return text
                
        except Exception as e:
            logger.error(f"PDF metin çıkarma hatası: {e}")
            return None
    
    def clean_text(self, text: str) -> str:
        """Metni temizle ve formatla"""
        # Gereksiz boşlukları temizle
        text = re.sub(r'\s+', ' ', text)
        
        # Özel karakterleri temizle
        text = re.sub(r'[^\w\s\.\,\;\:\!\?\-\(\)\[\]]', '', text)
        
        # Satır sonlarını düzenle
        text = text.replace('\n', ' ').strip()
        
        return text
    
    def extract_drug_info(self, text: str) -> Dict:
        """Metinden ilaç bilgilerini çıkar"""
        drug_info = {
            'name': '',
            'active_ingredient': '',
            'usage': '',
            'dosage': '',
            'side_effects': '',
            'warnings': '',
            'manufacturer': '',
            'extraction_date': datetime.now().isoformat()
        }
        
        # İlaç adı bulma
        name_patterns = [
            r'İLAÇ ADI[:\s]*([^\n]+)',
            r'ÜRÜN ADI[:\s]*([^\n]+)',
            r'ETKEN MADDE[:\s]*([^\n]+)'
        ]
        
        for pattern in name_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['name'] = match.group(1).strip()
                break
        
        # Etken madde bulma
        ingredient_patterns = [
            r'ETKEN MADDE[:\s]*([^\n]+)',
            r'AKTİF MADDE[:\s]*([^\n]+)',
            r'İÇERİK[:\s]*([^\n]+)'
        ]
        
        for pattern in ingredient_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['active_ingredient'] = match.group(1).strip()
                break
        
        # Kullanım alanı bulma
        usage_patterns = [
            r'KULLANIM ALANI[:\s]*([^\n]+)',
            r'ENDİKASYON[:\s]*([^\n]+)',
            r'KULLANIM[:\s]*([^\n]+)'
        ]
        
        for pattern in usage_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['usage'] = match.group(1).strip()
                break
        
        # Doz bilgisi bulma
        dosage_patterns = [
            r'DOZ[:\s]*([^\n]+)',
            r'UYGULAMA[:\s]*([^\n]+)',
            r'KULLANIM ŞEKLİ[:\s]*([^\n]+)'
        ]
        
        for pattern in dosage_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['dosage'] = match.group(1).strip()
                break
        
        # Yan etkiler bulma
        side_effect_patterns = [
            r'YAN ETKİ[:\s]*([^\n]+)',
            r'ADVERSE[:\s]*([^\n]+)',
            r'ETKİ[:\s]*([^\n]+)'
        ]
        
        for pattern in side_effect_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['side_effects'] = match.group(1).strip()
                break
        
        # Uyarılar bulma
        warning_patterns = [
            r'UYARI[:\s]*([^\n]+)',
            r'DİKKAT[:\s]*([^\n]+)',
            r'KONTRAENDİKASYON[:\s]*([^\n]+)'
        ]
        
        for pattern in warning_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['warnings'] = match.group(1).strip()
                break
        
        # Üretici bulma
        manufacturer_patterns = [
            r'ÜRETİCİ[:\s]*([^\n]+)',
            r'FİRMA[:\s]*([^\n]+)',
            r'MANUFACTURER[:\s]*([^\n]+)'
        ]
        
        for pattern in manufacturer_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                drug_info['manufacturer'] = match.group(1).strip()
                break
        
        return drug_info
    
    def send_to_ai(self, drug_info: Dict) -> bool:
        """AI sunucusuna gönder"""
        try:
            response = requests.post(
                f"{self.ai_server_url}/api/process-drug-data",
                json=drug_info,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                logger.info(f"AI işleme başarılı: {result.get('message', '')}")
                return True
            else:
                logger.error(f"AI işleme hatası: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"AI sunucusuna gönderme hatası: {e}")
            return False
    
    def process_pdf(self, pdf_path: str) -> bool:
        """PDF dosyasını işle"""
        try:
            # Dosya zaten işlenmiş mi kontrol et
            if pdf_path in self.processed_files:
                logger.info(f"Dosya zaten işlenmiş: {pdf_path}")
                return True
            
            # PDF'den metin çıkar
            text = self.extract_text_from_pdf(pdf_path)
            if not text:
                logger.error(f"PDF metni çıkarılamadı: {pdf_path}")
                return False
            
            # Metni temizle
            cleaned_text = self.clean_text(text)
            
            # İlaç bilgilerini çıkar
            drug_info = self.extract_drug_info(cleaned_text)
            
            # AI'ye gönder
            success = self.send_to_ai(drug_info)
            
            if success:
                # İşlenmiş dosyalara ekle
                self.processed_files.add(pdf_path)
                self.save_processed_files()
                logger.info(f"PDF başarıyla işlendi: {pdf_path}")
                return True
            else:
                logger.error(f"PDF işleme başarısız: {pdf_path}")
                return False
                
        except Exception as e:
            logger.error(f"PDF işleme hatası: {e}")
            return False
    
    def process_directory(self, directory_path: str) -> Dict:
        """Dizindeki tüm PDF'leri işle"""
        results = {
            'total_files': 0,
            'processed_files': 0,
            'failed_files': 0,
            'errors': []
        }
        
        try:
            for filename in os.listdir(directory_path):
                if filename.lower().endswith('.pdf'):
                    results['total_files'] += 1
                    pdf_path = os.path.join(directory_path, filename)
                    
                    logger.info(f"PDF işleniyor: {filename}")
                    
                    if self.process_pdf(pdf_path):
                        results['processed_files'] += 1
                    else:
                        results['failed_files'] += 1
                        results['errors'].append(f"İşleme başarısız: {filename}")
            
            logger.info(f"Toplam işleme sonucu: {results}")
            return results
            
        except Exception as e:
            logger.error(f"Dizin işleme hatası: {e}")
            results['errors'].append(str(e))
            return results

def main():
    """Ana fonksiyon"""
    if len(sys.argv) < 2:
        print("Kullanım: python pdf_processor.py <pdf_dosyası_veya_dizin>")
        sys.exit(1)
    
    path = sys.argv[1]
    processor = PDFProcessor()
    
    if os.path.isfile(path):
        # Tek dosya işle
        success = processor.process_pdf(path)
        if success:
            print(f"✅ PDF başarıyla işlendi: {path}")
        else:
            print(f"❌ PDF işleme başarısız: {path}")
            sys.exit(1)
    
    elif os.path.isdir(path):
        # Dizin işle
        results = processor.process_directory(path)
        print(f"📊 İşleme sonuçları:")
        print(f"   Toplam dosya: {results['total_files']}")
        print(f"   Başarılı: {results['processed_files']}")
        print(f"   Başarısız: {results['failed_files']}")
        
        if results['errors']:
            print(f"   Hatalar: {results['errors']}")
    
    else:
        print(f"❌ Dosya veya dizin bulunamadı: {path}")
        sys.exit(1)

if __name__ == "__main__":
    main() 