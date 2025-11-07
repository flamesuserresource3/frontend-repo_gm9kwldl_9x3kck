import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionWrapper({ id, theme, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const prefersDark = theme === 'dark'

    const ctx = gsap.context(() => {
      // theme toggle on enter
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        onEnter: () => document.documentElement.classList.toggle('dark', prefersDark),
        onEnterBack: () => document.documentElement.classList.toggle('dark', prefersDark),
      })

      // subtle parallax of background gradient
      gsap.to(el, {
        backgroundPosition: '50% 60%',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [theme])

  const base = theme === 'dark'
    ? 'bg-[#250001] text-zinc-100'
    : 'bg-[#f3f3f3] text-[#250001]'

  return (
    <section
      ref={ref}
      id={id}
      className={`relative h-screen w-full overflow-hidden transition-colors duration-500 ${base}`}
    >
      {children}
    </section>
  )
}
