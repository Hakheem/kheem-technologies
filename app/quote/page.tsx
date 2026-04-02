"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";

function QuoteContent() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setSelectedType(type);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen py-28 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let's Build Something{" "}
            <span className="text-primary">Great</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours with a tailored quote.
          </p>
        </div>
        
        <QuoteForm initialType={selectedType} />
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <QuoteContent />
    </Suspense>
  );
}