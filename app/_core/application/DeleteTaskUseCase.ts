import { Task } from "../domain/Task";
import { TaskRepository } from "../domain/TaskRepository";

export class DeleteTaskUseCase {
    constructor(private repo: TaskRepository) { }

    execute(id: string) {
        return this.repo.delete(id);
    }
}