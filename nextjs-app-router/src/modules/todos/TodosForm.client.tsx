"use client";

import SmartForm from "@/components/SmartForm.client";
import { addTodo } from "./actions";

export default function TodosForm() {
  return (
    <SmartForm
      action={addTodo}
      afterSubmit={({ formElement }) => formElement.reset()}
    >
      {({ submitting }) => (
        <>
          <input className="text-black" name="content" />
          <button disabled={submitting}>New todo</button>
          {submitting && <p>Loading</p>}
        </>
      )}
    </SmartForm>
  );
}
