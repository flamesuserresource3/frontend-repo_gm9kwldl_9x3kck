import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from './SectionWrapper'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  { title: 'Kaggle Competitions Expert', desc: 'Multiple top 5% finishes across competitions.' },
  { title: 'Conference Speaker', desc: 'Presented on feature engineering at DataConf 2023.' },
  { title: 'Open Source', desc: 'Contributed to popular data tooling libraries.' },
]

export default function AchievementsSection() {
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="achievements" theme="dark">
      <div className="h-full w-full px-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold">Achievements</h2>
        <div ref={listRef} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {achievements.map((a, i) => (
            <div key={i} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
              <div className="absolute -top-4 left-6 inline-flex items-center gap-2 rounded-full bg-[#a50104] text-white px-3 py-1 shadow-md">
                <Award className="h-4 w-4" />
                <span className="text-xs">Badge</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-zinc-200/80">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
