import * as React from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Clock, Heart, Wallet, LucideIcon } from "lucide-react"

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick?: () => void
}

export interface ServiceGridProps {
  onServiceClick?: (serviceId: string) => void
}

const services: ServiceItem[] = [
  {
    id: "order",
    title: "Beli Makanan",
    description: "Pesan makanan favorit",
    icon: ShoppingBag,
    color: "brand-primary"
  },
  {
    id: "preorder",
    title: "Pre-order",
    description: "Pesan untuk nanti",
    icon: Clock,
    color: "brand-accent"
  },
  {
    id: "favorites",
    title: "Favorit",
    description: "Makanan kesukaan",
    icon: Heart,
    color: "pink-500"
  },
  {
    id: "wallet",
    title: "Dompet",
    description: "GoPay & saldo",
    icon: Wallet,
    color: "blue-500"
  }
]

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onServiceClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((service, index) => (
        <motion.button
          key={service.id}
          className="bg-gradient-card rounded-xl p-4 border border-border/50 text-left hover:shadow-md transition-all duration-smooth hover:-translate-y-1 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            damping: 20
          }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onServiceClick?.(service.id)}
        >
          <div className="flex items-center gap-3">
            <div className={`
              p-2.5 rounded-lg bg-gradient-to-br
              ${service.color === 'brand-primary' ? 'from-brand-primary/20 to-brand-primary/10' : ''}
              ${service.color === 'brand-accent' ? 'from-brand-accent/20 to-brand-accent/10' : ''}
              ${service.color === 'pink-500' ? 'from-pink-500/20 to-pink-500/10' : ''}
              ${service.color === 'blue-500' ? 'from-blue-500/20 to-blue-500/10' : ''}
              group-hover:scale-110 transition-transform duration-smooth
            `}>
              <service.icon className={`
                h-5 w-5
                ${service.color === 'brand-primary' ? 'text-brand-primary' : ''}
                ${service.color === 'brand-accent' ? 'text-brand-accent' : ''}
                ${service.color === 'pink-500' ? 'text-pink-500' : ''}
                ${service.color === 'blue-500' ? 'text-blue-500' : ''}
              `} />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-sm mb-0.5">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {service.description}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}