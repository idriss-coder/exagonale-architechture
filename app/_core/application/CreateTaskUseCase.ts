import { Task } from "../domain/Task";
import { TaskRepository } from "../domain/TaskRepository";

export class CreateTaskUseCase {
    constructor(private repo: TaskRepository) { }

    execute({ title}: Omit<Task, "id" | "done">) {
        return this.repo.create(title);
    }
}