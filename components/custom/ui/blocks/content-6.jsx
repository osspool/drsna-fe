import Image from 'next/image'

export default function ContentSection({ data = {} }) {
    const {
        title = 'The Lyra ecosystem brings together our models.',
        paragraphs = [
            'Gemini is evolving to be more than just the models. It supports an entire ecosystem — from products innovate.',
            'It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate',
        ],
        quote = {
            text: "Using TailsUI has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.",
            cite: 'John Doe, CEO',
            logoSrc: 'https://html.tailus.io/blocks/customers/nvidia.svg',
        },
        images = {
            light: '/payments-light.png',
            dark: '/payments.png',
            width: 1207,
            height: 929,
            altLight: 'payments illustration light',
            altDark: 'payments illustration dark',
        },
    } = data

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">{title}</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div className="relative mb-6 sm:mb-0">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <Image src={images.dark} className="hidden rounded-[15px] dark:block" alt={images.altDark || images.alt || 'image dark'} width={images.width || 1207} height={images.height || 929} />
                            <Image src={images.light} className="rounded-[15px] shadow dark:hidden" alt={images.altLight || images.alt || 'image light'} width={images.width || 1207} height={images.height || 929} />
                        </div>
                    </div>

                    <div className="relative space-y-4">
                        {paragraphs?.[0] && (
                            <p className="text-muted-foreground">
                                {paragraphs[0]}
                            </p>
                        )}
                        {paragraphs?.[1] && (
                            <p className="text-muted-foreground">{paragraphs[1]}</p>
                        )}

                        {quote?.text && (
                            <div className="pt-6">
                                <blockquote className="border-l-4 pl-4">
                                    <p>{quote.text}</p>
                                    
                                    <div className="mt-6 space-y-3">
                                        {quote.cite && <cite className="block font-medium">{quote.cite}</cite>}
                                        {quote.logoSrc && (
                                            <img className="h-5 w-fit dark:invert" src={quote.logoSrc} alt="logo" height="20" width="auto" />
                                        )}
                                    </div>
                                </blockquote>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}