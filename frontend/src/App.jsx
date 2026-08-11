import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductGrid from "./components/ProductGrid"

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductGrid />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App


