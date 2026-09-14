"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerItem } from "./StaggerGrid";

export default function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
