import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import DrugSearch from './pages/DrugSearch'
import DrugDetail from './pages/DrugDetail'
import DrugInteraction from './pages/DrugInteraction'
import HealthGuide from './pages/HealthGuide'
import About from './pages/About'
import Footer from './components/Footer'
import SmartDrugUploader from './components/SmartDrugUploader'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<DrugSearch />} />
            <Route path="/drug/:id" element={<DrugDetail />} />
            <Route path="/interaction" element={<DrugInteraction />} />
            <Route path="/guide" element={<HealthGuide />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 