import { Cpu, Zap } from 'lucide-react'
import Image from 'next/image'

export default function ContentSection({ data = {} }) {
    const {
        title = 'The Lyra ecosystem brings together our models.',
        paragraphs = [
            'Gemini is evolving to be more than just the models. It supports an entire ecosystem — from products innovate.',
            'It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate',
        ],
        features = [
            { icon: 'zap', title: 'Faaast', description: 'It supports an entire helping developers and innovate.' },
            { icon: 'cpu', title: 'Powerful', description: 'It supports an entire helping developers and businesses.' },
        ],
        images = {
            light: '/exercice.png',
            dark: '/exercice-dark.png',
            width: 1206,
            height: 612,
            altLight: 'payments illustration light',
            altDark: 'payments illustration dark',
        },
    } = data

    const iconMap = { zap: Zap, cpu: Cpu }

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">{title}</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div className="relative space-y-4">
                        {paragraphs?.[0] && (
                            <p className="text-muted-foreground">
                                {paragraphs[0]}
                            </p>
                        )}
                        {paragraphs?.[1] && (
                            <p className="text-muted-foreground">{paragraphs[1]}</p>
                        )}

                        {Array.isArray(features) && features.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                                {features.map((feature, index) => {
                                    const Icon = iconMap[feature.icon] || Zap
                                    return (
                                        <div key={`${feature.title}-${index}`} className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Icon className="size-4" />
                                                <h3 className="text-sm font-medium">{feature.title}</h3>
                                            </div>
                                            {feature.description && (
                                                <p className="text-muted-foreground text-sm">{feature.description}</p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div className="relative mt-6 sm:mt-0">
                        <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <Image src={images.dark} className="hidden rounded-[15px] dark:block" alt={images.altDark || images.alt || 'image dark'} width={images.width || 1206} height={images.height || 612} />
                            <Image src={images.light} className="rounded-[15px] shadow dark:hidden" alt={images.altLight || images.alt || 'image light'} width={images.width || 1206} height={images.height || 612} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}