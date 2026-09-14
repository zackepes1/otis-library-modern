"use client";

import dynamic from "next/dynamic";

const PdfModalInner = dynamic(() => import("./PdfModalInner").then((m) => m.PdfModal), {
  ssr: false,
  loading: () => null,
});

export function PdfModal(props: React.ComponentProps<typeof PdfModalInner>) {
  return <PdfModalInner {...props} />;
}
