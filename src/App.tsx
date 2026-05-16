import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Monitor, BookOpen, Coffee, Target, Lightbulb, CheckCircle, Users, Briefcase, ChevronDown } from 'lucide-react'

// --- ASSETS ---
const IMG_HERO = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
const IMG_SIT = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
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
    titulo: 'Soporte Técnico Empresarial',
    contexto: 'Contexto Laboral',
    responsable: 'Joseph Santiago Olarte',
    icon: Monitor,
    colorHex: '#39A900', // SENA Green
    partes: ['Técnico de soporte (Proveedor)', 'Cliente corporativo local'],
    posiciones: ['Técnico: Cobrar $300.000 por mantenimiento integral', 'Cliente: Pagar un máximo de $180.000 de presupuesto'],
    intereses: ['Técnico: Cubrir costos operativos, herramientas y tiempo invertido', 'Cliente: Recuperar la operatividad de los equipos sin desfalcar la caja'],
    opciones: ['Realizar un mantenimiento parcial', 'Dividir el pago en varias cuotas', 'Trabajo completo con valor agregado (soporte remoto)'],
    acuerdo: 'Mantenimiento completo por $250.000 pagado en dos cuotas, incluyendo 1 mes de soporte remoto vía RustDesk.',
  },
  {
    id: 2,
    titulo: 'Proyecto Universitario de Circuitos',
    contexto: 'Contexto Académico',
    responsable: 'Juan Esteban Cárdenas',
    icon: BookOpen,
    colorHex: '#FF6E00', // SENA Orange
    partes: ['Estudiante A (Habilidades técnicas)', 'Estudiantes B y C (Documentación)'],
    posiciones: ['Estudiante A: Dividir tareas. Yo ensamblo, ustedes documentan.', 'Estudiantes B y C: Hacer todo juntos presencialmente al mismo tiempo.'],
    intereses: ['Estudiante A: Optimizar tiempos de estudio y ser eficiente', 'Estudiantes B y C: Asegurar comprensión lógica para sustentar el proyecto'],
    opciones: ['Sesión rápida de explicación teórica y luego división física', 'Documentar por áreas de dominio específicas'],
    acuerdo: 'Cada miembro documenta el área que domina; se agenda reunión de 20 min previa a la entrega para unificar y repasar juntos.',
  },
  {
    id: 3,
    titulo: 'Planificación de Fin de Semana',
    contexto: 'Contexto Personal',
    responsable: 'Jose Arteaga',
    icon: Coffee,
    colorHex: '#0ea5e9', // Blue
    partes: ['Persona A (Deportista)', 'Persona B (Estudiante/Pareja)'],
    posiciones: ['Persona A: Salir a realizar una ruta larga en bicicleta', 'Persona B: Quedarse en casa adelantando trabajos atrasados'],
    intereses: ['Persona A: Necesidad imperativa de deporte para liberar estrés', 'Persona B: Tiempo de calidad y necesidad de descanso compartido'],
    opciones: ['Ruta corta temprano en la mañana', 'Salir juntos a un café o actividad corta en la tarde'],
    acuerdo: 'Ruta corta el sábado en la mañana; el domingo completo se reserva para un plan conjunto, tranquilo y relajado.',
  },
]

// --- COMPONENTS ---

