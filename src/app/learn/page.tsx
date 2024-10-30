import React from 'react';
import Link from 'next/link';
import { AlertCircle, Book, Code, Rocket, Server, Share2, Shield } from 'lucide-react';

const sections = [
  {
    title: "Fundamentals",
    icon: <Book className="w-6 h-6" />,
    badge: "badge-fundamentals",
    slug: "fundamentals",
    topics: [
      "App Router vs Pages Router",
      "File-system based routing",
      "Route groups and dynamic routes",
      "Special files (_app, _document, layout.tsx)",
      "Metadata and SEO",
      "Project structure best practices"
    ]
  },
  {
    title: "Routing",
    icon: <Share2 className="w-6 h-6" />,
    badge: "badge-routing",
    slug: "routing",
    topics: [
      "Dynamic routes and segments",
      "Route groups and organization",
      "Loading and error states",
      "Parallel and intercepting routes",
      "Middleware implementation",
      "Route handlers and API endpoints"
    ]
  },
  {
    title: "Data Fetching",
    icon: <Server className="w-6 h-6" />,
    badge: "badge-data",
    slug: "data-fetching",
    topics: [
      "Static Site Generation (SSG)",
      "Server-Side Rendering (SSR)",
      "Incremental Static Regeneration (ISR)",
      "Cache mechanisms and revalidation",
      "Route handlers and API routes",
      "Database integration patterns"
    ]
  },
  {
    title: "Server Components",
    icon: <Code className="w-6 h-6" />,
    badge: "badge-components",
    slug: "server-components",
    topics: [
      "Server Components vs Client Components",
      "Component-level data fetching",
      "use client and use server directives",
      "Server Actions and Forms",
      "Streaming and Suspense",
      "Edge and Node.js runtimes"
    ]
  },
  {
    title: "Optimization",
    icon: <Rocket className="w-6 h-6" />,
    badge: "badge-optimization",
    slug: "optimization",
    topics: [
      "Image and Font optimization",
      "Static and Dynamic imports",
      "Route segments and parallel routes",
      "Loading and Error states",
      "Intercepting routes",
      "Memory and performance monitoring"
    ]
  },
  {
    title: "Authentication",
    icon: <Shield className="w-6 h-6" />,
    badge: "badge-auth",
    slug: "auth",
    topics: [
      "Authentication patterns",
      "Middleware implementation",
      "Protected routes",
      "Session management",
      "OAuth integration",
      "Security best practices"
    ]
  }
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary">
                Learning Guide
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {sections.length} core concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Learning Guide
            </h1>
            <div className="flex items-center gap-2 bg-muted/50 p-4 rounded-xl border border-border">
              <AlertCircle className="w-5 h-5 text-primary" />
              <p className="text-muted-foreground">
                Master these topics for your Next.js certification exam.
              </p>
            </div>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                href={`/learn/${section.slug}`}
                key={section.title}
                className="card-interactive hover-lift group"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-white gradient-learning`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <span className={`badge ${section.badge} mt-1`}>
                        {section.topics.length} topics
                      </span>
                    </div>
                  </div>

                  {/* Topics Preview */}
                  <ul className="space-y-2">
                    {section.topics.slice(0, 3).map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="status-dot bg-primary/50 mt-2" />
                        <span>{topic}</span>
                      </li>
                    ))}
                    {section.topics.length > 3 && (
                      <li className="text-sm text-primary font-medium">
                        +{section.topics.length - 3} more topics...
                      </li>
                    )}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Content is updated for Next.js 14 and follows the latest best practices and patterns.</p>
          <p>Last updated: October 2024</p>
        </div>
      </div>
    </div>
  );
}