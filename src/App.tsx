import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Target, Lightbulb, CheckCircle, Users, Briefcase, ArrowRight, Zap, PieChart, Activity, ShieldCheck, Database, Layout } from 'lucide-react'

// --- ASSETS ---
const IMG_HERO = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
const IMG_NEWS = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
const IMG_ICEBERG = "https://images.unsplash.com/photo-1518242007638-348b62cf4e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"

// --- COMPONENTS ---
const Background = ({ src, opacity = 0.2 }: { src: string, opacity?: number }) => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-slate-950 mix-blend-multiply z-10" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-950/80 z-10" />
    <motion.img 
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      transition={{ duration: 1 }}
      src={src} 
      alt="" 
      className="w-full h-full object-cover filter grayscale"
    />
  </div>
)

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-800/50">
    <motion.div 
      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      initial={{ width: 0 }}
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
)

// --- SLIDE COMPONENTS ---

const Slide0Hero = ({ onNext }: { onNext: () => void }) => (
  <div className="w-full h-full flex items-center justify-center relative px-8">
    <Background src={IMG_HERO} opacity={0.25} />
    <div className="relative z-20 w-full max-w-5xl flex flex-col items-center text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <Briefcase className="w-8 h-8 text-emerald-400" />
        </div>
        <span className="inline-block py-1.5 px-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">
          Tecnólogo en ADSO · SENA
        </span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-extrabold font-outfit leading-tight tracking-tight text-white mb-6">
        Negociación en <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Proyectos TI</span>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-base text-slate-400 max-w-2xl font-light leading-relaxed">
        Análisis de posiciones, intereses y acuerdos estratégicos en el desarrollo de software.
      </motion.p>
      
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
        {["Joseph Santiago Olarte", "Juan Esteban Cárdenas", "Jose Arteaga", "Juan Manuel Lagos"].map((n, i) => (
           <div key={i} className="px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {n}
           </div>
        ))}
      </motion.div>

      <motion.button onClick={onNext} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-12 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl flex items-center gap-3 transition-colors group"
      >
        Comenzar Presentación <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  </div>
)

const Slide1News = () => (
  <div className="w-full h-full flex flex-col justify-center relative px-12 max-w-6xl mx-auto">
    <Background src={IMG_NEWS} opacity={0.15} />
    <div className="relative z-20">
      <h2 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-4">Contexto de la Industria</h2>
      <h3 className="text-4xl font-extrabold font-outfit text-white mb-10">¿Por qué es vital saber negociar en TI?</h3>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Graphic Area */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-1/3">
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="12" />
              <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="251.2"
                animate={{ strokeDashoffset: 251.2 * (1 - 0.68) }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white">68%</span>
            </div>
          </div>
        </motion.div>
        
        {/* News Area */}
        <div className="w-full md:w-2/3 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-card border border-red-500/30 p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded inline-block mb-3">Reporte CHAOS (Standish Group)</span>
            <p className="text-lg text-slate-200 font-medium leading-relaxed">
              "El 68% de los proyectos de software fracasan, se cancelan o exceden masivamente su presupuesto."
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="glass-card border border-emerald-500/30 p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-400"/> La Causa Raíz</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              La falta de entendimiento entre desarrolladores y clientes. Se pelea por <strong className="text-slate-200">posiciones rígidas</strong> (ej. "quiero todo ya") en lugar de negociar basados en los <strong className="text-slate-200">intereses reales</strong> (ej. "necesito salir al mercado pronto").
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
)

const CaseTemplate = ({ title, context, icon: Icon, color, parties, positions, interests, agreement, visual }: any) => (
  <div className="w-full h-full flex flex-col justify-center relative px-12 max-w-7xl mx-auto z-20">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border" style={{ borderColor: `${color}50` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{context}</span>
        <h2 className="text-3xl font-extrabold font-outfit text-white leading-tight">{title}</h2>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row gap-6 h-[55vh]">
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        
        {/* Parties & Positions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 rounded-2xl border border-slate-800 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-slate-400" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Las Posiciones (El Choque)</h4>
          </div>
          <div className="space-y-4">
            <div className="pl-3 border-l-2 border-red-500/50">
              <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">{parties[0]}</span>
              <p className="text-sm text-slate-300">"{positions[0]}"</p>
            </div>
            <div className="pl-3 border-l-2 border-blue-500/50">
              <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">{parties[1]}</span>
              <p className="text-sm text-slate-300">"{positions[1]}"</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5 rounded-2xl border border-slate-800 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Los Intereses (La Raíz)</h4>
          </div>
          <ul className="space-y-3">
            <li className="text-sm text-slate-400"><strong className="text-slate-200">{parties[0]}:</strong> {interests[0]}</li>
            <li className="text-sm text-slate-400"><strong className="text-slate-200">{parties[1]}:</strong> {interests[1]}</li>
          </ul>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Graphic Viz */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} 
          className="glass-panel p-6 rounded-2xl border flex-1 flex flex-col items-center justify-center relative overflow-hidden" style={{ borderColor: `${color}30` }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundColor: color }} />
          {visual}
        </motion.div>

        {/* Agreement */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} 
          className="p-5 rounded-2xl border relative overflow-hidden shrink-0" style={{ backgroundColor: `${color}15`, borderColor: `${color}40` }}>
          <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: color }} />
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5" style={{ color }} />
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Acuerdo "Ganar-Ganar"</h4>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium pl-7">
            {agreement}
          </p>
        </motion.div>
      </div>
    </div>
  </div>
)

