import React from 'react';
import { FolderTree,  ArrowLeft, Server, Workflow, Database, Lock, Zap, Globe } from 'lucide-react';
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

const fundamentalsTopics: Topic[] = [
  {
    id: 'project-structure',
    title: 'Project Structure',
    description: 'Understanding Next.js 14 app directory and file organization',
    icon: <FolderTree className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 introduces a new app directory structure that enables powerful features like Server Components and nested layouts.',
      keyPoints: [
        'app/ directory is the main container for all routes',
        'Components inside app/ are React Server Components by default',
        'Special files like layout.tsx and page.tsx serve specific purposes',
        'Colocating components, styles, and tests is encouraged'
      ],
      code: {
        language: 'plaintext',
        title: 'Next.js 14 Project Structure',
        snippet: `├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── (routes)/      # Route groups
├── components/         # Shared components
├── lib/               # Utility functions
└── public/            # Static assets`
      }
    }
  },
  {
    id: 'server-components',
    title: 'Server Components',
    description: 'Understanding and leveraging React Server Components',
    icon: <Server className="w-5 h-5" />,
    content: {
      explanation: 'Server Components are a new paradigm that enables rendering components on the server, reducing client-side JavaScript and improving performance.',
      keyPoints: [
        'Server Components are the default in app/ directory',
        'Improved initial page load and SEO',
        'Direct database access without API routes',
        'Reduced client-side JavaScript bundle',
        'Use "use client" directive for client components'
      ],
      code: {
        language: 'typescript',
        title: 'Server Component Example',
        snippet: `// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`
      }
    }
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching',
    description: 'Modern data fetching patterns and caching strategies',
    icon: <Database className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 provides powerful data fetching methods with built-in caching and revalidation capabilities.',
      keyPoints: [
        'Server-side data fetching with fetch API',
        'Automatic request deduplication',
        'Incremental Static Regeneration (ISR)',
        'Dynamic data fetching with cache options',
        'Streaming and Suspense integration'
      ],
      code: {
        language: 'typescript',
        title: 'Advanced Data Fetching',
        snippet: `// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: {
      revalidate: 3600, // ISR: Revalidate every hour
      tags: ['posts']   // Cache tags for targeted revalidation
    }
  })
  return res.json()
}

export default async function Posts() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}`
      }
    }
  },
  {
    id: 'middleware',
    title: 'Middleware',
    description: 'Request interception and modification',
    icon: <Workflow className="w-5 h-5" />,
    content: {
      explanation: 'Middleware allows you to run code before requests are completed, enabling authentication, redirects, and request manipulation.',
      keyPoints: [
        'Execute code before requests are completed',
        'Modify response headers',
        'Implement authentication and authorization',
        'Rewrite, redirect, or modify requests',
        'Access and manipulate cookies'
      ],
      code: {
        language: 'typescript',
        title: 'Middleware Example',
        snippet: `// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check auth token
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}`
      }
    }
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'Implementing secure authentication patterns',
    icon: <Lock className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 provides multiple ways to implement authentication, with built-in support for sessions and JWT tokens.',
      keyPoints: [
        'Server-side session management',
        'JWT token handling',
        'OAuth integration',
        'Protected routes and middleware',
        'Route handlers for auth endpoints'
      ],
      code: {
        language: 'typescript',
        title: 'Authentication Setup',
        snippet: `// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    // Add providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }`
      }
    }
  },
  {
    id: 'optimization',
    title: 'Performance Optimization',
    description: 'Techniques for optimal application performance',
    icon: <Zap className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 includes various built-in optimizations and tools to ensure your application performs at its best.',
      keyPoints: [
        'Automatic image optimization',
        'Font optimization with next/font',
        'Static and dynamic imports',
        'Route segment config options',
        'Metadata API for SEO'
      ],
      code: {
        language: 'typescript',
        title: 'Optimization Examples',
        snippet: `// app/layout.tsx
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My App',
  description: 'Next.js 14 optimized application'
}

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Image
          src="/hero.jpg"
          alt="Hero"
          width={1200}
          height={600}
          priority
        />
        {children}
      </body>
    </html>
  )
}`
      }
    }
  },
  {
    id: 'internationalization',
    title: 'Internationalization',
    description: 'Building multilingual applications',
    icon: <Globe className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 provides built-in support for internationalized routing and content management.',
      keyPoints: [
        'Automatic locale detection',
        'Locale-based routing',
        'Direction switching (LTR/RTL)',
        'Dictionary-based translations',
        'Dynamic language switching'
      ],
      code: {
        language: 'typescript',
        title: 'i18n Configuration',
        snippet: `// middleware.ts
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'

let locales = ['en', 'es', 'fr']
let defaultLocale = 'en'

function getLocale(request) {
  const negotiatorHeaders = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })
  
  let languages = new Negotiator({ headers: negotiatorHeaders })
    .languages()
  
  return match(languages, locales, defaultLocale)
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(\`/\${locale}/\`)
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(\`/\${locale}\${pathname}\`, request.url)
    )
  }
}`
      }
    }
  }
];

// Rest of the component remains the same...

export default function FundamentalsPage() {
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
              <span className="badge badge-fundamentals">
                Fundamentals
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {fundamentalsTopics.length} concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Fundamentals
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Master the core concepts and building blocks of Next.js 14 applications. These fundamentals form the foundation for building modern web applications.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {fundamentalsTopics.map((topic) => (
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