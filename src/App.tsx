import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Code2, GitBranch, Clock } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

/* ===================== DATA — Centrado en ADSO ===================== */

const team = [
  { name: 'Joseph Santiago Olarte', role: 'Caso 01', color: '#fb923c' },
  { name: 'Juan Esteban Cárdenas', role: 'Caso 02', color: '#60a5fa' },
  { name: 'Jose Arteaga', role: 'Caso 03', color: '#a78bfa' },
  { name: 'Juan Manuel Lagos', role: 'Síntesis', color: '#34d399' },
]

const cases = [
  {
    id: '01',
    icon: Code2,
    contexto: 'LABORAL',
    color: '#fb923c',
    responsable: 'Joseph Santiago Olarte',
    titulo: 'Scope creep en proyecto freelance',
    intro: 'Un desarrollador junior entrega un sistema de inventario. El cliente solicita un módulo extra (facturación electrónica) fuera del contrato.',
    partes: 'Desarrollador junior · Cliente PYME',
    posiciones: '"Es trabajo nuevo, cobro aparte" · "Está incluido en el sistema"',
    intereses: 'Reconocer horas extra y prestigio · Lanzar el negocio a tiempo y sin más gastos',
    opciones: ['MVP de facturación gratis + fase 2 paga', 'Soporte 3 meses incluido', 'Pago en producto/servicio del cliente'],
    acuerdo: 'MVP de facturación entregado sin costo y fase 2 (DIAN) cotizada por separado al 70% del valor estándar.',
    dato: '52% de los proyectos de software fallan por scope creep mal gestionado.',
    fuente: 'PMI · Pulse of the Profession (2021)',
  },
  {
    id: '02',
    icon: GitBranch,
    contexto: 'ACADÉMICA',
    color: '#60a5fa',
    responsable: 'Juan Esteban Cárdenas',
    titulo: 'División de tareas en proyecto grupal',
    intro: 'Equipo ADSO desarrolla un CRUD con login. Tres estudiantes discrepan sobre cómo dividir backend, frontend y documentación.',
    partes: 'Estudiante A (fullstack) · Estudiantes B y C',
    posiciones: '"Hago el código, ustedes la documentación" · "Todos debemos tocar código para aprender"',
    intereses: 'Optimizar tiempo y entregar a tiempo · Aprender el stack para el examen final',
    opciones: ['Pair programming rotativo', 'División por capas con revisión cruzada', 'Sesión Git inicial + ramas por feature'],
    acuerdo: 'Ramas por feature en Git, pair programming los viernes y documentación colaborativa en Notion.',
    dato: 'Equipos con pair programming reducen bugs en 15% y mejoran aprendizaje colectivo.',
    fuente: 'Williams & Kessler · IEEE Software (2003)',
  },
  {
    id: '03',
    icon: Clock,
    contexto: 'PERSONAL',
    color: '#a78bfa',
    responsable: 'Jose Arteaga',
    titulo: 'Deadline vs. tiempo personal',
    intro: 'Un desarrollador trabaja remoto. Su pareja reclama que pasa fines de semana programando para cumplir un sprint.',
    partes: 'Developer remoto · Pareja',
    posiciones: '"Debo terminar el sprint este fin de semana" · "Necesitamos tiempo juntos"',
    intereses: 'No fallar al equipo / mantener empleo · Sentirse priorizado y compartir descanso',
    opciones: ['Bloques Pomodoro con pausas activas en pareja', 'Renegociar deadline con scrum master', 'Sábado libre + domingo enfocado'],
    acuerdo: 'Sábado libre completo; domingo bloques de 90 min de código intercalados con tiempo en pareja.',
    dato: 'Developers con burnout son 63% más propensos a abandonar su empleo en 1 año.',
    fuente: 'Stack Overflow Developer Survey (2023)',
  },
]

const stats = [
  { value: 65, label: 'Proyectos de software con fallos o cancelación', source: 'Standish CHAOS · 2020', color: '#f87171' },
  { value: 52, label: 'Causados por scope creep o requerimientos cambiantes', source: 'PMI Pulse · 2021', color: '#fb923c' },
  { value: 92, label: 'Conflictos resueltos con enfoque integrativo (Harvard)', source: 'Fisher & Ury · 2011', color: '#34d399' },
]

/* ===================== UI HELPERS ===================== */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 mb-4">
    <div className="w-6 h-px bg-white/30" />
    <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/40 mono">{children}</span>
  </div>
)

const Slide = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10 lg:p-14 overflow-hidden">
    <div className="w-full max-w-6xl h-full flex flex-col justify-center">{children}</div>
  </div>
)

/* ===================== ANIMATED VIZ ===================== */

function BarStat({ s, i }: { s: typeof stats[0]; i: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="mono text-[10px] tracking-widest text-white/40">{String(i + 1).padStart(2, '0')}</span>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.2 }}
          className="font-bold text-2xl tabular-nums" style={{ color: s.color }}>
          {s.value}%
        </motion.span>
      </div>
      <div className="h-px bg-white/10 overflow-hidden mb-2">
        <motion.div className="h-full" style={{ backgroundColor: s.color }}
          initial={{ width: 0 }} animate={{ width: `${s.value}%` }}
          transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease }} />
      </div>
      <p className="text-xs text-white/60 leading-snug">{s.label}</p>
      <p className="text-[10px] text-white/30 mt-1 mono">{s.source}</p>
    </div>
  )
}

