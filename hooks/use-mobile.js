import * as React from "react"

const DEFAULT_BREAKPOINT = 768

export function useIsMobile(breakpoint = DEFAULT_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const updateMatch = (event) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener("change", updateMatch)

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [breakpoint])

  return isMobile
}
