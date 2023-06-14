"use client";

import { deleteTodo } from "./actions";

export default function DeleteTodo({ todoId }: { todoId: string }) {
  return (
    <form action={deleteTodo}>
      <input type="hidden" name="id" value={todoId} />
      <button>X</button>
    </form>
  );
}
