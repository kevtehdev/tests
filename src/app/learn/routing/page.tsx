import React from 'react';
import { ArrowLeft, GitFork, Workflow, AlertCircle, Route, Box } from 'lucide-react';
import Link from 'next/link';

interface TopicContent {
  explanation: string;
  keyPoints: string[];
  code?: {
    title: string;
    language: string;
    snippet: string;
  };
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  content: TopicContent;
}

const routingTopics: Topic[] = [
  {
    id: 'file-based-routing',
    title: 'File-Based Routing',
    description: 'Understanding Next.js file-system based routing',
    icon: <Box className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 uses a file-system based router where folders define routes. This intuitive system allows you to create routes simply by creating folders and files.',
      keyPoints: [
        'Folders define route segments',
        'page.tsx creates UI for route segments',
        'layout.tsx defines shared layouts',
        'loading.tsx and error.tsx for loading and error states',
        'Route groups for organizational purposes'
      ],
      code: {
        language: 'plaintext',
        title: 'Route Structure Example',
        snippet: `app/
├── page.tsx              # Home route (/)
├── about/
│   └── page.tsx         # About route (/about)
├── blog/
│   ├── page.tsx         # Blog index (/blog)
│   ├── [slug]/          # Dynamic blog post route
│   │   └── page.tsx     # Individual post (/blog/post-1)
└── (marketing)/         # Route group
    ├── pricing/
    │   └── page.tsx     # Pricing route (/pricing)
    └── contact/
        └── page.tsx     # Contact route (/contact)`
      }
    }
  },
  {
    id: 'dynamic-routes',
    title: 'Dynamic Routes',
    description: 'Creating flexible and dynamic URL patterns',
    icon: <GitFork className="w-5 h-5" />,
    content: {
      explanation: 'Dynamic routes allow you to create pages that can capture URL parameters, enabling dynamic content based on the URL.',
      keyPoints: [
        'Single dynamic segments with [param]',
        'Catch-all segments with [...param]',
        'Optional catch-all segments with [[...param]]',
        'Multiple dynamic segments in a path',
        'Accessing parameters in components'
      ],
      code: {
        language: 'typescript',
        title: 'Dynamic Route Implementation',
        snippet: `// app/posts/[category]/[id]/page.tsx
interface Props {
  params: {
    category: string;
    id: string;
  }
}

export default function Post({ params }: Props) {
  const { category, id } = params;
  
  return (
    <article>
      <h1>Post {id} in {category}</h1>
    </article>
  )
}

// URL: /posts/tech/123 would produce:
// category: "tech"
// id: "123"`
      }
    }
  },
  {
    id: 'route-groups',
    title: 'Route Groups',
    description: 'Organizing routes and sharing layouts',
    icon: <Route className="w-5 h-5" />,
    content: {
      explanation: 'Route groups allow you to organize routes without affecting the URL structure, and enable sharing layouts among specific routes.',
      keyPoints: [
        'Created using (folderName) syntax',
        'No effect on URL path structure',
        'Useful for organizing routes by feature',
        'Share layouts between specific routes',
        'Multiple root layouts in an app'
      ],
      code: {
        language: 'typescript',
        title: 'Route Group Example',
        snippet: `// app/(shop)/layout.tsx
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="shop-layout">
      <nav className="shop-nav">
        <Link href="/products">Products</Link>
        <Link href="/categories">Categories</Link>
      </nav>
      {children}
    </div>
  )
}

// This layout applies to:
// app/(shop)/products/page.tsx
// app/(shop)/categories/page.tsx
// But not to other routes outside (shop)`
      }
    }
  },
  {
    id: 'parallel-routes',
    title: 'Parallel Routes',
    description: 'Simultaneously loading multiple pages',
    icon: <GitFork className="w-5 h-5" />,
    content: {
      explanation: 'Parallel routes enable you to simultaneously render multiple pages in the same layout, perfect for split views and complex UIs.',
      keyPoints: [
        'Created using @folder convention',
        'Independent loading states',
        'Conditional rendering of slots',
        'Modal and split-view patterns',
        'Independent error boundaries'
      ],
      code: {
        language: 'typescript',
        title: 'Parallel Routes Implementation',
        snippet: `// app/layout.tsx
export default function Layout({
  children,
  @dashboard,
  @analytics
}: {
  children: React.ReactNode
  dashboard: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">{children}</div>
      <div className="col-span-6">{dashboard}</div>
      <div className="col-span-3">{analytics}</div>
    </div>
  )
}`
      }
    }
  },
  {
    id: 'intercepting-routes',
    title: 'Intercepting Routes',
    description: 'Modal and overlay routing patterns',
    icon: <Workflow className="w-5 h-5" />,
    content: {
      explanation: 'Intercepting routes allow you to load a new route within the current layout while showing a different UI, perfect for modal patterns.',
      keyPoints: [
        'Created using (..)folder syntax',
        'Modal and overlay patterns',
        'Preserving context while navigating',
        'Soft navigation handling',
        'Multiple levels of interception'
      ],
      code: {
        language: 'typescript',
        title: 'Route Interception Example',
        snippet: `// app/posts/page.tsx
export default function Posts() {
  return (
    <div>
      {posts.map(post => (
        <Link key={post.id} href={'/posts/' + post.id}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}

// app/posts/(..)new/page.tsx
export default function NewPost() {
  // This renders as a modal over /posts
  return (
    <div className="modal">
      <h1>Create New Post</h1>
      <PostForm />
    </div>
  )
}`
      }
    }
  },
  {
    id: 'middleware',
    title: 'Middleware',
    description: 'Request interception and modification',
    icon: <AlertCircle className="w-5 h-5" />,
    content: {
      explanation: 'Middleware allows you to run code before a request is completed, enabling request modification, redirects, and more.',
      keyPoints: [
        'Request and response modification',
        'URL rewriting and redirects',
        'Cookie and header manipulation',
        'Authentication and authorization',
        'Conditional middleware execution'
      ],
      code: {
        language: 'typescript',
        title: 'Middleware Implementation',
        snippet: `// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get country from header
  const country = request.geo?.country || 'US'
  
  // Rewrite for country-specific content
  if (request.nextUrl.pathname === '/products') {
    return NextResponse.rewrite(
      new URL('/products/' + country.toLowerCase(), request.url)
    )
  }
  
  // Add custom header
  const response = NextResponse.next()
  response.headers.set('x-country', country)
  return response
}

export const config = {
  matcher: '/products/:path*'
}`
      }
    }
  }
];

export default function RoutingPage() {
  return (
    <div className="min-h-screen bg-background pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Link 
              href="/learn" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning Guide
            </Link>
            <div className="flex items-center gap-2">
              <span className="badge badge-routing">
                Routing
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {routingTopics.length} concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Routing
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Master Next.js 14&apos;s advanced routing system and learn how to create dynamic, flexible, and maintainable application structures with the App Router.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {routingTopics.map((topic) => (
              <div
                key={topic.id}
                className="card-gradient hover-glow"
              >
                {/* Topic Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="gradient-learning p-3 rounded-xl text-white">
                    {topic.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      {topic.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Topic Content */}
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    {topic.content.explanation}
                  </p>

                  {/* Key Points */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-foreground">
                      Key Points
                    </h3>
                    <ul className="space-y-2">
                      {topic.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <div className="status-dot bg-primary mt-2" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Example */}
                  {topic.content.code && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground">
                          {topic.content.code.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {topic.content.code.language}
                        </span>
                      </div>
                      <pre className="bg-card rounded-lg p-4 overflow-x-auto border border-border">
                        <code className="text-sm text-muted-foreground">
                          {topic.content.code.snippet}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
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