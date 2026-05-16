import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Heart, Users, Target, Lightbulb, ListChecks, Handshake } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

interface Situacion {
  titulo: string
  tipo: string
  icon: React.ReactNode
  color: string
  partes: string
  posiciones: string
  intereses: string
  opciones: string
  acuerdo: string
}

const situaciones: Situacion[] = [
  {
    titulo: 'Soporte Técnico Efi Solution',
    tipo: 'Laboral',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-800',
    partes: 'Juan Manuel (Técnico) vs. Cliente local.',
    posiciones: 'Cobrar $300k por mantenimiento completo vs. Pagar máximo $180k de presupuesto.',
    intereses: 'Cubrir costos/tiempo vs. Recuperar operatividad de equipos sin desfalcar la caja.',
    opciones: 'Mantenimiento parcial, pago a cuotas, o trabajo completo con soporte remoto posterior.',
    acuerdo: 'Trabajo completo por $250k a dos cuotas, incluyendo soporte remoto vía RustDesk por un mes.',
  },
  {
    titulo: 'Proyecto Universitario de Circuitos',
    tipo: 'Académica',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'bg-emerald-100 text-emerald-800',
    partes: 'Juan Manuel vs. Nicole y Harold (Compañeros).',
    posiciones: 'Juan hace el ensamblaje y ellos documentan vs. Hacer todo juntos al mismo tiempo.',
    intereses: 'Optimizar tiempos de estudio vs. Asegurar que todos entiendan la lógica del circuito.',
    opciones: 'Sesión rápida de explicación técnica y luego división, o documentar por áreas de dominio.',
    acuerdo: 'Cada uno redacta la documentación del área que domina, con una reunión de 20 minutos previa a la entrega para unificar criterios.',
  },
  {
    titulo: 'Fin de semana',
    tipo: 'Personal',
    icon: <Heart className="w-5 h-5" />,
    color: 'bg-rose-100 text-rose-800',
    partes: 'Juan Manuel vs. Sarai.',
    posiciones: 'Salir a ruta larga en bicicleta en la mañana vs. Quedarse en casa adelantando trabajos.',
    intereses: 'Necesidad de deporte/liberar estrés vs. Necesidad de tiempo de calidad y descanso.',
    opciones: 'Ruta corta en la mañana, o salir juntos en la tarde a un café.',
    acuerdo: 'Ruta corta en bicicleta el sábado en la mañana, y domingo completo destinado a un plan conjunto y relajado.',
  },
]

const elementIcons = {
  Partes: <Users className="w-4 h-4" />,
  Posiciones: <Target className="w-4 h-4" />,
  Intereses: <Lightbulb className="w-4 h-4" />,
  Opciones: <ListChecks className="w-4 h-4" />,
  Acuerdo: <Handshake className="w-4 h-4" />,
}

function Badge({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wide">
      {icon}
      {label}
    </span>
  )
}

function Card({ s }: { s: Situacion }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <span className={`p-2 rounded-xl ${s.color}`}>{s.icon}</span>
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${s.color} px-2 py-0.5 rounded-full`}>{s.tipo}</span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{s.titulo}</h3>
        </div>
      </div>
      <div className="space-y-3 text-left text-sm text-slate-700">
        <div><Badge label="Partes" icon={elementIcons.Partes} /> <span className="ml-1">{s.partes}</span></div>
        <div><Badge label="Posiciones" icon={elementIcons.Posiciones} /> <span className="ml-1">{s.posiciones}</span></div>
        <div><Badge label="Intereses" icon={elementIcons.Intereses} /> <span className="ml-1">{s.intereses}</span></div>
        <div><Badge label="Opciones" icon={elementIcons.Opciones} /> <span className="ml-1">{s.opciones}</span></div>
        <div><Badge label="Acuerdo" icon={elementIcons.Acuerdo} /> <span className="ml-1">{s.acuerdo}</span></div>
      </div>
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center py-16 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Situaciones de Negociación
        </h1>
        <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
          Análisis de Posiciones e Intereses
        </p>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-20">
        <section>
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-800 mb-8"
          >
            3 Situaciones Cotidianas
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {situaciones.map((s) => (
              <Card key={s.titulo} s={s} />
            ))}
          </div>
        </section>

        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Tabla Comparativa</h2>
          <div className="overflow-x-auto rounded-2xl shadow-md border border-slate-100">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Elemento</th>
                  <th className="px-4 py-3 font-semibold">Laboral</th>
                  <th className="px-4 py-3 font-semibold">Académica</th>
                  <th className="px-4 py-3 font-semibold">Personal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-700">Partes</td>
                  <td className="px-4 py-3 text-slate-600">Técnico vs. Cliente</td>
                  <td className="px-4 py-3 text-slate-600">Juan vs. Nicole y Harold</td>
                  <td className="px-4 py-3 text-slate-600">Juan vs. Sarai</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-700">Posición</td>
                  <td className="px-4 py-3 text-slate-600">$300k vs. máx $180k</td>
                  <td className="px-4 py-3 text-slate-600">Dividir tareas vs. todo juntos</td>
                  <td className="px-4 py-3 text-slate-600">Ruta larga vs. quedarse en casa</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-700">Interés</td>
                  <td className="px-4 py-3 text-slate-600">Cubrir costos vs. operatividad</td>
                  <td className="px-4 py-3 text-slate-600">Optimizar tiempo vs. comprensión</td>
                  <td className="px-4 py-3 text-slate-600">Deporte vs. tiempo de calidad</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-700">Opciones</td>
                  <td className="px-4 py-3 text-slate-600">Parcial, cuotas, remoto</td>
                  <td className="px-4 py-3 text-slate-600">Explicación previa o áreas</td>
                  <td className="px-4 py-3 text-slate-600">Ruta corta o café juntos</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-700">Acuerdo</td>
                  <td className="px-4 py-3 text-slate-600">$250k a 2 cuotas + soporte</td>
                  <td className="px-4 py-3 text-slate-600">Cada uno documenta su área</td>
                  <td className="px-4 py-3 text-slate-600">Sábado bici corta, domingo juntos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-white border-l-4 border-indigo-500 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Conclusión: Posición vs. Interés</h2>
            <div className="text-slate-700 space-y-4 text-left leading-relaxed">
              <p>
                En cualquier proceso de negociación es fundamental distinguir entre la <strong>posición</strong> y el <strong>interés</strong>.
                Una analogía útil es el <strong>iceberg</strong>:
              </p>
              <p>
                La <strong>posición</strong> es la punta visible — la demanda explícita, rígida y superficial que cada parte declara
                públicamente. Es lo que "dice querer" (un precio, una fecha, un recurso concreto).
              </p>
              <p>
                El <strong>interés</strong> es la base oculta del iceberg — las necesidades reales, motivaciones profundas y preocupaciones
                que impulsan esa posición. Es lo que la persona "realmente necesita" (seguridad económica, reconocimiento, bienestar).
              </p>
              <p>
                Cuando se negocia únicamente sobre posiciones, el resultado tiende a ser un juego de suma cero donde una parte gana y otra pierde.
                Sin embargo, cuando se exploran los intereses subyacentes, se abren opciones creativas que pueden satisfacer a ambas partes.
                <strong> Resolver conflictos requiere negociar sobre los intereses, no sobre las posiciones.</strong>
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="text-center py-6 text-xs text-slate-400">
        Juan Manuel Lagos — Negociación 2025-1
      </footer>
    </div>
  )
}

export default App
