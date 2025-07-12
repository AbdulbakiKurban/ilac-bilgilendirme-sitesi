export interface Drug {
  id: number
  name: string
  genericName: string
  category: string
  description: string
  image: string
  price?: string
  priceValue?: number
  popularity?: number
  prescription: boolean
  prescriptionColor?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'brown' | 'gray' | 'black' | 'white'
  dosage: {
    adults: string
    children: string
    elderly: string
    maxDaily?: string
  }
  sideEffects: string[]
  interactions: string[]
  warnings: string[]
  howToUse: string
  storage: string
  manufacturer: string
  
  // PDF'den gelecek yeni alanlar
  tickImage?: string // Onay/tick resmi
  boxImage?: string // İlaç kutusu resmi
  approvalStatus?: 'approved' | 'pending' | 'rejected' // Onay durumu
  approvalDate?: string // Onay tarihi
  licenseNumber?: string // Ruhsat numarası
  licenseHolder?: string // Ruhsat sahibi
  activeIngredient?: string // Etken madde
  strength?: string // Güç/dozaj
  dosageForm?: string // Dozaj formu (tablet, kapsül, vb.)
  packageSize?: string // Paket boyutu
  expiryDate?: string // Son kullanma tarihi
  batchNumber?: string // Parti numarası
  registrationNumber?: string // Kayıt numarası
  atcCode?: string // ATC kodu
  pregnancy?: string // Gebelik bilgisi
  breastfeeding?: string // Emzirme bilgisi
  driving?: string // Araç kullanımı
  alcohol?: string // Alkol etkileşimi
  foodInteractions?: string[] // Gıda etkileşimleri
  contraindications?: string[] // Kontrendikasyonlar
  overdose?: string // Aşırı doz bilgisi
  pharmacokinetics?: string // Farmakokinetik bilgiler
  clinicalTrials?: string // Klinik çalışma bilgileri
  costEffectiveness?: string // Maliyet etkinliği
  alternatives?: string[] // Alternatif ilaçlar
  patientReviews?: {
    rating: number
    comment: string
    date: string
  }[]
  medicalReviews?: {
    doctor: string
    specialty: string
    review: string
    date: string
  }[]

}

export const categories = [
  'Tümü',
  'Ağrı Kesici',
  'Antibiyotik',
  'Vitamin',
  'Kardiyovasküler',
  'Solunum',
  'Gastrointestinal',
  'Psikiyatrik',
  'Dermatolojik',
  'Endokrinolojik'
]

