import { TaskRepository } from "../domain/TaskRepository";
import { GetTasksUseCase } from "../application/GetTasksUseCase";
import { CreateTaskUseCase } from "../application/CreateTaskUseCase";
import { DeleteTaskUseCase } from "../application/DeleteTaskUseCase";
import {TaskApiAdapter} from "@/app/_infra/api/TaskApiAdapter";


export class TaskService {
    getTasks: GetTasksUseCase;
    createTask: CreateTaskUseCase;
    deleteTask: DeleteTaskUseCase;

    constructor(repo: TaskRepository) {
        this.getTasks = new GetTasksUseCase(repo)
        this.createTask = new CreateTaskUseCase(repo)
        this.deleteTask = new DeleteTaskUseCase(repo)
    }
}

export const taskService = new TaskService(new TaskApiAdapter())
