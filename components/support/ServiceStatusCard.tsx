"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Props = {
  name: string;
  status: "operational" | "degraded" | "down";
  responseTime: number;
  index: number;
};

const statusConfig = {
  operational: { icon: CheckCircle2, color: "text-secondary", bg: "bg-secondary-fixed", label: "Operational" },
  degraded: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100", label: "Degraded Performance" },
  down: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "Down" },
};

export default function ServiceStatusCard({ name, status, responseTime, index }: Props) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center justify-between p-5 bg-paper-dark border border-outline-variant rounded-lg"
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center ${config.color}`}>
          <Icon size={18} />
        </div>
        <span className="font-bold text-ink-rich">{name}</span>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${config.color}`}>{config.label}</p>
        <p className="text-xs text-ink-muted">{responseTime}ms</p>
      </div>
    </motion.div>
  );
}