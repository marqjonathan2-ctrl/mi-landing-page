import { motion } from 'framer-motion'
import Link from 'next/link'

const whatsapp = "https://api.whatsapp.com/send?phone=584243014920&text=Hola%20Jonathan%2C%20quiero%20solicitar%20la%20Auditor%C3%ADa%20de%20Datos%20Gratuita%20de%2015%20minutos%20para%20mi%20empresa."

export default function Nav() {
  return (
    <header className="fixed top-4 left-0 right-0 mx-auto max-w-7xl px-6 z-30">
      <div className="glass flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          {/* Placeholder logo - swap with GLTF or SVG */}
          <div className="w-12 h-12 rounded-md flex items-center justify-center metallic text-silver">
            <span className="text-xl font-bold" style={{color: '#E5E4E2'}}>JM</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-silver">
            <a href="#inicio" className="hover:text-white transition">Inicio</a>
            <a href="#quienes" className="hover:text-white transition">Quienes Somos</a>
            <a href="#servicios" className="hover:text-white transition">Servicios</a>
            <a href="#demo" className="hover:text-white transition">Live Demo</a>
            <a href="#contacto" className="hover:text-white transition">Contacto</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 rounded-md text-sm">
            Solicitar Auditoría
          </a>
          <button className="btn-outline px-4 py-2 rounded-md text-sm">Probar Demo</button>
        </div>
      </div>
    </header>
  )
}