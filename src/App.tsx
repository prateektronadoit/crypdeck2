import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import OrbitDisplay from './components/OrbitDisplay'
import FloatingBall from './components/FloatingBall'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans relative overflow-hidden">
      {/* Floating ball animation that moves between sections */}
      <FloatingBall observeElementIds={['hero', 'products', 'ecosystem', 'about']} />
      
      <div className="relative z-10">
        <Header />
        <main className="flex-grow">
          <section id="hero">
            <Hero />
          </section>
          <section id="ecosystem" className="py-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-[#A855F7] mb-8 text-center">Our Ecosystem</h2>
              <OrbitDisplay />
            </div>
          </section>
          <section id="products">
            <Products />
          </section>
          {/* <section id="ecosystem" className="py-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-[#A855F7] mb-8 text-center">Our Ecosystem</h2>
              <OrbitDisplay />
            </div>
          </section> */}
          <section id="about">
            <About />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
