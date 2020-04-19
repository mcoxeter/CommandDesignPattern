export interface IProductRepository {
  addOne(stockId: string): void;
  removeOne(stockId: string): void;
  countFor(stockId: string): number;
}
