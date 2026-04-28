"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
      <div className="text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you&apos;re a seasoned writer or just getting started,
          there&apos;s a place for you at BrightFlow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/blogs/create">Start Writing</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">Explore Blogs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
