import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import AchievementsSection from './components/AchievementsSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')

    sections.forEach((sec, idx) => {
      // snap between sections
      ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: 'bottom top',
        snap: {
          snapTo: 1,
          duration: { min: 0.2, max: 0.6 },
          ease: 'power1.inOut',
        },
      })

      // theme switching based on data-theme attr
      const theme = sec.getAttribute('data-theme')
      if (theme) {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top center',
          onEnter: () => document.documentElement.classList.toggle('dark', theme === 'dark'),
          onEnterBack: () => document.documentElement.classList.toggle('dark', theme === 'dark'),
        })
      }

      // subtle morph-like mask between sections using clip-path animation
      if (idx < sections.length - 1) {
        const next = sections[idx + 1]
        gsap.fromTo(
          next,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        )
      }
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="font-sans antialiased selection:bg-[#fcba04]/40">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
    </div>
  )
}
