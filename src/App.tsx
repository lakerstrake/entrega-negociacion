import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react'

function IcebergSVG() {
  return (
    <svg viewBox="0 0 300 400" className="w-full max-w-[260px] mx-auto">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="ice-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="ice-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#475569" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="300" height="180" fill="url(#sky)" />
      <rect x="0" y="180" width="300" height="220" fill="url(#water)" />
      <motion.line x1="0" y1="180" x2="300" y2="180" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 4"
        initial={{ opacity: 0 }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.polygon points="150,60 100,178 200,178" fill="url(#ice-top)" stroke="#94a3b8" strokeWidth="1"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} />
      <motion.polygon points="150,182 60,380 240,380" fill="url(#ice-bottom)" stroke="none"
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} />
      <motion.text x="150" y="145" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>POSICIÓN</motion.text>
      <motion.text x="150" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e2e8f0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>INTERÉS</motion.text>
      <motion.text x="150" y="310" textAnchor="middle" fontSize="9" fill="#cbd5e1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>necesidades reales</motion.text>
      {[0, 1, 2].map(i => (
        <motion.circle key={i} cx={80 + i * 70} cy="195" r="3" fill="#93c5fd"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} />
      ))}
    </svg>
  )
}

function HandshakeSVG() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-[180px] mx-auto">
      <motion.path d="M40,120 Q60,80 100,90 Q140,100 160,70" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
      <motion.circle cx="40" cy="120" r="18" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
      <motion.circle cx="160" cy="70" r="18" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring' }} />
      <motion.text x="40" y="125" textAnchor="middle" fontSize="14">🤝</motion.text>
      <motion.text x="160" y="75" textAnchor="middle" fontSize="14">💡</motion.text>
      {[1, 2, 3].map(i => (
        <motion.circle key={i} cx={60 + i * 25} cy={100 - i * 5} r="2" fill="#a5b4fc"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 1.8, delay: 1 + i * 0.3, repeat: Infinity }} />
      ))}
    </svg>
  )
}

function ScaleSVG() {
  return (
    <svg viewBox="0 0 200 180" className="w-full max-w-[170px] mx-auto">
      <motion.line x1="100" y1="30" x2="100" y2="150" stroke="#334155" strokeWidth="3"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6 }} style={{ transformOrigin: 'bottom' }} />
      <motion.line x1="30" y1="60" x2="170" y2="60" stroke="#334155" strokeWidth="3" strokeLinecap="round"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
      <rect x="80" y="145" width="40" height="12" rx="3" fill="#334155" />
      <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }} style={{ transformOrigin: '100px 60px' }}>
        <line x1="30" y1="60" x2="30" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="170" y1="60" x2="170" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
        <motion.path d="M15,90 Q30,105 45,90" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
        <motion.path d="M155,90 Q170,105 185,90" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
      </motion.g>
      <motion.text x="30" y="120" textAnchor="middle" fontSize="8" fill="#7c3aed" fontWeight="600"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Posición</motion.text>
      <motion.text x="170" y="120" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="600"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>Interés</motion.text>
    </svg>
  )
}

const situaciones = [
  {
    id: 1,
    titulo: 'Soporte Técnico Empresarial',
    contexto: 'Laboral',
    responsable: 'Joseph Santiago Olarte Cardona',
    color: '#3b82f6',
    partes: ['Técnico de soporte', 'Cliente local'],
    posiciones: ['Cobrar $300k por mantenimiento completo', 'Pagar máximo $180k de presupuesto'],
    intereses: ['Cubrir costos operativos y tiempo invertido', 'Recuperar operatividad sin desfalcar la caja'],
    opciones: ['Mantenimiento parcial', 'Pago a cuotas', 'Trabajo completo con soporte remoto posterior'],
    acuerdo: 'Trabajo completo por $250k a dos cuotas, incluyendo soporte remoto vía RustDesk por un mes.',
  },
  {
    id: 2,
    titulo: 'Proyecto Universitario de Circuitos',
    contexto: 'Académica',
    responsable: 'Juan Esteban Cárdenas',
    color: '#10b981',
    partes: ['Estudiante A', 'Estudiantes B y C'],
    posiciones: ['Dividir: A ensambla, B y C documentan', 'Hacer todo juntos al mismo tiempo'],
    intereses: ['Optimizar tiempos de estudio', 'Asegurar que todos entiendan la lógica'],
    opciones: ['Sesión rápida de explicación y luego división', 'Documentar por áreas de dominio'],
    acuerdo: 'Cada uno documenta el área que domina, con reunión de 20 min previa a la entrega para unificar.',
  },
  {
    id: 3,
    titulo: 'Planes del Fin de Semana',
    contexto: 'Personal',
    responsable: 'Jose Arteaga',
    color: '#f43f5e',
    partes: ['Persona A', 'Persona B (Pareja)'],
    posiciones: ['Salir a ruta larga en bicicleta', 'Quedarse en casa adelantando trabajos'],
    intereses: ['Necesidad de deporte y liberar estrés', 'Tiempo de calidad y descanso juntos'],
    opciones: ['Ruta corta en la mañana', 'Salir juntos a un café en la tarde'],
    acuerdo: 'Ruta corta el sábado en la mañana, domingo completo para un plan conjunto y relajado.',
  },
]

