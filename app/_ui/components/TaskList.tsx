"use client";

import { Task } from "@/app/_core/domain/Task";
import { TaskService } from "@/app/_core/service/TaskService";

type TaskListProps = {
  tasks: Task[];
  service: TaskService;
};

export default function TaskList({ tasks, service }: TaskListProps) {
  async function handleDelete(id: string) {
    await service.deleteTask.execute(id);
    location.reload();
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.length === 0 && <p>Aucune tâche pour le moment.</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <span>{task.title}</span>

          <button
            className="text-red-500 text-sm"
            onClick={() => handleDelete(task.id)}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
