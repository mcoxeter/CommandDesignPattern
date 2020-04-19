import { ICommand } from './ICommand';
import { ICartRepository } from './_non_important_details/ICartRepository';
import { IProductRepository } from './_non_important_details/IProductRepository';
import { Product } from './_non_important_details/Product';

export class ChangeCartQuantityCommand implements ICommand {
  public constructor(
    private operation: ChangeCartQuantityOperation,
    private cartRepository: ICartRepository,
    private productRepo: IProductRepository,
    private product: Product
  ) {}
  public execute(): void {
    switch (this.operation) {
      case ChangeCartQuantityOperation.Inc:
        this.cartRepository.add(this.product);
        this.productRepo.removeOne(this.product.stockId);
        break;
      case ChangeCartQuantityOperation.Dec:
        this.cartRepository.remove(this.product.stockId);
        this.productRepo.addOne(this.product.stockId);
        break;
    }
  }
  public canExecute(): boolean {
    switch (this.operation) {
      case ChangeCartQuantityOperation.Dec:
        return this.cartRepository.countFor(this.product.stockId) > 0;
      case ChangeCartQuantityOperation.Inc:
        return this.productRepo.countFor(this.product.stockId) > 0;
    }
    return false;
  }
  public undo(): void {
    switch (this.operation) {
      case ChangeCartQuantityOperation.Inc:
        this.cartRepository.remove(this.product.stockId);
        this.productRepo.addOne(this.product.stockId);
        break;
      case ChangeCartQuantityOperation.Dec:
        this.cartRepository.add(this.product);
        this.productRepo.removeOne(this.product.stockId);
        break;
    }
  }
}

export enum ChangeCartQuantityOperation {
  Inc,
  Dec,
}
