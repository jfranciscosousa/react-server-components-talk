"use client";
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";

interface Props<TResult>
  extends Omit<
    ComponentPropsWithoutRef<"form">,
    "children" | "onSubmit" | "onSubmitCapture" | "action"
  > {
  action: (formData: FormData) => Promise<TResult> | TResult;
  children: ReactNode | ((props: { submitting?: boolean }) => ReactNode);
  afterSubmit?: (props: {
    actionResult: TResult;
    formElement: HTMLFormElement;
  }) => void;
}

export default function SmartForm<TResult>({
  action,
  children,
  afterSubmit,
  ...props
}: Props<TResult>) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action={action}
      onSubmit={async (event) => {
        if (typeof action !== "function") return;

        setSubmitting(true);
        event.preventDefault();

        const formElement = event.currentTarget;

        try {
          const actionResult = await action(new FormData(formElement));

          if (afterSubmit) afterSubmit({ actionResult, formElement });
        } finally {
          setSubmitting(false);
        }
      }}
      {...props}
    >
      {typeof children === "function" ? children({ submitting }) : children}
    </form>
  );
}
