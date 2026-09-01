import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Modern Lounge Chair',
    price: 24999,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
    description: 'A comfortable modern lounge chair for your living room.',
    modelGlb: '/models/longchair.glb',
    modelUsdz: '/models/longchair.usdz',
  },
  {
    id: 2,
    name: 'Modern Sofa',
    price: 49999,
    category: 'Furniture',
     image: '/products/sofa.jpg',
    description: 'A stylish modern sofa designed for contemporary homes.',
    modelGlb: '/models/sofa.glb',
    modelUsdz: '/models/sofa.usdz',
  },
  {
    id: 3,
    name: 'Dining Table',
    price: 34999,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54',
    description: 'Elegant dining table for modern dining spaces.',
    modelGlb: '/models/diningtable.glb',
    modelUsdz: '/models/diningtable.usdz',
  },
];