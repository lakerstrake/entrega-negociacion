import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Monitor, BookOpen, Target, Lightbulb, CheckCircle, Users, Briefcase, ArrowRight, Zap } from 'lucide-react'

// --- ASSETS ---
const IMG_HERO = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
const IMG_TABLE = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
const IMG_ICEBERG = "https://images.unsplash.com/photo-1518242007638-348b62cf4e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"

// --- DATA ---
const team = [
  "Joseph Santiago Olarte Cardona",
  "Juan Esteban Cárdenas",
  "Jose Arteaga",
  "Juan Manuel Lagos Monroy"
]

const situaciones = [
  {
    id: 1,
    titulo: 'Alcance vs Presupuesto (Freelance)',
    contexto: 'Desarrollo Web (Laboral)',
    responsable: 'Joseph Santiago Olarte',
    icon: Monitor,
    colorHex: '#39A900', // SENA Green
    imagen: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    explicacionFamosa: 'Concepto Clave: Producto Mínimo Viable (MVP)',
    partes: ['Dev ADSO', 'Cliente (StartUp)'],
    posiciones: ['Cliente: "Quiero un clon de Uber completo por $2 millones en 1 mes".', 'Dev: "Es imposible. Cuesta $15 millones y tarda 6 meses".'],
    intereses: ['Cliente: Necesita algo funcional rápido para conseguir inversionistas.', 'Dev: Quiere cobrar lo justo por su tiempo y no trabajar horas extra gratis.'],
    acuerdo: 'Se desarrolla un MVP: Una app web muy básica solo para pedir servicios. Se hace en 1.5 meses por $2.5 millones.',
  },
  {
    id: 2,
    titulo: 'Elección de Tecnologías (Stack)',
    contexto: 'Proyecto SENA (Académico)',
    responsable: 'Juan Esteban Cárdenas',
    icon: BookOpen,
    colorHex: '#FF6E00', // SENA Orange
    imagen: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    explicacionFamosa: 'Concepto Clave: Curva de Aprendizaje vs Innovación',
    partes: ['Estudiante A (Innovador)', 'Estudiante B (Conservador)'],
    posiciones: ['A: "Usemos React y Node.js, es lo más demandado hoy".', 'B: "Usemos HTML y PHP puro, es fácil y seguro".'],
    intereses: ['A: Quiere usar herramientas modernas para armar su portafolio.', 'B: Tiene miedo a no aprender rápido y prefiere asegurar la calificación.'],
    acuerdo: 'División de responsabilidades: A hace el Frontend en React (aprende), B hace la API en PHP (asegura el backend).',
  },
  {
    id: 3,
    titulo: 'Licenciamiento de Software (SaaS)',
    contexto: 'Contrato Corporativo',
    responsable: 'Jose Arteaga',
    icon: Briefcase,
    colorHex: '#0ea5e9', // Blue
    imagen: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    explicacionFamosa: 'Concepto Clave: Software as a Service (SaaS)',
    partes: ['Empresa de Software', 'Cliente Corporativo'],
    posiciones: ['Proveedor: "Exigimos un contrato anual de $12.000 pagado hoy".', 'Cliente: "Solo probaremos 3 meses pagando $1.000 mensuales".'],
    intereses: ['Proveedor: Asegurar flujo de caja y retención del cliente.', 'Cliente: Mitigar riesgo financiero si el software no es lo que esperaban.'],
    acuerdo: 'Contrato a 1 año pagando mensual, con cláusula de salida (Opt-out) al tercer mes si el software no cumple expectativas.',
  },
]

// --- COMPONENTS ---

const Background = ({ src }: { src: string }) => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-slate-950/85 mix-blend-multiply z-10" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950/40 z-10" />
    <motion.img 
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.3 }}
      transition={{ duration: 1.5 }}
      src={src} 
      alt="" 
      className="w-full h-full object-cover filter grayscale opacity-20"
    />
  </div>
)

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-800/50">
    <motion.div 
      className="h-full bg-emerald-500"
      initial={{ width: 0 }}
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
)

const Navigation = ({ current, total, onNext, onPrev }: { current: number, total: number, onNext: () => void, onPrev: () => void }) => (
  <div className="fixed bottom-6 right-6 z-50 flex gap-3">
    <button onClick={onPrev} disabled={current === 0}
      className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-800/80 transition-all border border-slate-700 hover:border-emerald-500/50"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    <button onClick={onNext} disabled={current === total - 1}
      className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-800/80 transition-all border border-slate-700 hover:border-emerald-500/50"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
)

