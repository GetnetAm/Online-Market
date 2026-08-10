// Central type definitions — the single source of truth for the shape of
// a Product and a Category. Every component that touches this data imports
// from here, so a field rename only needs to happen in one place.

export interface Product {
  id: number
  name: string
  category: string        // matches a Category['slug'], e.g. 'electronics'
  subCategory: string
  price: number
  originalPrice: number | null
  image: string
  description: string
  featured: boolean
  inStock: boolean
}

export interface Category {
  slug: string
  label: string
  code: string
  subCategories: string[]
}
