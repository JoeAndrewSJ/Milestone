import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: { 
      type: String, 
      required: true,
      unique: true 
    },
    name: { 
      type: String,
      required: true,
      trim: true
    },
    quantity: { 
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    price: {
      type: Number, 
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);


productSchema.index({ productId: 1 });
productSchema.index({ name: 'text' });

export const Product = mongoose.model('Product', productSchema);