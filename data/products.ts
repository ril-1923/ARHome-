import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Modern Sofa',
    price: 29999,
    category: 'Sofa',
    image: `${import.meta.env.BASE_URL}products/sofa.jpg`,
    description:
      'A modern and comfortable sofa designed to bring style and comfort to your living room.',
    model: `${import.meta.env.BASE_URL}models/sofa.glb`,
    modelGlb: `${import.meta.env.BASE_URL}models/sofa.glb`,
    modelUsdz: `${import.meta.env.BASE_URL}models/sofa.usdz`,
  },

  {
    id: 2,
    name: 'Modern Lounge Chair',
    price: 14999,
    category: 'Chair',
    image: `${import.meta.env.BASE_URL}products/chair.jpg`,
    description:
      'A stylish modern lounge chair designed for comfort and relaxation.',
    model: `${import.meta.env.BASE_URL}models/chair.glb`,
    modelGlb: `${import.meta.env.BASE_URL}models/chair.glb`,
    modelUsdz: `${import.meta.env.BASE_URL}models/chair.usdz`,
  },

  {
    id: 3,
    name: 'Modern Dining Table',
    price: 24999,
    category: 'Dining Table',
    image: `${import.meta.env.BASE_URL}products/diningtable.jpg`,
    description:
      'A modern dining table that combines elegance, functionality, and durability.',
    model: `${import.meta.env.BASE_URL}models/diningtable.glb`,
    modelGlb: `${import.meta.env.BASE_URL}models/diningtable.glb`,
    modelUsdz: `${import.meta.env.BASE_URL}models/diningtable.usdz`,
  },

  {
    id: 4,
    name: 'Modern Bed',
    price: 34999,
    category: 'Bed',
    image: `${import.meta.env.BASE_URL}products/bed.jpg`,
    description:
      'A modern and comfortable bed designed for a relaxing bedroom environment.',
    model: `${import.meta.env.BASE_URL}models/bed.glb`,
    modelGlb: `${import.meta.env.BASE_URL}models/bed.glb`,
    modelUsdz: `${import.meta.env.BASE_URL}models/bed.usdz`,
  },
];