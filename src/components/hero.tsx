import Image from "next/image"
import Link from "next/link"
import { Briefcase, Building2, MapPin, Search, Star, Users } from "lucide-react"

import heroGlobe from "@/images/globe.png"
import { Button } from "@/components/ui/button"

const trendingPositions = ["Product Designer", "AI Engineering", "DevOps Engineer"]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative bg-[#010103]">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-[832px] px-6 pt-24 text-center sm:pt-32 lg:pt-44">
        <div className="flex items-center justify-center">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/40 sm:block"
          />

          <div className="flex h-12 items-center gap-3 rounded-full border border-white/15 bg-[linear-gradient(180deg,#3f3f3f_0%,#010102_100%)] px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <span aria-hidden="true" className="text-xl leading-none">
              🎁
            </span>
            <span className="font-display text-sm font-medium text-white sm:text-base">
              50,000+ new jobs this month
            </span>
          </div>

          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/40 sm:block"
          />
        </div>

        <h1 className="mt-8 font-display text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-balance text-white sm:text-5xl lg:text-[56px]">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-4 max-w-[784px] font-display text-base leading-[1.6] text-pretty text-white/70 sm:text-lg lg:text-xl">
          HireLoop connects top talent with world-class companies. Browse thousands of curated
          opportunities and land your next role — faster.
        </p>

        <form
          action="/browse-jobs"
          className="mt-8 flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 text-left transition-colors focus-within:border-white/40 sm:mt-12 sm:h-16 sm:flex-row sm:items-center sm:gap-0 sm:pl-6 sm:pr-2"
        >
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 sm:px-0 sm:py-0">
            <Search className="size-5 shrink-0 text-white/80" aria-hidden="true" />
            <span className="sr-only">Job title, skill or company</span>
            <input
              type="text"
              name="q"
              placeholder="Job title, skill or company"
              className="h-6 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/70"
            />
          </label>

          <span aria-hidden="true" className="mx-3 h-px bg-white/10 sm:mx-4 sm:h-6 sm:w-px" />

          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 sm:px-0 sm:py-0">
            <MapPin className="size-5 shrink-0 text-white/80" aria-hidden="true" />
            <span className="sr-only">Location or remote</span>
            <input
              type="text"
              name="location"
              placeholder="Location or remote"
              className="h-6 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/70"
            />
          </label>

          <Button
            type="submit"
            aria-label="Search jobs"
            className="h-12 w-full shrink-0 rounded-xl bg-brand px-6 text-base font-medium text-white hover:bg-brand/90 sm:w-12 sm:px-0"
          >
            <Search className="size-5" aria-hidden="true" />
            <span className="sm:hidden">Search</span>
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <span className="font-display text-sm text-white/90 sm:text-base">
            Trending Position
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            {trendingPositions.map((position) => (
              <Link
                key={position}
                href={`/browse-jobs?q=${encodeURIComponent(position)}`}
                className="rounded-full border border-white/10 bg-[#1a1a1b] px-4 py-2 text-sm text-white/90 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                {position}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1368px] px-6 pb-16 pt-40 lg:pb-[72px] lg:pt-[358px]">
        <p className="text-center font-display text-lg leading-[1.6] text-white/70 sm:text-xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-[120px] lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex h-[254px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#010101] to-[#313131] p-6"
            >
              <Icon className="size-6 text-white" strokeWidth={1.5} aria-hidden="true" />

              <div>
                <p className="font-display text-[56px] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                  {value}
                </p>
                <p className="mt-4 text-lg text-white">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 z-0 overflow-hidden lg:-top-[98px]"
    >
      <Image
        src={heroGlobe}
        alt=""
        priority
        className="absolute left-1/2 top-0 h-auto w-[1100px] max-w-none -translate-x-1/2 sm:w-[1440px]"
      />

      <div className="absolute inset-x-0 top-0 h-[450px] bg-[linear-gradient(180deg,rgba(1,1,3,0.45)_0%,rgba(1,1,3,0.45)_72%,transparent_100%)]" />
    </div>
  )
}
