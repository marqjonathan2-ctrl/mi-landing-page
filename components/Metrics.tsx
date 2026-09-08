import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import useOnScreen from '../hooks/useOnScreen'
import useCountUp from '../hooks/useCountUp'

export default function Metrics() {
  const ref = useRef(null)
  const visible = useOnScreen(ref)
  const p1 = useCountUp(98.4, visible ? 2.2 : 0)
  const p2 = useCountUp(35, visible ? 1.8 : 0)
  const p3 = useCountUp(15, visible ? 1.8 : 0)

  useEffect(() => {}, [visible])

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{delay:0.1}} className="p-6 metallic rounded-xl">
        <div className="text-sm text-silver">Precisión Predictiva</div>
        <div className="text-3xl font-bold mt-2">{p1.toFixed(1)}%</div>
        <div className="text-xs mt-2 text-silver">En modelos de clasificación y detección de fuga</div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{delay:0.2}} className="p-6 metallic rounded-xl">
        <div className="text-sm text-silver">Reducción de Mermas</div>
        <div className="text-3xl font-bold mt-2">-{p2.toFixed(0)}%</div>
        <div className="text-xs mt-2 text-silver">Optimización de inventario industrial</div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{delay:0.3}} className="p-6 metallic rounded-xl">
        <div className="text-sm text-silver">Latencia Inferencia</div>
        <div className="text-3xl font-bold mt-2">&lt; {p3.toFixed(0)} ms</div>
        <div className="text-xs mt-2 text-silver">Para scoring financiero en producción</div>
      </motion.div>
    </div>
  )
}