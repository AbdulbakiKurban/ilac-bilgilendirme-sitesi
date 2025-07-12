import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Download, Loader2, CheckCircle, AlertTriangle, X, FileUp, FileDown, Zap, Settings, RefreshCw, Copy, Eye, Camera, Image } from 'lucide-react'

interface RealOCRConverterProps {
  onConverted?: (text: string, fileName: string) => void
  onClose?: () => void
}

const RealOCRConverter: React.FC<RealOCRConverterProps> = ({ onConverted, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [convertedText, setConvertedText] = useState('')
  const [conversionStep, setConversionStep] = useState('')
  const [error, setError] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [manualText, setManualText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // PDF'yi resimlere çevirme (Geliştirilmiş versiyon)
  const convertPDFToImages = async (file: File): Promise<string[]> => {
    try {
      setConversionStep('PDF.js yükleniyor...')
      
      // PDF.js'i dinamik olarak yükle
      const pdfjsLib = await import('pdfjs-dist')
      
      // Worker'ı ayarla - alternatif CDN'ler
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
        } catch {
          // Fallback CDN
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        }
      }
      
      setConversionStep('PDF dosyası okunuyor...')
      const arrayBuffer = await file.arrayBuffer()
      
      setConversionStep('PDF analiz ediliyor...')
      const pdf = await pdfjsLib.getDocument({ 
        data: arrayBuffer,
        verbosity: 0 // Hata mesajlarını azalt
      }).promise
      
      const images: string[] = []
      const totalPages = pdf.numPages
      
      setConversionStep(`Toplam ${totalPages} sayfa bulundu. Resme çevriliyor...`)
      
      for (let i = 1; i <= totalPages; i++) {
        try {
          setConversionStep(`Sayfa ${i}/${totalPages} resme çevriliyor...`)
          
          const page = await pdf.getPage(i)
          
          // Canvas oluştur
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          
          if (!context) {
            throw new Error('Canvas context oluşturulamadı')
          }
          
          // Yüksek çözünürlük için scale ayarla
          const viewport = page.getViewport({ scale: 1.5 })
          
          canvas.height = viewport.height
          canvas.width = viewport.width
          
          // Sayfayı canvas'a çiz
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          
          await page.render(renderContext).promise
          
          // Canvas'ı resim URL'ine çevir
          const imageUrl = canvas.toDataURL('image/png', 0.8)
          images.push(imageUrl)
          
          // Belleği temizle
          canvas.remove()
          
        } catch (pageError) {
          console.error(`Sayfa ${i} işlenirken hata:`, pageError)
          
          // Alternatif yöntem: Daha düşük çözünürlük dene
          try {
            setConversionStep(`Sayfa ${i}/${totalPages} alternatif yöntemle işleniyor...`)
            
            const page = await pdf.getPage(i)
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            
            if (context) {
              const viewport = page.getViewport({ scale: 1.0 }) // Daha düşük çözünürlük
              
              canvas.height = viewport.height
              canvas.width = viewport.width
              
              await page.render({
                canvasContext: context,
                viewport: viewport
              }).promise
              
              const imageUrl = canvas.toDataURL('image/jpeg', 0.7) // JPEG formatı
              images.push(imageUrl)
              canvas.remove()
            }
          } catch (altError) {
            console.error(`Sayfa ${i} alternatif yöntemle de işlenemedi:`, altError)
            // Bu sayfayı atla ve devam et
            continue
          }
        }
      }
      
      if (images.length === 0) {
        throw new Error('Hiçbir sayfa resme çevrilemedi.')
      }
      
      setConversionStep(`${images.length} sayfa başarıyla resme çevrildi.`)
      return images
      
    } catch (error) {
      console.error('PDF to Image hatası:', error)
      
      // Daha detaylı hata mesajları
      if (error instanceof Error) {
        if (error.message.includes('Invalid PDF')) {
          throw new Error('Geçersiz PDF dosyası. Lütfen farklı bir PDF deneyin.')
        } else if (error.message.includes('Password')) {
          throw new Error('PDF şifreli. Lütfen şifresiz bir PDF kullanın.')
        } else if (error.message.includes('network')) {
          throw new Error('PDF.js worker yüklenemedi. İnternet bağlantınızı kontrol edin.')
        } else if (error.message.includes('Canvas')) {
          throw new Error('Tarayıcınız canvas işlemlerini desteklemiyor. Lütfen güncel bir tarayıcı kullanın.')
        } else {
          throw new Error(`PDF resme çevrilemedi: ${error.message}`)
        }
      }
      
      throw new Error('PDF resme çevrilemedi. Lütfen farklı bir dosya deneyin.')
    }
  }

  // OCR işleme (Geliştirilmiş versiyon)
  const performOCR = async (imageUrl: string, pageNumber: number): Promise<string> => {
    try {
      setConversionStep(`Sayfa ${pageNumber} OCR işleniyor...`)
      
      // Tesseract.js yükleme
      const { createWorker } = await import('tesseract.js')
      
      const worker = await createWorker('tur', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setConversionStep(`Sayfa ${pageNumber} OCR: %${Math.round(m.progress * 100)}`)
          }
        }
      })
      
      // OCR parametrelerini ayarla
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:!?()[]{}"\'-/\\\n\r\t ',
        preserve_interword_spaces: '1',
      })
      
      const { data: { text } } = await worker.recognize(imageUrl)
      
      await worker.terminate()
      return text.trim()
      
    } catch (error) {
      console.error(`OCR hatası (Sayfa ${pageNumber}):`, error)
      throw new Error(`Sayfa ${pageNumber} OCR işlemi başarısız: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`)
    }
  }

  // Dosya yükleme (Geliştirilmiş versiyon)
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Lütfen PDF dosyası seçin.')
      return
    }

    // Dosya boyutu kontrolü (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      setError('Dosya boyutu 50MB\'dan büyük olamaz.')
      return
    }

    setUploadedFile(file)
    setIsConverting(true)
    setError('')
    setConvertedText('')
    setConversionStep('PDF analiz ediliyor...')

    try {
      // PDF'yi resimlere çevir
      const images = await convertPDFToImages(file)
      
      if (images.length === 0) {
        throw new Error('PDF resme çevrilemedi.')
      }
      
      // Her resim için OCR yap
      let fullText = ''
      let successfulPages = 0
      
      for (let i = 0; i < images.length; i++) {
        try {
          const pageText = await performOCR(images[i], i + 1)
          
          if (pageText.trim().length > 10) { // En az 10 karakter
            fullText += `\n\n--- Sayfa ${i + 1} ---\n\n${pageText}`
            successfulPages++
          }
          
        } catch (pageError) {
          console.error(`Sayfa ${i + 1} işlenemedi:`, pageError)
          fullText += `\n\n--- Sayfa ${i + 1} (OCR Başarısız) ---\n\n[Bu sayfa OCR ile işlenemedi]`
        }
      }

      if (fullText.trim().length > 50) {
        setConvertedText(fullText.trim())
        setPreviewText(fullText.substring(0, 500) + (fullText.length > 500 ? '...' : ''))
        setConversionStep(`OCR tamamlandı! ${successfulPages}/${images.length} sayfa başarılı.`)
      } else {
        setError('OCR ile yeterli metin çıkarılamadı. Manuel giriş yapın.')
      }
      
      setTimeout(() => {
        setConversionStep('')
        setIsConverting(false)
      }, 2000)

    } catch (error) {
      setError(error instanceof Error ? error.message : 'OCR hatası')
      setIsConverting(false)
      setConversionStep('')
    }
  }

  // Manuel metin girişi
  const handleManualText = () => {
    if (manualText.trim()) {
      setConvertedText(manualText.trim())
      setPreviewText(manualText.substring(0, 500) + (manualText.length > 500 ? '...' : ''))
      setUploadedFile(new File([manualText], 'manual_input.txt', { type: 'text/plain' }))
    }
  }

  // Word formatına çevirme
  const convertToWordFormat = (text: string, originalFileName: string): string => {
    const fileName = originalFileName.replace('.pdf', '.txt')
    
    const wordContent = `OCR ile Dönüştürülen İçerik
=====================================

Orijinal Dosya: ${originalFileName}
Dönüştürme Tarihi: ${new Date().toLocaleDateString('tr-TR')}
Dönüştürme Saati: ${new Date().toLocaleTimeString('tr-TR')}
Dönüştürme Yöntemi: Tesseract.js OCR (Türkçe)

${text}

---
Bu dosya MediGuide Gerçek OCR Dönüştürücü ile oluşturulmuştur.
`

    return wordContent
  }

  // Dosya indirme
  const downloadFile = () => {
    if (!convertedText || !uploadedFile) return

    const wordContent = convertToWordFormat(convertedText, uploadedFile.name)
    const fileName = uploadedFile.name.replace('.pdf', '_ocr_converted.txt')
    
    const blob = new Blob([wordContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Metni kopyalama
  const copyToClipboard = () => {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText)
        .then(() => {
          alert('Metin panoya kopyalandı!')
        })
        .catch(() => {
          // Fallback
          const textArea = document.createElement('textarea')
          textArea.value = convertedText
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Metin panoya kopyalandı!')
        })
    }
  }

  // Akıllı ilaç yükleme sistemine gönderme
  const sendToDrugUploader = () => {
    if (onConverted && convertedText && uploadedFile) {
      const fileName = uploadedFile.name.replace('.pdf', '_ocr_converted.txt')
      onConverted(convertedText, fileName)
      setIsOpen(false)
      if (onClose) onClose()
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center space-x-2"
      >
        <Camera className="h-5 w-5" />
        <span>Gerçek OCR Dönüştürücü</span>
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
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Camera className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Gerçek OCR Dönüştürücü</h2>
                      <p className="text-gray-600">Taranmış PDF'lerden metin çıkarma</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sol Panel - Yükleme */}
                  <div className="space-y-6">
                    {/* OCR Bilgi */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Image className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-orange-900 mb-1">OCR Nasıl Çalışır?</h4>
                          <p className="text-orange-700 text-sm">
                            1. PDF sayfaları resme çevrilir<br/>
                            2. Tesseract.js ile OCR işlemi yapılır<br/>
                            3. Türkçe dil desteği ile metin çıkarılır
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sorun Giderme */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Sorun Giderme</h4>
                          <p className="text-blue-700 text-sm">
                            • PDF şifreli olmamalı<br/>
                            • Dosya boyutu 50MB'dan küçük olmalı<br/>
                            • Taranmış PDF'ler en iyi sonucu verir<br/>
                            • İnternet bağlantısı gereklidir
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dosya Yükleme */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isConverting}
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isConverting}
                        className={`cursor-pointer flex flex-col items-center space-y-4 ${
                          isConverting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="bg-gray-100 p-4 rounded-full">
                          {isConverting ? (
                            <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />
                          ) : (
                            <FileUp className="h-8 w-8 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {isConverting ? 'İşleniyor...' : 'Taranmış PDF yükleyin'}
                          </p>
                          <p className="text-gray-500">
                            {isConverting ? conversionStep : 'OCR ile metin çıkarılacak'}
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Manuel Giriş */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex-1 h-px bg-gray-300"></div>
                          <span className="text-gray-500 font-medium">VEYA</span>
                          <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <textarea
                          value={manualText}
                          onChange={(e) => setManualText(e.target.value)}
                          placeholder="PDF içeriğini buraya yapıştırın..."
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                        <button
                          onClick={handleManualText}
                          className="w-full btn-secondary flex items-center justify-center space-x-2"
                        >
                          <Copy className="h-5 w-5" />
                          <span>Manuel Metni İşle</span>
                        </button>
                      </div>
                    </div>

                    {/* İşlem Durumu - Sadece hata durumunda göster */}
                    {isConverting && error && (
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 text-orange-600 animate-spin mx-auto mb-2" />
                        <p className="text-gray-600">{conversionStep}</p>
                      </div>
                    )}

                    {/* Hata Mesajı */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <p className="text-red-900">{error}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sağ Panel - Sonuç */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">OCR Sonucu</h3>
                    
                    {convertedText ? (
                      <div className="space-y-4">
                        {/* Önizleme */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">Önizleme</h4>
                            <button
                              onClick={() => setShowPreview(!showPreview)}
                              className="text-orange-600 hover:text-orange-700 text-sm"
                            >
                              {showPreview ? 'Gizle' : 'Göster'}
                            </button>
                          </div>
                          {showPreview && (
                            <div className="max-h-60 overflow-y-auto bg-white border border-gray-200 rounded p-3 text-sm">
                              <pre className="whitespace-pre-wrap">{previewText}</pre>
                            </div>
                          )}
                        </div>

                        {/* İstatistikler */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-orange-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              {convertedText.length}
                            </div>
                            <div className="text-sm text-orange-700">Karakter</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {convertedText.split('\n').length}
                            </div>
                            <div className="text-sm text-green-700">Satır</div>
                          </div>
                        </div>

                        {/* Aksiyon Butonları */}
                        <div className="space-y-3">
                          <button
                            onClick={downloadFile}
                            className="w-full btn-primary flex items-center justify-center space-x-2"
                          >
                            <Download className="h-5 w-5" />
                            <span>OCR Sonucunu İndir</span>
                          </button>
                          
                          <button
                            onClick={copyToClipboard}
                            className="w-full btn-secondary flex items-center justify-center space-x-2"
                          >
                            <Copy className="h-5 w-5" />
                            <span>Panoya Kopyala</span>
                          </button>
                          
                          <button
                            onClick={sendToDrugUploader}
                            className="w-full btn-primary flex items-center justify-center space-x-2"
                          >
                            <FileText className="h-5 w-5" />
                            <span>İlaç Yükleme Sistemine Gönder</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Taranmış PDF yükleyin ve OCR sonucunu burada görün
                        </p>
                      </div>
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

export default RealOCRConverter 