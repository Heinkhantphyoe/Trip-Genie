import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TripProvider } from './context/TripContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import Landing from './pages/Landing'
import TripForm from './pages/TripForm'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <TripProvider>
        <div className="min-h-screen flex flex-col bg-surface text-text">
          <Header />
          <main className="flex-1 flex flex-col">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/plan" element={<TripForm />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </TripProvider>
    </BrowserRouter>
  )
}
