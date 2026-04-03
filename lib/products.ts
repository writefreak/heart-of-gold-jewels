export interface Product {
  id: number
  name: string
  category: string
  price: string
  badge?: string
  emoji: string
  description: string
  colors: string[]
  isNew?: boolean
  isFeatured?: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Royal Solitaire Ring',
    category: 'Rings',
    price: '₦85,000',
    badge: 'Bestseller',
    emoji: '💍',
    description: 'A classic solitaire engagement ring with a stunning center stone set in 18k gold.',
    colors: ['Gold', 'Rose Gold', 'Silver'],
    isNew: false,
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Eternity Diamond Band',
    category: 'Rings',
    price: '₦65,000',
    badge: 'New',
    emoji: '💍',
    description: 'A full eternity band adorned with brilliant diamonds encircling the entire band.',
    colors: ['Gold', 'White Gold'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: 'Heart Pendant Necklace',
    category: 'Necklaces',
    price: '₦35,000',
    badge: 'Popular',
    emoji: '📿',
    description: 'A delicate heart-shaped pendant on a fine gold chain — perfect for everyday wear.',
    colors: ['Gold', 'Rose Gold'],
    isNew: false,
    isFeatured: true,
  },
  {
    id: 4,
    name: 'Twisted Gold Chain',
    category: 'Necklaces',
    price: '₦28,000',
    emoji: '📿',
    description: 'A bold twisted rope chain in 22k gold, statement-making and timeless.',
    colors: ['Gold'],
    isNew: true,
    isFeatured: false,
  },
  {
    id: 5,
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    price: '₦45,000',
    badge: 'Bestseller',
    emoji: '✨',
    description: 'Classic round diamond studs in a four-prong setting — elegance at its simplest.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    isNew: false,
    isFeatured: true,
  },
  {
    id: 6,
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    price: '₦22,000',
    emoji: '✨',
    description: 'Lustrous pearl drops in a gold-filled hook setting — sophisticated and timeless.',
    colors: ['Gold', 'Silver'],
    isNew: true,
    isFeatured: false,
  },
  {
    id: 7,
    name: 'Tennis Bracelet',
    category: 'Bracelets',
    price: '₦55,000',
    badge: 'Luxury',
    emoji: '💛',
    description: 'A classic diamond tennis bracelet with a secure box clasp, fine and flexible.',
    colors: ['Gold', 'White Gold'],
    isNew: false,
    isFeatured: true,
  },
  {
    id: 8,
    name: 'Charm Bangle Set',
    category: 'Bracelets',
    price: '₦18,000',
    emoji: '💛',
    description: 'A set of three gold bangles with mixed charm details — stackable and playful.',
    colors: ['Gold', 'Rose Gold', 'Silver'],
    isNew: true,
    isFeatured: false,
  },
  {
    id: 9,
    name: 'Custom Name Necklace',
    category: 'Custom',
    price: 'From ₦25,000',
    badge: 'Custom',
    emoji: '⭐',
    description: 'Have your name or a special word crafted in elegant script on a fine chain.',
    colors: ['Gold', 'Rose Gold', 'Silver'],
    isNew: false,
    isFeatured: true,
  },
]

export const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Custom']
