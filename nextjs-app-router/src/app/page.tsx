import TodosPage from "@/modules/todos/TodosPage.server";

export default async function Home() {
  // @ts-expect-error Server Component
  return <TodosPage />;
}
