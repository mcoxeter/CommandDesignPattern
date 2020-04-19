import { Product } from './Product';

export interface ICartRepository {
  add(product: Product): void;
  remove(stockId: string): void;
  countFor(stockId: string): number;
}
