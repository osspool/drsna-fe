/**
 * Animated Wrapper Components
 *
 * Centralized animation primitives for consistent motion across the application.
 * Replaces hand-coded animation class strings with reusable components.
 *
 * @example
 * <FadeIn delay={200}>
 *   <h1>Animated Heading</h1>
 * </FadeIn>
 *
 * @example
 * <SlideIn direction="left" delay={300}>
 *   <div>Content slides in from left</div>
 * </SlideIn>
 */

import { cn } from "@/lib/utils";

/**
 * FadeIn - Simple opacity animation
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @param {number} [props.duration=800] - Animation duration in milliseconds
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disable animation
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 800,
  className,
  disabled = false
}) {
  if (disabled) return <>{children}</>;

  return (
    <div
      className={cn("opacity-0 animate-fade-in", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}

/**
 * FadeInUp - Fade in with upward motion
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @param {number} [props.duration=800] - Animation duration in milliseconds
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disable animation
 */
export function FadeInUp({
  children,
  delay = 0,
  duration = 800,
  className,
  disabled = false
}) {
  if (disabled) return <>{children}</>;

  return (
    <div
      className={cn("opacity-0 animate-fade-in-up", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}

/**
 * SlideIn - Slide in from specified direction
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {'left'|'right'|'up'|'down'} [props.direction='left'] - Slide direction
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @param {number} [props.duration=800] - Animation duration in milliseconds
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disable animation
 */
export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 800,
  className,
  disabled = false
}) {
  if (disabled) return <>{children}</>;

  const animationClass = {
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    up: 'animate-slide-in-up',
    down: 'animate-slide-in-down'
  }[direction];

  return (
    <div
      className={cn("opacity-0", animationClass, className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}

/**
 * ScaleIn - Scale up animation
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @param {number} [props.duration=800] - Animation duration in milliseconds
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disable animation
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 800,
  className,
  disabled = false
}) {
  if (disabled) return <>{children}</>;

  return (
    <div
      className={cn("opacity-0 animate-scale-in", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggerChildren - Container for staggered child animations
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Children to stagger
 * @param {number} [props.staggerDelay=100] - Delay between each child in milliseconds
 * @param {number} [props.initialDelay=0] - Initial delay before first child animates
 * @param {'fadeIn'|'fadeInUp'|'slideInLeft'|'slideInRight'} [props.animation='fadeInUp'] - Animation type
 * @param {string} [props.className] - Additional CSS classes for container
 * @param {boolean} [props.disabled=false] - Disable animation
 */
export function StaggerChildren({
  children,
  staggerDelay = 100,
  initialDelay = 0,
  animation = 'fadeInUp',
  className,
  disabled = false
}) {
  if (disabled) return <div className={className}>{children}</div>;

  const animationClass = {
    fadeIn: 'animate-fade-in',
    fadeInUp: 'animate-fade-in-up',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right'
  }[animation];

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <div
          key={index}
          className={cn("opacity-0", animationClass)}
          style={{
            animationDelay: `${initialDelay + (index * staggerDelay)}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * AnimatedSection - Wrapper for entire sections
 * Combines common patterns for section-level animations
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {'fadeIn'|'slideInLeft'|'slideInRight'|'fadeInUp'} [props.animation='fadeIn'] - Animation type
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disable animation
 */
export function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  className,
  disabled = false
}) {
  if (disabled) return <div className={className}>{children}</div>;

  const animationClass = {
    fadeIn: 'animate-fade-in',
    fadeInUp: 'animate-fade-in-up',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right'
  }[animation];

  return (
    <div
      className={cn("opacity-0", animationClass, className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
