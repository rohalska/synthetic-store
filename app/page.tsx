"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto flex justify-center items-center">
        <p className="text-blue-600 font-medium animate-pulse">
          Loading product details...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-blue-600 mb-6 inline-block hover:underline font-medium"
      >
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border rounded-lg shadow-sm">
        <div className="w-full h-80 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm uppercase text-gray-400 font-semibold tracking-wider mb-2">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-extrabold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition w-full md:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}