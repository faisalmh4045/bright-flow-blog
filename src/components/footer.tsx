"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Aperture, Cat, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">B</span>
              </div>
              <span className="font-bold">BrightFlow</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A platform for sharing your thoughts and ideas with the world.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <div className="space-y-2 text-sm flex flex-col">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/blogs/create"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Create Blog
              </Link>
            </div>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold">Account</h3>
            <div className="space-y-2 text-sm flex flex-col">
              <Link
                href="/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/blogs/manage"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Manage Blogs
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter">
                  <X className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="GitHub">
                  <Cat className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="LinkedIn">
                  <Aperture className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:hello@brightflow.com" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 BrightFlow. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
