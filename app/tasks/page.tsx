"use client";

import TaskList from "@/app/_ui/components/TaskList";
import TaskForm from "@/app/_ui/components/TaskForm";
import { TaskService } from "@/app/_core/service/TaskService";
import { TaskApiAdapter } from "@/app/_infra/api/TaskApiAdapter";

const service = new TaskService(new TaskApiAdapter());

export default async function Page() {
  const tasks = await service.getTasks.execute();

  return (
    <div className="p-8">
      <h1>Hexa Tasks</h1>
      <TaskForm service={service} />
      <TaskList tasks={tasks} service={service} />
    </div>
  );
}
