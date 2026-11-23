import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// orange, pink and purple tint for every skeleton block
const tint = "bg-gradient-to-r from-orange-400/15 via-pink-400/15 to-purple-500/15";

function DoctorCardSkeleton({ index }: { index: number }) {
  return (
    <Card
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
      className="relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:shadow-pink-500/10 border-pink-400/20 animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      {/* light sweeping across the card */}
      <span
        aria-hidden="true"
        style={{ animationDelay: `${index * 200}ms` }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-pink-400/15 to-transparent blur-sm animate-shimmer"
      />

      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Skeleton className={`w-16 h-16 rounded-full ring-2 ring-pink-400/20 ${tint}`} />
          <div className="flex-1 space-y-2">
            <Skeleton className={`h-5 w-32 ${tint}`} />
            <Skeleton className={`h-4 w-24 ${tint}`} />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-4 w-16 bg-amber-400/25" />
              <Skeleton className={`h-4 w-20 ${tint}`} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 bg-orange-400/30" />
          <Skeleton className={`h-4 w-24 ${tint}`} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 bg-pink-400/30" />
          <Skeleton className={`h-4 w-32 ${tint}`} />
        </div>
        <Skeleton className={`h-12 w-full ${tint}`} />
        <Skeleton className="h-6 w-20 bg-purple-500/20" />
      </CardContent>
    </Card>
  );
}

export function DoctorCardsLoading() {
  // this will show 6 skeleton cards
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <DoctorCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}