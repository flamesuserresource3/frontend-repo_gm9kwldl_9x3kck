import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from './SectionWrapper'

import { Github } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Churn Prediction Pipeline',
    desc: 'End-to-end ML pipeline with feature store, model registry, and automated retraining.',
    link: '#',
  },
  {
    title: 'Real-time Analytics Dashboard',
    desc: 'Streaming metrics with Kafka + Spark + a sleek dashboard for business insights.',
    link: '#',
  },
  {
    title: 'Marketing Mix Model',
    desc: 'Bayesian MMM for budget allocation and ROI forecasting.',
    link: '#',
  },
  {
    title: 'Data Quality Monitor',
    desc: 'Great Expectations + Airflow observability with alerting and SLOs.',
    link: '#',
  },
]

export default function ProjectsSection() {
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="projects" theme="light">
      <div className="h-full w-full px-6 md:px-12 py-16 grid grid-rows-[auto,1fr]">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[#a50104]/30 px-4 py-2 text-sm hover:shadow-[0_0_24px_2px_rgba(252,186,4,0.35)] transition-shadow">
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
        <div ref={gridRef} className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <a
              key={idx}
              href={p.link}
              className="group relative rounded-2xl border border-[#a50104]/20 bg-white/80 dark:bg-white/10 p-6 shadow-lg transition-transform duration-300 will-change-transform hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#fcba04]/30 to-transparent" />
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[#250001]/80 dark:text-zinc-200/80">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
