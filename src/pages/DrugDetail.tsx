import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertTriangle, Info, Clock, Shield, Heart, Pill, FileText, Baby, Users, Package, DollarSign } from 'lucide-react'
import { getDrugById } from '../data/drugs'

const DrugDetail = () => {
  const { id } = useParams()
  const drug = getDrugById(Number(id))

  if (!drug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">İlaç Bulunamadı</h1>
          <p className="text-secondary-600 mb-8">Aradığınız ilaç veritabanımızda bulunamadı.</p>
          <Link to="/search" className="btn-primary">
            İlaç Aramaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/search"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Arama Sayfasına Dön
          </Link>
        </motion.div>

        {/* Drug Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                         <img
               src={drug.image}
               alt={drug.name}
               className="w-32 h-32 rounded-lg object-cover"
             />
             <div className="flex-1">
               <div className="flex items-center space-x-3 mb-4">
                 <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                   {drug.category}
                 </span>
                 {drug.prescription && (
                   <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                     <FileText className="h-3 w-3 mr-1" />
                     Reçeteli
                   </span>
                 )}
                 {drug.price && (
                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                     <DollarSign className="h-3 w-3 mr-1" />
                     {drug.price}
                   </span>
                 )}
               </div>
               <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                 {drug.name}
               </h1>
               <p className="text-lg text-secondary-600 mb-4">
                 {drug.genericName}
               </p>
               <p className="text-secondary-700 leading-relaxed">
                 {drug.description}
               </p>
             </div>
          </div>
        </motion.div>

        {/* Drug Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dosage Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-secondary-900">
                Dozaj Bilgileri
              </h2>
            </div>
                           <div className="space-y-4">
                 <div>
                   <h3 className="font-medium text-secondary-900 mb-2">Erişkinler</h3>
                   <p className="text-secondary-700">{drug.dosage.adults}</p>
                 </div>
                 <div>
                   <h3 className="font-medium text-secondary-900 mb-2">Çocuklar</h3>
                   <p className="text-secondary-700">{drug.dosage.children}</p>
                 </div>
                 <div>
                   <h3 className="font-medium text-secondary-900 mb-2">Maksimum Günlük Doz</h3>
                   <p className="text-secondary-700">{drug.dosage.maxDaily}</p>
                 </div>
               </div>
          </motion.div>

          {/* Side Effects */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-secondary-900">
                Yan Etkiler
              </h2>
            </div>
                         <ul className="space-y-2">
               {drug.sideEffects.map((effect: string, index: number) => (
                 <li key={index} className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <span className="text-secondary-700">{effect}</span>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Drug Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Info className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-secondary-900">
                İlaç Etkileşimleri
              </h2>
            </div>
                         <ul className="space-y-2">
               {drug.interactions.map((interaction: string, index: number) => (
                 <li key={index} className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                   <span className="text-secondary-700">{interaction}</span>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Warnings */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-secondary-900">
                Uyarılar
              </h2>
            </div>
                         <ul className="space-y-2">
               {drug.warnings.map((warning: string, index: number) => (
                 <li key={index} className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                   <span className="text-secondary-700">{warning}</span>
                 </li>
               ))}
             </ul>
          </motion.div>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800 mb-2">
                Önemli Uyarı
              </h4>
              <p className="text-red-700 text-sm leading-relaxed">
                Bu bilgiler sadece eğitim amaçlıdır. İlaç kullanımı öncesi mutlaka doktorunuza danışınız. 
                Kendi kendinize ilaç kullanmayınız. Bu site tıbbi tavsiye yerine geçmez.
              </p>
            </div>
          </div>
        </motion.div>

                 {/* Additional Information */}
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1 }}
           className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
         >
           {/* Pregnancy & Breastfeeding */}
           {(drug.pregnancy || drug.breastfeeding) && (
             <div className="card p-6">
               <div className="flex items-center space-x-3 mb-6">
                 <Baby className="h-6 w-6 text-purple-600" />
                 <h2 className="text-xl font-semibold text-secondary-900">
                   Gebelik ve Emzirme
                 </h2>
               </div>
               <div className="space-y-4">
                 {drug.pregnancy && (
                   <div>
                     <h3 className="font-medium text-secondary-900 mb-2">Gebelik</h3>
                     <p className="text-secondary-700">{drug.pregnancy}</p>
                   </div>
                 )}
                 {drug.breastfeeding && (
                   <div>
                     <h3 className="font-medium text-secondary-900 mb-2">Emzirme</h3>
                     <p className="text-secondary-700">{drug.breastfeeding}</p>
                   </div>
                 )}
               </div>
             </div>
           )}

           {/* Storage & Manufacturer */}
           {(drug.storage || drug.manufacturer) && (
             <div className="card p-6">
               <div className="flex items-center space-x-3 mb-6">
                 <Package className="h-6 w-6 text-blue-600" />
                 <h2 className="text-xl font-semibold text-secondary-900">
                   Saklama ve Üretici
                 </h2>
               </div>
               <div className="space-y-4">
                 {drug.storage && (
                   <div>
                     <h3 className="font-medium text-secondary-900 mb-2">Saklama Koşulları</h3>
                     <p className="text-secondary-700">{drug.storage}</p>
                   </div>
                 )}
                 {drug.manufacturer && (
                   <div>
                     <h3 className="font-medium text-secondary-900 mb-2">Üretici</h3>
                     <p className="text-secondary-700">{drug.manufacturer}</p>
                   </div>
                 )}
               </div>
             </div>
           )}
         </motion.div>

         {/* Active Ingredients & Dosage Forms */}
         {(drug.activeIngredients || drug.dosageForms) && (
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.2 }}
             className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
           >
             {drug.activeIngredients && (
               <div className="card p-6">
                 <div className="flex items-center space-x-3 mb-6">
                   <Shield className="h-6 w-6 text-green-600" />
                   <h2 className="text-xl font-semibold text-secondary-900">
                     Etken Maddeler
                   </h2>
                 </div>
                 <div className="space-y-2">
                   {drug.activeIngredients.map((ingredient: string, index: number) => (
                     <div key={index} className="flex items-center space-x-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       <span className="text-secondary-700">{ingredient}</span>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {drug.dosageForms && (
               <div className="card p-6">
                 <div className="flex items-center space-x-3 mb-6">
                   <Pill className="h-6 w-6 text-orange-600" />
                   <h2 className="text-xl font-semibold text-secondary-900">
                     Dozaj Formları
                   </h2>
                 </div>
                 <div className="space-y-2">
                   {drug.dosageForms.map((form: string, index: number) => (
                     <div key={index} className="flex items-center space-x-2">
                       <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                       <span className="text-secondary-700">{form}</span>
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </motion.div>
         )}

         {/* Related Drugs */}
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1.4 }}
           className="mt-8"
         >
           <h3 className="text-xl font-semibold text-secondary-900 mb-4">
             Benzer İlaçlar
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {['Aspirin', 'İbuprofen', 'Diklofenak'].map((drugName, index) => (
               <Link
                 key={index}
                 to="/search"
                 className="card p-4 hover:shadow-lg transition-shadow"
               >
                 <div className="flex items-center space-x-3">
                   <Pill className="h-8 w-8 text-primary-600" />
                   <span className="font-medium text-secondary-900">{drugName}</span>
                 </div>
               </Link>
             ))}
           </div>
         </motion.div>
      </div>
    </div>
  )
}

export default DrugDetail 