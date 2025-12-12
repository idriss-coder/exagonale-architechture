"use client";

import { useState } from "react";
import { TaskService } from "@/app/_core/service/TaskService";

type TaskFormProps = {
  service: TaskService;
};

export default function TaskForm({ service }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    setLoading(true);

    try {
      await service.createTask.execute({ title });
      setTitle(""); // Reset field
      // 🚀 TU peux ajouter un refresh ou un event bus
      // location.reload(); // temporaire si tu veux faire simple
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        className="border rounded px-3 py-2 w-full"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 rounded"
      >
        {loading ? "…" : "Ajouter"}
      </button>
    </form>
  );
}
