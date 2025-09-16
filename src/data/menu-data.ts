// Sample menu data for the school canteen
import nasiGudegImg from "@/assets/food-nasi-gudeg.jpg"
import gadoGadoImg from "@/assets/food-gado-gado.jpg"
import ayamGeprekImg from "@/assets/food-ayam-geprek.jpg"
import mieAyamImg from "@/assets/food-mie-ayam.jpg"

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  rating: number
  tags: string[]
  category: string
  inStock: boolean
  merchantId: string
  merchantName: string
}

export interface MenuCategory {
  id: string
  name: string
  icon?: string
}

export const menuCategories: MenuCategory[] = [
  { id: "all", name: "Semua" },
  { id: "nasi", name: "Nasi" },
  { id: "mie", name: "Mie & Pasta" },
  { id: "salad", name: "Salad" },
  { id: "snack", name: "Snack" },
  { id: "minuman", name: "Minuman" }
]

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Nasi Gudeg Spesial",
    description: "Nasi gudeg dengan ayam, telur, dan sayuran segar. Rasa tradisional yang autentik.",
    price: 15000,
    image: nasiGudegImg,
    rating: 4.8,
    tags: ["Tradisional", "Pedas"],
    category: "nasi",
    inStock: true,
    merchantId: "warung-bu-sri",
    merchantName: "Warung Bu Sri"
  },
  {
    id: "2",
    name: "Gado-Gado Sehat",
    description: "Salad sayuran segar dengan tahu, tempe, dan bumbu kacang yang lezat.",
    price: 12000,
    image: gadoGadoImg,
    rating: 4.6,
    tags: ["Sehat", "Vegetarian"],
    category: "salad",
    inStock: true,
    merchantId: "warung-sehat",
    merchantName: "Warung Sehat"
  },
  {
    id: "3",
    name: "Ayam Geprek Crispy",
    description: "Ayam goreng crispy dengan sambal yang pedas dan nasi hangat.",
    price: 18000,
    image: ayamGeprekImg,
    rating: 4.9,
    tags: ["Pedas", "Crispy", "Populer"],
    category: "nasi",
    inStock: true,
    merchantId: "geprek-mania",
    merchantName: "Geprek Mania"
  },
  {
    id: "4",
    name: "Mie Ayam Bakso",
    description: "Mie ayam dengan bakso sapi, pangsit, dan kuah yang gurih.",
    price: 14000,
    image: mieAyamImg,
    rating: 4.7,
    tags: ["Berkuah", "Bakso"],
    category: "mie",
    inStock: true,
    merchantId: "mie-enak",
    merchantName: "Mie Enak"
  },
  {
    id: "5",
    name: "Nasi Padang Mini",
    description: "Nasi dengan rendang, sayur nangka, dan sambal lado.",
    price: 16000,
    image: nasiGudegImg, // Using placeholder
    rating: 4.5,
    tags: ["Pedas", "Tradisional"],
    category: "nasi",
    inStock: false,
    merchantId: "warung-bu-sri",
    merchantName: "Warung Bu Sri"
  },
  {
    id: "6",
    name: "Es Teh Manis",
    description: "Teh manis dingin yang menyegarkan.",
    price: 5000,
    image: gadoGadoImg, // Using placeholder
    rating: 4.3,
    tags: ["Minuman", "Dingin"],
    category: "minuman",
    inStock: true,
    merchantId: "warung-sehat",
    merchantName: "Warung Sehat"
  }
]

export const promoSlides = [
  {
    id: "promo-1",
    title: "Diskon 20% Menu Favorit!",
    description: "Berlaku untuk semua menu nasi dan mie. Terbatas sampai hari ini!",
    image: nasiGudegImg,
    buttonText: "Pesan Sekarang"
  },
  {
    id: "promo-2", 
    title: "Paket Hemat Rp 25.000",
    description: "Nasi + Lauk + Sayur + Minuman. Cocok untuk makan siang!",
    image: ayamGeprekImg,
    buttonText: "Lihat Menu"
  },
  {
    id: "promo-3",
    title: "Menu Sehat Mulai 10K",
    description: "Gado-gado, salad, dan menu vegetarian lainnya.",
    image: gadoGadoImg,
    buttonText: "Coba Sekarang"
  }
]