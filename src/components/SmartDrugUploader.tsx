import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertTriangle, X, Plus, Save, Loader2, FileUp, Smartphone, Database, Zap, Brain, Shield } from 'lucide-react'
import { addDrugFromPDF, validatePDFData, formatPDFData, drugs } from '../data/drugs'

interface SmartDrugUploaderProps {
  onDrugAdded?: (drug: any) => void
  onClose?: () => void
  initialText?: string
  initialFileName?: string
}

const SmartDrugUploader: React.FC<SmartDrugUploaderProps> = ({ onDrugAdded, onClose, initialText, initialFileName }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({
    name: '',
    genericName: '',
    category: '',
    description: '',
    manufacturer: '',
    strength: '',
    dosageForm: '',
    prescription: false,
    dosage: {
      adults: '',
      children: '',
      elderly: '',
      maxDaily: ''
    },
    sideEffects: [''],
    interactions: [''],
    warnings: [''],
    howToUse: '',
    storage: '',
    price: '',
    approvalStatus: 'approved',
    licenseNumber: '',
    activeIngredient: '',
    packageSize: '',
    expiryDate: '',
    batchNumber: '',
    registrationNumber: '',
    atcCode: '',
    pregnancy: '',
    breastfeeding: '',
    driving: '',
    alcohol: '',
    foodInteractions: [''],
    contraindications: [''],
    overdose: '',
    pharmacokinetics: '',
    clinicalTrials: '',
    costEffectiveness: '',
    alternatives: [''],
    patientReviews: [],
    medicalReviews: []
  })
  
  const [suggestions, setSuggestions] = useState<any>({})
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')

  // Dönüştürülen metni kullan
  useEffect(() => {
    if (initialText && initialFileName) {
      setExtractedText(initialText)
      setUploadedFile(new File([initialText], initialFileName, { type: 'text/plain' }))
      analyzeText(initialText)
      setCurrentStep(2) // Direkt düzenleme adımına geç
    }
  }, [initialText, initialFileName])

  // Akıllı öneriler sistemi
  const getSmartSuggestions = (field: string, value: string) => {
    if (!value || value.length < 2) return []

    const existingDrugs = drugs.filter(drug => 
      drug[field as keyof typeof drug]?.toString().toLowerCase().includes(value.toLowerCase())
    )

    return existingDrugs.slice(0, 5).map(drug => ({
      value: drug[field as keyof typeof drug],
      label: `${drug[field as keyof typeof drug]} (${drug.name})`
    }))
  }

  // Kategori önerileri
  const categorySuggestions = [
    'Ağrı Kesici', 'Antibiyotik', 'Vitamin', 'Kardiyovasküler', 
    'Solunum', 'Gastrointestinal', 'Psikiyatrik', 'Dermatolojik', 'Endokrinolojik'
  ]

  // Form alanlarını güncelle
  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))

    // Akıllı önerileri güncelle
    if (typeof value === 'string' && value.length >= 2) {
      const fieldSuggestions = getSmartSuggestions(field, value)
      setSuggestions((prev: any) => ({
        ...prev,
        [field]: fieldSuggestions
      }))
    } else {
      setSuggestions((prev: any) => ({
        ...prev,
        [field]: []
      }))
    }
  }

  // Nested field güncelleme
  const updateNestedField = (parentField: string, childField: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }))
  }

  // Array field güncelleme
  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[field] || [])]
      newArray[index] = value
      return {
        ...prev,
        [field]: newArray
      }
    })
  }

  // Array field'a yeni eleman ekleme
  const addArrayItem = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }))
  }

  // Array field'dan eleman çıkarma
  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }))
  }

  // Dosya yükleme
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsProcessing(true)

    try {
      if (file.name.toLowerCase().endsWith('.txt')) {
        // TXT dosyası
        const text = await file.text()
        setExtractedText(text)
        analyzeText(text)
      } else if (file.name.toLowerCase().endsWith('.pdf')) {
        // PDF dosyası - basit metin çıkarma
        const text = await extractTextFromPDF(file)
        setExtractedText(text)
        analyzeText(text)
      } else {
        setValidationErrors(['Lütfen PDF veya TXT dosyası seçin.'])
      }
    } catch (error) {
      setValidationErrors(['Dosya okunurken bir hata oluştu.'])
    } finally {
      setIsProcessing(false)
    }
  }

  // PDF'den metin çıkarma (basitleştirilmiş)
  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Basit metin çıkarma - gerçek PDF parsing yerine
        resolve('PDF içeriği manuel olarak girilmelidir.')
      }
      reader.readAsText(file)
    })
  }

  // Metin analizi ve otomatik doldurma
  const analyzeText = (text: string) => {
    const analysis = {
      name: extractFromText(text, ['İlaç Adı', 'İlaç', 'Ad']),
      genericName: extractFromText(text, ['Jenerik Ad', 'Etken Madde', 'Aktif Madde']),
      category: extractFromText(text, ['Kategori', 'Grup', 'Sınıf']),
      manufacturer: extractFromText(text, ['Üretici', 'Firma', 'Üretici Firma']),
      strength: extractFromText(text, ['Güç', 'Dozaj', 'Konsantrasyon']),
      dosageForm: extractFromText(text, ['Form', 'Şekil', 'Dozaj Formu']),
      licenseNumber: extractFromText(text, ['Ruhsat', 'Ruhsat No', 'Kayıt']),
      activeIngredient: extractFromText(text, ['Etken Madde', 'Aktif Madde', 'İçerik']),
      packageSize: extractFromText(text, ['Paket', 'Boyut', 'Miktar'])
    }

    // Form verilerini güncelle
    setFormData((prev: any) => ({
      ...prev,
      ...analysis
    }))

    setCurrentStep(2) // Analiz tamamlandı, düzenleme adımına geç
  }

  // Metinden veri çıkarma
  const extractFromText = (text: string, keywords: string[]): string => {
    for (const keyword of keywords) {
      const regex = new RegExp(`${keyword}[\\s:]*([^\\n\\r]+)`, 'i')
      const match = text.match(regex)
      if (match && match[1]) {
        return match[1].trim()
      }
    }
    return ''
  }

  // Form kaydetme
  const handleSave = () => {
    setIsProcessing(true)
    setValidationErrors([])

    try {
      const formattedData = formatPDFData(formData)
      const validation = validatePDFData(formattedData)

      if (!validation.isValid) {
        setValidationErrors(validation.errors)
        setIsProcessing(false)
        return
      }

      const newDrug = addDrugFromPDF(formattedData)
      setSuccessMessage(`${newDrug.name} başarıyla sisteme eklendi!`)
      
      if (onDrugAdded) {
        onDrugAdded(newDrug)
      }
      
      setTimeout(() => {
        setSuccessMessage('')
        setIsOpen(false)
        if (onClose) onClose()
      }, 2000)
    } catch (error) {
      setValidationErrors(['İlaç sisteme eklenirken bir hata oluştu.'])
    } finally {
      setIsProcessing(false)
    }
  }

  const steps = [
    { id: 1, title: 'Dosya Yükleme', icon: Upload },
    { id: 2, title: 'Veri Düzenleme', icon: FileText },
    { id: 3, title: 'Doğrulama', icon: CheckCircle }
  ]

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center space-x-2"
      >
        <Brain className="h-5 w-5" />
        <span>Akıllı İlaç Yükleme</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Brain className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Akıllı İlaç Yükleme Sistemi</h2>
                      <p className="text-gray-600">AI destekli veri çıkarma ve akıllı öneriler</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentStep >= step.id 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-1 mx-2 ${
                          currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Dosya Yükleme
                        </h3>
                        <p className="text-gray-600 mb-6">
                          PDF veya TXT dosyası yükleyin. Sistem otomatik olarak veri çıkaracak.
                        </p>
                      </div>

                                    <div className="space-y-4">
                {/* Dosya Yükleme */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <div className="bg-gray-100 p-4 rounded-full">
                      <FileUp className="h-8 w-8 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Dosya seçin veya sürükleyin
                      </p>
                      <p className="text-gray-500">PDF veya TXT dosyaları</p>
                    </div>
                  </label>
                </div>

                {/* VEYA */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 font-medium">VEYA</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                </div>

                {/* Manuel Giriş */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setCurrentStep(2)
                      setExtractedText('Manuel giriş modu')
                    }}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Manuel Form Doldur</span>
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF sorun yaşarsanız manuel olarak doldurun
                  </p>
                </div>
              </div>

                      {isProcessing && (
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 text-primary-600 animate-spin mx-auto mb-2" />
                          <p className="text-gray-600">Dosya işleniyor...</p>
                        </div>
                      )}

                      {uploadedFile && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-green-900">
                                {uploadedFile.name} yüklendi
                              </p>
                              <p className="text-green-700 text-sm">
                                Dosya başarıyla işlendi
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Veri Düzenleme
                        </h3>
                        <p className="text-gray-600">
                          Çıkarılan verileri kontrol edin ve düzenleyin
                        </p>
                      </div>

                      {/* Temel Bilgiler */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Temel Bilgiler</h4>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              İlaç Adı *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => updateField('name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="İlaç adını girin"
                            />
                            {suggestions.name && suggestions.name.length > 0 && (
                              <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg p-2">
                                <p className="text-xs text-gray-600 mb-1">Öneriler:</p>
                                {suggestions.name.map((suggestion: any, index: number) => (
                                  <button
                                    key={index}
                                    onClick={() => updateField('name', suggestion.value)}
                                    className="block w-full text-left text-sm text-blue-600 hover:bg-blue-50 p-1 rounded"
                                  >
                                    {suggestion.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Jenerik Ad
                            </label>
                            <input
                              type="text"
                              value={formData.genericName}
                              onChange={(e) => updateField('genericName', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Jenerik adını girin"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategori
                            </label>
                            <select
                              value={formData.category}
                              onChange={(e) => updateField('category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="">Kategori seçin</option>
                              {categorySuggestions.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Üretici
                            </label>
                            <input
                              type="text"
                              value={formData.manufacturer}
                              onChange={(e) => updateField('manufacturer', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Üretici firma"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Teknik Bilgiler</h4>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Güç/Dozaj
                            </label>
                            <input
                              type="text"
                              value={formData.strength}
                              onChange={(e) => updateField('strength', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: 500mg"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Dozaj Formu
                            </label>
                            <input
                              type="text"
                              value={formData.dosageForm}
                              onChange={(e) => updateField('dosageForm', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: Tablet, Kapsül"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Paket Boyutu
                            </label>
                            <input
                              type="text"
                              value={formData.packageSize}
                              onChange={(e) => updateField('packageSize', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: 20 tablet"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ruhsat Numarası
                            </label>
                            <input
                              type="text"
                              value={formData.licenseNumber}
                              onChange={(e) => updateField('licenseNumber', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Ruhsat numarası"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dozaj Bilgileri */}
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Dozaj Bilgileri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Erişkin Dozu
                            </label>
                            <input
                              type="text"
                              value={formData.dosage.adults}
                              onChange={(e) => updateNestedField('dosage', 'adults', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: 500-1000mg, 4-6 saatte bir"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Çocuk Dozu
                            </label>
                            <input
                              type="text"
                              value={formData.dosage.children}
                              onChange={(e) => updateNestedField('dosage', 'children', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: 10-15mg/kg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Yaşlı Dozu
                            </label>
                            <input
                              type="text"
                              value={formData.dosage.elderly}
                              onChange={(e) => updateNestedField('dosage', 'elderly', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: 500mg, 6-8 saatte bir"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Maksimum Günlük Doz
                            </label>
                            <input
                              type="text"
                              value={formData.dosage.maxDaily}
                              onChange={(e) => updateNestedField('dosage', 'maxDaily', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Örn: 4 gram"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Yan Etkiler */}
                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Yan Etkiler</h4>
                          <button
                            onClick={() => addArrayItem('sideEffects')}
                            className="btn-secondary text-sm"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ekle
                          </button>
                        </div>
                        {formData.sideEffects.map((effect: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={effect}
                              onChange={(e) => updateArrayField('sideEffects', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Yan etki girin"
                            />
                            {formData.sideEffects.length > 1 && (
                              <button
                                onClick={() => removeArrayItem('sideEffects', index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Açıklama */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Açıklama
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => updateField('description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="İlaç hakkında kısa açıklama"
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-10 w-10 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Veri Doğrulama
                        </h3>
                        <p className="text-gray-600">
                          Girilen bilgileri kontrol edin ve onaylayın
                        </p>
                      </div>

                      {/* Önizleme */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">İlaç Önizlemesi</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>İlaç Adı:</strong> {formData.name || 'Belirtilmemiş'}</p>
                            <p><strong>Jenerik Ad:</strong> {formData.genericName || 'Belirtilmemiş'}</p>
                            <p><strong>Kategori:</strong> {formData.category || 'Belirtilmemiş'}</p>
                            <p><strong>Üretici:</strong> {formData.manufacturer || 'Belirtilmemiş'}</p>
                          </div>
                          <div>
                            <p><strong>Güç:</strong> {formData.strength || 'Belirtilmemiş'}</p>
                            <p><strong>Form:</strong> {formData.dosageForm || 'Belirtilmemiş'}</p>
                            <p><strong>Paket:</strong> {formData.packageSize || 'Belirtilmemiş'}</p>
                            <p><strong>Ruhsat:</strong> {formData.licenseNumber || 'Belirtilmemiş'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Hata mesajları */}
                      {validationErrors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <h4 className="font-medium text-red-900">Doğrulama Hataları</h4>
                          </div>
                          <ul className="text-red-700 text-sm space-y-1">
                            {validationErrors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Başarı mesajı */}
                      {successMessage && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <p className="text-green-900">{successMessage}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Geri
                  </button>

                  <div className="flex items-center space-x-3">
                    {currentStep < 3 && (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="btn-primary"
                      >
                        İleri
                      </button>
                    )}
                    
                    {currentStep === 3 && (
                      <button
                        onClick={handleSave}
                        disabled={isProcessing}
                        className="btn-primary flex items-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Kaydediliyor...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            <span>Kaydet</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SmartDrugUploader 