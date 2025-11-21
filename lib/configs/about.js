/**
 * About Page Configuration
 *
 * Defines the section order and block mappings for the About Us page.
 * Uses direct data passing without mappers where possible.
 */

export const aboutPageConfig = [
  {
    id: 'hero',
    block: 'hero.category',
    dataKey: 'hero',
    props: { variant: 'category', showStats: true }
  },
  {
    id: 'introduction',
    block: 'block.overview',
    dataKey: 'introduction'
  },
  {
    id: 'mission',
    block: 'landing.award-spotlight',
    dataKey: 'mission'
  },
  {
    id: 'story',
    block: 'landing.award-spotlight',
    dataKey: 'story'
  },
  {
    id: 'team',
    block: 'section.team',
    dataKey: 'team'
  },
  {
    id: 'expertise',
    block: 'block.expertise',
    dataKey: 'expertise'
  },
  {
    id: 'services',
    block: 'block.gallery',
    dataKey: 'services',
    // Services needs transformation - keep inline mapper
    mapper: (data) => ({
      data: {
        title: data.services.title,
        subtitle: data.services.subtitle,
        items: data.services.list.map(service => ({
          title: service.name,
          description: service.description,
          image: service.image,
          tags: service.idealFor || service.designedFor || []
        }))
      }
    })
  },
  {
    id: 'whyChoose',
    block: 'section.why-choose',
    dataKey: 'whyChoose'
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials'
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq.items',
    // FAQ needs title from parent
    mapper: (data) => ({
      data: data.faq.items,
      title: data.faq.title
    })
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta'
  },
];