const VisualTriangle = () => (
  <div className="w-full flex items-center justify-center">
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
        <polygon points="50,10 90,85 10,85" fill="rgba(15,23,42,0.8)" stroke="#39A900" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="50" cy="10" r="4" fill="#39A900" />
        <circle cx="90" cy="85" r="4" fill="#39A900" />
        <circle cx="10" cy="85" r="4" fill="#39A900" />
      </svg>
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-slate-800 px-2 py-1 rounded">CALIDAD</div>
      <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-white bg-slate-800 px-2 py-1 rounded">TIEMPO</div>
      <div className="absolute -bottom-6 right-0 text-[10px] font-bold text-white bg-slate-800 px-2 py-1 rounded">COSTO</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
         <span className="text-[10px] font-bold text-emerald-400 block mb-1">Solución:</span>
         <span className="text-sm font-extrabold text-white">M.V.P.</span>
      </div>
    </div>
  </div>
)

const VisualStack = () => (
  <div className="flex gap-8 items-center justify-center w-full">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border-2 border-[#61DAFB] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(97,218,251,0.3)] bg-slate-900">
        <Layout className="w-8 h-8 text-[#61DAFB]" />
      </div>
      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Frontend (A)</span>
      <span className="text-[9px] text-slate-400">Innovación</span>
    </div>
    <div className="h-0.5 w-16 bg-slate-700 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
        <Zap className="w-3 h-3 text-emerald-400" />
      </div>
    </div>
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border-2 border-[#777BB4] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(119,123,180,0.3)] bg-slate-900">
        <Database className="w-8 h-8 text-[#777BB4]" />
      </div>
      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Backend (B)</span>
      <span className="text-[9px] text-slate-400">Seguridad</span>
    </div>
  </div>
)

const VisualSaaS = () => (
  <div className="w-full px-4">
    <div className="flex justify-between items-center relative mb-4">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-1/4 h-1 bg-blue-500 -translate-y-1/2" />
      
      {[1, 2, 3, 6, 12].map((m, i) => (
        <div key={m} className="relative z-10 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full border-2 border-slate-900 ${m <= 3 ? 'bg-blue-500' : 'bg-slate-700'}`} />
          <span className="text-[9px] text-slate-400 mt-2 font-bold">Mes {m}</span>
          {m === 3 && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 border border-blue-500/50 text-[9px] text-blue-400 font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
              Opt-out Point
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="text-center mt-6 text-xs text-slate-300">
      <p>Riesgo mitigado: El cliente prueba 3 meses. El proveedor asegura flujo mensual.</p>
    </div>
  </div>
)

const SlideMatrix = () => (
  <div className="w-full h-full flex flex-col justify-center relative px-12 max-w-7xl mx-auto z-20">
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold font-outfit text-white">Matriz de Análisis ADSO</h2>
      <p className="text-sm text-slate-400 mt-1">Comparativa de los 3 escenarios de ingeniería de software.</p>
    </div>

    <div className="w-full glass-card rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr>
            <th className="p-4 border-b border-slate-700 text-[11px] uppercase tracking-widest text-slate-500 font-bold w-[16%] bg-slate-900/80">Variable</th>
            <th className="p-4 border-b border-slate-700 text-xs uppercase tracking-widest font-bold w-[28%] text-[#39A900] bg-slate-900/50">Triángulo MVP</th>
            <th className="p-4 border-b border-slate-700 text-xs uppercase tracking-widest font-bold w-[28%] text-[#FF6E00] bg-slate-900/50">Stack Tecnológico</th>
            <th className="p-4 border-b border-slate-700 text-xs uppercase tracking-widest font-bold w-[28%] text-[#0ea5e9] bg-slate-900/50">Licencia SaaS</th>
          </tr>
        </thead>
        <tbody className="text-[12px]">
          <tr className="border-b border-slate-800 hover:bg-slate-800/30">
            <td className="p-4 font-bold text-[10px] uppercase tracking-wider text-slate-400 bg-slate-900/80">Posición Inicial</td>
            <td className="p-4 text-slate-300">Todo el alcance vs Poco dinero</td>
            <td className="p-4 text-slate-300">Innovación extrema vs Conservadurismo</td>
            <td className="p-4 text-slate-300">Contrato rígido anual vs Prueba gratis</td>
          </tr>
          <tr className="border-b border-slate-800 hover:bg-slate-800/30">
            <td className="p-4 font-bold text-[10px] uppercase tracking-wider text-slate-400 bg-slate-900/80">Interés Real</td>
            <td className="p-4 text-slate-300">Lanzar rápido al mercado</td>
            <td className="p-4 text-slate-300">Asegurar nota y aprender</td>
            <td className="p-4 text-slate-300">Mitigar riesgo financiero</td>
          </tr>
          <tr className="hover:bg-slate-800/30">
            <td className="p-4 font-bold text-[10px] uppercase tracking-wider text-slate-400 bg-slate-900/80">Acuerdo Logrado</td>
            <td className="p-4 text-emerald-400 font-semibold bg-emerald-900/10">MVP (Producto Mínimo Viable)</td>
            <td className="p-4 text-[#FF6E00] font-semibold bg-orange-900/10">División Front/Back</td>
            <td className="p-4 text-[#0ea5e9] font-semibold bg-sky-900/10">SaaS con Cláusula de Salida</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

const SlideIceberg = () => (
  <div className="w-full h-full flex items-center justify-center relative px-12 z-20 max-w-6xl mx-auto">
    <div className="w-full glass-panel border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl h-[70vh] flex relative">
      <Background src={IMG_ICEBERG} opacity={0.3} />
      
      <div className="w-1/2 p-10 flex flex-col justify-center border-r border-slate-800/50 relative z-20 bg-slate-950/40 backdrop-blur-sm">
        <h2 className="text-4xl font-extrabold font-outfit text-white leading-tight mb-2">
          El Modelo <br/>del Iceberg
        </h2>
        <p className="text-emerald-500 font-bold uppercase tracking-widest text-[11px] mb-8">Conclusión Teórica</p>
        
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2"><Target className="w-4 h-4 text-red-400"/> 10% Visible: La Posición</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Las exigencias iniciales. Lo que se dice en la mesa. Negociar aquí causa choques y desgaste. Ej: "Quiero la app mañana".</p>
          </div>
          <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-emerald-500 transform rotate-90" /></div>
          <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2"><Lightbulb className="w-4 h-4 text-emerald-400"/> 90% Oculto: El Interés</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Las verdaderas necesidades, miedos y deseos. Entender esto permite crear soluciones de alto valor. Ej: "Tengo junta directiva el viernes".</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-10 flex flex-col justify-center relative z-20 bg-slate-900/80">
        <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">El Rol del Analista (ADSO)</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Un desarrollador junior pelea por el 10% visible (las especificaciones imposibles). Un <strong className="text-white">Analista y Desarrollador Senior</strong> indaga el 90% oculto para entender el modelo de negocio.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-emerald-500 pl-4 italic">
          "No programamos lo que el cliente pide literalmente, desarrollamos lo que su negocio realmente necesita."
        </p>
      </div>
    </div>
  </div>
)

// --- MAIN APP ---

export default function App() {
  const [slide, setSlide] = useState(0)
  const totalSlides = 7

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

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      <ProgressBar current={slide} total={totalSlides} />
      
      {/* HUD Navigation */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button onClick={prev} disabled={slide === 0} className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-800/80 transition-all border border-slate-700">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="h-10 px-4 rounded-full glass-card flex items-center justify-center text-xs font-bold tracking-widest text-slate-400 border border-slate-700">
          {slide + 1} / {totalSlides}
        </div>
        <button onClick={next} disabled={slide === totalSlides - 1} className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-800/80 transition-all border border-slate-700">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {slide === 0 && <motion.div key="s0" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}><Slide0Hero onNext={next}/></motion.div>}
        {slide === 1 && <motion.div key="s1" className="absolute inset-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}><Slide1News/></motion.div>}
        {slide === 2 && <motion.div key="s2" className="absolute inset-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
            <CaseTemplate 
              title="El Triángulo de Hierro" context="Caso 1: Desarrollo MVP" icon={Monitor} color="#39A900"
              parties={['Desarrollador ADSO', 'Cliente (StartUp)']}
              positions={['"Un clon de Uber completo por 2 millones en 1 mes".', '"Cuesta 15 millones y tarda 6 meses".']}
              interests={['Validar su idea rápido para conseguir inversores.', 'Cobrar lo justo y no hacer horas extra sin pago.']}
              agreement='Producto Mínimo Viable (MVP). Se lanza solo la función crítica de pedir servicio. En 1 mes por $2.5M.'
              visual={<VisualTriangle />}
            />
        </motion.div>}
        {slide === 3 && <motion.div key="s3" className="absolute inset-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
            <CaseTemplate 
              title="El Stack Tecnológico" context="Caso 2: Proyecto SENA" icon={BookOpen} color="#FF6E00"
              parties={['Estudiante A (Frontend)', 'Estudiante B (Backend)']}
              positions={['"Usemos React, es la última tendencia".', '"Usemos PHP puro, es lo que entendemos".']}
              interests={['Usar tecnologías modernas para conseguir empleo rápido.', 'No reprobar y asegurar que el código funcione.']}
              agreement='Desacoplamiento. Frontend en React (Innovación) conectado a una API REST en PHP (Seguridad).'
              visual={<VisualStack />}
            />
        </motion.div>}
        {slide === 4 && <motion.div key="s4" className="absolute inset-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
            <CaseTemplate 
              title="Licenciamiento de Software" context="Caso 3: Modelo SaaS" icon={Briefcase} color="#0ea5e9"
              parties={['Proveedor SaaS', 'Cliente Corporativo']}
              positions={['"Contrato mínimo anual pagado por adelantado".', '"Solo quiero una prueba de 3 meses".']}
              interests={['Asegurar retención de clientes y flujo de caja estable.', 'Evitar perder dinero si el software no sirve.']}
              agreement='Contrato anual (pago mensualizado) con cláusula de Opt-out al 3er mes sin penalidad.'
              visual={<VisualSaaS />}
            />
        </motion.div>}
        {slide === 5 && <motion.div key="s5" className="absolute inset-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}><SlideMatrix/></motion.div>}
        {slide === 6 && <motion.div key="s6" className="absolute inset-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}><SlideIceberg/></motion.div>}
      </AnimatePresence>
    </div>
  )
}
