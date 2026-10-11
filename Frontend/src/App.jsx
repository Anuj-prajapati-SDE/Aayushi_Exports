import React, { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage/HomePage"
import AboutusPage from "./pages/About/AboutPage"
import ShopPage from "./pages/Shop/ShopPage"
import ShopDetailsPage from "./pages/Shop/components/ShopDetailPage"
import CartPage from "./pages/Cart/CartPage"
import FaqPage from "./pages/Faq/FaqPage"
import ContactPage from "./pages/Contact/ContactPages"
// import LoginPage from "./pages/auth/LoginPage"
// import SignUpPage from "./pages/auth/SignUpPage"

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return null
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutusPage />} />
        <Route path="/shops" element={<ShopPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop-details" element={<ShopDetailsPage />} />
        <Route path="/shop-details/:id" element={<ShopDetailsPage />} />
        <Route path="/carts" element={<CartPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
       

        {/* Fallback route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return <AppLayout />
}

export default App
