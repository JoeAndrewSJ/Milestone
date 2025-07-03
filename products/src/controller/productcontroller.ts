import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../entities/Product';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, name, quantity, price } = req.body;

    if (!productId || !name || quantity === undefined || price === undefined) {

      res.status(400).json({ message: 'all fields are need' });
      return;
    }

    const existing = await Product.findOne({ productId });

    if (existing) {

      res.status(400).json({ message: 'prod already exists' });
      return;
    }

    const product = new Product({
      productId,
      name,
      quantity,
      price
    });

    const savedProduct = await product.save();

    res.status(201).json({ 
      message: 'Product added', 
      product: savedProduct 
    });

  } catch (err) {
    console.error('Add  error:', err);
    res.status(500).json({ 
      message: 'Server error', 
      error: (err as Error).message 
    });
  }
};

export const getProducts = async (_: Request, res: Response): Promise<void> => {
  try {
        const products = await Product.find();
    
    res.json({
      success: true,
      count: products.length,
      products

    });
  } catch (err) {

    console.error('Get err:', err);

    res.status(500).json({ message: 'Error fetching products' });
  }
};


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;


    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {

      res.status(400).json({ message: 'Invalid  format' });
      return;
    }

    const updated = await Product.findByIdAndUpdate(
      id, 
      updateData, 

      { new: true,
         runValidators: true
         }
    );

    if (!updated) {

      res.status(404).json({ message: 'prod not found' });

      return;
    }

    res.json({ 
      message: 'prod updated', product: updated 
    });

  } catch (err) {

    console.error('update prod error:', err);

    res.status(500).json({ message: 'update error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

      res.status(400).json({ message: 'Invalid product ID format' });

      return;
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'prod deleted successfully' });

  } catch (err) {

        console.error('del product error:', err);

    res.status(500).json({ message: 'Delete error' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        res.status(400).json({ message: 'Invalid product ID format' });

        return;
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: 'prod not found' });
      return;
    }

    res.json({
      success: true,
      product
    });

  } catch (err) {
    console.error('get error:', err);
    res.status(500).json({ message: 'err fetching product' });
  }
};