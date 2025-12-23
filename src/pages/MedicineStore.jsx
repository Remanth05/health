import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Search, Pill, ShoppingCart, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", name: "All Medicines" },
  { id: "antibiotic", name: "Antibiotics" },
  { id: "pain-relief", name: "Pain Relief" },
  { id: "allergy", name: "Allergy" },
  { id: "cardiovascular", name: "Cardiovascular" },
  { id: "diabetes", name: "Diabetes" },
  { id: "respiratory", name: "Respiratory" },
  { id: "digestive", name: "Digestive" },
];

export default function MedicineStore() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("/api/medicines");
        if (response.ok) {
          const data = await response.json();
          setMedicines(data);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast.error("Failed to load medicines");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (medicine.genericName &&
        medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Medicine Store</h1>
          <p className="text-xl text-gray-600">
            Browse and explore our complete medicine inventory
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-purple-400 hover:text-purple-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Medicines Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-xl">No medicines found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedicines.map((medicine) => (
              <div
                key={medicine._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Pill className="h-6 w-6 text-purple-600" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{medicine.name}</h3>
                  {medicine.genericName && (
                    <p className="text-sm text-gray-600 mb-3">({medicine.genericName})</p>
                  )}

                  {medicine.manufacturer && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Manufacturer:</span> {medicine.manufacturer}
                    </p>
                  )}

                  {medicine.dosage && (
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">Dosage:</span> {medicine.dosage}
                    </p>
                  )}

                  {/* Stock Status */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Stock:</span>
                      <span
                        className={`text-sm font-bold ${
                          medicine.quantity > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {medicine.quantity} {medicine.unit}
                      </span>
                    </div>
                    {medicine.quantity < 10 && medicine.quantity > 0 && (
                      <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-2 rounded">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-semibold">Low stock</span>
                      </div>
                    )}
                    {medicine.quantity === 0 && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-semibold">Out of stock</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4 flex items-end space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${medicine.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-600 mb-1">per {medicine.unit}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    disabled={medicine.quantity === 0}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                      medicine.quantity === 0
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-lg"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{medicine.quantity === 0 ? "Out of Stock" : "Add to Cart"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
