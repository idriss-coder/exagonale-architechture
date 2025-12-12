import { Task } from "./Task";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    create(title: string): Promise<Task>;
    delete(id: string): Promise<void>;
  }
  