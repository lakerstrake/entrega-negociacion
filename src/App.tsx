import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Heart, Users, Target, Lightbulb, ListChecks, Handshake, Scale } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

interface Situacion {
  titulo: string
  tipo: string
  icon: React.ReactNode
  gradient: string
  badge: string
  partes: string
  posiciones: string
  intereses: string
  opciones: string
  acuerdo: string
}

const situaciones: Situacion[] = [
  {
    titulo: 'Soporte Técnico Empresarial',
    tipo: 'Laboral',
    icon: <Briefcase className="w-5 h-5" />,
    gradient: 'from-blue-500 to-blue-600',
    badge: 'bg-blue-50 text-blue-700 ring-blue-200',
    partes: 'Técnico de soporte vs. Cliente local.',
    posiciones: 'Cobrar $300k por mantenimiento completo vs. Pagar máximo $180k de presupuesto.',
    intereses: 'Cubrir costos operativos y tiempo invertido vs. Recuperar operatividad de equipos sin desfalcar la caja.',
    opciones: 'Mantenimiento parcial, pago a cuotas, o trabajo completo con soporte remoto posterior.',
    acuerdo: 'Trabajo completo por $250k a dos cuotas, incluyendo soporte remoto vía RustDesk por un mes.',
  },
  {
    titulo: 'Proyecto Universitario de Circuitos',
    tipo: 'Académica',
    icon: <GraduationCap className="w-5 h-5" />,
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    partes: 'Estudiante A vs. Estudiantes B y C (Compañeros de equipo).',
    posiciones: 'A hace el ensamblaje y los demás documentan vs. Hacer todo juntos al mismo tiempo.',
    intereses: 'Optimizar tiempos de estudio vs. Asegurar que todos entiendan la lógica del circuito.',
    opciones: 'Sesión rápida de explicación técnica y luego división, o documentar por áreas de dominio.',
    acuerdo: 'Cada uno redacta la documentación del área que domina, con una reunión de 20 minutos previa a la entrega para unificar criterios.',
  },
  {
    titulo: 'Planes del Fin de Semana',
    tipo: 'Personal',
    icon: <Heart className="w-5 h-5" />,
    gradient: 'from-rose-500 to-pink-600',
    badge: 'bg-rose-50 text-rose-700 ring-rose-200',
    partes: 'Persona A vs. Persona B (Pareja).',
    posiciones: 'Salir a ruta larga en bicicleta en la mañana vs. Quedarse en casa adelantando trabajos.',
    intereses: 'Necesidad de deporte y liberar estrés vs. Necesidad de tiempo de calidad y descanso.',
    opciones: 'Ruta corta en la mañana, o salir juntos en la tarde a un café.',
    acuerdo: 'Ruta corta en bicicleta el sábado en la mañana, y domingo completo destinado a un plan conjunto y relajado.',
  },
]

const elementConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  Partes: { icon: <Users className="w-3.5 h-3.5" />, color: 'bg-violet-100 text-violet-700' },
  Posiciones: { icon: <Target className="w-3.5 h-3.5" />, color: 'bg-amber-100 text-amber-700' },
  Intereses: { icon: <Lightbulb className="w-3.5 h-3.5" />, color: 'bg-cyan-100 text-cyan-700' },
  Opciones: { icon: <ListChecks className="w-3.5 h-3.5" />, color: 'bg-lime-100 text-lime-700' },
  Acuerdo: { icon: <Handshake className="w-3.5 h-3.5" />, color: 'bg-indigo-100 text-indigo-700' },
}

