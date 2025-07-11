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
  dosage: {
    adults: string
    children: string
    elderly: string
  }
  sideEffects: string[]
  interactions: string[]
  warnings: string[]
  howToUse: string
  storage: string
  manufacturer: string
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
    name: 'Parol',
    genericName: 'Parasetamol',
    category: 'Ağrı Kesici',
    description: 'Ateş düşürücü ve ağrı kesici etkili, güvenli bir ilaçtır.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
    price: '₺15-25',
    priceValue: 20,
    popularity: 4.8,
    prescription: false,
    dosage: {
      adults: '500-1000mg, 4-6 saatte bir',
      children: '10-15mg/kg, 4-6 saatte bir',
      elderly: '500mg, 6-8 saatte bir'
    },
    sideEffects: ['Mide bulantısı', 'Karaciğer hasarı (yüksek dozda)', 'Alerjik reaksiyonlar'],
    interactions: ['Warfarin', 'Alkol', 'Diğer parasetamol içeren ilaçlar'],
    warnings: ['Günde 4 gramı geçmeyin', 'Karaciğer hastalığı varsa dikkatli kullanın'],
    howToUse: 'Yemeklerle birlikte veya aç karnına alınabilir',
    storage: 'Oda sıcaklığında, nemden uzak saklayın',
    manufacturer: 'Abdi İbrahim'
  },
  {
    id: 2,
    name: 'Aspirin',
    genericName: 'Asetilsalisilik Asit',
    category: 'Ağrı Kesici',
    description: 'Ağrı kesici, ateş düşürücü ve kan sulandırıcı etkili klasik ilaç.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
    price: '₺8-15',
    priceValue: 12,
    popularity: 4.5,
    prescription: false,
    dosage: {
      adults: '325-650mg, 4-6 saatte bir',
      children: 'Kullanımı önerilmez',
      elderly: '325mg, 6-8 saatte bir'
    },
    sideEffects: ['Mide kanaması', 'Kulak çınlaması', 'Baş dönmesi'],
    interactions: ['Warfarin', 'Diğer NSAİİ', 'Kortikosteroidler'],
    warnings: ['Mide ülseri varsa kullanmayın', '18 yaş altı ateşli hastalıklarda kullanmayın'],
    howToUse: 'Yemeklerle birlikte alın',
    storage: 'Serin ve kuru yerde saklayın',
    manufacturer: 'Bayer'
  },
  {
    id: 3,
    name: 'Augmentin',
    genericName: 'Amoksisilin + Klavulanik Asit',
    category: 'Antibiyotik',
    description: 'Bakteriyel enfeksiyonları tedavi eden geniş spektrumlu antibiyotik.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
    price: '₺45-75',
    priceValue: 60,
    popularity: 4.2,
    prescription: true,
    dosage: {
      adults: '625mg, günde 2-3 kez',
      children: '20-40mg/kg, günde 2-3 kez',
      elderly: '625mg, günde 2 kez'
    },
    sideEffects: ['İshal', 'Mide bulantısı', 'Cilt döküntüsü'],
    interactions: ['Oral kontraseptifler', 'Methotrexate', 'Probenecid'],
    warnings: ['Alerjik reaksiyon geçmişi varsa kullanmayın', 'Tam süre kullanın'],
    howToUse: 'Yemeklerle birlikte alın',
    storage: 'Buzdolabında saklayın',
    manufacturer: 'GSK'
  },
  {
    id: 4,
    name: 'Ventolin',
    genericName: 'Salbutamol',
    category: 'Solunum',
    description: 'Astım ve bronşit tedavisinde kullanılan bronkodilatör.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
    price: '₺35-55',
    priceValue: 45,
    popularity: 4.6,
    prescription: true,
    dosage: {
      adults: '2 puf, 4-6 saatte bir',
      children: '1-2 puf, 4-6 saatte bir',
      elderly: '2 puf, 6-8 saatte bir'
    },
    sideEffects: ['Kalp çarpıntısı', 'Titreme', 'Baş ağrısı'],
    interactions: ['Beta blokerler', 'Diüretikler', 'Kortikosteroidler'],
    warnings: ['Kalp hastalığı varsa dikkatli kullanın', 'Aşırı kullanımdan kaçının'],
    howToUse: 'İnhalasyon yoluyla kullanın',
    storage: 'Oda sıcaklığında saklayın',
    manufacturer: 'GSK'
  },
  {
    id: 5,
    name: 'Zinc',
    genericName: 'Çinko',
    category: 'Vitamin',
    description: 'Bağışıklık sistemi ve yara iyileşmesi için gerekli mineral.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
    price: '₺25-40',
    priceValue: 32,
    popularity: 4.3,
    prescription: false,
    dosage: {
      adults: '15-30mg, günde 1 kez',
      children: '5-15mg, günde 1 kez',
      elderly: '15mg, günde 1 kez'
    },
    sideEffects: ['Mide bulantısı', 'Metalik tat', 'İshal'],
    interactions: ['Demir preparatları', 'Antibiyotikler', 'Diüretikler'],
    warnings: ['Aç karnına almayın', 'Uzun süreli kullanımda bakır eksikliği olabilir'],
    howToUse: 'Yemeklerle birlikte alın',
    storage: 'Serin ve kuru yerde saklayın',
    manufacturer: 'Solgar'
  },
  {
    id: 6,
    name: 'Lipitor',
    genericName: 'Atorvastatin',
    category: 'Kardiyovasküler',
    description: 'Kolesterol düşürücü ve kalp hastalığı riskini azaltan statin.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
    price: '₺80-120',
    priceValue: 100,
    popularity: 4.1,
    prescription: true,
    dosage: {
      adults: '10-80mg, günde 1 kez',
      children: 'Kullanımı önerilmez',
      elderly: '10-40mg, günde 1 kez'
    },
    sideEffects: ['Kas ağrısı', 'Karaciğer enzim yüksekliği', 'Mide bulantısı'],
    interactions: ['Greyfurt suyu', 'Warfarin', 'Digoksin'],
    warnings: ['Gebelerde kullanmayın', 'Karaciğer fonksiyonlarını takip edin'],
    howToUse: 'Akşam yemeğiyle birlikte alın',
    storage: 'Oda sıcaklığında saklayın',
    manufacturer: 'Pfizer'
  },
  {
    id: 7,
    name: 'Omeprazol',
    genericName: 'Omeprazol',
    category: 'Gastrointestinal',
    description: 'Mide asidini azaltan proton pompa inhibitörü.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
    price: '₺30-50',
    priceValue: 40,
    popularity: 4.4,
    prescription: false,
    dosage: {
      adults: '20mg, günde 1-2 kez',
      children: '10mg, günde 1 kez',
      elderly: '20mg, günde 1 kez'
    },
    sideEffects: ['Baş ağrısı', 'İshal', 'Karın ağrısı'],
    interactions: ['Demir preparatları', 'B12 vitamini', 'Kalsiyum'],
    warnings: ['Uzun süreli kullanımda kemik erimesi riski', 'B12 eksikliği olabilir'],
    howToUse: 'Kahvaltıdan 30 dakika önce alın',
    storage: 'Oda sıcaklığında saklayın',
    manufacturer: 'AstraZeneca'
  },
  {
    id: 8,
    name: 'Xanax',
    genericName: 'Alprazolam',
    category: 'Psikiyatrik',
    description: 'Anksiyete ve panik bozukluklarında kullanılan benzodiazepin.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
    price: '₺60-90',
    priceValue: 75,
    popularity: 3.8,
    prescription: true,
    dosage: {
      adults: '0.25-1mg, günde 2-3 kez',
      children: 'Kullanımı önerilmez',
      elderly: '0.25mg, günde 1-2 kez'
    },
    sideEffects: ['Uyku hali', 'Bağımlılık', 'Hafıza sorunları'],
    interactions: ['Alkol', 'Antidepresanlar', 'Opioidler'],
    warnings: ['Bağımlılık yapabilir', 'Aniden kesmeyin', 'Araç kullanmayın'],
    howToUse: 'Doktor önerisine göre alın',
    storage: 'Güvenli yerde saklayın',
    manufacturer: 'Pfizer'
  },
  {
    id: 9,
    name: 'Betnovate',
    genericName: 'Betametazon',
    category: 'Dermatolojik',
    description: 'Cilt hastalıklarında kullanılan güçlü kortikosteroid krem.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
    price: '₺25-40',
    priceValue: 32,
    popularity: 4.0,
    prescription: true,
    dosage: {
      adults: 'Günde 1-2 kez ince tabaka',
      children: 'Günde 1 kez ince tabaka',
      elderly: 'Günde 1 kez ince tabaka'
    },
    sideEffects: ['Cilt incelmesi', 'Çatlaklar', 'Renk değişikliği'],
    interactions: ['Diğer topikal ilaçlar', 'UV ışınları'],
    warnings: ['Yüzde uzun süre kullanmayın', 'Göz çevresine uygulamayın'],
    howToUse: 'Temiz cilde ince tabaka halinde uygulayın',
    storage: 'Serin yerde saklayın',
    manufacturer: 'GSK'
  },
  {
    id: 10,
    name: 'Metformin',
    genericName: 'Metformin',
    category: 'Endokrinolojik',
    description: 'Tip 2 diyabet tedavisinde kullanılan oral antidiyabetik.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
    price: '₺20-35',
    priceValue: 28,
    popularity: 4.2,
    prescription: true,
    dosage: {
      adults: '500-2000mg, günde 2-3 kez',
      children: 'Kullanımı önerilmez',
      elderly: '500-1500mg, günde 2 kez'
    },
    sideEffects: ['Mide bulantısı', 'İshal', 'Karın ağrısı'],
    interactions: ['Alkol', 'Diüretikler', 'Kortikosteroidler'],
    warnings: ['Böbrek hastalığı varsa dikkatli kullanın', 'Laktik asidoz riski'],
    howToUse: 'Yemeklerle birlikte alın',
    storage: 'Oda sıcaklığında saklayın',
    manufacturer: 'Merck'
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