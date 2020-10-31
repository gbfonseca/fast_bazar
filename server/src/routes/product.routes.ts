import { Product } from './../models/Product';
import { getRepository } from 'typeorm';
import {Router } from 'express';
import { Product } from '../models/Product';
import UpdateProductService from '../services/UpdateProductService';

const productRoutes = Router();

productRoutes.post('/', async (request, response) => {
  const { name, description, quantity, price, bazar_id } = request.body;

  const productRepository = getRepository(Product);

  if(!bazar_id) {
    return response.status(400).json({
      message: 'Bazar id is required.'
    });
  }

  const product = productRepository.create({
    name,
    description,
    quantity,
    price,
    bazar_id
  });

  await productRepository.save(product);

  response.json(product);
});

productRoutes.get('/', async (request, response) => {
  const productRepository = getRepository(Product);

  const products = await productRepository.find();

  response.json(products);

});

productRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(id);

  response.json(product);

});

productRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  
  const productService = new UpdateProductService();

  const product = await productService.execute(id, request.body);

  response.json(product);

});

productRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(id);

  if(!product) {
    return response.status(404).json({
      message: 'Product not found.'
    });
  }

  await productRepository.delete(id);

  response.json({
    message: 'Product has been removed.'
  });

});

export default productRoutes;