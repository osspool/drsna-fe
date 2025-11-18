import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getSectionPreset } from "@/lib/section-presets";

/**
 * Framed Section Component
 *
 * Reusable wrapper that combines Section + Container + SectionHeader pattern.
 * Eliminates the common scaffolding duplication across sections.
 *
 * @param {React.ReactNode} children - Section content
 * @param {Object} headerProps - Props for SectionHeader (badge, title, subtitle, etc.)
 * @param {string} presetKey - Preset key from section-presets (e.g., 'faq', 'stats')
 * @param {string} background - Section background variant
 * @param {string} padding - Section padding variant
 * @param {string} containerMaxWidth - Container max width
 * @param {string} className - Additional section classes
 * @param {boolean} showHeader - Whether to show the header (default: true)
 */
export function FramedSection({
  children,
  headerProps = {},
  presetKey = null,
  background,
  padding,
  containerMaxWidth,
  className,
  showHeader = true
}) {
  // Merge preset with explicit headerProps if presetKey provided
  const finalHeaderProps = presetKey
    ? getSectionPreset(presetKey, headerProps)
    : headerProps;

  const hasHeader = showHeader && (finalHeaderProps.title || finalHeaderProps.badge);

  return (
    <Section background={background} padding={padding} className={className}>
      <Container maxWidth={containerMaxWidth}>
        {hasHeader && <SectionHeader {...finalHeaderProps} />}
        {children}
      </Container>
    </Section>
  );
}
