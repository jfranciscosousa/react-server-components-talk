import ExampleServerComponent from "@/components/ExampleServerComponent";
import { Suspense } from "react";

export default async function ServerComponent() {
  return (
    <main className="flex flex-col gap-10">
      <Suspense fallback={<p>Loading</p>}>
        {/* @ts-expect-error Server Component */}
        <ExampleServerComponent timeout={5000} />
      </Suspense>

      <Suspense fallback={<p>Loading another</p>}>
        {/* @ts-expect-error Server Component */}
        <ExampleServerComponent />
      </Suspense>
    </main>
  );
}
