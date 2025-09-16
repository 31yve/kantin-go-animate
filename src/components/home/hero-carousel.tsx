import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PromoSlide {
  id: string
  title: string
  description: string
  image: string
  buttonText?: string
  onButtonClick?: () => void
}

export interface HeroCarouselProps {
  slides: PromoSlide[]
  autoplay?: boolean
  autoplayDelay?: number
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoplay = true,
  autoplayDelay = 5000
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoplay || slides.length <= 1) return

    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, slides.length, isDragging])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (slides.length === 0) return null

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-hero h-48">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="relative h-full w-full">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-start p-6">
              <motion.div
                className="max-w-sm text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display font-bold text-xl mb-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-sm opacity-90 mb-4">
                  {slides[currentSlide].description}
                </p>
                {slides[currentSlide].buttonText && (
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={slides[currentSlide].onButtonClick}
                    className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                  >
                    {slides[currentSlide].buttonText}
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="floating"
            size="icon-sm"
            className="absolute left-3 top-1/2 -translate-y-1/2"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="floating"
            size="icon-sm"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-smooth ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Drag handle for mobile */}
      <motion.div
        className="absolute inset-0 cursor-grab"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false)
          if (info.offset.x > 100) {
            goToPrevious()
          } else if (info.offset.x < -100) {
            goToNext()
          }
        }}
      />
    </div>
  )
}