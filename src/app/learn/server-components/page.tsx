import React from 'react';
import { Code, ArrowLeft, Zap, Workflow, Database, Binary, AlertCircle } from 'lucide-react';
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

const serverComponentTopics: Topic[] = [
  {
    id: 'server-components-basics',
    title: 'Server Components Fundamentals',
    description: 'Core concepts and benefits of React Server Components',
    icon: <Code className="w-5 h-5" />,
    content: {
      explanation: 'React Server Components represent a fundamental shift in how we build React applications, offering improved performance and simplified data access.',
      keyPoints: [
        'Zero client-side JavaScript by default',
        'Direct backend resource access',
        'Automatic code splitting',
        'Streaming and progressive rendering',
        'Improved initial page load'
      ],
      code: {
        language: 'typescript',
        title: 'Basic Server Component',
        snippet: `// app/posts/page.tsx
async function getPosts() {
  const posts = await db.post.findMany();
  return posts;
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}`
      }
    }
  },
  {
    id: 'client-server-pattern',
    title: 'Client and Server Pattern',
    description: 'Understanding when to use Client vs Server Components',
    icon: <Binary className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 requires strategic decisions about component rendering location. Understanding the trade-offs between client and server components is crucial for optimal application architecture.',
      keyPoints: [
        'Server Components for data fetching and heavy computation',
        'Client Components for interactivity and browser APIs',
        'Proper use of "use client" directive',
        'Component composition patterns',
        'Performance implications of each choice'
      ],
      code: {
        language: 'typescript',
        title: 'Mixed Component Pattern',
        snippet: `// components/InteractiveButton.tsx
"use client"
 
import { useState } from 'react'
 
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`
      }
    }
  },
  {
    id: 'server-actions',
    title: 'Server Actions',
    description: 'Building interactive forms with Server Actions',
    icon: <Workflow className="w-5 h-5" />,
    content: {
      explanation: 'Server Actions enable form handling and data mutations directly on the server, eliminating the need for API endpoints while maintaining a seamless user experience.',
      keyPoints: [
        'Form handling without API routes',
        'Progressive enhancement support',
        'Optimistic updates',
        'Revalidation and cache management',
        'Type-safe mutations with TypeScript'
      ],
      code: {
        language: 'typescript',
        title: 'Server Action Form',
        snippet: `// app/posts/action.ts
"use server"

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  await db.post.create({
    data: { title, content }
  })
  
  revalidatePath('/posts')
}`
      }
    }
  },
  {
    id: 'streaming',
    title: 'Streaming and Suspense',
    description: 'Implementing progressive rendering with Suspense',
    icon: <Zap className="w-5 h-5" />,
    content: {
      explanation: 'Streaming allows you to progressively render UI components, improving perceived performance by showing content as soon as it is ready.',
      keyPoints: [
        'Loading UI with suspense boundaries',
        'Streaming HTML and data',
        'Parallel data fetching',
        'Fallback component patterns',
        'Error boundary integration'
      ],
      code: {
        language: 'typescript',
        title: 'Streaming Implementation',
        snippet: `// app/dashboard/page.tsx
import { Suspense } from 'react'
import { Loading } from './loading'

async function SlowComponent() {
  const data = await fetch('https://slow-api.example.com')
  const json = await data.json()
  
  return <div>{json.content}</div>
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>Quick static content</div>
      <Suspense fallback={<Loading />}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}`
      }
    }
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    description: 'Implementing error boundaries and recovery patterns',
    icon: <AlertCircle className="w-5 h-5" />,
    content: {
      explanation: 'Server Components introduce new patterns for handling errors both during rendering and data fetching, with built-in error boundary support.',
      keyPoints: [
        'Error boundary implementation',
        'Recovery UI patterns',
        'Global error handling',
        'Types of errors in Server Components',
        'Error logging and monitoring'
      ],
      code: {
        language: 'typescript',
        title: 'Error Handling Pattern',
        snippet: `// app/posts/error.tsx
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}`
      }
    }
  },
  {
    id: 'data-patterns',
    title: 'Data Patterns',
    description: 'Efficient data fetching in Server Components',
    icon: <Database className="w-5 h-5" />,
    content: {
      explanation: 'Server Components enable powerful data fetching patterns with direct database access and automatic request deduplication.',
      keyPoints: [
        'Parallel data fetching',
        'Request waterfall prevention',
        'Cache optimization strategies',
        'Database connection patterns',
        'Data revalidation approaches'
      ],
      code: {
        language: 'typescript',
        title: 'Parallel Data Fetching',
        snippet: `// app/dashboard/page.tsx
async function getUser(id: string) {
  return await db.user.findUnique({ where: { id } })
}

async function getPosts(userId: string) {
  return await db.post.findMany({ where: { userId } })
}

export default async function Dashboard() {
  const [user, posts] = await Promise.all([
    getUser('user-1'),
    getPosts('user-1')
  ])
  
  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
    </div>
  )
}`
      }
    }
  }
];

export default function ServerComponentsPage() {
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
              <span className="badge badge-components">
                Server Components
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {serverComponentTopics.length} concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Server Components
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Master React Server Components in Next.js 14 and learn how to build faster, more efficient applications with improved user experiences and simplified data access patterns.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {serverComponentTopics.map((topic) => (
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