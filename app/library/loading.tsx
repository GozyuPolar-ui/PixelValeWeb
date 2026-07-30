import Navbar from "@/components/Navbar";

function SkeletonCard() {
  return (
    <div className="bg-paper-dark border border-outline-variant rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-surface-container-high" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-surface-container-high rounded w-3/4" />
        <div className="h-3 bg-surface-container-high rounded w-1/2" />
        <div className="flex gap-2">
          <div className="w-9 h-9 bg-surface-container-high rounded-lg" />
          <div className="w-9 h-9 bg-surface-container-high rounded-lg" />
          <div className="w-9 h-9 bg-surface-container-high rounded-lg" />
        </div>
        <div className="h-10 bg-surface-container-high rounded-lg" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <Navbar active="Library" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <div className="mb-12 space-y-3">
          <div className="h-10 bg-surface-container-high rounded w-48 animate-pulse" />
          <div className="h-5 bg-surface-container-high rounded w-36 animate-pulse" />
        </div>

        <div className="flex gap-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-28 bg-surface-container-high rounded-lg animate-pulse" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </main>
    </>
  );
}