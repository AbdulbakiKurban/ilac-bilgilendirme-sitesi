from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoTokenizer, AutoModelForQuestionAnswering
import torch
import json
import re
from typing import Dict, List, Optional
import logging

# Logging ayarları
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # CORS desteği

# Global değişkenler
qa_pipeline = None
text_generation_pipeline = None
drug_database = {}

def load_drug_database():
    """İlaç veritabanını yükle"""
    try:
        with open('parol_ilac_verisi.json', 'r', encoding='utf-8') as f:
            drug_database.update(json.load(f))
        logger.info(f"İlaç veritabanı yüklendi: {len(drug_database)} ilaç")
    except FileNotFoundError:
        logger.warning("İlaç veritabanı dosyası bulunamadı, boş veritabanı kullanılıyor")
    except Exception as e:
        logger.error(f"İlaç veritabanı yüklenirken hata: {e}")

def initialize_models():
    """AI modellerini başlat"""
    global qa_pipeline, text_generation_pipeline
    
    try:
        # Question-Answering modeli (Türkçe sağlık verileri için)
        logger.info("Question-Answering modeli yükleniyor...")
        qa_pipeline = pipeline(
            "question-answering",
            model="mrm8488/bert-small-finetuned-squadv2",
            tokenizer="mrm8488/bert-small-finetuned-squadv2"
        )
        
        # Text generation modeli (alternatif olarak)
        logger.info("Text generation modeli yükleniyor...")
        text_generation_pipeline = pipeline(
            "text-generation",
            model="gpt2",  # Daha küçük model
            max_length=100
        )
        
        logger.info("AI modelleri başarıyla yüklendi")
        
    except Exception as e:
        logger.error(f"Model yüklenirken hata: {e}")
        # Fallback: Basit kural tabanlı sistem
        qa_pipeline = None
        text_generation_pipeline = None

def create_health_context() -> str:
    """Sağlık konteksti oluştur"""
    context = """
    Sağlık ve ilaç bilgileri:
    
    Parol (Paracetamol): Ağrı kesici ve ateş düşürücü ilaç. Etken madde: Paracetamol. 
    Doz: Yetişkinler için 500-1000mg, günde 4 kez. Yan etkiler: Mide bulantısı, karaciğer hasarı (yüksek dozda). 
    Dikkat: Alkol ile birlikte kullanmayın.
    
    Aspirin: Ağrı kesici, ateş düşürücü, kan sulandırıcı. Etken madde: Asetilsalisilik asit. 
    Doz: 325-650mg, günde 3-4 kez. Yan etkiler: Mide kanaması, ülser, alerjik reaksiyonlar. 
    Dikkat: Kanama bozukluğu olanlar kullanmamalı.
    
    Vitamin D: Kemik sağlığı ve bağışıklık sistemi için gerekli. Kaynaklar: Güneş ışığı, yağlı balık, yumurta sarısı. 
    Günlük ihtiyaç: 600-800 IU. Eksiklik belirtileri: Kemik ağrısı, kas zayıflığı. 
    Fazla alım: Böbrek taşı, kalsiyum birikimi.
    
    İlaç yan etkileri: Yan etkiler kişiden kişiye değişebilir. Hafif yan etkiler: Mide bulantısı, baş dönmesi. 
    Ciddi yan etkiler: Alerjik reaksiyon, nefes darlığı. Yan etki yaşarsanız doktorunuza başvurun.
    
    İlaç etkileşimleri: Farklı ilaçlar birbirleriyle etkileşime girebilir. 
    Yeni ilaç kullanmadan önce doktorunuza danışın. Reçetesiz ilaçları bile doktorunuza bildirin.
    """
    return context

def search_drug_database(query: str) -> Optional[Dict]:
    """İlaç veritabanında arama yap"""
    query_lower = query.lower()
    
    for drug_name, drug_info in drug_database.items():
        if query_lower in drug_name.lower():
            return drug_info
    
    return None

def generate_ai_response(user_input: str) -> str:
    """AI modeli ile cevap üret"""
    try:
        if qa_pipeline:
            # Question-Answering modeli kullan
            context = create_health_context()
            result = qa_pipeline(
                question=user_input,
                context=context
            )
            return result['answer']
        else:
            # Fallback: Kural tabanlı sistem
            return generate_rule_based_response(user_input)
            
    except Exception as e:
        logger.error(f"AI response generation error: {e}")
        return generate_rule_based_response(user_input)

