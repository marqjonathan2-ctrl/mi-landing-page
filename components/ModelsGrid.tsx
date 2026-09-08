import { motion, AnimateSharedLayout } from 'framer-motion'
import { useState } from 'react'

const models = [
  { id: 'ml', title: 'Machine Learning', items: ['Supervisado (Predictivos)', 'No Supervisado (Clustering)', 'Por Refuerzo (Optimización)'] },
  { id: 'dl', title: 'Deep Learning', items: ['Visión Artificial (CNN)', 'NLP / GenAI (Transformers)'] },
  { id: 'case', title: 'Casos de Éxito', items: ['Netflix', 'Uber', 'Tesla', 'Amazon'] }
]

export default function ModelsGrid() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <AnimateSharedLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map(m => (
          <motion.div layoutId={m.id} key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)} className="metallic p-6 rounded-xl cursor-pointer">
            <motion.h3 className="text-lg font-semibold">{m.title}</motion.h3>
            <div className="text-sm text-silver mt-2">
              {m.items.slice(0,2).join(' • ')}
            </div>

            {selected === m.id && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.25}} className="mt-4 text-sm">
                <div className="mb-2 font-medium">Definición técnica</div>
                <div className="text-xs text-silver">Resumen técnico, arquitectura y pipelines recomendadas.</div>

                <div className="mt-3 font-medium">Ejemplo Práctico</div>
                <div className="text-xs text-silver">Implementación en empresas globales con resultados medibles.</div>

                <div className="mt-3 font-medium">Mejor Uso</div>
                <div className="text-xs text-silver">Dónde aplicar y qué evitar.</div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </AnimateSharedLayout>
  )
}