export const drugs: Drug[] = [
  {
    id: 1,
    name: 'Lidodeks',
    genericName: 'Lidokain Hidroklorür',
    category: 'Kardiyovasküler',
    description: 'Ventriküler aritmileri kontrol etmek amacıyla kullanılan antiaritmik ilaç. Miyokardial enfarktüs sonrasında ve kardiyak cerrahi sırasında kullanılır.',
    image: 'https://bernofarm.com/wp-content/uploads/2021/09/Depan-1.png',
    price: '₺150-250',
    priceValue: 200,
    popularity: 4.7,
    prescription: true,
    prescriptionColor: 'white',
    dosage: {
      adults: 'Yükleme: 1,0-1,5 mg/kg tek i.v. bolus, Takip: 1-4 mg/dk infüzyon',
      children: '0,5-1 mg/kg tek IV bolus, 30 mcg/kg/dk infüzyon',
      elderly: 'Yükleme dozunun yarısı ile başlanır, düşük seviyelerde infüzyon',
      maxDaily: '1 saatte 200-300 mg\'dan fazla uygulanmamalı'
    },
    sideEffects: [
      'Santral sinir sistemi: Baş dönmesi, uyuşukluk, konvülsiyonlar, koma',
      'Kardiyovasküler: Miyokardiyal depresyon, hipotansiyon, bradikardi, aritmi',
      'Solunum: Solunum depresyonu, solunum durması',
      'Gastrointestinal: Bulantı, kusma',
      'Alerjik: Ürtiker, anafilaktik reaksiyonlar, methemoglobinemi'
    ],
    interactions: [
      'Beta-adrenerjik blokörler (propranolol, metoprolol)',
      'Simetidin (plazma klirensini düşürür)',
      'Fenitoin (kardiyak depresan etkileri)',
      'Amiodaron (dikkatli izlem gerekir)',
      'Prokainamid, kinidin (birleşik etkiler)',
      'Fluvoksamin (eliminasyonu düşürür)',
      'Suksametonyum (aşırı nöromüsküler blokaj)'
    ],
    warnings: [
      'EKG ile sürekli izlem gerekir',
      'Kardiyak iletim depresyonu belirtilerinde infüzyon kesilmeli',
      'Acil resüsitasyon ekipmanı hazır bulundurulmalı',
      'Karaciğer ve böbrek yetmezliği olan hastalarda doz azaltılmalı',
      'Hipokalemi düzeltilmeli',
      'Konjestif kalp yetmezliği olan hastalarda dikkatli kullanılmalı'
    ],
    howToUse: 'İntravenöz infüzyon şeklinde uygulanır. Kontrollü infüzyon pompası kullanılmalı. Konsantre çözeltiler (%0,2\'den fazla) dikkatlice kalibre edilmiş cihazlarla uygulanmalı.',
    storage: '25°C\'nin altındaki oda sıcaklığında saklayınız. 24 ay raf ömrü.',
    manufacturer: 'POLİFARMA İLAÇ SAN. VE TİC. A.Ş.',
    
    // PDF'den gelen detaylı bilgiler
    tickImage: '/images/approved-tick.svg',
    boxImage: '/images/lidodeks-box.jpg',
    approvalStatus: 'approved',
    approvalDate: '2016-08-05',
    licenseNumber: '2016/546',
    licenseHolder: 'POLİFARMA İLAÇ SAN. VE TİC. A.Ş.',
    activeIngredient: 'Lidokain Hidroklorür',
    strength: '4 mg/ml',
    dosageForm: 'İntravenöz infüzyon çözeltisi',
    packageSize: '250 ml ve 500 ml PP torba',
    expiryDate: '24 ay',
    batchNumber: 'B2024001',
    registrationNumber: 'TR-REG-2016-546',
    atcCode: 'C01BB01',
    pregnancy: 'Gebelik kategorisi B. Sadece gerekliyse kullanılmalı. Hamile kadınlarda yeterli kontrollü çalışma yok.',
    breastfeeding: 'Süte geçip geçmediği bilinmiyor. Emziren annelerde dikkatli kullanılmalı.',
    driving: 'Uygulanabilir değildir.',
    alcohol: 'Doğrudan etkileşim yok ancak akut ciddi alkol intoksikasyonu kardiyovasküler sistemi deprese edebilir.',
    foodInteractions: ['Uygulanabilir değildir'],
    contraindications: [
      'Amid tipi lokal anesteziklere karşı hipersensivite',
      'Mısır ürünlerine karşı hassasiyet (dekstroz içerir)',
      'Hipovolemi',
      'Kalp bloğu ve iletim rahatsızlıkları',
      'Supraventriküler aritmiler',
      'Bradikardi',
      'Kardiyak dekompansasyon',
      'Tedavi edilebilir taşiaritmiye bağlı olmayan hipertansiyon'
    ],
    overdose: 'Santral sinir sistemi ve kardiyovasküler sistem üzerindeki toksik etkiler. Konvülsiyonlar, kardiyak arrest. Acil resüsitasyon gerekir. Diazepam veya barbitüratlar ile konvülsiyon kontrolü.',
    pharmacokinetics: 'İntravenöz infüzyon sonrası 10 dakikalık yarı ömür ile hızla azalır. Eliminasyon yarı ömrü yaklaşık 2 saat. Karaciğerde metabolize edilir, %90\'ı hepatik metabolizma. %10 değişmemiş lidokain idrarla atılır.',
    clinicalTrials: 'Geniş klinik çalışmalarda ventriküler aritmilerin kontrolünde etkinliği kanıtlanmıştır.',
    costEffectiveness: 'Kardiyak aritmi tedavisinde yüksek etkinlik, orta maliyet',
    alternatives: ['Prokainamid', 'Amiodaron', 'Fenitoin', 'Kinidin'],
    patientReviews: [
      {
        rating: 4,
        comment: 'Aritmi kontrolünde etkili, yan etkiler minimal',
        date: '2024-01-15'
      },
      {
        rating: 5,
        comment: 'Kardiyak cerrahi sonrası aritmileri başarıyla kontrol etti',
        date: '2024-01-10'
      }
    ],
    medicalReviews: [
      {
        doctor: 'Dr. Mehmet Kaya',
        specialty: 'Kardiyoloji',
        review: 'Ventriküler aritmilerin kontrolünde güvenli ve etkili bir ilaç. EKG izlemi ile kullanımı önemli.',
        date: '2024-01-20'
      },
      {
        doctor: 'Dr. Ayşe Demir',
        specialty: 'Anesteziyoloji',
        review: 'Kardiyak cerrahi sırasında aritmi kontrolü için tercih edilen ilaç. Doz ayarlaması kritik.',
        date: '2024-01-18'
      }
    ]
  },
  {
    id: 2,
    name: 'Parol',
    genericName: 'Parasetamol',
    category: 'Ağrı Kesici',
    description: 'Ateş düşürücü ve ağrı kesici etkili, güvenli bir ilaçtır.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
    price: '₺15-25',
    priceValue: 20,
    popularity: 4.8,
    prescription: false,
    prescriptionColor: 'green',
    dosage: {
      adults: '500-1000mg, 4-6 saatte bir',
      children: '10-15mg/kg, 4-6 saatte bir',
      elderly: '500mg, 6-8 saatte bir',
      maxDaily: '4 gram'
    },
    sideEffects: ['Mide bulantısı', 'Karaciğer hasarı (yüksek dozda)', 'Alerjik reaksiyonlar'],
    interactions: ['Warfarin', 'Alkol', 'Diğer parasetamol içeren ilaçlar'],
    warnings: ['Günde 4 gramı geçmeyin', 'Karaciğer hastalığı varsa dikkatli kullanın'],
    howToUse: 'Yemeklerle birlikte veya aç karnına alınabilir',
    storage: 'Oda sıcaklığında, nemden uzak saklayın',
    manufacturer: 'Abdi İbrahim',
    
    // PDF'den gelen yeni bilgiler
    tickImage: '/images/approved-tick.svg',
    boxImage: '/images/parol-box.jpg',
    approvalStatus: 'approved',
    approvalDate: '2023-01-15',
    licenseNumber: 'TR-2023-001',
    licenseHolder: 'Abdi İbrahim İlaç Sanayi ve Ticaret A.Ş.',
    activeIngredient: 'Parasetamol',
    strength: '500mg',
    dosageForm: 'Tablet',
    packageSize: '20 tablet',
    expiryDate: '2025-12-31',
    batchNumber: 'B2024001',
    registrationNumber: 'TR-REG-2023-001',
    atcCode: 'N02BE01',
    pregnancy: 'Gebelikte güvenli kullanım için doktorunuza danışın',
    breastfeeding: 'Emzirme sırasında kullanım güvenlidir',
    driving: 'Araç kullanımını etkilemez',
    alcohol: 'Alkol ile birlikte kullanımda karaciğer hasarı riski artar',
    foodInteractions: ['Aç karnına alınabilir', 'Yemeklerle birlikte alınabilir'],
    contraindications: ['Parasetamol alerjisi', 'Şiddetli karaciğer yetmezliği'],
    overdose: 'Aşırı dozda karaciğer hasarı riski. Acil tıbbi müdahale gerekebilir.',
    pharmacokinetics: 'Oral yoldan hızlı emilir, 30-60 dakikada maksimum etki',
    clinicalTrials: 'Geniş klinik çalışmalarda güvenliliği kanıtlanmıştır',
    costEffectiveness: 'Yüksek maliyet etkinliği, düşük fiyat',
    alternatives: ['Calpol', 'Tylenol', 'Dolven'],
    patientReviews: [
      {
        rating: 5,
        comment: 'Çok etkili, hızlı etki gösteriyor',
        date: '2024-01-15'
      },
      {
        rating: 4,
        comment: 'Ateşimi düşürdü, yan etki yok',
        date: '2024-01-10'
      }
    ],
    medicalReviews: [
      {
        doctor: 'Dr. Ahmet Yılmaz',
        specialty: 'Aile Hekimi',
        review: 'Güvenli ve etkili bir ilaç, reçetesiz kullanım için uygun',
        date: '2024-01-20'
      }
    ]
  }
]

