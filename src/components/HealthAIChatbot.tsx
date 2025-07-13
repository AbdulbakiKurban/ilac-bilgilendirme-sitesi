import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2, 
  Maximize2,
  Loader2,
  Sparkles,
  Heart,
  Pill,
  Stethoscope
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isLoading?: boolean
}

const HealthAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben Sağlık AI Asistanınız. İlaçlar hakkında sorularınızı sorabilir, yan etkileri öğrenebilir ve sağlık tavsiyeleri alabilirsiniz. Size nasıl yardımcı olabilirim?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    }

    setMessages(prev => [...prev, loadingMessage])

    try {
      // API çağrısı - şimdilik mock response
      const response = await mockAIResponse(inputText)
      
      // Loading message'ı kaldır ve gerçek cevabı ekle
      setMessages(prev => prev.filter(msg => !msg.isLoading))
      
      const botMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('AI response error:', error)
      setMessages(prev => prev.filter(msg => !msg.isLoading))
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.',
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const mockAIResponse = async (userInput: string): Promise<string> => {
    // Simüle edilmiş API gecikmesi
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('parol') || lowerInput.includes('paracetamol')) {
      return 'Parol (Paracetamol) hakkında bilgi:\n\n• Etken madde: Paracetamol\n• Kullanım: Ağrı kesici ve ateş düşürücü\n• Doz: Yetişkinler için 500-1000mg, günde 4 kez\n• Yan etkiler: Mide bulantısı, karaciğer hasarı (yüksek dozda)\n• Dikkat: Alkol ile birlikte kullanmayın'
    } else if (lowerInput.includes('aspirin')) {
      return 'Aspirin hakkında bilgi:\n\n• Etken madde: Asetilsalisilik asit\n• Kullanım: Ağrı kesici, ateş düşürücü, kan sulandırıcı\n• Doz: 325-650mg, günde 3-4 kez\n• Yan etkiler: Mide kanaması, ülser, alerjik reaksiyonlar\n• Dikkat: Kanama bozukluğu olanlar kullanmamalı'
    } else if (lowerInput.includes('vitamin') || lowerInput.includes('vitamin d')) {
      return 'Vitamin D hakkında bilgi:\n\n• Fonksiyon: Kemik sağlığı, bağışıklık sistemi\n• Kaynaklar: Güneş ışığı, yağlı balık, yumurta sarısı\n• Günlük ihtiyaç: 600-800 IU\n• Eksiklik belirtileri: Kemik ağrısı, kas zayıflığı\n• Fazla alım: Böbrek taşı, kalsiyum birikimi'
    } else if (lowerInput.includes('yan etki') || lowerInput.includes('side effect')) {
      return 'İlaç yan etkileri hakkında:\n\n• Yan etkiler kişiden kişiye değişebilir\n• Hafif yan etkiler: Mide bulantısı, baş dönmesi\n• Ciddi yan etkiler: Alerjik reaksiyon, nefes darlığı\n• Yan etki yaşarsanız doktorunuza başvurun\n• İlaç etkileşimlerini kontrol edin'
    } else {
      return 'Bu konu hakkında detaylı bilgi için lütfen spesifik bir ilaç adı veya sağlık konusu belirtin. Size daha iyi yardımcı olabilmem için sorunuzu daha açık bir şekilde sorabilir misiniz?'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    'Parol nedir?',
    'Aspirin yan etkileri nelerdir?',
    'Vitamin D eksikliği belirtileri',
    'İlaç etkileşimleri nasıl kontrol edilir?'
  ]

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Sağlık AI Asistanı</h3>
                  <p className="text-xs text-green-100">Çevrimiçi</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Yazıyor...</span>
                          </div>
                        ) : (
                          <div className="whitespace-pre-line">{message.text}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">Önerilen sorular:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputText(question)
                            inputRef.current?.focus()
                          }}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Sağlık sorunuzu yazın..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isLoading}
                      className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HealthAIChatbot 