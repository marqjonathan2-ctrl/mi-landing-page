import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero3D'
import Metrics from '../components/Metrics'
import DemoConsole from '../components/DemoConsole'
import ModelsGrid from '../components/ModelsGrid'
import Tools from '../components/Tools'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>JM - Inteligencia Artificial & Soluciones</title>
        <meta name="description" content="Estructuramos el caos. Garantizamos ventajas predictivas." />
      </Head>

      <div className="min-h-screen relative">
        <Nav />
        <main className="relative z-10">
          <Hero />
          <section className="max-w-7xl mx-auto px-6 py-20">
            <Metrics />
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-semibold mb-6">Consola — JM Predictive Engine v1.0</h2>
            <DemoConsole />
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-semibold mb-6">Ecosistema de modelos</h2>
            <ModelsGrid />
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20">
            <Tools />
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}