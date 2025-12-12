import { TaskRepository } from "@/app/_core/domain/TaskRepository";
import { Task } from "@/app/_core/domain/Task";
import { TaskMapper } from "@/app/_shared/mapper/TaskMapper";

export class TaskApiAdapter implements TaskRepository {
    baseUrl = "https://jsonplaceholder.typicode.com/todos";

    async getAll(): Promise<Task[]> {
        const res = await fetch(`${this.baseUrl}?_limit=5`);
        const data = await res.json()
        return data.map(TaskMapper.toDomain)
    }

    async create(title: string): Promise<Task> {
        return { id: crypto.randomUUID(), title, done: false };
    }

    async delete(): Promise<void> {
        return;
    }
}

export interface TaskApiAdapter {
    id: string;
    title: string;
    completed: boolean;
}