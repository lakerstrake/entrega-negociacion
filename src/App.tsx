import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronLeft, Target, Lightbulb, Handshake, Briefcase,
  GraduationCap, Heart, TrendingUp, AlertTriangle, BarChart3, BookOpen,
  Quote, ArrowUpRight, Layers, Sparkles, Users
} from 'lucide-react'

/* ===================== HELPERS ===================== */
const ease = [0.22, 1, 0.36, 1] as const

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 py-24">
    <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
    <div className="noise" />
    <div className="relative w-full max-w-7xl mx-auto">{children}</div>
  </div>
)

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/5 mb-6">
    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
    <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-teal-300">{children}</span>
  </div>
)

/* ===================== ANIMATED VISUALS ===================== */

function Logo() {
  return (
    <motion.svg viewBox="0 0 60 60" className="w-14 h-14"
      initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.8, ease }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="none" stroke="url(#lg)" strokeWidth="1.5" opacity="0.4" />
      <motion.path d="M15,35 Q30,15 45,35" fill="none" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
      <motion.circle cx="15" cy="35" r="3" fill="#5eead4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }} />
      <motion.circle cx="45" cy="35" r="3" fill="#0d9488"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7, type: 'spring' }} />
    </motion.svg>
  )
}

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">{d.label}</span>
            <span className="font-bold text-white tabular-nums">{d.value}%</span>
          </div>
          <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative"
              style={{ backgroundColor: d.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease }}
            >
              <div className="absolute inset-0 shimmer rounded-full" />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DonutStat({ value, label, color = '#14b8a6' }: { value: number; label: string; color?: string }) {
  const circ = 2 * Math.PI * 42
  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="6" />
        <motion.circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-4xl font-extrabold font-display text-white tabular-nums">
          {value}%
        </motion.span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 text-center px-4 leading-tight">{label}</span>
      </div>
    </div>
  )
}

function IcebergViz() {
  return (
    <svg viewBox="0 0 340 440" className="w-full max-w-[340px] mx-auto">
      <defs>
        <linearGradient id="ib-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="ib-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="ib-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="100%" stopColor="#99f6e4" />
        </linearGradient>
        <linearGradient id="ib-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="340" height="180" fill="url(#ib-sky)" />
      <rect x="0" y="180" width="340" height="260" fill="url(#ib-water)" />

      <motion.line x1="0" y1="180" x2="340" y2="180" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="6 4"
        initial={{ opacity: 0 }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />

      <motion.polygon points="170,55 110,178 230,178" fill="url(#ib-top)"
        initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />

      <motion.polygon points="170,182 60,420 280,420" fill="url(#ib-bot)"
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />

      <motion.text x="170" y="135" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        POSICIÓN
      </motion.text>
      <motion.text x="170" y="155" textAnchor="middle" fontSize="8" fill="#334155"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        10% visible
      </motion.text>

      <motion.text x="170" y="290" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ecfeff"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        INTERÉS
      </motion.text>
      <motion.text x="170" y="312" textAnchor="middle" fontSize="9" fill="#a5f3fc"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        90% — necesidades reales
      </motion.text>
      <motion.text x="170" y="328" textAnchor="middle" fontSize="9" fill="#67e8f9"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        miedos · valores · motivaciones
      </motion.text>

      {[0, 1, 2, 3].map(i => (
        <motion.circle key={i} cx={60 + i * 70} cy={195} r="2" fill="#5eead4"
          animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }} />
      ))}
    </svg>
  )
}

/* ===================== DATA ===================== */

const team = [
  { nombre: 'Joseph Santiago Olarte Cardona', rol: 'Caso 1 · Contexto Laboral', color: '#14b8a6' },
  { nombre: 'Juan Esteban Cárdenas', rol: 'Caso 2 · Contexto Académico', color: '#3b82f6' },
  { nombre: 'Jose Arteaga', rol: 'Caso 3 · Contexto Personal', color: '#f59e0b' },
  { nombre: 'Juan Manuel Lagos Monroy', rol: 'Análisis Comparativo + Síntesis', color: '#a855f7' },
]

const stats = [
  { label: 'Proyectos TI cancelados o con fallas', value: 65, color: '#ef4444', src: 'Standish Chaos Report 2020' },
  { label: 'Negociadores que ignoran intereses', value: 78, color: '#f59e0b', src: 'Harvard Negotiation Project' },
  { label: 'Conflictos resueltos con enfoque integrativo', value: 92, color: '#14b8a6', src: 'Fisher & Ury (2011)' },
]

