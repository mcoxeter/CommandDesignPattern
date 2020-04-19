import { CommandInvoker } from './CommandInvoker';
import { ICartRepository } from './_non_important_details/ICartRepository';
import { IProductRepository } from './_non_important_details/IProductRepository';
import { Product } from './_non_important_details/Product';
import { MemoryCartRepository } from './_non_important_details/MemoryCartRepository';
import { MemoryProductRepository } from './_non_important_details/MemoryProductRepository';
import { AddToCartCommand } from './AddToCartCommand';

describe('CommandInvoker', () => {
  let sut: CommandInvoker;
  let cartRepo: ICartRepository;
  let productRepo: IProductRepository;

  beforeEach(() => {
    sut = new CommandInvoker();
    cartRepo = new MemoryCartRepository();
    productRepo = new MemoryProductRepository();
    productRepo.addOne('Spanner');
    productRepo.addOne('Hammer');
    productRepo.addOne('Hammer');
  });

  it('a call to invoke should execute the command, as it is allowed', () => {
    // Act
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Spanner'))
    );

    // Assert
    expect(cartRepo.countFor('Spanner')).toBe(1);
    expect(cartRepo.countFor('Hammer')).toBe(0);
  });
  it('when addeding spanner twice, expect only one in the cart. As there is only one available in the repo.', () => {
    // Act
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Spanner'))
    );
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Spanner'))
    );

    // Assert
    expect(cartRepo.countFor('Spanner')).toBe(1);
    expect(cartRepo.countFor('Hammer')).toBe(0);
    expect(productRepo.countFor('Hammer')).toBe(2);
    expect(productRepo.countFor('Spanner')).toBe(0);
  });
  it('when addeding hammer twice, expect only two in the cart and no hammers in the repo.', () => {
    // Act
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Hammer'))
    );
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Hammer'))
    );

    // Assert
    expect(cartRepo.countFor('Hammer')).toBe(2);
    expect(cartRepo.countFor('Spanner')).toBe(0);
    expect(productRepo.countFor('Hammer')).toBe(0);
    expect(productRepo.countFor('Spanner')).toBe(1);
  });

  it('when addeding hammer twice, followed by an undoAll. expect two hammers in the repo and no hammers in the cart.', () => {
    // Act
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Hammer'))
    );
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Hammer'))
    );
    sut.undoAll();

    // Assert
    expect(cartRepo.countFor('Hammer')).toBe(0);
    expect(productRepo.countFor('Hammer')).toBe(2);
  });

  it('when addeding hammer twice, followed by an undoLast. expect one hammers in the repo and one hammer in the cart.', () => {
    // Act
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Hammer'))
    );
    sut.invoke(
      new AddToCartCommand(cartRepo, productRepo, new Product('Hammer'))
    );
    sut.undoLast();

    // Assert
    expect(cartRepo.countFor('Hammer')).toBe(1);
    expect(productRepo.countFor('Hammer')).toBe(1);
  });
});
