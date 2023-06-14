"use server";

import { getXataClient } from "@/xata";
import DeleteTodo from "./DeleteTodo.client";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function TodosList() {
  const client = getXataClient();
  const todos = await client.db.todos.getAll({
    fetchOptions: { next: { tags: ["todos"] } },
  });

  await sleep(250);

  return (
    <ul className="flex flex-col">
      {todos.map((todo) => (
        <li key={todo.id} className="flex gap-4">
          <p>{todo.content}</p>

          <DeleteTodo todoId={todo.id} />
        </li>
      ))}
    </ul>
  );
}
