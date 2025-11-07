import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitByChars(el) {
  const text = el.textContent || ''
  el.textContent = ''
  const frag = document.createDocumentFragment()
  for (const ch of text) {
    const span = document.createElement('span')
    span.textContent = ch
    span.style.display = 'inline-block'
    span.style.willChange = 'transform, opacity'
    frag.appendChild(span)
  }
  el.appendChild(frag)
}

export default function HeroSection() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) splitByChars(titleRef.current)

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(rootRef.current, { opacity: 0, duration: 0.6 })
      tl.from(
        titleRef.current?.querySelectorAll('span') || [],
        {
          y: 40,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
        },
        '-=0.2'
      )
      tl.from(
        subtitleRef.current,
        { y: 20, opacity: 0, duration: 0.6 },
        '-=0.4'
      )
      tl.from(ctaRef.current?.children || [], { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')

      // background gradient animate with scroll progress
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress
          rootRef.current?.style.setProperty('--bg-rotation', `${p * 360}deg`)
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      id="home"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Animated gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'conic-gradient(from var(--bg-rotation, 0deg), #250001, #590004, #a50104, #fcba04, #250001)',
          opacity: 0.25,
          transition: 'opacity 400ms ease',
        }}
      />

      {/* 3D Spline scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full grid place-items-center px-6">
        <div className="max-w-4xl text-center">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_12px_rgba(165,1,4,0.4)]"
          >
            Reza Fahalafi
          </h1>
          <p ref={subtitleRef} className="mt-4 text-lg sm:text-xl text-zinc-100/90">
            Data Scientist | Analytics Engineer
          </p>
          <div ref={ctaRef} className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#a50104] text-white px-6 py-3 shadow-lg shadow-[#a50104]/40 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-[#fcba04]/40"
            >
              View Projects
              <span className="inline-block h-2 w-2 rounded-full bg-[#fcba04] group-hover:animate-pulse" />
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-6 py-3 text-white shadow-[0_0_0_0_rgba(252,186,4,0.0)] transition-all duration-300 hover:shadow-[0_0_24px_4px_rgba(252,186,4,0.35)]"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
