export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden animate-pulse">
      {/* Image area */}
      <div className="aspect-[3/4] w-full bg-white/[0.04]" />
      {/* Info area */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-2 w-16 rounded-full bg-white/[0.06]" />
          <div className="h-4 w-3/4 rounded-full bg-white/[0.06]" />
          <div className="h-3 w-full rounded-full bg-white/[0.04]" />
          <div className="h-3 w-2/3 rounded-full bg-white/[0.04]" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="h-4 w-16 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}
