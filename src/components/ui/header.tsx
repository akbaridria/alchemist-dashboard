/* eslint-disable @next/next/no-img-element */
import { ModeToggle } from "./mode-toggle"

export const Header = () => {
  return (
    <div className="sticky bg-card top-0 z-[10]">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between py-3 px-4">
        <img src="/alchemist-logo.jpeg" className="rounded-full w-12 h-12" alt="" />
        <ModeToggle />
      </div>
    </div>
  )
}