// Arama fonksiyonu
export const searchDrugs = (query: string, category: string): Drug[] => {
  let filtered = drugs

  // Kategori filtresi
  if (category !== 'Tümü') {
    filtered = filtered.filter(drug => drug.category === category)
  }

  // Arama filtresi
  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    filtered = filtered.filter(drug =>
      drug.name.toLowerCase().includes(searchTerm) ||
      drug.genericName.toLowerCase().includes(searchTerm) ||
      drug.description.toLowerCase().includes(searchTerm) ||
      drug.category.toLowerCase().includes(searchTerm)
    )
  }

  return filtered
}

export const getDrugById = (id: number): Drug | undefined => {
  return drugs.find(drug => drug.id === id)
}

export const getDrugsByCategory = (category: string): Drug[] => {
  if (category === 'Tümü') return drugs
  return drugs.filter(drug => drug.category === category)
}

// PDF'den gelen verileri sisteme eklemek için yardımcı fonksiyonlar
export const addDrugFromPDF = (pdfData: Partial<Drug>): Drug => {
  const newId = Math.max(...drugs.map(d => d.id)) + 1
  
  const newDrug: Drug = {
    id: newId,
    name: pdfData.name || 'Bilinmeyen İlaç',
    genericName: pdfData.genericName || '',
    category: pdfData.category || 'Diğer',
    description: pdfData.description || '',
    image: pdfData.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
    prescription: pdfData.prescription || false,
    dosage: {
      adults: pdfData.dosage?.adults || '',
      children: pdfData.dosage?.children || '',
      elderly: pdfData.dosage?.elderly || '',
      maxDaily: pdfData.dosage?.maxDaily || ''
    },
    sideEffects: pdfData.sideEffects || [],
    interactions: pdfData.interactions || [],
    warnings: pdfData.warnings || [],
    howToUse: pdfData.howToUse || '',
    storage: pdfData.storage || '',
    manufacturer: pdfData.manufacturer || '',
    
    // PDF'den gelen yeni alanlar
    tickImage: pdfData.tickImage,
    boxImage: pdfData.boxImage,
    approvalStatus: pdfData.approvalStatus,
    approvalDate: pdfData.approvalDate,
    licenseNumber: pdfData.licenseNumber,
    licenseHolder: pdfData.licenseHolder,
    activeIngredient: pdfData.activeIngredient,
    strength: pdfData.strength,
    dosageForm: pdfData.dosageForm,
    packageSize: pdfData.packageSize,
    expiryDate: pdfData.expiryDate,
    batchNumber: pdfData.batchNumber,
    registrationNumber: pdfData.registrationNumber,
    atcCode: pdfData.atcCode,
    pregnancy: pdfData.pregnancy,
    breastfeeding: pdfData.breastfeeding,
    driving: pdfData.driving,
    alcohol: pdfData.alcohol,
    foodInteractions: pdfData.foodInteractions,
    contraindications: pdfData.contraindications,
    overdose: pdfData.overdose,
    pharmacokinetics: pdfData.pharmacokinetics,
    clinicalTrials: pdfData.clinicalTrials,
    costEffectiveness: pdfData.costEffectiveness,
    alternatives: pdfData.alternatives,
    patientReviews: pdfData.patientReviews,
    medicalReviews: pdfData.medicalReviews
  }
  
  drugs.push(newDrug)
  return newDrug
}

