import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 }, // Caches data for 1 hour
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        Shopping Agent Sandbox Project
      </h1>
      <p className="text-gray-600 mb-8">
        Indexed for Vertex AI Search Crawler Testing
      </p>

      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white"
          >
            <div>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
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
    </main>
  );
}