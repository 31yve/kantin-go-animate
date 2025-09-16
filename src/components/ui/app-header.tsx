import * as React from "react"
import { motion } from "framer-motion"
import { Search, MapPin, ShoppingCart, User } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"

export interface AppHeaderProps {
  schoolName?: string
  userName?: string
  userAvatar?: string
  cartItemCount?: number
  onSearch?: (query: string) => void
  onCartClick?: () => void
  onProfileClick?: () => void
}

export const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ 
    schoolName = "SMAN 1 Jakarta", 
    userName, 
    userAvatar, 
    cartItemCount = 0,
    onSearch,
    onCartClick,
    onProfileClick 
  }, ref) => {
    const [searchQuery, setSearchQuery] = React.useState("")

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSearch?.(searchQuery)
    }

    return (
      <motion.header
        ref={ref}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 px-4 py-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex items-center gap-3">
          {/* School Location */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-brand-primary-light px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary">
                {schoolName}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari makanan favorit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-neutral-50 border-0 focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 text-xs flex items-center justify-center p-0 rounded-full bg-brand-accent"
                  >
                    {cartItemCount}
                  </Badge>
                </motion.div>
              )}
            </Button>

            {/* Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onProfileClick}
            >
              {userAvatar ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>
                    {userName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>
    )
  }
)

AppHeader.displayName = "AppHeader"