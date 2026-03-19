
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export default async function ProductPage() {
  // 1. Get products from the database along with their images
  const products = await prisma.product.findMany({
    include: {
      images: true, // Loading related pictures
    },
    orderBy: {
      createdAt: 'desc', // New ones first
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h1>
      
      {products.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border">
          <p className="text-gray-500 text-lg">No products found in the database.</p>
        </div>
      ) : (
        /* 2. Display products in the grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                description: product.description || '',
                price: Number(product.price), //Converting Decimal to Number
                image: product.images[0]?.url || '/placeholder.png' // Take the first photo
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}