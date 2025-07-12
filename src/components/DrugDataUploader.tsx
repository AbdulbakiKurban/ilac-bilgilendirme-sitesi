import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertTriangle, X, Plus, Save } from 'lucide-react'
import { addDrugFromPDF, validatePDFData, formatPDFData } from '../data/drugs'

interface DrugDataUploaderProps {
  onDrugAdded?: (drug: any) => void
  onClose?: () => void
}

const DrugDataUploader: React.FC<DrugDataUploaderProps> = ({ onDrugAdded, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadedData, setUploadedData] = useState<any>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        setUploadedData(data)
        setValidationErrors([])
      } catch (error) {
        setValidationErrors(['Dosya formatı geçersiz. JSON formatında olmalıdır.'])
      }
    }
    reader.readAsText(file)
  }

  const handleManualInput = () => {
    setUploadedData({
      name: '',
      genericName: '',
      category: '',
      description: '',
      prescription: false,
      dosage: {
        adults: '',
        children: '',
        elderly: '',
        maxDaily: ''
      },
      sideEffects: [],
      interactions: [],
      warnings: [],
      howToUse: '',
      storage: '',
      manufacturer: '',
      approvalStatus: 'pending',
      activeIngredient: '',
      strength: '',
      dosageForm: '',
      packageSize: '',
      licenseNumber: '',
      licenseHolder: ''
    })
    setValidationErrors([])
  }

  const validateAndProcess = () => {
    if (!uploadedData) return

    const formattedData = formatPDFData(uploadedData)
    const validation = validatePDFData(formattedData)

    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    setIsProcessing(true)
    
    try {
      const newDrug = addDrugFromPDF(formattedData)
      setSuccessMessage(`${newDrug.name} başarıyla eklendi!`)
      setUploadedData(null)
      setValidationErrors([])
      
      if (onDrugAdded) {
        onDrugAdded(newDrug)
      }
      
      setTimeout(() => {
        setSuccessMessage('')
        setIsOpen(false)
        if (onClose) onClose()
      }, 2000)
    } catch (error) {
      setValidationErrors(['İlaç eklenirken bir hata oluştu.'])
    } finally {
      setIsProcessing(false)
    }
  }

  const updateField = (field: string, value: any) => {
    if (!uploadedData) return

    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setUploadedData({
        ...uploadedData,
        [parent]: {
          ...uploadedData[parent],
          [child]: value
        }
      })
    } else {
      setUploadedData({
        ...uploadedData,
        [field]: value
      })
    }
  }

  const addArrayItem = (field: string) => {
    if (!uploadedData) return
    
    const currentArray = uploadedData[field] || []
    setUploadedData({
      ...uploadedData,
      [field]: [...currentArray, '']
    })
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    if (!uploadedData) return
    
    const currentArray = [...(uploadedData[field] || [])]
    currentArray[index] = value
    setUploadedData({
      ...uploadedData,
      [field]: currentArray
    })
  }

  const removeArrayItem = (field: string, index: number) => {
    if (!uploadedData) return
    
    const currentArray = [...(uploadedData[field] || [])]
    currentArray.splice(index, 1)
    setUploadedData({
      ...uploadedData,
      [field]: currentArray
    })
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-secondary-900">
                  İlaç Verisi Ekle
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!uploadedData ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Upload className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      PDF Verilerini Yükle
                    </h3>
                    <p className="text-secondary-600 mb-6">
                      PDF'den çıkarılan JSON verilerini yükleyin veya manuel olarak girin
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <FileText className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-secondary-900">JSON Dosyası Yükle</p>
                        <p className="text-xs text-secondary-600 mt-1">PDF'den çıkarılan veriler</p>
                      </label>
                    </div>

                    <button
                      onClick={handleManualInput}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors"
                    >
                      <Plus className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-secondary-900">Manuel Giriş</p>
                      <p className="text-xs text-secondary-600 mt-1">Form ile veri girişi</p>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800">{successMessage}</span>
                      </div>
                    </div>
                  )}

                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="text-red-800 font-medium">Hatalar:</span>
                      </div>
                      <ul className="text-red-700 text-sm space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Temel Bilgiler */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-secondary-900">Temel Bilgiler</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          İlaç Adı *
                        </label>
                        <input
                          type="text"
                          value={uploadedData.name || ''}
                          onChange={(e) => updateField('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Jenerik Ad *
                        </label>
                        <input
                          type="text"
                          value={uploadedData.genericName || ''}
                          onChange={(e) => updateField('genericName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Kategori *
                        </label>
                        <select
                          value={uploadedData.category || ''}
                          onChange={(e) => updateField('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Kategori Seçin</option>
                          <option value="Ağrı Kesici">Ağrı Kesici</option>
                          <option value="Antibiyotik">Antibiyotik</option>
                          <option value="Vitamin">Vitamin</option>
                          <option value="Kardiyovasküler">Kardiyovasküler</option>
                          <option value="Solunum">Solunum</option>
                          <option value="Gastrointestinal">Gastrointestinal</option>
                          <option value="Psikiyatrik">Psikiyatrik</option>
                          <option value="Dermatolojik">Dermatolojik</option>
                          <option value="Endokrinolojik">Endokrinolojik</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Açıklama *
                        </label>
                        <textarea
                          value={uploadedData.description || ''}
                          onChange={(e) => updateField('description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Üretici
                        </label>
                        <input
                          type="text"
                          value={uploadedData.manufacturer || ''}
                          onChange={(e) => updateField('manufacturer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    {/* Teknik Bilgiler */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-secondary-900">Teknik Bilgiler</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Etken Madde
                        </label>
                        <input
                          type="text"
                          value={uploadedData.activeIngredient || ''}
                          onChange={(e) => updateField('activeIngredient', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Güç
                        </label>
                        <input
                          type="text"
                          value={uploadedData.strength || ''}
                          onChange={(e) => updateField('strength', e.target.value)}
                          placeholder="500mg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Dozaj Formu
                        </label>
                        <input
                          type="text"
                          value={uploadedData.dosageForm || ''}
                          onChange={(e) => updateField('dosageForm', e.target.value)}
                          placeholder="Tablet, Kapsül, vb."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Paket Boyutu
                        </label>
                        <input
                          type="text"
                          value={uploadedData.packageSize || ''}
                          onChange={(e) => updateField('packageSize', e.target.value)}
                          placeholder="20 tablet"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Ruhsat Numarası
                        </label>
                        <input
                          type="text"
                          value={uploadedData.licenseNumber || ''}
                          onChange={(e) => updateField('licenseNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Ruhsat Sahibi
                        </label>
                        <input
                          type="text"
                          value={uploadedData.licenseHolder || ''}
                          onChange={(e) => updateField('licenseHolder', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dozaj Bilgileri */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary-900">Dozaj Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Erişkinler
                        </label>
                        <input
                          type="text"
                          value={uploadedData.dosage?.adults || ''}
                          onChange={(e) => updateField('dosage.adults', e.target.value)}
                          placeholder="500-1000mg, 4-6 saatte bir"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Çocuklar
                        </label>
                        <input
                          type="text"
                          value={uploadedData.dosage?.children || ''}
                          onChange={(e) => updateField('dosage.children', e.target.value)}
                          placeholder="10-15mg/kg, 4-6 saatte bir"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Yaşlılar
                        </label>
                        <input
                          type="text"
                          value={uploadedData.dosage?.elderly || ''}
                          onChange={(e) => updateField('dosage.elderly', e.target.value)}
                          placeholder="500mg, 6-8 saatte bir"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Maksimum Günlük Doz
                        </label>
                        <input
                          type="text"
                          value={uploadedData.dosage?.maxDaily || ''}
                          onChange={(e) => updateField('dosage.maxDaily', e.target.value)}
                          placeholder="4 gram"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Yan Etkiler */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-secondary-900">Yan Etkiler</h3>
                      <button
                        onClick={() => addArrayItem('sideEffects')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        + Ekle
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(uploadedData.sideEffects || []).map((effect: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={effect}
                            onChange={(e) => updateArrayItem('sideEffects', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Yan etki açıklaması"
                          />
                          <button
                            onClick={() => removeArrayItem('sideEffects', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* İlaç Etkileşimleri */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-secondary-900">İlaç Etkileşimleri</h3>
                      <button
                        onClick={() => addArrayItem('interactions')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        + Ekle
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(uploadedData.interactions || []).map((interaction: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={interaction}
                            onChange={(e) => updateArrayItem('interactions', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Etkileşim açıklaması"
                          />
                          <button
                            onClick={() => removeArrayItem('interactions', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setUploadedData(null)
                        setValidationErrors([])
                        setSuccessMessage('')
                      }}
                      className="px-4 py-2 text-secondary-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      onClick={validateAndProcess}
                      disabled={isProcessing}
                      className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>İşleniyor...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>İlaç Ekle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default DrugDataUploader 