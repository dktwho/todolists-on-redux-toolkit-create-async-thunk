import {instance} from "../../common/api/instance";
import {UpdateDomainTaskModelType} from "./tasks.reducer";
import {ResponseType} from "../../common/types/commonType";
import {TaskPriorities, TaskStatuses} from "../../common/enums/enums";

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(arg: UpdateTodoArgType) {
        return instance.put<ResponseType>(`todo-lists/${arg.todolistId}`, {title: arg.title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(arg:RemoveTaskArgType ) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
    },
    createTask(arg: CreateTaskArgType) {
        return instance.post<ResponseType<{
            item: TaskType
        }>>(`todo-lists/${arg.todolistId}/tasks`, {title: arg.title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};


// types
export type CreateTaskArgType = {
    todolistId: string,
    title: string
}

export type RemoveTaskArgType = {
    todolistId: string;
    taskId: string;
};

export type UpdateTaskArgType = {
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
}

export type UpdateTodoArgType = {
    todolistId: string
    title: string
}

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};
