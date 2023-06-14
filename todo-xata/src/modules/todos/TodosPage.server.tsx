"use server";

import { Suspense } from "react";
import TodosForm from "./TodosForm.client";
import TodosList from "./TodosList.server";
import { deleteAllTodos } from "./actions";

export default async function TodosPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="min-h-[200px]">
        <Suspense fallback="Loading todos...">
          {/* @ts-expect-error Server Component */}
          <TodosList />
        </Suspense>
      </div>

      <div className="flex items-center gap-8">
        <TodosForm />

        <form action={deleteAllTodos}>
          <button>Clear</button>
        </form>
      </div>
    </main>
  );
}