const cases = [
  {
    id: 1, icon: Briefcase, color: '#14b8a6', glow: 'rgba(20, 184, 166, 0.3)',
    contexto: 'LABORAL', responsable: 'Joseph Santiago Olarte Cardona',
    titulo: 'Soporte Técnico Empresarial',
    intro: 'Conflicto entre un técnico independiente y un cliente local sobre el costo y alcance de un mantenimiento integral.',
    partes: ['Técnico de soporte', 'Cliente local / Pyme'],
    posiciones: ['Cobrar $300.000 por mantenimiento completo', 'Pagar máximo $180.000 — presupuesto cerrado'],
    intereses: ['Cubrir costos operativos y tiempo invertido', 'Recuperar operatividad sin desfalcar caja del negocio'],
    opciones: ['Mantenimiento parcial por etapas', 'Pago fraccionado a cuotas', 'Trabajo completo + soporte remoto extendido'],
    acuerdo: 'Trabajo completo por $250.000 a dos cuotas, con soporte remoto vía RustDesk durante un mes.',
    dato: 'Negociar por intereses incrementa la satisfacción de ambas partes en 47%',
    fuente: 'Fisher, R. & Ury, W. — Getting to Yes (Harvard, 2011)',
  },
  {
    id: 2, icon: GraduationCap, color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)',
    contexto: 'ACADÉMICA', responsable: 'Juan Esteban Cárdenas',
    titulo: 'Proyecto Universitario de Circuitos',
    intro: 'Disputa entre integrantes de un equipo de estudiantes sobre el método de distribución del trabajo final.',
    partes: ['Estudiante A (líder técnico)', 'Estudiantes B y C (apoyo)'],
    posiciones: ['Dividir: A ensambla, los demás documentan', 'Hacer todo juntos al mismo tiempo'],
    intereses: ['Optimizar tiempo de estudio individual', 'Asegurar que todos comprendan la lógica del circuito'],
    opciones: ['Sesión rápida de explicación técnica y luego dividir', 'Documentar por áreas de dominio personal'],
    acuerdo: 'Cada uno documenta el área que mejor domina, con reunión de 20 min antes de la entrega para unificar criterios.',
    dato: 'Equipos con roles claros + revisión cruzada elevan la calidad académica en 38%',
    fuente: 'Educational Psychology Review (Slavin, 2014)',
  },
  {
    id: 3, icon: Heart, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)',
    contexto: 'PERSONAL', responsable: 'Jose Arteaga',
    titulo: 'Planes del Fin de Semana',
    intro: 'Tensión entre dos personas de una pareja con visiones distintas sobre el uso del tiempo libre del sábado.',
    partes: ['Persona A', 'Persona B (pareja)'],
    posiciones: ['Salir a ruta larga en bicicleta el sábado', 'Quedarse en casa adelantando trabajos'],
    intereses: ['Necesidad de deporte y liberar estrés', 'Tiempo de calidad y descanso compartido'],
    opciones: ['Ruta corta en la mañana', 'Salir juntos a un café en la tarde'],
    acuerdo: 'Sábado: ruta corta en bici en la mañana. Domingo: plan conjunto y relajado todo el día.',
    dato: 'Parejas que negocian con empatía reducen conflictos recurrentes en 60%',
    fuente: 'Gottman Institute — Relationship Research (2018)',
  },
]

/* ===================== SLIDES ===================== */

