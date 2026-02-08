
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export function Testimonials({
  testimonials,
  className,
  title = "라이드처치를 섬기는 분",
  description = "예수님의 제자되는 라이드처치",
  maxDisplayed = 6,
}) {
  const [showAll, setShowAll] = useState(false);

  const openInNewTab = (url) => {
    window.open(url, "_blank")?.focus();
  };

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="mb-8 flex flex-col gap-5">
          <h2 className="text-center text-4xl font-medium">{title}</h2>
          <p className="text-center text-muted-foreground">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-5",
            !showAll &&
              testimonials.length > maxDisplayed &&
              "max-h-[720px] overflow-hidden"
          )}
        >
          {testimonials
            .slice(0, showAll ? undefined : maxDisplayed)
            .map((testimonial, index) => (
              <Card
                key={index}
                className="relative h-auto w-80 border-border bg-card p-5"
              >
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                    loading="lazy"
                  />
                  <div className="flex flex-col pl-4">
                    <span className="text-base font-semibold">
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.username}
                    </span>
                  </div>
                </div>

                <div className="my-5">
                  <p className="font-medium text-foreground">
                    {testimonial.text}
                  </p>
                </div>

                <button
                  onClick={() => openInNewTab(testimonial.social)}
                  className="absolute right-4 top-4 transition-opacity hover:opacity-80"
                >
                  <Icons.twitter className="h-4 w-4" aria-hidden="true" />
                </button>
              </Card>
            ))}
        </div>

        {testimonials.length > maxDisplayed && !showAll && (
          <>
            <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 transform">
              <Button variant="secondary" onClick={() => setShowAll(true)}>
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
