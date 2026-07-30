import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceStatusCard from "@/components/support/ServiceStatusCard";
import { runHealthChecks } from "@/lib/health-check";
import { Activity } from "lucide-react";

export const dynamic = "force-dynamic"; // biar selalu ngecek ulang tiap kunjungan, gak di-cache

export default async function ServerStatusPage() {
  const services = await runHealthChecks();
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 md:px-16 pt-32 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <Activity size={24} className="text-primary" />
          <h1 className="text-3xl font-display text-ink-rich">Server Status</h1>
        </div>

        <div
          className={`p-4 rounded-lg mb-8 text-center font-bold ${
            allOperational ? "bg-secondary-fixed text-secondary" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {allOperational ? "All Systems Operational" : "Some Systems Experiencing Issues"}
        </div>

        <div className="space-y-3">
          {services.map((service, i) => (
            <ServiceStatusCard
              key={service.name}
              name={service.name}
              status={service.status}
              responseTime={service.responseTime}
              index={i}
            />
          ))}
        </div>

        <p className="text-xs text-ink-muted text-center mt-8">
          Status checked live at page load · {new Date().toLocaleString("en-US")}
        </p>
      </main>
      <Footer />
    </>
  );
}