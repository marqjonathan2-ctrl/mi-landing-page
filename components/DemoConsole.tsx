import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const whatsapp = "https://api.whatsapp.com/send?phone=584243014920&text=Hola%20Jonathan%2C%20quiero%20solicitar%20la%20Auditor%C3%ADa%20de%20Datos%20Gratuita%20de%2015%20minutos%20para%20mi%20empresa."

export default function DemoConsole() {
  const [mode, setMode] = useState('Predecir Demanda de Ventas')
  const [fileName, setFileName] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = () => {
        // Simula parse CSV
        setTimeout(()=>{},200)
      }
      reader.readAsText(file)
    }
  }

  function runInference() {
    setRunning(true)
    setResult(null)
    // Simulación de inferencia
    setTimeout(() => {
      setRunning(false)
      setResult({
        bars: [0.82, 0.61, 0.45, 0.12],
        precision: 98.4,
        message: "Patrón Detectado. Para aplicar este modelo a la base de datos completa de tu empresa -> Solicitar Auditoría por WhatsApp"
      })
    }, 1600)
  }

  return (
    <div id="demo" className="glass p-6 rounded-xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="text-sm text-silver">Selecciona parámetro</label>
          <select value={mode} onChange={(e)=>setMode(e.target.value)} className="w-full mt-2 p-3 bg-transparent border border-gray-700 rounded-md">
            <option>Predecir Demanda de Ventas</option>
            <option>Evaluar Riesgo de Crédito</option>
            <option>Clasificación de Fuga de Clientes</option>
          </select>

          <div onDrop={handleDrop} onDragOver={(e)=>e.preventDefault()} className="mt-4 p-6 border-dashed border-2 border-gray-700 rounded-md">
            <div className="text-sm text-silver">Arrastra un archivo CSV de prueba aquí</div>
            <div className="mt-2 text-xs text-gray-400">{fileName ?? "Ningún archivo cargado"}</div>
            <input ref={inputRef} type="file" accept=".csv" className="hidden" />
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={runInference} className="btn-primary px-4 py-2 rounded-md" disabled={running}>
              {running ? 'Ejecutando...' : 'Ejecutar Inferencia'}
            </button>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-outline px-4 py-2 rounded-md">Solicitar Auditoría por WhatsApp</a>
          </div>
        </div>

        <div className="w-full md:w-96 metallic p-4 rounded-md">
          <div className="text-xs text-silver">Consola de salida</div>
          {!result && <div className="mt-4 text-sm text-gray-300">No hay resultados aún. Ejecuta la inferencia para ver visualizaciones en tiempo real.</div>}

          {result && (
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-3">
                {result.bars.map((b: number, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 text-xs text-silver">{Math.round(b*100)}%</div>
                    <div className="flex-1 bg-gray-900 h-3 rounded overflow-hidden">
                      <div style={{width:`${b*100}%`}} className="h-full bg-gradient-to-r from-[#00E5FF] to-[#E5E4E2]"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-sm">Precision: <span className="font-semibold">{result.precision}%</span></div>
                <div className="mt-2 text-xs text-silver">{result.message} <a className="underline" href={whatsapp} target="_blank" rel="noreferrer">Solicitar Auditoría por WhatsApp</a></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}