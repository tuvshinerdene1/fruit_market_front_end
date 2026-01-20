"use client";

import { useState } from "react";
import { AdminFruitCard } from "@/components/shared/admin-fruit-card/admin_fruit_card";
import { AdminBundleCard } from "@/components/shared/admin-bundle-card/admin-bundle-card";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import { Package, ListChecks, SearchX } from "lucide-react";
import { SearchBar } from "@/components/shared/searchbar/searchbar";
import AddProduct from "@/components/shared/add-product/add-product";
import { Fruit } from "@/types/fruit";
import { Bundle } from "@/types/bundles";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditFruitDialog } from "@/components/shared/editFruitDialogue/editFruitDialogue";
import { EditBundleDialog } from "@/components/editBundleDialog/editBundleDialog";
import { DeleteConfirmDialog } from "@/components/shared/deleteConfirmDialogue/deleteConfirmDialogue";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("fruits");
  
  // 1. Data State
  const [fruits, setFruits] = useState<Fruit[]>(MOCK_FRUITS);
  const [bundles, setBundles] = useState<Bundle[]>(MOCK_BUNDLES);

  // 2. Fruit Dialog State
  const [editingFruit, setEditingFruit] = useState<Fruit | null>(null);
  const [deletingFruit, setDeletingFruit] = useState<Fruit | null>(null);

  // 3. Bundle Dialog State
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [deletingBundle, setDeletingBundle] = useState<Bundle | null>(null);

  // --- Handlers: Creation ---
  const handleAddFruit = (newFruit: Fruit) => setFruits((prev) => [newFruit, ...prev]);
  const handleAddBundle = (newBundle: Bundle) => setBundles((prev) => [newBundle, ...prev]);

  // --- Handlers: Fruit Updates/Delete ---
  const handleUpdateFruit = (updatedFruit: Fruit) => {
    setFruits((prev) => prev.map((f) => (f.id === updatedFruit.id ? updatedFruit : f)));
    setEditingFruit(null);
  };

  const handleFruitDeleteConfirm = () => {
    if (deletingFruit) {
      setFruits((prev) => prev.filter((f) => f.id !== deletingFruit.id));
      setDeletingFruit(null);
    }
  };

  // --- Handlers: Bundle Updates/Delete ---
  const handleUpdateBundle = (updatedBundle: Bundle) => {
    setBundles((prev) => prev.map((b) => (b.id === updatedBundle.id ? updatedBundle : b)));
    setEditingBundle(null);
  };

  const handleBundleDeleteConfirm = () => {
    if (deletingBundle) {
      setBundles((prev) => prev.filter((b) => b.id !== deletingBundle.id));
      setDeletingBundle(null);
    }
  };

  // Filter Logic
  const filteredFruits = fruits.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBundles = bundles.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif">Бараа материал</h1>
          <p className="text-sm text-slate-500">
            {activeTab === "fruits" 
              ? `Нийт ${fruits.length} төрлийн жимс` 
              : `Нийт ${bundles.length} төрлийн багц`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <AddProduct onAddFruit={handleAddFruit} onAddBundle={handleAddBundle} />
        </div>
      </div>

      <Tabs defaultValue="fruits" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
          <TabsTrigger value="fruits" className="flex items-center gap-2">
            <Package className="h-4 w-4" /> Жимснүүд
          </TabsTrigger>
          <TabsTrigger value="bundles" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" /> Багцууд
          </TabsTrigger>
        </TabsList>

        {/* Fruits Content */}
        <TabsContent value="fruits" className="space-y-4">
          {filteredFruits.length > 0 ? (
            <div className="grid gap-3">
              {filteredFruits.map((f) => (
                <AdminFruitCard 
                  key={f.id} 
                  fruit={f} 
                  onEdit={setEditingFruit}
                  onDelete={() => setDeletingFruit(f)}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        {/* Bundles Content */}
        <TabsContent value="bundles" className="space-y-4">
          {filteredBundles.length > 0 ? (
            <div className="grid gap-4">
              {filteredBundles.map((b) => (
                <AdminBundleCard 
                  key={b.id} 
                  bundle={b} 
                  onEdit={setEditingBundle}
                  onDelete={() => setDeletingBundle(b)}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
      </Tabs>

      {/* Fruit Edit Dialog */}
      <EditFruitDialog 
        fruit={editingFruit} 
        onClose={() => setEditingFruit(null)} 
        onSave={handleUpdateFruit} 
      />

      {/* Bundle Edit Dialog */}
      <EditBundleDialog 
        bundle={editingBundle}
        onClose={() => setEditingBundle(null)}
        onSave={handleUpdateBundle}
      />

      {/* Dynamic Delete Confirm Dialog */}
      <DeleteConfirmDialog 
        isOpen={!!deletingFruit || !!deletingBundle} 
        itemName={deletingFruit?.name || deletingBundle?.name || ""} 
        onClose={() => {
          setDeletingFruit(null);
          setDeletingBundle(null);
        }} 
        onConfirm={deletingFruit ? handleFruitDeleteConfirm : handleBundleDeleteConfirm} 
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <SearchX className="h-12 w-12 mb-4 opacity-20" />
      <p>Илэрц олдсонгүй.</p>
    </div>
  );
}