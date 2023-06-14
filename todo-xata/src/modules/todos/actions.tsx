"use server";
import { getXataClient } from "@/xata";
import { revalidateTag } from "next/cache";

export async function addTodo(data: FormData) {
  const client = getXataClient();
  const content = data.get("content")?.toString();

  if (!content) return;

  await client.db.todos.create({ content });

  revalidateTag("todos");
}

export async function deleteTodo(data: FormData) {
  const client = getXataClient();
  const id = data.get("id")?.toString();

  if (!id) return;

  await client.db.todos.delete({ id });

  revalidateTag("todos");
}

export async function deleteAllTodos() {
  const client = getXataClient();

  const todos = await client.db.todos.select(["id"]).getAll();
  await client.transactions.run(
    todos.map((todo) => ({ delete: { table: "todos", id: todo.id } }))
  );

  revalidateTag("todos");
}
