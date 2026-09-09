import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function NeuronNetwork({ pointer }: { pointer: THREE.Vector2 | null }) {
  const group = useRef<THREE.Group>(null)
  const { size } = useThree()
  const particles = 80

  const nodes = useMemo(() => {
    const arr = []
    for (let i = 0; i < particles; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 200 + Math.random() * 300
      const x = Math.cos(angle) * radius * (Math.random() * 0.6 + 0.7)
      const y = (Math.random() - 0.5) * 200
      const z = Math.sin(angle) * radius * (Math.random() * 0.6 + 0.7)
      arr.push(new THREE.Vector3(x, y, z))
    }
    return arr
  }, [particles])

  useFrame((state, delta) => {
    if (!group.current) return
    const g = group.current
    // slow rotation
    g.rotation.y += delta * 0.02
    // nodes pulsate
    g.children.forEach((child, i) => {
      const scale = 0.6 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.25
      child.scale.setScalar(scale)
      // pointer interaction: attract nearest node
      if (pointer) {
        const worldPos = g.localToWorld(child.position.clone())
        const dx = pointer.x - worldPos.x * 0.01
        const dy = pointer.y - worldPos.y * 0.01
        child.position.x += dx * 0.5 * delta
        child.position.y += dy * 0.5 * delta
      }
    })
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={[pos.x * 0.01, pos.y * 0.01, pos.z * 0.01]}>
          <sphereGeometry args={[0.7, 16, 12]} />
          <meshStandardMaterial emissive={'#00E5FF'} emissiveIntensity={0.6} color={'#86f0ff'} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* simple connecting lines */}
      <lineSegments>
        <bufferGeometry attach="geometry" >
          {/* we'll construct dynamic lines server-side in a simple way */}
        </bufferGeometry>
      </lineSegments>
    </group>
  )
}

export default function Hero() {
  const [pointer, setPointer] = useState<THREE.Vector2 | null>(null)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setPointer(new THREE.Vector2((e.clientX - window.innerWidth / 2) * 0.05, (window.innerHeight / 2 - e.clientY) * 0.05))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const whatsapp = "https://api.whatsapp.com/send?phone=584243014920&text=Hola%20Jonathan%2C%20quiero%20solicitar%20la%20Auditor%C3%ADa%20de%20Datos%20Gratuita%20de%2015%20minutos%20para%20mi%20empresa."

  return (
    <section id="inicio" className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color={'#00E5FF'} />
          <Suspense fallback={null}>
            <NeuronNetwork pointer={pointer} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto h-full flex items-center px-6">
        <div className="glass p-10 rounded-xl w-full">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-semibold leading-tight">
            Tu empresa genera gigabytes de datos diarios. Nosotros los transformamos en decisiones que reducen costos y anticipan el mercado.
          </motion.h1>

          <p className="mt-4 text-silver">Estructuramos el caos. Garantizamos ventajas predictivas.</p>

          <div className="mt-6 flex gap-4">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary px-5 py-3 rounded-md font-medium">
              Solicitar Auditoría de Datos Inicial Gratuita (15 min)
            </a>
            <button className="btn-outline px-5 py-3 rounded-md font-medium">Probar Demo en Vivo</button>
          </div>
        </div>
      </div>
    </section>
  )
}
