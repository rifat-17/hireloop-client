import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"


import logo from "@/images/logo.png"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

const buttonGlow = "shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"

const signInButtonClass = cn(
  buttonVariants({ variant: "ghost" }),
  buttonGlow,
  "h-[58px] rounded-xl px-6 text-lg font-semibold text-brand hover:bg-white/5 hover:text-brand"
)

const getStartedButtonClass = cn(
  buttonVariants({ variant: "ghost" }),
  buttonGlow,
  "h-[52px] rounded-xl bg-brand px-[22px] text-lg font-medium text-white hover:bg-brand/90"
)

export function Navbar() {
  return (
    <header className="relative z-20 px-4 pt-4 sm:px-6 lg:px-[60px] lg:pt-6">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-2xl bg-[#222] pl-5 pr-2 lg:h-[74px] lg:pl-6">
        <Link href="/" aria-label="HireLoop home">
          <Image
            src={logo}
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base tracking-[-0.0125em] text-white transition-colors hover:text-white/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="mx-6 h-6 w-px bg-white/40" aria-hidden="true" />

          <div className="flex items-center gap-4">
            <Link href="/login" className={signInButtonClass}>
              Sign In
            </Link>
            <Link href="/register" className={getStartedButtonClass}>
              Get Started
            </Link>
          </div>
        </nav>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="mr-1 text-white hover:bg-white/10 lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] border-white/10 bg-[#222] text-white sm:max-w-[300px]"
          >
            <SheetHeader className="px-6 pt-6">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Link href="/" aria-label="HireLoop home">
                <Image
                  src={logo}
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-8 w-auto"
                />
              </Link>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col gap-1 px-3">
              {navLinks.map((link) => (
                <SheetClose
                  nativeButton={false}
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-base text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="gap-3 px-6 pb-6">
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      buttonGlow,
                      "h-12 w-full rounded-xl text-base font-semibold text-brand hover:bg-white/5 hover:text-brand"
                    )}
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/register"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      buttonGlow,
                      "h-12 w-full rounded-xl bg-brand text-base font-medium text-white hover:bg-brand/90"
                    )}
                  />
                }
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
