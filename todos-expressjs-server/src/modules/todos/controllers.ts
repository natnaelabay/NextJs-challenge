import {
  IControllerResult,
  newControllerData,
  newControllerError,
} from '../../utils/controller-result.model';
import { todosDal, TodosDal } from './dal';
import { ITodoPayload, Todo } from './model';
import { validateTodoCreatePayload } from './validator';

export class TodosController {
  todosDal: TodosDal;
  constructor(todosDal: TodosDal) {
    this.todosDal = todosDal;
  }

  create(payload: ITodoPayload): IControllerResult<Todo> {
    const { error, value } = validateTodoCreatePayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.create(value));
  }

  getAll(): IControllerResult<Todo[]> {
    return newControllerData(this.todosDal.getAll());
  }

  update(payload: ITodoPayload, id: string): IControllerResult<Todo> {
    const { error, value } = validateTodoCreatePayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.edit(value, id));
  }

  delete(id: string): IControllerResult<String> {
    try {
      this.todosDal.delete(id);
      newControllerData("Successfully deleted");
    } catch (error) {
      return newControllerError(
        "Todo not found",
        400
      );
    }
  }
}

export const todosController = new TodosController(todosDal);
