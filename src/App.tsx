import Header from './components/Header'
import VaderEasterEgg from './components/VaderEasterEgg'
import PageShake from './components/PageShake'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Global Vader Easter Egg controller (listens for the toggle's event) */}
      <VaderEasterEgg />
      {/* Optional page shake listener (GSAP) */}
      <PageShake />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

