import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../utils/api';

export default function ProductDetails() {
  if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{product.productName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
          <img src={`/api/placeholder/400/300`} alt={product.productName} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-4">
          <ProductDetail label="Company" value={product.company} />
          <ProductDetail label="Category" value={product.category} />
          <ProductDetail label="Price" value={`$${product.price}`} />
          <ProductDetail label="Rating" value={product.rating} />
          <ProductDetail label="Discount" value={`${product.discount}%`} />
          <ProductDetail label="Availability" value={product.availability} />
        </div>
      </div>
    </div>
  );
}

const ProductDetail = ({ label, value }) => (
  <p className="text-lg">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);
