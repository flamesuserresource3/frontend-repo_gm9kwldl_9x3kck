import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from './SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { company: 'Nova Analytics', role: 'Senior Data Scientist', period: '2022 — Present' },
  { company: 'InsightWorks', role: 'Analytics Engineer', period: '2020 — 2022' },
  { company: 'DataForge Labs', role: 'Data Scientist', period: '2018 — 2020' },
]

export default function ExperienceSection() {
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current?.children || [], {
        x: -24,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="experience" theme="dark">
      <div className="h-full flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
        <ol ref={listRef} className="mt-8 w-full max-w-3xl space-y-4">
          {items.map((it, idx) => (
            <li key={idx} className="grid grid-cols-3 items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="col-span-2">
                <p className="text-lg font-semibold">{it.company}</p>
                <p className="text-sm text-zinc-200/80">{it.role}</p>
              </div>
              <p className="text-right text-sm text-zinc-200/70">{it.period}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  )
}
