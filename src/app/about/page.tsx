import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Zap } from "lucide-react";
import { AboutCTA } from "@/components/about-cta";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-border">
        <div className="space-y-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            About BrightFlow
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            We&apos;re on a mission to democratize publishing and empower every
            voice to share their stories with the world.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  To create a platform where anyone can share their thoughts,
                  connect with like-minded individuals, and inspire change
                  through storytelling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  A world where quality content thrives, creators are empowered,
                  and communities flourish around shared passions and ideas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Authenticity, community, accessibility, and excellence. We
                  believe in building with our users, not for them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
          <div className="space-y-6 text-muted-foreground prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p>
              BrightFlow was founded in 2023 with a simple belief: everyone has
              a story worth telling. Our founders noticed that existing blogging
              platforms were either too complicated for beginners or lacked the
              community features that make publishing truly rewarding.
            </p>
            <p>
              We set out to create something different—a platform that combines
              the simplicity of writing with the power of community. A place
              where writers of all levels can find their voice, build an
              audience, and connect with readers who care about what they have
              to say.
            </p>
            <p>
              Today, BrightFlow hosts thousands of blogs across diverse topics,
              from technology and design to personal essays and creative
              writing. Our community is growing every day, and we&apos;re
              committed to building the tools writers need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AboutCTA />
    </>
  );
}