const Background = ({ src }: { src: string }) => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply z-10" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-950/40 z-10" />
    <motion.img 
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 1.5 }}
      src={src} 
      alt="Background" 
      className="w-full h-full object-cover filter grayscale opacity-30"
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
  <div className="fixed bottom-8 right-8 z-50 flex gap-4">
    <button 
      onClick={onPrev} 
      disabled={current === 0}
      className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-800/80 transition-all border border-slate-700 hover:border-emerald-500/50 group"
    >
      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
    </button>
    <button 
      onClick={onNext} 
      disabled={current === total - 1}
      className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-800/80 transition-all border border-slate-700 hover:border-emerald-500/50 group"
    >
      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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

  const slideVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  }

  // State for slide 1 (Situations)
  const [activeTab, setActiveTab] = useState(situaciones[0].id)

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      <ProgressBar current={slide} total={totalSlides} />
      <Navigation current={slide} total={totalSlides} onNext={next} onPrev={prev} />

      {/* Persistent Logo / Header */}
      <div className="fixed top-8 left-8 z-50 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase font-outfit">SENA · ADSO 2025</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Técnicas de Negociación</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {slide === 0 && (
          <motion.div key="slide-0" className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          >
            <Background src={IMG_HERO} />
            <div className="relative z-20 max-w-5xl w-full px-8 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 space-y-6">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <span className="inline-block py-1 px-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4">
                    Presentación Académica
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extrabold font-outfit leading-tight tracking-tight text-white">
                    Estrategias de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Negociación</span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-400 max-w-xl font-light leading-relaxed border-l-2 border-slate-700 pl-4">
                    Análisis profundo de posiciones, intereses y acuerdos en entornos laborales, académicos y personales. Una perspectiva orientada a soluciones efectivas.
                  </p>
                </motion.div>
                
                <motion.button 
                  onClick={next}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  className="mt-8 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center gap-3 transition-colors shadow-lg shadow-emerald-900/50 group"
                >
                  Iniciar Presentación <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="w-full md:w-80 glass-panel p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">Equipo de Trabajo</h3>
                </div>
                <ul className="space-y-4">
                  {team.map((name, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
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
          <motion.div key="slide-1" className="absolute inset-0 flex items-center justify-center pt-16"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          >
            <Background src={IMG_SIT} />
            <div className="relative z-20 w-full max-w-6xl px-8 h-[75vh] flex flex-col md:flex-row gap-8">
              
              {/* Left Tabs */}
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold font-outfit text-white">Casos de Estudio</h2>
                  <p className="text-sm text-slate-400 mt-2">Seleccione un contexto para analizar sus variables de negociación.</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  {situaciones.map(s => {
                    const isActive = activeTab === s.id;
                    const Icon = s.icon;
                    return (
                      <button 
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`text-left p-5 rounded-xl border transition-all duration-300 ${isActive ? 'bg-slate-800/80 border-slate-600 shadow-xl' : 'glass-card border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700'}`}
                        style={{ borderLeftColor: isActive ? s.colorHex : undefined, borderLeftWidth: isActive ? '4px' : '1px' }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-slate-700' : 'bg-slate-800'}`}>
                            <Icon className="w-5 h-5" style={{ color: isActive ? s.colorHex : '#94a3b8' }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.contexto}</p>
                            <h3 className={`font-semibold mt-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>{s.titulo}</h3>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right Content */}
              <div className="w-full md:w-2/3 glass-panel rounded-2xl border border-slate-700/50 p-8 overflow-y-auto custom-scrollbar relative">
                <AnimatePresence mode="wait">
                  {situaciones.map(s => s.id === activeTab && (
                    <motion.div 
                      key={s.id}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <header className="border-b border-slate-700/50 pb-6 flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800 text-white" style={{ color: s.colorHex }}>
                            {s.contexto}
                          </span>
                          <h3 className="text-3xl font-bold font-outfit text-white mt-4">{s.titulo}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Responsable</p>
                          <p className="text-sm font-medium text-slate-300">{s.responsable}</p>
                        </div>
                      </header>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-5 rounded-xl border border-slate-700/50">
                          <div className="flex items-center gap-2 mb-4">
                            <Target className="w-4 h-4 text-slate-400" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Posiciones (Lo visible)</h4>
                          </div>
                          <ul className="space-y-3">
                            {s.posiciones.map((pos, i) => (
                              <li key={i} className="text-sm text-slate-400 flex gap-2">
                                <span className="text-slate-600 mt-0.5">•</span> <span>{pos}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="glass-card p-5 rounded-xl border border-slate-700/50">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-4 h-4 text-slate-400" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Intereses (La raíz)</h4>
                          </div>
                          <ul className="space-y-3">
                            {s.intereses.map((int, i) => (
                              <li key={i} className="text-sm text-slate-400 flex gap-2">
                                <span className="text-slate-600 mt-0.5">•</span> <span>{int}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="glass-card p-5 rounded-xl border border-slate-700/50">
                         <div className="flex items-center gap-2 mb-3">
                            <Monitor className="w-4 h-4 text-slate-400" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Opciones Evaluadas</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {s.opciones.map((opc, i) => (
                              <span key={i} className="text-xs bg-slate-800/80 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-md">
                                {opc}
                              </span>
                            ))}
                          </div>
                      </div>

                      <div className="p-6 rounded-xl relative overflow-hidden" style={{ backgroundColor: `${s.colorHex}15`, border: `1px solid ${s.colorHex}40` }}>
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: s.colorHex }} />
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle className="w-5 h-5" style={{ color: s.colorHex }} />
                          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Acuerdo Final Ganar-Ganar</h4>
                        </div>
                        <p className="text-base text-slate-200 leading-relaxed font-medium pl-8">
                          {s.acuerdo}
                        </p>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}

        {slide === 2 && (
          <motion.div key="slide-2" className="absolute inset-0 flex items-center justify-center pt-16"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          >
            <Background src={IMG_TABLE} />
            <div className="relative z-20 w-full max-w-6xl px-8 flex flex-col h-[75vh]">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold font-outfit text-white">Matriz Comparativa</h2>
                <p className="text-sm text-slate-400 mt-2">Análisis transversal de los tres escenarios de negociación.</p>
              </div>

              <div className="flex-1 glass-panel rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col">
                <div className="overflow-x-auto p-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="p-5 border-b border-slate-700 text-[10px] uppercase tracking-widest text-slate-500 font-bold w-1/5">Variable</th>
                        {situaciones.map(s => (
                          <th key={s.id} className="p-5 border-b border-slate-700 text-xs uppercase tracking-widest font-bold w-[26%]" style={{ color: s.colorHex }}>
                            {s.contexto}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { label: 'Partes Implicadas', get: (s: any) => s.partes.join(' vs ') },
                        { label: 'Posición Inicial', get: (s: any) => <ul className="space-y-1">{s.posiciones.map((p:string,i:number)=><li key={i} className="line-clamp-2 truncate" title={p}>• {p.split(':')[0]}</li>)}</ul> },
                        { label: 'Interés Real', get: (s: any) => <ul className="space-y-1">{s.intereses.map((p:string,i:number)=><li key={i} className="line-clamp-2 truncate" title={p}>• {p.split(':')[0]}</li>)}</ul> },
                        { label: 'Opciones', get: (s: any) => s.opciones.length + ' opciones generadas' },
                        { label: 'Acuerdo Alcanzado', get: (s: any) => <span className="font-medium text-slate-200">{s.acuerdo}</span> },
                      ].map((row, ri) => (
                        <motion.tr key={ri} 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ri * 0.1 }}
                          className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="p-5 font-bold text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900/30">{row.label}</td>
                          {situaciones.map(s => (
                            <td key={s.id} className="p-5 text-slate-400 leading-relaxed">
                              {row.get(s)}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Responsable de Matriz: Juan Manuel Lagos Monroy
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {slide === 3 && (
          <motion.div key="slide-3" className="absolute inset-0 flex items-center justify-center pt-16"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          >
             <Background src={IMG_ICEBERG} />
             <div className="relative z-20 w-full max-w-5xl px-8">
                
                <div className="glass-panel border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex flex-col md:flex-row">
                    
                    {/* Visual representation concept */}
                    <div className="w-full md:w-2/5 bg-slate-900 p-8 flex flex-col justify-center border-r border-slate-800 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <CheckCircle className="w-48 h-48" />
                      </div>
                      <h2 className="text-3xl font-extrabold font-outfit text-white leading-tight z-10">
                        El Modelo<br/>del Iceberg
                      </h2>
                      <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs mt-4 z-10">Conclusión Teórica</p>
                      
                      <div className="mt-10 space-y-6 z-10 relative">
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-slate-400" />
                          <h4 className="text-sm font-bold text-slate-200">10% Visible</h4>
                          <p className="text-xs text-slate-500 mt-1">Demandas, exigencias, posturas inflexibles.</p>
                        </div>
                        <div className="w-full h-[1px] bg-gradient-to-r from-emerald-500 to-transparent my-2 opacity-50" />
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                          <h4 className="text-sm font-bold text-emerald-400">90% Oculto</h4>
                          <p className="text-xs text-slate-500 mt-1">Miedos, necesidades básicas, prioridades reales, valores y motivaciones.</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-3/5 p-10 bg-slate-900/50 flex flex-col justify-center">
                      <div className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                          <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Target className="w-5 h-5 text-slate-400" /> La Trampa de la Posición
                          </h3>
                          <p className="mt-3 text-sm text-slate-400 leading-relaxed border-l-2 border-slate-700 pl-4">
                            Negociar exclusivamente sobre posiciones conduce a escenarios de "suma cero" donde para que uno gane, el otro debe perder. Se caracteriza por el regateo, la inflexibilidad y el deterioro de la relación entre las partes.
                          </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                          <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Lightbulb className="w-5 h-5 text-emerald-500" /> El Poder del Interés
                          </h3>
                          <p className="mt-3 text-sm text-slate-400 leading-relaxed border-l-2 border-emerald-500/50 pl-4">
                            Al indagar en el <strong>por qué</strong> y el <strong>para qué</strong> de una exigencia, descubrimos los intereses subyacentes. Una misma posición puede sustentarse en múltiples intereses. Explorarlos permite generar opciones integrativas de mutuo beneficio.
                          </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                          className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-5 mt-4"
                        >
                          <p className="text-sm font-medium text-emerald-100 italic text-center">
                            "Un acuerdo exitoso no es aquel donde ambas partes ceden por igual, sino aquel donde se satisfacen los intereses más importantes de cada uno."
                          </p>
                        </motion.div>
                      </div>
                    </div>

                  </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 text-center">
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Tecnólogo ADSO · SENA · 2025
                   </p>
                </motion.div>

             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
