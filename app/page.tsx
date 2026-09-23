"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { MOCK_PRODUCTS, Product } from "@/lib/products";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Shopping Agent Sandbox Project</h1>
      <p className="text-gray-600">Indexed for Vertex AI Search Crawler Testing</p>

      <SearchBar
        onSearchResults={(results) => setSearchResults(results)}
        onClear={() => setSearchResults(null)}
      />

      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {searchResults ? (
          searchResults.length > 0 ? (
            searchResults.map((item, idx) => {
              const doc = item.document?.derivedStructData || {};
              return (
                <div key={idx} className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white">
                  <h3 className="font-semibold text-lg text-gray-900">{doc.title || "Search Result"}</h3>
                  <p className="text-sm text-gray-500 mt-2">{doc.snippet || doc.description}</p>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500">No results found from Vertex AI.</p>
          )
        ) : (
          MOCK_PRODUCTS.map((product: Product) => (
            <div key={product.id} className="border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col justify-between bg-white">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-600 my-2">{product.description}</p>
              </div>
              <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
