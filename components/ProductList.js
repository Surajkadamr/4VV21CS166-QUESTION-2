import Link from 'next/link';

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200">
              <img src={`/api/placeholder/200/150`} alt={product.productName} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold truncate">{product.productName}</h2>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Rating: {product.rating}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              </div>
              <p className={`text-sm ${product.availability === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                {product.availability === 'yes' ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}