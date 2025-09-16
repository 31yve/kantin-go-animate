import * as React from "react"
import { motion } from "framer-motion"
import { Heart, Plus, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Badge } from "./badge"

export interface MenuCardProps {
  id: string
  name: string
  description?: string
  price: number
  image: string
  rating?: number
  tags?: string[]
  isFavorite?: boolean
  inStock?: boolean
  className?: string
  onAddToCart?: (id: string) => void
  onToggleFavorite?: (id: string) => void
}

const MenuCard = React.forwardRef<HTMLDivElement, MenuCardProps>(
  ({ 
    id, name, description, price, image, rating, tags, 
    isFavorite = false, inStock = true, className, 
    onAddToCart, onToggleFavorite, ...props 
  }, ref) => {
    const [isAdding, setIsAdding] = React.useState(false)

    const handleAddToCart = async () => {
      if (!inStock) return
      setIsAdding(true)
      onAddToCart?.(id)
      
      // Reset after animation
      setTimeout(() => setIsAdding(false), 600)
    }

    const handleToggleFavorite = () => {
      onToggleFavorite?.(id)
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative bg-gradient-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-smooth hover:-translate-y-1",
          !inStock && "opacity-60",
          className
        )}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
          />
          
          {/* Favorite Button */}
          <Button
            variant="floating"
            size="icon-sm"
            className="absolute top-3 right-3 opacity-80 hover:opacity-100"
            onClick={handleToggleFavorite}
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </Button>

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium text-sm">Habis</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex gap-1 mb-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-base leading-tight flex-1">
              {name}
            </h3>
            {rating && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-muted-foreground">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Price & Add Button */}
          <div className="flex items-center justify-between">
            <div className="font-display font-bold text-lg text-brand-primary">
              Rp {price.toLocaleString('id-ID')}
            </div>
            
            <motion.div
              animate={isAdding ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="accent"
                size="icon"
                className="rounded-full"
                onClick={handleAddToCart}
                disabled={!inStock || isAdding}
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }
)

MenuCard.displayName = "MenuCard"

export { MenuCard }