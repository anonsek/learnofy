"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ModeToggle() {
  const { theme,setTheme } = useTheme()

  return (
    <div>
      <Button onClick={() =>setTheme(theme==="dark" ? "light" :"dark")}>
        <SunIcon className="h-[1.2rem] w-[1.rem] rotate-0 scale-100 transitition-all dark:rotate-90 dark:scale-0 " />
        <MoonIcon className="absolute h-[1.rem] rotate-90 scale-0 transitition-all dark:rotate-0 dark:scale-100 " />
  
      </Button>
    </div>
  )
}

