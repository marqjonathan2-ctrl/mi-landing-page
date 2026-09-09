import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Componente matemático de la malla ondulada
function WaveGrid() {
  const meshRef = useRef<THREE.Points>(null)
  const { size } = useThree()

  // Configuración de la cuadrícula de puntos
  const count = 45 // Número de puntos a lo ancho y largo
  const numParticles = count * count

  const [positions, setPositions] = useMemo(() => {
    const pos = new Float32Array(numParticles * 3)
    let i = 0
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Centramos la malla en las coordenadas X y Z
        pos[i] = (x - count / 2) * 0.35 
        pos[i + 1] = 0 // Altura inicial (Y)
        pos[i + 2] = (z - count / 2) * 0.35
        i += 3
      }
    }
    return [pos]
  }, [numParticles, count])

  // Animación matemática de las ondas en cada fotograma
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (!meshRef.current) return

    const positionAttribute = meshRef.current.geometry.attributes.position
    let i = 0

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Fórmula matemática para calcular las ondas senoidales cruzadas
        const xAngle = (x * 0.1) + time * 0.8
        const zAngle = (z * 0.1) + time * 0.5
        
        // Modificamos la altura (Y) de cada punto individualmente
        positionAttribute.setY(i, (Math.sin(xAngle) + Math.cos(zAngle)) * 0.25)
        i++
      }
    }
    positionAttribute.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={numParticles}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00E5FF"
        size={0.03}
        sizeAttenuation={true}
        transparent
        opacity={0.4}
      />
    </points>
  )
}

// Componente principal de la sección
export default function Hero3D() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Luces y sombras de fondo de ambiente */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 pointer-events-none" />

      {/* Contenedor del lienzo 3D */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <Canvas camera={{ position:, fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color={'#00E5FF'} />
          <Suspense fallback={null}>
            <group position={[0, -1, 0]} rotation={[0.2, 0, 0]}>
              <WaveGrid />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Textos y contenido estructurado al frente */}
      <div className="relative z-20 max-w-4xl text-center flex flex-col items-center mt-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-950/40 rounded-full border border-cyan-800/30 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          MODULAR COMPUTE NETWORK
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 max-w-3xl leading-tight">
          Modular Compute Powered By CORA Engine.
        </h1>

        <p className="mt-6 text-neutral-400 text-sm sm:text-base max-w-lg font-light leading-relaxed">
          Voice triggered. Chain-aware. Built to scale decentralized operations globally.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button className="px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(0,229,255,0.3)]">
            Deploy CORA Engine
          </button>
          <button className="px-6 py-3 rounded-full bg-neutral-900/80 text-neutral-300 font-medium text-sm border border-neutral-800 hover:bg-neutral-800 transition-all backdrop-blur-sm">
            View Live Metrics
          </button>
        </div>
      </div>

      {/* Fila inferior de logos corporativos estéticos */}
      <div className="absolute bottom-12 z-20 w-full max-w-3xl px-6 flex flex-wrap justify-between items-center opacity-20 text-[10px] tracking-[0.2em] uppercase font-mono grayscale hidden sm:flex">
        <span>Google</span>
        <span>Meta</span>
        <span>Linux Foundation</span>
        <span>OpenAI</span>
      </div>
    </div>
  )
}
