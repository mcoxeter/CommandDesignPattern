import { IProductRepository } from './IProductRepository';

export class MemoryProductRepository implements IProductRepository {
  private data: Map<string, number> = new Map<string, number>();
  public addOne(stockId: string): void {
    const currentQuantity = this.countFor(stockId);
    this.data.set(stockId, currentQuantity + 1);
  }
  public removeOne(stockId: string): void {
    const currentQuantity = this.countFor(stockId);
    if (currentQuantity > 0) {
      this.data.set(stockId, currentQuantity - 1);
    }
  }
  public countFor(stockId: string): number {
    return this.data.has(stockId) ? this.data.get(stockId) : 0;
  }
}
