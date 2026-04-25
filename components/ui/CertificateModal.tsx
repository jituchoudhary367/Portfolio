"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Certificate } from "@/lib/certs";

export default function CertificateModal({
  openCert,
  onClose,
}: {
  openCert: Certificate | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {openCert && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border-2 border-[var(--border)] bg-white shadow-[12px_12px_0_#0d0d0d]"
            initial={{ opacity: 0, rotateY: 45, x: 100, perspective: 2000 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: -45, x: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            style={{ transformOrigin: "left center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-white font-mono text-sm"
              onClick={onClose}
              aria-label="Close certificate"
            >
              ✕
            </button>
            {openCert.file.toLowerCase().endsWith(".pdf") ? (
              <iframe
                title={openCert.title}
                src={openCert.file}
                className="h-[80vh] w-full"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={openCert.file}
                alt={openCert.title}
                className="h-auto w-full"
                loading="lazy"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
