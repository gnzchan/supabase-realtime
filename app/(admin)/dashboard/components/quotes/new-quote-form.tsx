"use client";

import { Product } from "@/types";
import { useState } from "react";
import { createQuote } from "../../actions/create-quote";
import { useDashboard } from "../../context/dashboard-context";

export interface QuoteFormData {
  email: string;
  name: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

interface ProductQuantities {
  [key: string]: number;
}

export function NewQuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const { products } = useDashboard();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [quantities, setQuantities] = useState<ProductQuantities>({});

  if (!products) return null;

  function updateQuantity(productId: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const items = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        productId,
        quantity,
      }));

    const formData: QuoteFormData = {
      email,
      name,
      items,
    };

    const result = await createQuote(formData);

    if (result.success) {
      setEmail("");
      setName("");
      setQuantities({});
      onSuccess?.();
    } else {
      // Handle error - you might want to show an error message to the user
      console.error("Failed to create quote");
    }
  }

  function calculateTotal(products: Product[], quantities: ProductQuantities) {
    return products
      .reduce((sum, product) => {
        return sum + (quantities[product.id] || 0) * product.price;
      }, 0)
      .toFixed(2);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Section */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Name
          </label>
          <input
            id="customerName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="customerEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Email
          </label>
          <input
            id="customerEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^\S+@\S+$"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Products</h3>
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 py-2">
            <div className="flex-1">
              <span className="font-medium">{product.name}</span>
              <span className="ml-2 text-gray-600">${product.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-12 text-center">
                {quantities[product.id] || 0}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-lg font-semibold">
        Total Price: ${calculateTotal(products, quantities)}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Create Quote
      </button>
    </form>
  );
}