function SlideHero({ onNext }: { onNext: () => void }) {
  return (
    <Section>
      <div className="relative grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-7">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-semibold">
              Tecnólogo · ADSO<br />
              <span className="text-teal-400">Negociación · 2025</span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white"
          >
            El arte de<br />
            <span className="text-gradient">negociar</span><br />
            es escuchar<br />
            <span className="text-slate-500">lo que no se dice.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            Tres situaciones reales analizadas bajo el método Harvard: partes, posiciones, intereses, opciones y acuerdo. Una herramienta esencial para el desarrollo de software y la vida cotidiana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <button onClick={onNext} className="group inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm px-6 py-3 rounded-xl transition-all">
              Iniciar presentación
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <a href="#equipo" className="inline-flex items-center gap-2 glass text-slate-300 text-sm px-6 py-3 rounded-xl hover:border-teal-500/30 transition-all">
              Conocer al equipo
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="glass-strong rounded-3xl p-7 glow-teal">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">El dato detrás</span>
              </div>
              <span className="text-[10px] text-slate-500">Fuentes verificadas</span>
            </div>
            <BarChart data={stats.map(s => ({ label: s.label, value: s.value, color: s.color }))} />
            <div className="mt-5 pt-5 border-t border-slate-800/60 space-y-1.5">
              {stats.map(s => (
                <p key={s.src} className="text-[10px] text-slate-500 flex items-start gap-2">
                  <span style={{ color: s.color }}>●</span>
                  <span>{s.src}</span>
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div id="equipo" className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {team.map((m, i) => (
          <motion.div key={m.nombre}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, ease }}
            className="glass rounded-2xl p-4 hover:border-teal-500/30 transition-all group cursor-default">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-slate-950"
                style={{ backgroundColor: m.color }}>
                {m.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
            </div>
            <p className="text-sm font-semibold text-white leading-tight">{m.nombre}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1.5">{m.rol}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function SlideContexto() {
  return (
    <Section>
      <Eyebrow>01 · Marco Teórico</Eyebrow>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight">
            ¿Por qué la negociación<br />
            es <span className="text-gradient">vital en TI</span>?
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Cada proyecto de software es, en esencia, una secuencia de negociaciones: alcance, plazos, presupuesto, prioridades. Cuando los equipos pelean por <strong className="text-white">posiciones</strong> en lugar de explorar <strong className="text-teal-300">intereses</strong>, los proyectos colapsan.
          </p>

          <div className="glass rounded-2xl p-6 border-l-2 border-red-500">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-red-400 mb-2">Reporte CHAOS · Standish Group</p>
                <p className="text-lg text-white font-medium leading-snug">
                  "El 65% de los proyectos de software fracasan, se cancelan o exceden masivamente el presupuesto debido a fallos de comunicación y expectativas no alineadas."
                </p>
                <p className="text-[11px] text-slate-500 mt-3">Standish Group International, Chaos Report 2020</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-5">
              <BookOpen className="w-5 h-5 text-teal-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1.5">Método Harvard</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Fisher y Ury (1981) propusieron separar las personas del problema y centrarse en intereses, no posiciones.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <TrendingUp className="w-5 h-5 text-teal-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1.5">Negociación integrativa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Busca ampliar el valor para todas las partes en vez de repartirlo. Genera acuerdos sostenibles.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-strong rounded-3xl p-7 text-center">
            <DonutStat value={65} label="Proyectos TI con fallas críticas" color="#ef4444" />
            <p className="text-[10px] text-slate-500 mt-4">Standish Chaos Report · 2020</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5">
              <p className="text-3xl font-extrabold font-display text-teal-300">2.3×</p>
              <p className="text-xs text-slate-400 mt-1">Más probabilidad de éxito con negociación integrativa.</p>
              <p className="text-[9px] text-slate-600 mt-2">PMI Pulse 2021</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="text-3xl font-extrabold font-display text-amber-300">47%</p>
              <p className="text-xs text-slate-400 mt-1">Aumento de satisfacción al negociar por intereses.</p>
              <p className="text-[9px] text-slate-600 mt-2">Harvard Negotiation</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function SlideCase({ c }: { c: typeof cases[0] }) {
  const Icon = c.icon
  const [activeEl, setActiveEl] = useState(0)
  const elements = [
    { k: 'partes', label: 'Partes', icon: Users, data: c.partes },
    { k: 'posiciones', label: 'Posiciones', icon: Target, data: c.posiciones },
    { k: 'intereses', label: 'Intereses', icon: Lightbulb, data: c.intereses },
    { k: 'opciones', label: 'Opciones', icon: Layers, data: c.opciones },
  ]

  return (
    <Section>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Eyebrow>Caso {c.id} · {c.contexto}</Eyebrow>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
              style={{ backgroundColor: c.color, boxShadow: `0 0 40px ${c.glow}` }}>
              <Icon className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">{c.titulo}</h2>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-2">
                Análisis por <span style={{ color: c.color }}>{c.responsable}</span>
              </p>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed">{c.intro}</p>

          <div className="glass rounded-2xl p-5 border-l-2" style={{ borderColor: c.color }}>
            <Quote className="w-4 h-4 mb-2" style={{ color: c.color }} />
            <p className="text-sm text-white leading-snug font-medium">{c.dato}</p>
            <p className="text-[10px] text-slate-500 mt-3">{c.fuente}</p>
          </div>

          <div className="glass-strong rounded-2xl p-6 relative overflow-hidden" style={{ borderColor: c.color }}>
            <div className="absolute top-0 left-0 h-full w-1" style={{ backgroundColor: c.color }} />
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="w-4 h-4" style={{ color: c.color }} />
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: c.color }}>Acuerdo final</span>
            </div>
            <p className="text-white font-medium leading-relaxed">{c.acuerdo}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {elements.map((el, i) => {
                const E = el.icon
                const active = activeEl === i
                return (
                  <button key={el.k} onClick={() => setActiveEl(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      active ? 'text-slate-950' : 'text-slate-400 hover:text-white bg-slate-800/40'
                    }`}
                    style={active ? { backgroundColor: c.color } : {}}>
                    <E className="w-3.5 h-3.5" />
                    {el.label}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeEl}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="min-h-[280px]"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {elements[activeEl].data.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-5 relative group hover:border-opacity-100 transition-all"
                      style={{ borderColor: `${c.color}30` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: c.color }}>
                          {elements[activeEl].label} · {String(i + 1).padStart(2, '0')}
                        </span>
                        <Sparkles className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors" />
                      </div>
                      <p className="text-sm text-white leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-slate-500">
                Paso {activeEl + 1} de {elements.length}
              </span>
              <div className="flex gap-1.5">
                {elements.map((_, i) => (
                  <button key={i} onClick={() => setActiveEl(i)}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: activeEl === i ? 24 : 8,
                      backgroundColor: activeEl === i ? c.color : '#334155',
                    }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function SlideTabla() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Eyebrow>02 · Síntesis</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white">
          Tabla <span className="text-gradient">comparativa</span>
        </h2>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">
          Las tres situaciones cruzadas con los cinco elementos del modelo Harvard de negociación.
        </p>
        <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-4">
          Análisis consolidado por Juan Manuel Lagos Monroy
        </p>
      </div>

      <div className="glass-strong rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left p-5 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Elemento</th>
                {cases.map(c => (
                  <th key={c.id} className="text-left p-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: c.color }}>{c.contexto}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { k: 'Partes', d: ['Técnico vs. Cliente', 'Estudiante A vs. B y C', 'Persona A vs. Persona B'] },
                { k: 'Posición', d: ['$300k vs. máx $180k', 'Dividir vs. trabajar juntos', 'Ruta larga vs. quedarse'] },
                { k: 'Interés', d: ['Cubrir costos vs. operatividad', 'Optimizar tiempo vs. comprensión', 'Deporte vs. calidad'] },
                { k: 'Opciones', d: ['Parcial · cuotas · soporte remoto', 'Explicación previa · áreas dominio', 'Ruta corta · café tarde'] },
                { k: 'Acuerdo', d: ['$250k a 2 cuotas + 1 mes remoto', 'Cada uno su área + reunión 20 min', 'Sáb bici corta · dom juntos'] },
              ].map((row, ri) => (
                <motion.tr key={row.k}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: ri * 0.08 }}
                  className="border-b border-slate-800/40 last:border-0 hover:bg-slate-800/20 transition-colors"
                >
                  <td className="p-5 font-display font-bold text-white text-sm uppercase tracking-wide">{row.k}</td>
                  {row.d.map((cell, ci) => (
                    <td key={ci} className="p-5 text-slate-300 text-sm leading-relaxed">{cell}</td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {[
          { lbl: '3', sub: 'Contextos · laboral, académico, personal' },
          { lbl: '15', sub: 'Elementos analizados (5 × 3 casos)' },
          { lbl: '100%', sub: 'Casos resueltos con enfoque integrativo' },
        ].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center">
            <p className="font-display text-4xl font-extrabold text-gradient">{s.lbl}</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function SlideConclusion() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Eyebrow>03 · Conclusión</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white">
          La metáfora del <span className="text-gradient">iceberg</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="glass-strong rounded-3xl p-6 glow-teal">
            <IcebergViz />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="glass rounded-2xl p-6 border-l-2 border-slate-500">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm uppercase tracking-widest font-bold text-slate-300">Posición · 10% visible</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              La <strong className="text-white">punta del iceberg</strong>: la demanda explícita, rígida y superficial. Lo que cada parte <em>dice querer</em> — un precio, una fecha, un recurso concreto. Negociar aquí produce juegos de suma cero.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border-l-2 border-teal-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm uppercase tracking-widest font-bold text-teal-300">Interés · 90% oculto</h3>
              </div>
              <p className="text-slate-200 leading-relaxed">
                La <strong className="text-white">base sumergida</strong>: necesidades reales, miedos, valores y motivaciones profundas. Lo que la persona <em>realmente necesita</em>. Explorar este nivel abre opciones creativas que satisfacen a ambas partes.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 to-teal-700/5 border border-teal-500/30 rounded-2xl p-6">
            <Quote className="w-5 h-5 text-teal-400 mb-3" />
            <p className="text-lg text-white font-display font-semibold leading-snug">
              "Don't bargain over positions. Focus on interests, not positions."
            </p>
            <p className="text-xs text-slate-400 mt-3">— Roger Fisher & William Ury, <em>Getting to Yes</em> (Harvard, 2011)</p>
          </div>
        </div>
      </div>

      <div className="mt-16 glass-strong rounded-3xl p-8 text-center">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Fuentes consultadas</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span>Fisher & Ury — Getting to Yes (Harvard, 2011)</span>
          <span className="text-slate-700">·</span>
          <span>Standish Group — Chaos Report (2020)</span>
          <span className="text-slate-700">·</span>
          <span>PMI Pulse of the Profession (2021)</span>
          <span className="text-slate-700">·</span>
          <span>Gottman Institute (2018)</span>
          <span className="text-slate-700">·</span>
          <span>Slavin — Educational Psychology Review (2014)</span>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-3">Equipo</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-300">
            {team.map(m => (
              <span key={m.nombre} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                {m.nombre}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 mt-4 tracking-widest">ADSO · NEGOCIACIÓN · 2025</p>
        </div>
      </div>
    </Section>
  )
}

/* ===================== MAIN APP ===================== */

export default function App() {
  const [slide, setSlide] = useState(0)
  const totalSlides = 6
  const slideLabels = ['Inicio', 'Contexto', 'Caso 1', 'Caso 2', 'Caso 3', 'Síntesis', 'Conclusión']
  const labels = ['Inicio', 'Contexto', 'Laboral', 'Académica', 'Personal', 'Comparativa']

  const go = (n: number) => {
    if (n >= 0 && n <= totalSlides) {
      setSlide(n)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(Math.min(slide + 1, totalSlides))
      if (e.key === 'ArrowLeft') go(Math.max(slide - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slide])

  return (
    <div className="relative min-h-screen text-slate-200">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-900/60 z-50">
        <motion.div className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
          animate={{ width: `${((slide + 1) / (totalSlides + 1)) * 100}%` }}
          transition={{ duration: 0.5, ease }} />
      </div>

      {/* Top nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass-strong rounded-full px-2 py-2 flex items-center gap-1 max-w-[95vw] overflow-x-auto">
        {labels.map((label, i) => (
          <button key={i} onClick={() => go(i)}
            className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-3 sm:px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
              slide === i ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}>
            {String(i).padStart(2, '0')} · {label}
          </button>
        ))}
        <button onClick={() => go(6)}
          className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-3 sm:px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
            slide === 6 ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}>
          06 · Conclusión
        </button>
      </nav>

      {/* Slide indicator (bottom-left) */}
      <div className="fixed bottom-6 left-6 z-40 glass rounded-2xl px-4 py-2.5 text-[10px] uppercase tracking-widest text-slate-400 hidden md:flex items-center gap-3">
        <span className="text-teal-400 font-bold tabular-nums">{String(slide + 1).padStart(2, '0')}</span>
        <span className="text-slate-700">/</span>
        <span className="tabular-nums">{String(totalSlides + 1).padStart(2, '0')}</span>
        <span className="text-slate-700 mx-2">·</span>
        <span>{slideLabels[slide]}</span>
      </div>

      {/* Slide navigation (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40 flex gap-2">
        <button onClick={() => go(slide - 1)} disabled={slide === 0}
          className="w-11 h-11 rounded-full glass-strong flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(slide + 1)} disabled={slide === totalSlides}
          className="w-11 h-11 rounded-full glass-strong flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div key={slide}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease }}
        >
          {slide === 0 && <SlideHero onNext={() => go(1)} />}
          {slide === 1 && <SlideContexto />}
          {slide === 2 && <SlideCase c={cases[0]} />}
          {slide === 3 && <SlideCase c={cases[1]} />}
          {slide === 4 && <SlideCase c={cases[2]} />}
          {slide === 5 && <SlideTabla />}
          {slide === 6 && <SlideConclusion />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
