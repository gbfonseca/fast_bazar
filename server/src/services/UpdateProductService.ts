import { Product } from './../models/Product';
import { getRepository } from 'typeorm';

interface Request {
  name: string;
  description: string;
  quantity: number;
  price: number;
  bazar_id: string;
}

export default class UpdateProductService {
  public async execute(id: string, data: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }

    productRepository.merge(product, data);

    await productRepository.save(product);

    return product;
  }
}