function IcebergMini() {
  return (
    <svg viewBox="0 0 240 280" className="w-full h-full">
      <defs>
        <linearGradient id="ice-t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
        <linearGradient id="ice-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#71717a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#27272a" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <motion.line x1="0" y1="115" x2="240" y2="115" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
      <motion.polygon points="120,40 80,114 160,114" fill="url(#ice-t)"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
      <motion.polygon points="120,118 50,265 190,265" fill="url(#ice-b)"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} />
      <motion.text x="120" y="85" textAnchor="middle" fontSize="9" fontWeight="700" fill="#18181b"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        POSICIÓN
      </motion.text>
      <motion.text x="120" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fafafa"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        INTERÉS
      </motion.text>
    </svg>
  )
}

/* ===================== SLIDES ===================== */

function SlideIntro({ onNext }: { onNext: () => void }) {
  return (
    <Slide>
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>ADSO · Negociación · 2025</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-white tracking-tight"
          >
            Negociar es<br />
            <span className="italic font-extralight text-white/50">programar acuerdos</span><br />
            <span className="font-semibold">donde ganan todos.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-6 text-sm md:text-base text-white/50 max-w-lg leading-relaxed"
          >
            Tres situaciones reales del Analista y Desarrollador de Software, vistas con el método Harvard de negociación.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            onClick={onNext}
            className="mt-10 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors mono"
          >
            <span className="w-8 h-px bg-white/40" />
            Iniciar presentación
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-3"
          >
            {team.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center justify-between py-3 border-b border-white/5 group"
              >
                <div className="flex items-center gap-3">
                  <span className="mono text-[10px] text-white/30 tabular-nums">0{i + 1}</span>
                  <span className="text-sm text-white/90">{m.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="mono text-[10px] text-white/30 tracking-widest">{m.role}</span>
                  <div className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: m.color }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

function SlideContexto() {
  return (
    <Slide>
      <Eyebrow>01 · Contexto ADSO</Eyebrow>
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            En desarrollo de software,<br />
            <span className="font-semibold">negociar es la skill</span><br />
            <span className="italic text-white/50 font-extralight">más subestimada.</span>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-md">
            Cliente, equipo, deadline y tiempo personal: cada decisión técnica es también una decisión de negociación.
          </p>
          <div className="pt-4 border-t border-white/5">
            <p className="mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Marco aplicado</p>
            <p className="text-sm text-white/70">Método Harvard — Fisher &amp; Ury, <em>Getting to Yes</em> (2011).</p>
            <p className="text-xs text-white/40 mt-1">5 elementos: partes · posiciones · intereses · opciones · acuerdo.</p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          {stats.map((s, i) => <BarStat key={i} s={s} i={i} />)}
        </div>
      </div>
    </Slide>
  )
}

function SlideCase({ c }: { c: typeof cases[0] }) {
  const Icon = c.icon
  return (
    <Slide>
      <Eyebrow>Caso {c.id} · {c.contexto}</Eyebrow>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${c.color}1a`, color: c.color }}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-white/40">{c.responsable}</p>
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">{c.titulo}</h2>
          <p className="text-sm text-white/50 leading-relaxed">{c.intro}</p>

          <div className="pt-4 border-t border-white/5 space-y-3">
            <div>
              <p className="mono text-[9px] uppercase tracking-widest text-white/30 mb-1">Dato relevante</p>
              <p className="text-xs text-white/80 leading-relaxed" style={{ color: c.color }}>{c.dato}</p>
              <p className="text-[10px] text-white/30 mt-1 mono">{c.fuente}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {[
            { lbl: 'Partes', val: c.partes },
            { lbl: 'Posiciones', val: c.posiciones },
            { lbl: 'Intereses', val: c.intereses },
          ].map((row, i) => (
            <motion.div key={row.lbl}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex gap-4 py-3 border-b border-white/5"
            >
              <div className="w-24 shrink-0">
                <span className="mono text-[10px] uppercase tracking-widest" style={{ color: c.color }}>{row.lbl}</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed flex-1">{row.val}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex gap-4 py-3 border-b border-white/5"
          >
            <div className="w-24 shrink-0">
              <span className="mono text-[10px] uppercase tracking-widest" style={{ color: c.color }}>Opciones</span>
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {c.opciones.map((o, i) => (
                <span key={i} className="text-xs text-white/70 px-3 py-1 rounded-md border border-white/10 bg-white/[0.02]">
                  {o}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-4 p-5 rounded-lg relative overflow-hidden"
            style={{ backgroundColor: `${c.color}0d`, border: `1px solid ${c.color}33` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="mono text-[10px] uppercase tracking-widest font-semibold" style={{ color: c.color }}>Acuerdo final</span>
            </div>
            <p className="text-sm md:text-base text-white leading-relaxed">{c.acuerdo}</p>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

function SlideTabla() {
  return (
    <Slide>
      <Eyebrow>02 · Síntesis · Juan Manuel Lagos</Eyebrow>
      <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-8 leading-tight">
        Los <span className="font-semibold">5 elementos</span> cruzados con los <span className="font-semibold">3 casos</span>.
      </h2>
      <div className="border-t border-b border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 mono text-[10px] uppercase tracking-widest text-white/40 font-normal w-32"></th>
              {cases.map(c => (
                <th key={c.id} className="text-left py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="mono text-[10px] uppercase tracking-widest font-normal" style={{ color: c.color }}>{c.contexto}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { k: 'Partes', d: ['Dev junior · Cliente PYME', 'Estudiante A · B y C', 'Developer · Pareja'] },
              { k: 'Posición', d: ['Cobrar aparte · "está incluido"', 'Dividir código vs. todos codean', 'Trabajar finde · tiempo juntos'] },
              { k: 'Interés', d: ['Horas extra · lanzar a tiempo', 'Entregar · aprender stack', 'No fallar al equipo · ser prioridad'] },
              { k: 'Opciones', d: ['MVP gratis + fase 2 paga', 'Pair programming + Git', 'Pomodoro · sábado libre'] },
              { k: 'Acuerdo', d: ['MVP gratis · fase 2 al 70%', 'Ramas Git + pair viernes', 'Domingo 90min ON/OFF'] },
            ].map((row, ri) => (
              <motion.tr key={row.k}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.08 }}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
              >
                <td className="py-4 pr-4">
                  <span className="mono text-[10px] uppercase tracking-widest text-white/90 font-semibold">{row.k}</span>
                </td>
                {row.d.map((cell, ci) => (
                  <td key={ci} className="py-4 pr-4 text-xs md:text-sm text-white/70 leading-relaxed">{cell}</td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-white/30 mono mt-4 text-right">5 elementos × 3 casos = 15 puntos analizados</p>
    </Slide>
  )
}

function SlideConclusion() {
  return (
    <Slide>
      <Eyebrow>03 · Conclusión</Eyebrow>
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-64 h-72">
            <IcebergMini />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            La <span className="font-semibold">posición</span> es lo visible.<br />
            El <span className="italic text-white/50">interés</span>, lo que importa.
          </h2>

          <div className="grid sm:grid-cols-2 gap-5 pt-4">
            <div className="border-l-2 border-zinc-500 pl-4">
              <p className="mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">Posición · 10%</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Lo que decimos en voz alta: precios, deadlines, líneas de código exactas.
              </p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4">
              <p className="mono text-[10px] uppercase tracking-widest text-emerald-400 mb-1.5">Interés · 90%</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Lo que necesitamos de fondo: aprender, no fallar, ser valorados, descansar.
              </p>
            </div>
          </div>

          <div className="pt-5 border-t border-white/5">
            <p className="text-sm md:text-base text-white/90 italic leading-snug">
              "Don't bargain over positions. Focus on interests."
            </p>
            <p className="text-[10px] text-white/40 mono mt-2">— Fisher &amp; Ury · Getting to Yes · Harvard (2011)</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-4 border-t border-white/5">
            {team.map(m => (
              <span key={m.name} className="text-[11px] text-white/40 inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: m.color }} />
                {m.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}

/* ===================== APP ===================== */

const slides = [
  { label: 'Intro' },
  { label: 'Contexto' },
  { label: 'Laboral' },
  { label: 'Académica' },
  { label: 'Personal' },
  { label: 'Tabla' },
  { label: 'Conclusión' },
]

export default function App() {
  const [i, setI] = useState(0)
  const max = slides.length - 1
  const go = (n: number) => setI(Math.max(0, Math.min(max, n)))

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [i])

  return (
    <div className="fixed inset-0 bg-[#0a0a0b] dotgrid overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="mono text-[10px] uppercase tracking-widest text-white/40">SENA · ADSO</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {slides.map((_, n) => (
            <button key={n} onClick={() => go(n)}
              className={`mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded transition-all ${
                i === n ? 'text-white bg-white/10' : 'text-white/30 hover:text-white/70'
              }`}>
              {String(n).padStart(2, '0')}
            </button>
          ))}
        </div>
        <div className="mono text-[10px] uppercase tracking-widest text-white/40">
          {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-5">
        <div className="mono text-[10px] uppercase tracking-widest text-white/40">
          {slides[i].label}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => go(i - 1)} disabled={i === 0}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => go(i + 1)} disabled={i === max}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-30">
        <motion.div className="h-full bg-emerald-400"
          animate={{ width: `${((i + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease }} />
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease }}
          className="absolute inset-0"
        >
          {i === 0 && <SlideIntro onNext={() => go(1)} />}
          {i === 1 && <SlideContexto />}
          {i === 2 && <SlideCase c={cases[0]} />}
          {i === 3 && <SlideCase c={cases[1]} />}
          {i === 4 && <SlideCase c={cases[2]} />}
          {i === 5 && <SlideTabla />}
          {i === 6 && <SlideConclusion />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
