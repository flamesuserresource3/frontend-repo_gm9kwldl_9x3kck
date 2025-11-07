import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BadgeCheck } from 'lucide-react'
import SectionWrapper from './SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const titleRef = useRef(null)
  const paragraphRef = useRef(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      })
      gsap.from(paragraphRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        scrollTrigger: { trigger: paragraphRef.current, start: 'top 85%' },
      })
      gsap.from(skillsRef.current?.children || [], {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        scrollTrigger: { trigger: skillsRef.current, start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [])

  const skills = ['Python', 'SQL', 'Airflow', 'dbt', 'Pandas', 'Spark', 'TensorFlow', 'Power BI', 'Dashboards']

  return (
    <SectionWrapper id="about" theme="light">
      <div className="h-full grid md:grid-cols-2 gap-8 place-items-center px-6 md:px-12">
        <div className="max-w-xl">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold">
            About
          </h2>
          <p ref={paragraphRef} className="mt-4 text-lg/7 text-[#250001]/80 dark:text-zinc-200/90">
            I’m Reza, a data scientist and analytics engineer focused on building scalable data products,
            automated pipelines, and insightful visualizations that drive real outcomes.
          </p>
          <div ref={skillsRef} className="mt-6 flex flex-wrap gap-3">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-[#a50104]/20 bg-white/70 text-[#250001] px-3 py-1 shadow-sm backdrop-blur dark:bg-white/10 dark:text-zinc-100"
              >
                <BadgeCheck className="h-4 w-4 text-[#a50104]" />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-[#a50104]/20 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fcba04]/20 to-transparent animate-pulse pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
            alt="Reza portrait"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
