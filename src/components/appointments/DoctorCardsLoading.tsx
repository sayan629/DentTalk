import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// orange, pink and purple tint for every skeleton block
const tint =
  "animate-pulse bg-gradient-to-r from-orange-400/30 via-pink-400/30 to-purple-500/30";

function DoctorCardSkeleton({ index }: { index: number }) {
  return (
    <Card
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
      className="relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:shadow-pink-500/10 border-pink-400/20 animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      {/* light sweeping across the whole card */}
      <span
        aria-hidden="true"
        style={{
          animation: "doctor-sweep 1.6s ease-in-out infinite",
          animationDelay: `${index * 150}ms`,
        }}
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent"
      />

      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Skeleton className={`w-16 h-16 rounded-full ring-2 ring-pink-400/30 ${tint}`} />
          <div className="flex-1 space-y-2">
            <Skeleton className={`h-5 w-32 ${tint}`} />
            <Skeleton className={`h-4 w-24 ${tint}`} />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-4 w-16 animate-pulse bg-amber-400/40" />
              <Skeleton className={`h-4 w-20 ${tint}`} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 animate-pulse bg-orange-400/50" />
          <Skeleton className={`h-4 w-24 ${tint}`} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 animate-pulse bg-pink-400/50" />
          <Skeleton className={`h-4 w-32 ${tint}`} />
        </div>
        <Skeleton className={`h-12 w-full ${tint}`} />
        <Skeleton className="h-6 w-20 animate-pulse bg-purple-500/40" />
      </CardContent>
    </Card>
  );
}

export function DoctorCardsLoading() {
  // this will show 6 skeleton cards
  return (
    <>
      <style>{`
        @keyframes doctor-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <DoctorCardSkeleton key={i} index={i} />
        ))}
      </div>
    </>
  );
}