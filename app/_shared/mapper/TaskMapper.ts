import { Task } from "../../_core/domain/Task";
import { TaskApiAdapter } from "../../_infra/api/TaskApiAdapter";
import { censor } from "../helpers/censor";

export class TaskMapper {
    static toDomain(apiData: TaskApiAdapter): Task {
        return {
            id: String(apiData.id),
            title: censor(apiData.title),
            done: apiData.completed,
        }
    }

    static toApi(domain: Partial<Task>): Partial<TaskApiAdapter> {
        return {
            id: domain.id,
            title: domain?.title,
            completed: domain?.done,
        }
    }
}
