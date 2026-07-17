import { Star } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { CLINIC, GOOGLE_RATING, REVIEWS } from "@/lib/constants";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="section-gradient py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateIn>
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              {GOOGLE_RATING.score} on Google &bull; {GOOGLE_RATING.totalReviews} Reviews
            </div>
            <h2 className="mb-3 text-2xl font-bold text-primary sm:text-3xl">
              What Our Patients Say
            </h2>
            <p className="mx-auto max-w-xl text-muted">
              Trusted by families across Paonta Sahib and Sirmaur district for over four decades.
            </p>
          </div>
        </AnimateIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <AnimateIn key={review.name} delay={i * 80}>
              <div className="card-gradient hover-lift flex h-full flex-col rounded-xl border border-border p-6">
                <StarRating count={review.rating} />
                <p className="my-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-primary">{review.name}</p>
                  <p className="text-xs text-muted">{review.source}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={200}>
          <p className="mt-8 text-center text-xs text-muted">
            Reviews sourced from Google and verified patient listings for {CLINIC.name}.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
