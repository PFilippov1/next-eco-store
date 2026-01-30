import Test from "./Test";

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">No products yet.</p>
        <Test/>
      </div>
    </div>
  );
}