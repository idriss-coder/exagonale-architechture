import { TaskRepository } from "../domain/TaskRepository";

export class GetTasksUseCase {
  constructor(private repo: TaskRepository) {}

  execute() {
    return this.repo.getAll();
  }
}