export const updateDrugFromPDF = (id: number, pdfData: Partial<Drug>): Drug | null => {
  const drugIndex = drugs.findIndex(d => d.id === id)
  if (drugIndex === -1) return null
  
  const updatedDrug = { ...drugs[drugIndex], ...pdfData }
  drugs[drugIndex] = updatedDrug
  return updatedDrug
}

// PDF verilerini doğrulama fonksiyonu
export const validatePDFData = (pdfData: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!pdfData.name) errors.push('İlaç adı gerekli')
  if (!pdfData.genericName) errors.push('Jenerik ad gerekli')
  if (!pdfData.category) errors.push('Kategori gerekli')
  if (!pdfData.description) errors.push('Açıklama gerekli')
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// PDF'den gelen verileri formatlama fonksiyonu
export const formatPDFData = (rawPDFData: any): Partial<Drug> => {
  return {
    name: rawPDFData.name?.trim(),
    genericName: rawPDFData.genericName?.trim(),
    category: rawPDFData.category?.trim(),
    description: rawPDFData.description?.trim(),
    image: rawPDFData.image,
    prescription: Boolean(rawPDFData.prescription),
    dosage: {
      adults: rawPDFData.dosage?.adults?.trim() || '',
      children: rawPDFData.dosage?.children?.trim() || '',
      elderly: rawPDFData.dosage?.elderly?.trim() || '',
      maxDaily: rawPDFData.dosage?.maxDaily?.trim() || ''
    },
    sideEffects: Array.isArray(rawPDFData.sideEffects) ? rawPDFData.sideEffects : [],
    interactions: Array.isArray(rawPDFData.interactions) ? rawPDFData.interactions : [],
    warnings: Array.isArray(rawPDFData.warnings) ? rawPDFData.warnings : [],
    howToUse: rawPDFData.howToUse?.trim() || '',
    storage: rawPDFData.storage?.trim() || '',
    manufacturer: rawPDFData.manufacturer?.trim() || '',
    
    // PDF'den gelen yeni alanlar
    tickImage: rawPDFData.tickImage,
    boxImage: rawPDFData.boxImage,
    approvalStatus: rawPDFData.approvalStatus,
    approvalDate: rawPDFData.approvalDate,
    licenseNumber: rawPDFData.licenseNumber?.trim(),
    licenseHolder: rawPDFData.licenseHolder?.trim(),
    activeIngredient: rawPDFData.activeIngredient?.trim(),
    strength: rawPDFData.strength?.trim(),
    dosageForm: rawPDFData.dosageForm?.trim(),
    packageSize: rawPDFData.packageSize?.trim(),
    expiryDate: rawPDFData.expiryDate,
    batchNumber: rawPDFData.batchNumber?.trim(),
    registrationNumber: rawPDFData.registrationNumber?.trim(),
    atcCode: rawPDFData.atcCode?.trim(),
    pregnancy: rawPDFData.pregnancy?.trim(),
    breastfeeding: rawPDFData.breastfeeding?.trim(),
    driving: rawPDFData.driving?.trim(),
    alcohol: rawPDFData.alcohol?.trim(),
    foodInteractions: Array.isArray(rawPDFData.foodInteractions) ? rawPDFData.foodInteractions : [],
    contraindications: Array.isArray(rawPDFData.contraindications) ? rawPDFData.contraindications : [],
    overdose: rawPDFData.overdose?.trim(),
    pharmacokinetics: rawPDFData.pharmacokinetics?.trim(),
    clinicalTrials: rawPDFData.clinicalTrials?.trim(),
    costEffectiveness: rawPDFData.costEffectiveness?.trim(),
    alternatives: Array.isArray(rawPDFData.alternatives) ? rawPDFData.alternatives : [],
    patientReviews: Array.isArray(rawPDFData.patientReviews) ? rawPDFData.patientReviews : [],
    medicalReviews: Array.isArray(rawPDFData.medicalReviews) ? rawPDFData.medicalReviews : []
  }
} 