def generate_rule_based_response(user_input: str) -> str:
    """Kural tabanlı cevap üret"""
    user_input_lower = user_input.lower()
    
    # İlaç veritabanında arama
    drug_info = search_drug_database(user_input)
    if drug_info:
        return format_drug_info(drug_info)
    
    # Genel sağlık soruları
    if any(word in user_input_lower for word in ['parol', 'paracetamol']):
        return """Parol (Paracetamol) hakkında bilgi:

• Etken madde: Paracetamol
• Kullanım: Ağrı kesici ve ateş düşürücü
• Doz: Yetişkinler için 500-1000mg, günde 4 kez
• Yan etkiler: Mide bulantısı, karaciğer hasarı (yüksek dozda)
• Dikkat: Alkol ile birlikte kullanmayın
• Maksimum günlük doz: 4000mg"""
    
    elif 'aspirin' in user_input_lower:
        return """Aspirin hakkında bilgi:

• Etken madde: Asetilsalisilik asit
• Kullanım: Ağrı kesici, ateş düşürücü, kan sulandırıcı
• Doz: 325-650mg, günde 3-4 kez
• Yan etkiler: Mide kanaması, ülser, alerjik reaksiyonlar
• Dikkat: Kanama bozukluğu olanlar kullanmamalı
• Çocuklarda Reye sendromu riski"""
    
    elif any(word in user_input_lower for word in ['vitamin d', 'vitamin']):
        return """Vitamin D hakkında bilgi:

• Fonksiyon: Kemik sağlığı, bağışıklık sistemi
• Kaynaklar: Güneş ışığı, yağlı balık, yumurta sarısı
• Günlük ihtiyaç: 600-800 IU
• Eksiklik belirtileri: Kemik ağrısı, kas zayıflığı
• Fazla alım: Böbrek taşı, kalsiyum birikimi
• Özellikle kış aylarında takviye gerekebilir"""
    
    elif any(word in user_input_lower for word in ['yan etki', 'side effect', 'etki']):
        return """İlaç yan etkileri hakkında:

• Yan etkiler kişiden kişiye değişebilir
• Hafif yan etkiler: Mide bulantısı, baş dönmesi, uyku hali
• Ciddi yan etkiler: Alerjik reaksiyon, nefes darlığı, döküntü
• Yan etki yaşarsanız doktorunuza başvurun
• İlaç etkileşimlerini kontrol edin
• Reçetesiz ilaçları bile doktorunuza bildirin"""
    
    elif any(word in user_input_lower for word in ['etkileşim', 'interaction', 'birlikte']):
        return """İlaç etkileşimleri hakkında:

• Farklı ilaçlar birbirleriyle etkileşime girebilir
• Yeni ilaç kullanmadan önce doktorunuza danışın
• Reçetesiz ilaçları bile doktorunuza bildirin
• Bitkisel takviyeler de etkileşime girebilir
• Alkol ile ilaç kullanımı tehlikeli olabilir
• Düzenli kullandığınız tüm ilaçları listeleyin"""
    
    else:
        return """Bu konu hakkında detaylı bilgi için lütfen spesifik bir ilaç adı veya sağlık konusu belirtin.

Size daha iyi yardımcı olabilmem için sorunuzu daha açık bir şekilde sorabilir misiniz?

Örnek sorular:
• "Parol nedir?"
• "Aspirin yan etkileri nelerdir?"
• "Vitamin D eksikliği belirtileri"
• "İlaç etkileşimleri nasıl kontrol edilir?" """

def format_drug_info(drug_info: Dict) -> str:
    """İlaç bilgilerini formatla"""
    try:
        formatted = f"""{drug_info.get('name', 'İlaç')} hakkında bilgi:

• Etken madde: {drug_info.get('active_ingredient', 'Bilinmiyor')}
• Kullanım: {drug_info.get('usage', 'Bilinmiyor')}
• Doz: {drug_info.get('dosage', 'Bilinmiyor')}
• Yan etkiler: {drug_info.get('side_effects', 'Bilinmiyor')}
• Dikkat: {drug_info.get('warnings', 'Bilinmiyor')}"""
        
        return formatted
    except Exception as e:
        logger.error(f"Drug info formatting error: {e}")
        return "İlaç bilgisi formatlanırken hata oluştu."

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat API endpoint"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'success': False,
                'error': 'Mesaj boş olamaz'
            }), 400
        
        logger.info(f"Gelen mesaj: {user_message}")
        
        # AI cevabı üret
        ai_response = generate_ai_response(user_message)
        
        logger.info(f"AI cevabı: {ai_response[:100]}...")
        
        return jsonify({
            'success': True,
            'reply': ai_response,
            'timestamp': str(torch.cuda.is_available())  # GPU kullanımı bilgisi
        })
        
    except Exception as e:
        logger.error(f"Chat API error: {e}")
        return jsonify({
            'success': False,
            'error': 'Sunucu hatası oluştu'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Sağlık kontrolü endpoint"""
    return jsonify({
        'status': 'healthy',
        'models_loaded': qa_pipeline is not None,
        'drug_database_size': len(drug_database),
        'gpu_available': torch.cuda.is_available()
    })

@app.route('/api/drugs', methods=['GET'])
def get_drugs():
    """İlaç listesi endpoint"""
    try:
        query = request.args.get('q', '').lower()
        
        if query:
            # Arama yap
            filtered_drugs = {
                name: info for name, info in drug_database.items() 
                if query in name.lower()
            }
            return jsonify({
                'success': True,
                'drugs': filtered_drugs,
                'count': len(filtered_drugs)
            })
        else:
            # Tüm ilaçları döndür
            return jsonify({
                'success': True,
                'drugs': drug_database,
                'count': len(drug_database)
            })
            
    except Exception as e:
        logger.error(f"Drugs API error: {e}")
        return jsonify({
            'success': False,
            'error': 'İlaç listesi alınırken hata oluştu'
        }), 500

@app.route('/api/drug/<drug_name>', methods=['GET'])
def get_drug_detail(drug_name):
    """İlaç detay endpoint"""
    try:
        drug_info = drug_database.get(drug_name)
        
        if drug_info:
            return jsonify({
                'success': True,
                'drug': drug_info
            })
        else:
            return jsonify({
                'success': False,
                'error': 'İlaç bulunamadı'
            }), 404
            
    except Exception as e:
        logger.error(f"Drug detail API error: {e}")
        return jsonify({
            'success': False,
            'error': 'İlaç detayı alınırken hata oluştu'
        }), 500

if __name__ == '__main__':
    # Modelleri ve veritabanını yükle
    logger.info("AI sunucusu başlatılıyor...")
    load_drug_database()
    initialize_models()
    
    # Sunucuyu başlat
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    ) 