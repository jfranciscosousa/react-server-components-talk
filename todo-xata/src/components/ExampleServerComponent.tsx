"use server";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function ExampleServerComponent({
  timeout = 1000,
}: {
  timeout: number;
}) {
  const todos = ["clean kitchen", "clean bathroom"];

  await sleep(timeout);

  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
