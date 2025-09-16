import * as React from "react"
import { motion } from "framer-motion"
import { AppHeader } from "@/components/ui/app-header"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { ServiceGrid } from "@/components/home/service-grid"
import { MenuCard } from "@/components/ui/menu-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { menuItems, menuCategories, promoSlides, MenuItem } from "@/data/menu-data"
import { Filter, Grid, List } from "lucide-react"

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [cartItems, setCartItems] = React.useState<string[]>([])
  const [favorites, setFavorites] = React.useState<string[]>([])

  // Filter menu items by category
  const filteredItems = React.useMemo(() => {
    if (activeCategory === "all") {
      return menuItems
    }
    return menuItems.filter(item => item.category === activeCategory)
  }, [activeCategory])

  const handleAddToCart = (itemId: string) => {
    setCartItems(prev => [...prev, itemId])
    // Here you would typically also trigger a flying animation to cart
  }

  const handleToggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleServiceClick = (serviceId: string) => {
    console.log("Service clicked:", serviceId)
    // Handle navigation to different sections
  }

  const handleSearch = (query: string) => {
    console.log("Search:", query)
    // Implement search functionality
  }

  return (
    <div className="min-h-screen bg-neutral-soft">
      {/* Header */}
      <AppHeader
        schoolName="SMAN 1 Jakarta"
        cartItemCount={cartItems.length}
        onSearch={handleSearch}
        onCartClick={() => console.log("Cart clicked")}
        onProfileClick={() => console.log("Profile clicked")}
      />

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <section className="px-4 py-6">
          <HeroCarousel 
            slides={promoSlides}
            autoplay={true}
            autoplayDelay={4000}
          />
        </section>

        {/* Services Grid */}
        <section className="px-4 mb-8">
          <motion.h2 
            className="font-display font-bold text-xl mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Layanan Kami
          </motion.h2>
          <ServiceGrid onServiceClick={handleServiceClick} />
        </section>

        {/* Menu Section */}
        <section className="px-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <motion.h2 
              className="font-display font-bold text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Menu Kantin
            </motion.h2>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Menu Items */}
          <motion.div 
            className={`
              ${viewMode === "grid" 
                ? "grid grid-cols-2 gap-4" 
                : "space-y-4"
              }
            `}
            layout
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  damping: 20 
                }}
                layout
              >
                <MenuCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  tags={item.tags}
                  inStock={item.inStock}
                  isFavorite={favorites.includes(item.id)}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  className={viewMode === "list" ? "flex-row" : ""}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          {filteredItems.length > 0 && (
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="outline" size="lg">
                Muat Lebih Banyak
              </Button>
            </motion.div>
          )}
        </section>
      </main>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <motion.div
          className="fixed bottom-6 right-4 z-50"
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Button
            variant="hero"
            size="lg"
            className="rounded-full shadow-xl"
            onClick={() => console.log("Open cart")}
          >
            Keranjang ({cartItems.length})
          </Button>
        </motion.div>
      )}
    </div>
  )
}