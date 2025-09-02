import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PaymentProvider } from './contexts/PaymentContext'
import PdfDownloadPage from './components/PdfDownloadPage'
import SuccessPage from './components/SuccessPage'
import DownloadPage from './components/DownloadPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <PaymentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PdfDownloadPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route 
            path="/download" 
            element={
              <ProtectedRoute>
                <DownloadPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </PaymentProvider>
  )
}

export default App
