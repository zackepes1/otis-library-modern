"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfModalProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export function PdfModal({ href, label, children }: PdfModalProps) {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(700);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const obs = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setPage((p) => Math.min(p + 1, numPages));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setPage((p) => Math.max(p - 1, 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, numPages]);

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden rounded-none sm:my-8 sm:rounded-2xl"
            initial={{ scale: 0.97, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0d1526] px-4 py-3">
              <p className="truncate text-sm font-semibold text-slate-200">{label}</p>
              <div className="flex shrink-0 items-center gap-3">
                {numPages > 0 && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page <= 1}
                      className="rounded px-1.5 py-0.5 hover:text-white disabled:opacity-30"
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    <span>{page} / {numPages}</span>
                    <button
                      onClick={() => setPage((p) => Math.min(p + 1, numPages))}
                      disabled={page >= numPages}
                      className="rounded px-1.5 py-0.5 hover:text-white disabled:opacity-30"
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                )}
                <a
                  href={href}
                  download
                  className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-brand/50 hover:text-brand"
                >
                  Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/40 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* PDF canvas */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto bg-[#1a1a2e] p-4"
            >
              <Document
                file={href}
                onLoadSuccess={({ numPages }) => { setNumPages(numPages); setPage(1); }}
                loading={
                  <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                    Loading…
                  </div>
                }
                error={
                  <div className="flex h-64 flex-col items-center justify-center gap-3 text-sm text-slate-500">
                    <p>Could not load PDF.</p>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                      Open in new tab ↗
                    </a>
                  </div>
                }
              >
                <Page
                  pageNumber={page}
                  width={Math.min(containerWidth - 32, 900)}
                  renderTextLayer
                  renderAnnotationLayer
                  className="mx-auto shadow-xl"
                />
              </Document>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </span>
      {typeof window !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
