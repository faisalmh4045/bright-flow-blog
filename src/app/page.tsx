import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";
import { Suspense } from "react";
import { RecentBlogs } from "@/components/recent-blogs";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Create & Share",
      description:
        "Write and publish your thoughts with a beautiful, distraction-free editor.",
    },
    {
      icon: Users,
      title: "Connect",
      description:
        "Build an audience and engage with readers who share your interests.",
    },
    {
      icon: Zap,
      title: "Grow",
      description:
        "Track your blog performance and grow your reach with analytics and insights.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="space-y-8 text-center">
          <Badge variant="outline" className="mx-auto">
            Welcome to BrightFlow
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Share Your Stories, Inspire the World
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Join a community of writers and thinkers. Create beautiful blogs,
            connect with readers, and grow your audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/blogs">
                Start Reading
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blogs/add">Create Your First Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose BrightFlow?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a successful blogger.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="border-border hover:border-primary/50 transition-colors"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold">Recent Blogs</h2>
            <Button variant="outline" asChild>
              <Link href="/blogs">View All</Link>
            </Button>
          </div>

          <Suspense fallback={<p className="text-center py-10">Loading...</p>}>
            <RecentBlogs />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-primary border-primary">
          <CardContent className="pt-12 pb-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to share your story?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of writers and start creating your first blog
                today.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Get Started Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
