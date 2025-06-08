
export { products } from './products/products';
export { categories } from './categories';
export { deals } from './deals';
export { supportData } from './support';

// Extract unique brands from products
import { products as productList } from './products/products';

export const brands = ['All', ...Array.from(new Set(productList.map(product => product.brand)))];
