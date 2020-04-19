import { ICartRepository } from './ICartRepository';
import { Product } from './Product';

export class MemoryCartRepository implements ICartRepository {
  private data: Map<string, Product[]> = new Map<string, Product[]>();
  public add(product: Product): void {
    const products = this.getProductsFor(product.stockId);
    this.data.set(product.stockId, products.concat(product));
  }
  public remove(stockId: string): void {
    const products = this.getProductsFor(stockId);
    const [_, ...tail] = products;
    this.data.set(stockId, tail);
  }
  public countFor(stockId: string): number {
    return this.getProductsFor(stockId).length;
  }

  private getProductsFor(stockId: string): Product[] {
    return this.data.get(stockId) || [];
  }
}
