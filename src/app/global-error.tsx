'use client';

import ErrorReporter from "@/components/ErrorReporter";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError(props: GlobalErrorProps) {
  return <ErrorReporter {...props} />;
}