export default function App() {
  const [slide, setSlide] = useState(0)
  const totalSlides = 4

  const next = () => setSlide(s => Math.min(s + 1, totalSlides - 1))
  const prev = () => setSlide(s => Math.max(s - 1, 0))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const [activeTab, setActiveTab] = useState(situaciones[0].id)

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      <ProgressBar current={slide} total={totalSlides} />
      <Navigation current={slide} total={totalSlides} onNext={next} onPrev={prev} />

      {/* Persistent Logo / Header */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase font-outfit leading-none">SENA · ADSO 2025</h2>
          <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1">Negociación en TI</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {slide === 0 && (
          <motion.div key="slide-0" className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          >
            <Background src={IMG_HERO} />
            <div className="relative z-20 w-full max-w-5xl px-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <span className="inline-block py-1 px-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-2">
                    Ingeniería & Software
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold font-outfit leading-tight tracking-tight text-white">
                    Negociación en <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Proyectos TI</span>
                  </h1>
                  <p className="mt-4 text-sm text-slate-400 max-w-lg font-light leading-relaxed border-l-2 border-slate-700 pl-4">
                    Análisis de posiciones, intereses y acuerdos en la industria del desarrollo de software. Cómo lograr estrategias "Ganar-Ganar" en escenarios reales.
                  </p>
                </motion.div>
                
                <motion.button 
                  onClick={next}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-lg group"
                >
                  Iniciar Presentación <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                className="w-full md:w-72 glass-panel p-5 rounded-xl border border-slate-700/50"
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-200">Equipo ADSO</h3>
                </div>
                <ul className="space-y-3">
                  {team.map((name, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      {name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}

        {slide === 1 && (
          <motion.div key="slide-1" className="absolute inset-0 flex items-center justify-center pt-12 pb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          >
            {/* The background here is solid to ensure extreme readability and no scroll */}
            <div className="absolute inset-0 bg-slate-950 z-0">
               <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 opacity-50 z-10" />
            </div>

            <div className="relative z-20 w-full max-w-6xl px-6 h-full flex flex-col justify-center">
              
              <div className="mb-4">
                <h2 className="text-2xl font-bold font-outfit text-white">Casos de Estudio en Desarrollo de Software</h2>
                <p className="text-xs text-slate-400 mt-1">Ejemplos reales, famosos y fáciles de entender en la industria TI.</p>
              </div>
              
              <div className="flex h-[72vh] gap-4">
                
                {/* Left Tabs (25%) */}
                <div className="w-1/4 flex flex-col gap-2 h-full">
                  {situaciones.map(s => {
                    const isActive = activeTab === s.id;
                    const Icon = s.icon;
                    return (
                      <button 
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`text-left p-4 rounded-xl border transition-all duration-300 flex-1 flex flex-col justify-center ${isActive ? 'bg-slate-800/90 border-slate-600 shadow-lg' : 'glass-card border-slate-800/50 hover:bg-slate-800/40'}`}
                        style={{ borderLeftColor: isActive ? s.colorHex : undefined, borderLeftWidth: isActive ? '4px' : '1px' }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0" style={{ color: isActive ? s.colorHex : '#64748b' }} />
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-tight">{s.contexto}</p>
                            <h3 className={`text-xs font-bold mt-1 leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>{s.titulo}</h3>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Right Content (75%) */}
                <div className="w-3/4 h-full glass-panel rounded-xl border border-slate-700/50 overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    {situaciones.map(s => s.id === activeTab && (
                      <motion.div 
                        key={s.id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                      >
                        {/* Header of Content */}
                        <div className="p-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/50 shrink-0">
                          <div>
                            <div className="flex items-center gap-2">
                               <Zap className="w-3 h-3" style={{ color: s.colorHex }} />
                               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                {s.explicacionFamosa}
                               </span>
                            </div>
                            <h3 className="text-xl font-bold font-outfit text-white mt-1">{s.titulo}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Expone</p>
                            <p className="text-xs font-semibold text-white px-2 py-1 bg-slate-800 rounded">{s.responsable}</p>
                          </div>
                        </div>

                        {/* Body of Content - 2 columns */}
                        <div className="flex flex-1 overflow-hidden">
                          {/* Text Data */}
                          <div className="w-3/5 p-5 flex flex-col gap-3 justify-between">
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Target className="w-3 h-3 text-slate-400" />
                                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Posiciones (Petición)</h4>
                                </div>
                                <ul className="space-y-1.5">
                                  {s.posiciones.map((pos, i) => (
                                    <li key={i} className="text-[11px] text-slate-400 leading-tight">
                                      <strong className="text-slate-300">{pos.split(':')[0]}:</strong> {pos.split(':')[1]}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Lightbulb className="w-3 h-3 text-slate-400" />
                                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Intereses (Realidad)</h4>
                                </div>
                                <ul className="space-y-1.5">
                                  {s.intereses.map((int, i) => (
                                    <li key={i} className="text-[11px] text-slate-400 leading-tight">
                                      <strong className="text-slate-300">{int.split(':')[0]}:</strong> {int.split(':')[1]}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="bg-slate-800/80 p-4 rounded-lg border flex-1 flex flex-col justify-center" style={{ borderColor: `${s.colorHex}40` }}>
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-4 h-4" style={{ color: s.colorHex }} />
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">Acuerdo "Ganar-Ganar"</h4>
                              </div>
                              <p className="text-[13px] text-slate-200 leading-snug font-medium">
                                {s.acuerdo}
                              </p>
                            </div>

                          </div>

                          {/* Image related to context */}
                          <div className="w-2/5 relative border-l border-slate-700/50">
                             <img src={s.imagen} alt={s.titulo} className="w-full h-full object-cover opacity-60" />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {slide === 2 && (
          <motion.div key="slide-2" className="absolute inset-0 flex items-center justify-center pt-12 pb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          >
            <Background src={IMG_TABLE} />
            <div className="relative z-20 w-full max-w-6xl px-6 h-full flex flex-col justify-center">
              <div className="mb-4">
                <h2 className="text-2xl font-bold font-outfit text-white">Matriz de Análisis ADSO</h2>
                <p className="text-xs text-slate-400 mt-1">Comparativa de los escenarios de ingeniería de software.</p>
              </div>

              <div className="w-full glass-panel rounded-xl border border-slate-700/50 overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr>
                      <th className="p-3 border-b border-slate-700 text-[10px] uppercase tracking-widest text-slate-500 font-bold w-[16%]">Concepto</th>
                      {situaciones.map(s => (
                        <th key={s.id} className="p-3 border-b border-slate-700 text-[11px] uppercase tracking-widest font-bold w-[28%]" style={{ color: s.colorHex }}>
                          {s.contexto}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[11px]">
                    {[
                      { label: 'Situación/Partes', get: (s: any) => <strong>{s.titulo}</strong> },
                      { label: 'Posición Inicial', get: (s: any) => <span className="line-clamp-2">{s.posiciones[0]} <br/> {s.posiciones[1]}</span> },
                      { label: 'Interés Real', get: (s: any) => <span className="line-clamp-2">{s.intereses[0]} <br/> {s.intereses[1]}</span> },
                      { label: 'Acuerdo', get: (s: any) => <span className="font-semibold text-emerald-400">{s.acuerdo}</span> },
                    ].map((row, ri) => (
                      <motion.tr key={ri} 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ri * 0.1 }}
                        className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors last:border-0"
                      >
                        <td className="p-3 font-bold text-[9px] uppercase tracking-wider text-slate-400 bg-slate-900/40">{row.label}</td>
                        {situaciones.map(s => (
                          <td key={s.id} className="p-3 text-slate-300 leading-tight border-l border-slate-800/50">
                            {row.get(s)}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-right">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                  Responsable: Juan Manuel Lagos Monroy
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {slide === 3 && (
          <motion.div key="slide-3" className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          >
             <Background src={IMG_ICEBERG} />
             <div className="relative z-20 w-full max-w-5xl px-8">
                
                <div className="glass-panel border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl h-[65vh] flex">
                  
                  {/* Left: Iceberg Concept */}
                  <div className="w-2/5 bg-slate-900 p-8 flex flex-col justify-center border-r border-slate-800 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Target className="w-48 h-48" />
                    </div>
                    <h2 className="text-3xl font-extrabold font-outfit text-white leading-tight z-10">
                      El Iceberg en <br/>Software
                    </h2>
                    <p className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mt-2 z-10">Marco Teórico</p>
                    
                    <div className="mt-8 space-y-4 z-10">
                      <div className="relative pl-5">
                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-slate-400" />
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">10% Visible: La Posición</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-tight">Lo que el cliente exige: "Quiero la app en 1 semana". Es rígido y crea conflicto.</p>
                      </div>
                      <div className="w-full h-[1px] bg-gradient-to-r from-emerald-500 to-transparent my-2 opacity-30" />
                      <div className="relative pl-5">
                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">90% Oculto: El Interés</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-tight">La necesidad real: "Necesito mostrar un prototipo a los inversores el viernes". Aquí nace la solución (Ej: Hacer un Mockup en Figma).</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Explanation */}
                  <div className="w-3/5 p-8 flex flex-col justify-center bg-slate-900/60">
                    <div className="space-y-6">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> ¿Por qué fallan los proyectos TI?
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-3">
                          La mayoría de conflictos en desarrollo de software ocurren porque desarrolladores y clientes pelean por <strong>Posiciones</strong> (presupuesto, fechas imposibles, tecnologías) sin entender los <strong>Intereses</strong> del otro.
                        </p>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-emerald-500" /> La Solución Integradora
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed border-l-2 border-emerald-500/50 pl-3">
                          Un buen Analista y Desarrollador (ADSO) indaga para encontrar la raíz del problema. Soluciones como el <strong>MVP (Producto Mínimo Viable)</strong>, metodologías ágiles y licenciamientos flexibles son pruebas de negociaciones basadas en intereses, no en posturas tercas.
                        </p>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4 mt-2"
                      >
                        <p className="text-xs font-medium text-emerald-100 italic text-center">
                          "En ADSO, no solo programamos código; diseñamos soluciones que alinean la tecnología con las verdaderas necesidades del negocio."
                        </p>
                      </motion.div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 text-center">
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Tecnólogo ADSO · SENA · 2025
                   </p>
                </div>

             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
