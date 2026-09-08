export default function Footer() {
  const whatsapp = "https://api.whatsapp.com/send?phone=584243014920&text=Hola%20Jonathan%2C%20quiero%20solicitar%20la%20Auditor%C3%ADa%20de%20Datos%20Gratuita%20de%2015%20minutos%20para%20mi%20empresa."
  return (
    <footer id="contacto" className="mt-20 bg-graphite text-silver py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-lg font-semibold">JM - Inteligencia Artificial & Soluciones</div>
          <div className="text-sm mt-1">Estructuramos el caos. Garantizamos ventajas predictivas.</div>
        </div>

        <div className="flex gap-3">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 rounded-md">WhatsApp</a>
          <a href="mailto:marqjonathan2@gmail.com" className="btn-outline px-4 py-2 rounded-md">marqjonathan2@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}