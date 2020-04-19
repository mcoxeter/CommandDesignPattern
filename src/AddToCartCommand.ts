import { ICommand } from './ICommand';
import { ICartRepository } from './_non_important_details/ICartRepository';
import { IProductRepository } from './_non_important_details/IProductRepository';
import { Product } from './_non_important_details/Product';

/**
 * The Command needs to have all the information to execute and undo a command.
 */
export class AddToCartCommand implements ICommand {
  public constructor(
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository,
    private product: Product
  ) {}
  public execute(): void {
    this.productRepository.removeOne(this.product.stockId);
    this.cartRepository.add(this.product);
  }
  public canExecute(): boolean {
    if (this.product === null) return false;
    return this.productRepository.countFor(this.product.stockId) > 0;
  }
  public undo(): void {
    if (this.product === null) return;
    this.productRepository.addOne(this.product.stockId);
    this.cartRepository.remove(this.product.stockId);
  }
}
