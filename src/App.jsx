import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDropdown from './components/CartDropdown'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import FoodPage from './pages/FoodPage'
import HomeProductsPage from './pages/HomeProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  const location = useLocation()
  const showFooter = location.pathname !== '/checkout'
  const showCartDropdown = location.pathname !== '/checkout'

  return (
    <>
      <Header />
      {showCartDropdown && <CartDropdown />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<HomePage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/at-home" element={<HomeProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}

export default App
