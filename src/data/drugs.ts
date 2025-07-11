export interface Drug {
  id: number
  name: string
  genericName: string
  category: string
  description: string
  dosage: {
    adults: string
    children: string
    maxDaily: string
  }
  sideEffects: string[]
  interactions: string[]
  warnings: string[]
  image: string
  price?: string
  prescription?: boolean
  pregnancy?: string
  breastfeeding?: string
  storage?: string
  manufacturer?: string
  activeIngredients?: string[]
  dosageForms?: string[]
}

export const drugs: Drug[] = [
  {
    id: 1,
    name: 'Parol',
    genericName: 'Parasetamol',
    category: 'Ağrı Kesici',
    description: 'Parol, ağrı ve ateş düşürücü olarak kullanılan güvenli bir ilaçtır. Baş ağrısı, diş ağrısı, kas ağrıları ve ateş tedavisinde etkilidir.',
    dosage: {
      adults: '500mg - 1000mg, günde 3-4 kez',
      children: '10-15mg/kg, günde 4-6 kez',
      maxDaily: '4000mg (erişkinler için)'
    },
    sideEffects: [
      'Mide bulantısı ve kusma',
      'Karaciğer problemleri (yüksek dozlarda)',
      'Alerjik reaksiyonlar (nadir)',
      'Kan değerlerinde değişiklik'
    ],
    interactions: [
      'Warfarin ile etkileşim',
      'Alkol ile birlikte kullanımda karaciğer hasarı riski',
      'Diğer ağrı kesicilerle birlikte kullanımda yan etki riski'
    ],
    warnings: [
      'Karaciğer hastalığı olanlar dikkatli kullanmalı',
      'Hamilelik ve emzirme döneminde doktor kontrolü gerekli',
      'Uzun süreli kullanımda doktor kontrolü önerilir'
    ],
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=PAROL',
    price: '15-25 TL',
    prescription: false,
    pregnancy: 'Güvenli (doktor kontrolünde)',
    breastfeeding: 'Güvenli',
    storage: 'Oda sıcaklığında, kuru yerde',
    manufacturer: 'Abdi İbrahim',
    activeIngredients: ['Parasetamol 500mg'],
    dosageForms: ['Tablet', 'Süspansiyon', 'Supozituvar']
  },
  {
    id: 2,
    name: 'Aspirin',
    genericName: 'Asetilsalisilik Asit',
    category: 'Ağrı Kesici',
    description: 'Aspirin, ağrı, ateş ve iltihap giderici olarak kullanılan klasik bir ilaçtır. Kan sulandırıcı etkisi de vardır.',
    dosage: {
      adults: '100mg - 500mg, günde 1-3 kez',
      children: 'Doktor kontrolünde kullanılmalı',
      maxDaily: '4000mg (erişkinler için)'
    },
    sideEffects: [
      'Mide kanaması riski',
      'Alerjik reaksiyonlar',
      'Kulak çınlaması',
      'Mide bulantısı'
    ],
    interactions: [
      'Warfarin ile güçlü etkileşim',
      'Diğer kan sulandırıcılarla etkileşim',
      'NSAID ilaçlarla birlikte kullanımda risk'
    ],
    warnings: [
      'Mide ülseri olanlar kullanmamalı',
      'Kanama bozukluğu olanlar dikkatli kullanmalı',
      'Çocuklarda Reye sendromu riski'
    ],
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=ASPIRIN',
    price: '10-20 TL',
    prescription: false,
    pregnancy: 'Dikkatli kullanım (3. trimesterde kaçınılmalı)',
    breastfeeding: 'Dikkatli kullanım',
    storage: 'Serin ve kuru yerde',
    manufacturer: 'Bayer',
    activeIngredients: ['Asetilsalisilik Asit 100mg', 'Asetilsalisilik Asit 500mg'],
    dosageForms: ['Tablet', 'Efervesan tablet']
  },
  {
    id: 3,
    name: 'Augmentin',
    genericName: 'Amoksisilin + Klavulanik Asit',
    category: 'Antibiyotik',
    description: 'Augmentin, bakteriyel enfeksiyonların tedavisinde kullanılan güçlü bir antibiyotiktir.',
    dosage: {
      adults: '625mg - 1000mg, günde 2-3 kez',
      children: '20-40mg/kg, günde 2-3 kez',
      maxDaily: '3000mg (erişkinler için)'
    },
    sideEffects: [
      'İshal ve mide bulantısı',
      'Candida enfeksiyonu',
      'Alerjik reaksiyonlar',
      'Karaciğer enzimlerinde artış'
    ],
    interactions: [
      'Doğum kontrol hapları ile etkileşim',
      'Probenesid ile etkileşim',
      'Methotrexate ile etkileşim'
    ],
    warnings: [
      'Penisilin alerjisi olanlar kullanmamalı',
      'Karaciğer hastalığı olanlar dikkatli kullanmalı',
      'Tam dozda ve sürede kullanılmalı'
    ],
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=AUGMENTIN',
    price: '80-150 TL',
    prescription: true,
    pregnancy: 'Güvenli (doktor kontrolünde)',
    breastfeeding: 'Güvenli',
    storage: 'Buzdolabında saklanmalı',
    manufacturer: 'GSK',
    activeIngredients: ['Amoksisilin 500mg', 'Klavulanik Asit 125mg'],
    dosageForms: ['Tablet', 'Süspansiyon', 'Enjeksiyon']
  },
  {
    id: 4,
    name: 'C Vitamini',
    genericName: 'Askorbik Asit',
    category: 'Vitamin',
    description: 'C Vitamini, bağışıklık sistemi desteği ve antioksidan etki için kullanılan temel bir vitamindir.',
    dosage: {
      adults: '500mg - 1000mg, günde 1-2 kez',
      children: '100mg - 500mg, günde 1-2 kez',
      maxDaily: '2000mg (erişkinler için)'
    },
    sideEffects: [
      'Mide asitliği ve yanma',
      'Böbrek taşı riski (yüksek dozlarda)',
      'İshal (yüksek dozlarda)',
      'Demir emiliminde artış'
    ],
    interactions: [
      'Demir preparatları ile birlikte kullanımda emilim artışı',
      'Aspirin ile birlikte kullanımda mide tahrişi',
      'Alüminyum içeren antiasitlerle etkileşim'
    ],
    warnings: [
      'Böbrek taşı geçmişi olanlar dikkatli kullanmalı',
      'Yüksek dozlarda uzun süreli kullanımda dikkatli olunmalı',
      'Gebelikte güvenli dozlar kullanılmalı'
    ],
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=VITAMIN+C',
    price: '20-50 TL',
    prescription: false,
    pregnancy: 'Güvenli',
    breastfeeding: 'Güvenli',
    storage: 'Serin ve kuru yerde',
    manufacturer: 'Çeşitli',
    activeIngredients: ['Askorbik Asit 500mg', 'Askorbik Asit 1000mg'],
    dosageForms: ['Tablet', 'Efervesan tablet', 'Şurup', 'Toz']
  },
  {
    id: 5,
    name: 'Prozac',
    genericName: 'Fluoksetin',
    category: 'Antidepresan',
    description: 'Prozac, depresyon, anksiyete ve obsesif-kompulsif bozukluk tedavisinde kullanılan bir SSRI antidepresandır.',
    dosage: {
      adults: '20mg - 80mg, günde 1 kez',
      children: 'Doktor kontrolünde kullanılmalı',
      maxDaily: '80mg (erişkinler için)'
    },
    sideEffects: [
      'Mide bulantısı ve iştahsızlık',
      'Uyku bozuklukları',
      'Cinsel işlev bozuklukları',
      'Baş dönmesi ve terleme'
    ],
    interactions: [
      'MAO inhibitörleri ile tehlikeli etkileşim',
      'Warfarin ile etkileşim',
      'Diazepam ile etkileşim'
    ],
    warnings: [
      'İntihar düşünceleri olanlar dikkatli kullanmalı',
      'Aniden kesilmemeli',
      'Karaciğer hastalığı olanlar dikkatli kullanmalı'
    ],
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=PROZAC',
    price: '150-300 TL',
    prescription: true,
    pregnancy: 'Dikkatli kullanım (doktor kontrolünde)',
    breastfeeding: 'Dikkatli kullanım',
    storage: 'Oda sıcaklığında',
    manufacturer: 'Eli Lilly',
    activeIngredients: ['Fluoksetin 20mg'],
    dosageForms: ['Kapsül', 'Tablet']
  },
  {
    id: 6,
    name: 'Lipitor',
    genericName: 'Atorvastatin',
    category: 'Kolesterol',
    description: 'Lipitor, yüksek kolesterol tedavisinde kullanılan güçlü bir statin ilacıdır.',
    dosage: {
      adults: '10mg - 80mg, günde 1 kez',
      children: 'Doktor kontrolünde kullanılmalı',
      maxDaily: '80mg (erişkinler için)'
    },
    sideEffects: [
      'Kas ağrıları ve güçsüzlük',
      'Karaciğer enzimlerinde artış',
      'Mide bulantısı',
      'Baş ağrısı'
    ],
    interactions: [
      'Greyfurt suyu ile etkileşim',
      'Warfarin ile etkileşim',
      'Digoksin ile etkileşim'
    ],
    warnings: [
      'Karaciğer hastalığı olanlar kullanmamalı',
      'Gebelik ve emzirme döneminde kullanılmamalı',
      'Kas ağrıları durumunda doktora başvurulmalı'
    ],
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=LIPITOR',
    price: '200-400 TL',
    prescription: true,
    pregnancy: 'Kullanılmamalı',
    breastfeeding: 'Kullanılmamalı',
    storage: 'Oda sıcaklığında',
    manufacturer: 'Pfizer',
    activeIngredients: ['Atorvastatin 10mg', 'Atorvastatin 20mg', 'Atorvastatin 40mg'],
    dosageForms: ['Tablet']
  }
]

export const categories = [
  'Tümü',
  'Ağrı Kesici',
  'Antibiyotik',
  'Vitamin',
  'Antidepresan',
  'Kolesterol',
  'Tansiyon',
  'Şeker',
  'Mide',
  'Alerji'
]

export const searchDrugs = (query: string, category: string = 'Tümü'): Drug[] => {
  let filtered = drugs

  if (query) {
    const searchTerm = query.toLowerCase()
    filtered = filtered.filter(drug =>
      drug.name.toLowerCase().includes(searchTerm) ||
      drug.genericName.toLowerCase().includes(searchTerm) ||
      drug.description.toLowerCase().includes(searchTerm) ||
      drug.category.toLowerCase().includes(searchTerm)
    )
  }

  if (category !== 'Tümü') {
    filtered = filtered.filter(drug => drug.category === category)
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