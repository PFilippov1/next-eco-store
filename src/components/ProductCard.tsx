'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 relative">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all z-10 active:scale-90"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-10">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">${product.price}</span>

          <div className="flex gap-2">
            <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors active:scale-95 shadow-sm">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
