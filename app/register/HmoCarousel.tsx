import Image from "next/image"
import { useState, useEffect } from "react"
import type { EmblaCarouselType } from "embla-carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type HmoName = "Clalit" | "Maccabi" | "Mehuedet" | "Leumit"

type HmoCarouselProps = {
  onSelect: (hmo: HmoName) => void
}

const hmos = [
  { name: "Clalit", image: "/images/clalit.png" },
  { name: "Maccabi", image: "/images/maccabi.png" },
  { name: "Mehuedet", image: "/images/meuhedet.png" },
  { name: "Leumit", image: "/images/leumit.png" },
] as const


export function HmoCarousel({ onSelect }: HmoCarouselProps) {
  const [api, setApi] = useState<EmblaCarouselType | null>(null)

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      const index = api.selectedScrollSnap()
      const selected = hmos[index]?.name
      if (selected) {
        console.log("Carousel selected HMO:", selected)
        onSelect(selected)
      }
    }

    api.on("select", handleSelect)
    handleSelect() // run immediately on mount

    return () => {
      api?.off("select", handleSelect)
    }
  }, [api, onSelect])

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">סוג קופת חולים / HMO</h3>
      <Carousel className="w-[80%] mx-auto" setApi={(api) => setApi(api || null)}>
        <CarouselContent>
          {hmos.map((hmo, index) => (
            <CarouselItem key={index} className="flex flex-col items-center gap-2">
              <Image
                src={hmo.image}
                alt={hmo.name}
                width={220}
                height={220}
                className="rounded-lg object-contain mt-5"
              />
              <span className="text-center tracking-wider  text-lg font-semibold">
                {hmo.name}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
      </Carousel>
    </div>
  )
}