function ElementRow({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group"
    >
      <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
        <span
          className="shrink-0 mt-0.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-white"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <span key={i} className="text-sm text-slate-600 leading-relaxed">
              {items.length > 1 && <span className="text-slate-300 mr-1.5">—</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SituacionDetail({ s }: { s: typeof situaciones[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.contexto}</span>
          <span className="text-[10px] text-slate-400">{s.responsable}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-5">{s.titulo}</h3>
        <ElementRow label="Partes" items={s.partes} color={s.color} />
        <ElementRow label="Posiciones" items={s.posiciones} color={s.color} />
        <ElementRow label="Intereses" items={s.intereses} color={s.color} />
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <ElementRow label="Opciones" items={s.opciones} color={s.color} />
          <div className="py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md text-white" style={{ backgroundColor: s.color }}>
              Acuerdo
            </span>
            <p className="mt-2 text-sm text-slate-700 font-medium leading-relaxed pl-1 border-l-2" style={{ borderColor: s.color }}>
              {s.acuerdo}
            </p>
          </div>
        </motion.div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity flex items-center gap-1"
          style={{ color: s.color }}
        >
          {expanded ? 'Ver menos' : 'Ver opciones y acuerdo'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowDown className="w-3 h-3" />
          </motion.span>
        </button>
      </div>
    </motion.div>
  )
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = 4

  const goTo = (n: number) => {
    if (n >= 0 && n < totalSlides) setActiveSlide(n)
  }

  const slideVariants = {
    enter: { opacity: 0, x: 60 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col">
      {/* Nav dots */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full px-3 py-2 shadow-sm border border-slate-200/50">
        {['Inicio', 'Situaciones', 'Comparativa', 'Conclusión'].map((label, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
              activeSlide === i ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Arrows */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        <button onClick={() => goTo(activeSlide - 1)} disabled={activeSlide === 0}
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => goTo(activeSlide + 1)} disabled={activeSlide === totalSlides - 1}
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <AnimatePresence mode="wait">
          {/* SLIDE 0: Intro */}
          {activeSlide === 0 && (
            <motion.div key="s0" variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl text-center"
            >
              <ScaleSVG />
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mt-8 leading-tight"
              >
                Negociación
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-4 text-lg text-slate-400 max-w-md mx-auto"
              >
                Posiciones, intereses y acuerdos en tres contextos reales.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="mt-10 flex flex-wrap justify-center gap-3"
              >
                {['Joseph Santiago', 'Juan Esteban', 'Jose Arteaga', 'Juan Manuel'].map((name, i) => (
                  <span key={i} className="text-xs text-slate-400 px-3 py-1.5 rounded-full border border-slate-200 bg-white">
                    {name}
                  </span>
                ))}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                className="mt-6 text-[11px] uppercase tracking-widest text-slate-300 font-medium"
              >
                ADSO · 2025
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                onClick={() => goTo(1)}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Comenzar <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 1: Situaciones */}
          {activeSlide === 1 && (
            <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl"
            >
              <div className="text-center mb-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Sección 01</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Tres Situaciones Cotidianas</h2>
                <p className="text-slate-400 mt-2 text-sm">Haz clic en cada tarjeta para ver opciones y acuerdo final.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {situaciones.map((s) => (
                  <SituacionDetail key={s.id} s={s} />
                ))}
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: Tabla */}
          {activeSlide === 2 && (
            <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl"
            >
              <div className="text-center mb-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Sección 02</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Tabla Comparativa</h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400"></th>
                      {situaciones.map(s => (
                        <th key={s.id} className="px-5 py-4 text-left">
                          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: s.color }}>{s.contexto}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'Partes', data: ['Técnico vs. Cliente', 'Estudiante A vs. B y C', 'Persona A vs. B'] },
                      { key: 'Posición', data: ['$300k vs. máx $180k', 'Dividir tareas vs. juntos', 'Ruta larga vs. quedarse'] },
                      { key: 'Interés', data: ['Costos vs. operatividad', 'Tiempo vs. comprensión', 'Deporte vs. calidad'] },
                      { key: 'Opciones', data: ['Parcial · cuotas · remoto', 'Explicación previa · áreas', 'Ruta corta · café juntos'] },
                      { key: 'Acuerdo', data: ['$250k, 2 cuotas + soporte', 'Cada uno su área + reunión', 'Sáb bici, dom juntos'] },
                    ].map((row, ri) => (
                      <motion.tr key={row.key}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ri * 0.08 }}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-900">{row.key}</td>
                        {row.data.map((cell, ci) => (
                          <td key={ci} className="px-5 py-3.5 text-slate-600 text-[13px]">{cell}</td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-[11px] text-slate-300 mt-4">
                Responsable de análisis: Juan Manuel Lagos Monroy
              </p>
            </motion.div>
          )}

          {/* SLIDE 3: Conclusión */}
          {activeSlide === 3 && (
            <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-8">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Conclusión</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Posición vs. Interés</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <IcebergSVG />
                </div>
                <div className="space-y-5">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Posición</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      La punta visible — demanda explícita y rígida. Lo que cada parte <em>dice querer</em>.
                    </p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Interés</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      La base oculta — necesidades reales y motivaciones profundas. Lo que <em>realmente necesita</em>.
                    </p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                    <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-indigo-400 pl-4">
                      Negociar sobre posiciones produce suma cero. Explorar intereses abre soluciones creativas que satisfacen a ambas partes.
                    </p>
                  </motion.div>
                </div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="mt-12 text-center">
                <HandshakeSVG />
                <p className="text-xs text-slate-300 mt-4 uppercase tracking-widest">
                  ADSO · Joseph · Juan Esteban · Jose · Juan Manuel · 2025
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-0.5 bg-slate-200">
        <motion.div
          className="h-full bg-slate-900"
          animate={{ width: `${((activeSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}

export default App
