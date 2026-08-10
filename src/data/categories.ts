// Central category definition — used by the Navbar (nav links + mega-menu),
// the router (to build category routes), and the Footer (quick links).
// Keeping this in one file means adding a new department only requires
// one edit here instead of hunting through multiple components.
export const categories = [
  {
    slug: 'electronics',
    label: 'Electronics & Tech',
    code: 'EL',
    subCategories: ['Smartphones', 'Laptops', 'Smart Home Devices'],
  },
  {
    slug: 'fashion',
    label: 'Fashion & Apparel',
    code: 'FA',
    subCategories: ['Clothing', 'Shoes', 'Jewelry'],
  },
  {
    slug: 'home-furniture',
    label: 'Home & Furniture',
    code: 'HF',
    subCategories: ['Decor', 'Bedding', 'Large Furniture Pieces'],
  },
  {
    slug: 'beauty',
    label: 'Beauty & Personal Care',
    code: 'BP',
    subCategories: ['Skincare', 'Cosmetics', 'Perfume'],
  },
  {
    slug: 'toys-hobbies-media',
    label: 'Toys, Hobbies & Media',
    code: 'TH',
    subCategories: ['Books', 'Video Games',],
  },
]