function Badge({ label }: { label: string }) {
  const cfg = elementConfig[label]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${cfg.color} shrink-0`}>
      {cfg.icon}
      {label}
    </span>
  )
}

function Card({ s, index }: { s: Situacion; index: number }) {
  return (
    <motion.div
      variants={fadeIn}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-200/60 overflow-hidden"
    >
      <div className={`h-2 bg-gradient-to-r ${s.gradient}`} />
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-sm`}>
            {s.icon}
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${s.badge} px-2 py-0.5 rounded-md ring-1`}>
              Situación {index + 1} — {s.tipo}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug">{s.titulo}</h3>
          </div>
        </div>
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          {(['Partes', 'Posiciones', 'Intereses', 'Opciones', 'Acuerdo'] as const).map((key) => (
            <div key={key} className="flex gap-2 items-start">
              <Badge label={key} />
              <span>{s[key.toLowerCase() as keyof Situacion] as string}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const integrantes = [
  'Joseph Santiago Olarte Cardona',
  'Juan Esteban Cárdenas',
  'Jose Arteaga',
  'Juan Manuel Lagos Monroy',
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans antialiased">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center pt-16 pb-12 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 ring-1 ring-indigo-100">
          <Scale className="w-4 h-4" />
          Análisis y Desarrollo de Software — ADSO
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Situaciones de<br />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Negociación
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Análisis de Posiciones e Intereses en contextos cotidianos
        </p>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-24">
        {/* Sección 1: Tarjetas */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800">
              Tres Situaciones Cotidianas
            </h2>
            <p className="text-slate-500 mt-1">Cada tarjeta separa claramente los 5 elementos de la negociación.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {situaciones.map((s, i) => (
              <Card key={s.titulo} s={s} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Sección 2: Tabla */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Tabla Comparativa</h2>
            <p className="text-slate-500 mt-1">Consolidación de las 3 situaciones cruzadas con los 5 elementos.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200/60">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <th className="px-5 py-4 font-semibold rounded-tl-2xl">Elemento</th>
                  <th className="px-5 py-4 font-semibold">Laboral</th>
                  <th className="px-5 py-4 font-semibold">Académica</th>
                  <th className="px-5 py-4 font-semibold rounded-tr-2xl">Personal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {[
                  { el: 'Partes', l: 'Técnico vs. Cliente', a: 'Estudiante A vs. B y C', p: 'Persona A vs. Persona B' },
                  { el: 'Posición', l: '$300k vs. máx $180k', a: 'Dividir tareas vs. todo juntos', p: 'Ruta larga vs. quedarse' },
                  { el: 'Interés', l: 'Cubrir costos vs. operatividad', a: 'Optimizar tiempo vs. comprensión', p: 'Deporte vs. tiempo de calidad' },
                  { el: 'Opciones', l: 'Parcial, cuotas, remoto', a: 'Explicación previa o por áreas', p: 'Ruta corta o café juntos' },
                  { el: 'Acuerdo', l: '$250k a 2 cuotas + soporte', a: 'Cada uno documenta su área', p: 'Sábado bici, domingo juntos' },
                ].map((row, i) => (
                  <tr key={row.el} className={i % 2 === 1 ? 'bg-slate-50/50' : ''}>
                    <td className="px-5 py-3.5 font-bold text-slate-700">
                      <Badge label={row.el === 'Posición' ? 'Posiciones' : row.el === 'Interés' ? 'Intereses' : row.el} />
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{row.l}</td>
                    <td className="px-5 py-3.5 text-slate-600">{row.a}</td>
                    <td className="px-5 py-3.5 text-slate-600">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Sección 3: Conclusión */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-violet-500 rounded-l-2xl" />
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-600" />
              Conclusión: Posición vs. Interés
            </h2>
            <div className="text-slate-700 space-y-4 leading-relaxed">
              <p>
                En cualquier proceso de negociación es fundamental distinguir entre la <strong className="text-slate-900">posición</strong> y el <strong className="text-slate-900">interés</strong>.
                Una analogía útil es el <strong className="text-indigo-700">iceberg</strong>:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-white/80 rounded-xl p-5 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Target className="w-4 h-4 text-amber-700" />
                    </div>
                    <h3 className="font-bold text-slate-900">Posición</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    La punta visible del iceberg — la demanda explícita, rígida y superficial. Es lo que cada parte <em>dice querer</em>: un precio, una fecha, un recurso concreto.
                  </p>
                </div>
                <div className="bg-white/80 rounded-xl p-5 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-cyan-700" />
                    </div>
                    <h3 className="font-bold text-slate-900">Interés</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    La base oculta del iceberg — las necesidades reales y motivaciones profundas. Es lo que la persona <em>realmente necesita</em>: seguridad, reconocimiento, bienestar.
                  </p>
                </div>
              </div>
              <p>
                Cuando se negocia únicamente sobre posiciones, el resultado tiende a ser un juego de suma cero. Sin embargo, al explorar los intereses subyacentes se abren opciones creativas que pueden satisfacer a ambas partes.
                <strong className="text-indigo-700"> Resolver conflictos requiere negociar sobre los intereses, no sobre las posiciones.</strong>
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer con integrantes */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Integrantes del equipo</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {integrantes.map((nombre) => (
              <span key={nombre} className="text-sm text-slate-600">{nombre}</span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Tecnología en ADSO — Negociación · 2025</p>
        </div>
      </footer>
    </div>
  )
}

export default App
