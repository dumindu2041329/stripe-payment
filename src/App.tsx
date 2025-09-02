import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PdfDownloadPage from './components/PdfDownloadPage'
import SuccessPage from './components/SuccessPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PdfDownloadPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  )
}

export default App
