"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Client fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        Shopping Agent Sandbox Project
      </h1>
      <p className="text-gray-600 mb-8">
        Indexed for Vertex AI Search Crawler Testing
      </p>

      {loading ? (
        <p className="text-blue-600 font-medium my-12 animate-pulse">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 font-medium my-12">
          Unable to load products. Please check network connection.
        </p>
      ) : (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white"
            >
              <div>
                <div className="w-full h-48 mb-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1 capitalize">
                  {product.category}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-blue-600 text-sm font-medium">
                  View Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}