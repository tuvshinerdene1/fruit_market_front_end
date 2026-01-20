"use client";

import { useState } from "react";
import { Worker } from "@/types/worker";
import { MOCK_WORKERS } from "@/mock_data/mock_users";
import { WorkerCard } from "../worker-card/worker-card";
import { AddWorkerDialog } from "../add-worker_dialogue/add_worker_dialogue";

export function WorkerManager() {
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);

  const handleDelete = (id: string) => {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
  };

  const handleSave = (updatedWorker: Worker) => {
    setWorkers((prev) => 
      prev.map((w) => (w.id === updatedWorker.id ? updatedWorker : w))
    );
  };

  // Logic to add a new worker to the state
  const handleAddWorker = (newWorker: Worker) => {
    setWorkers((prev) => [newWorker, ...prev]); // Add to the start of the list
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif">Нийт ажилчид</h1>
        {/* Replace static button with Dialog */}
        <AddWorkerDialog onAdd={handleAddWorker} />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <WorkerCard 
            key={worker.id} 
            worker={worker} 
            onDelete={handleDelete}
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
}