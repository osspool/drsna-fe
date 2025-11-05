
export const RetroGrid = ({
    angle = 65,
    cellSize = 60,
    opacity = 0.5,
    lightLineColor = "gray",
    darkLineColor = "gray",
  }) => {
    const gridStyles = {
      "--grid-angle": `${angle}deg`,
      "--cell-size": `${cellSize}px`,
      "--opacity": opacity,
      "--light-line": lightLineColor,
      "--dark-line": darkLineColor,
    }
  
    return (
      <div
        className={cn(
          "pointer-events-none absolute size-full overflow-hidden perspective-[200px]",
          `opacity-(--opacity)`,
        )}
        style={gridStyles}
      >
        <div className="absolute inset-0 transform-[rotateX(var(--grid-angle))]">
          <div className="animate-grid bg-[linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)]" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" />
      </div>
    )
  }
  