/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export const Header = () => {
  return (
    <div className="sticky bg-card top-0 z-[10]">
      <div className="max-w-[1665px] mx-auto flex items-center justify-between py-3 px-4 lg:px-8 xl:px-16">
        <Link href="/"><img src="/alchemist-logo.jpeg" className="rounded-full w-12 h-12" alt="" /></Link>
        <ModeToggle />
      </div>
    </div>
  )
}