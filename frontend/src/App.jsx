import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Checkout from './pages/Checkout'

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
