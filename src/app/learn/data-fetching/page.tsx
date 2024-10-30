import React from 'react';
import { Server, ArrowLeft, Database, Workflow, Zap, RefreshCw, Lock } from 'lucide-react';
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

const dataFetchingTopics: Topic[] = [
  {
    id: 'server-fetching',
    title: 'Server-Side Data Fetching',
    description: 'Fetching data directly in Server Components',
    icon: <Server className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 enables powerful server-side data fetching capabilities with built-in caching and revalidation strategies.',
      keyPoints: [
        'Async Server Components',
        'Parallel data fetching',
        'Automatic request deduplication',
        'Extended fetch options',
        'Type-safe data fetching'
      ],
      code: {
        language: 'typescript',
        title: 'Server Component Data Fetching',
        snippet: `// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['products'] // Cache tag for targeted revalidation
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`
      }
    }
  },
  {
    id: 'revalidation',
    title: 'Data Revalidation Strategies',
    description: 'Managing data freshness and cache invalidation',
    icon: <RefreshCw className="w-5 h-5" />,
    content: {
      explanation: 'Next.js offers multiple strategies for revalidating cached data, including time-based, on-demand, and tag-based revalidation.',
      keyPoints: [
        'Time-based revalidation (ISR)',
        'On-demand revalidation',
        'Tag-based cache invalidation',
        'Route segment revalidation',
        'Granular cache control'
      ],
      code: {
        language: 'typescript',
        title: 'Revalidation Patterns',
        snippet: `// Route Handler for revalidation
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Revalidate products when they're updated
export async function POST(request: NextRequest) {
  const token = request.headers.get('authorization');
  
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json(
      { message: 'Invalid token' }, 
      { status: 401 }
    );
  }

  try {
    revalidateTag('products');
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating' }, 
      { status: 500 }
    );
  }
}`
      }
    }
  },
  {
    id: 'mutation-patterns',
    title: 'Data Mutation Patterns',
    description: 'Server Actions and optimistic updates',
    icon: <Workflow className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 introduces Server Actions for data mutations, providing a powerful way to update data with optimistic UI updates.',
      keyPoints: [
        'Server Actions for mutations',
        'Optimistic updates',
        'Error handling and rollbacks',
        'Form handling',
        'Progressive enhancement'
      ],
      code: {
        language: 'typescript',
        title: 'Server Action with Optimistic Update',
        snippet: `// app/actions.ts
'use server'

import { revalidateTag } from 'next/cache';

export async function updateProduct(
  productId: string,
  data: { name: string; price: number }
) {
  try {
    const response = await fetch(
      \`https://api.example.com/products/\${productId}\`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    revalidateTag('products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// app/components/ProductForm.tsx
'use client'

import { useOptimistic } from 'react';
import { updateProduct } from './actions';

export function ProductForm({ product }) {
  const [optimisticProduct, updateOptimisticProduct] = 
    useOptimistic(product);

  async function handleSubmit(formData: FormData) {
    const updates = {
      name: formData.get('name'),
      price: Number(formData.get('price'))
    };

    // Optimistically update UI
    updateOptimisticProduct({ ...product, ...updates });

    // Perform actual update
    await updateProduct(product.id, updates);
  }

  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}`
      }
    }
  },
  {
    id: 'streaming',
    title: 'Streaming and Suspense',
    description: 'Progressive data loading patterns',
    icon: <Zap className="w-5 h-5" />,
    content: {
      explanation: 'Implement streaming and progressive loading for better user experience with large data sets or slow APIs.',
      keyPoints: [
        'Streaming Server Rendering',
        'Loading UI and Suspense',
        'Concurrent data fetching',
        'Progressive enhancement',
        'Fallback patterns'
      ],
      code: {
        language: 'typescript',
        title: 'Streaming Implementation',
        snippet: `// app/dashboard/page.tsx
import { Suspense } from 'react';
import { Loading } from '@/components/Loading';

// Slow data fetch
async function getAnalytics() {
  const res = await fetch('https://api.example.com/analytics', {
    next: { revalidate: 3600 }
  });
  return res.json();
}

// Fast data fetch
async function getBasicStats() {
  const res = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 }
  });
  return res.json();
}

export default async function DashboardPage() {
  // This loads immediately
  const stats = await getBasicStats();

  return (
    <div className="space-y-8">
      {/* Show basic stats immediately */}
      <BasicStats stats={stats} />
      
      {/* Stream in analytics data */}
      <Suspense 
        fallback={
          <Loading className="h-96" message="Loading analytics..." />
        }
      >
        <AnalyticsChart />
      </Suspense>
    </div>
  );
}

// Separate component for streamed content
async function AnalyticsChart() {
  const analytics = await getAnalytics();
  return <Chart data={analytics} />;
}`
      }
    }
  },
  {
    id: 'caching',
    title: 'Caching Strategies',
    description: 'Optimizing data fetching with caching',
    icon: <Database className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 provides a powerful caching system with multiple layers including Route Cache, Router Cache, and Data Cache.',
      keyPoints: [
        'Route segment config options',
        'Manual cache control',
        'Statically cached data',
        'Dynamic data strategies',
        'Cache persistence options'
      ],
      code: {
        language: 'typescript',
        title: 'Advanced Caching Patterns',
        snippet: `// utils/cache.ts
import { unstable_cache } from 'next/cache';

// Cached database query
export const getCachedProducts = unstable_cache(
  async (category: string) => {
    const products = await db.product.findMany({
      where: { category },
      include: { reviews: true }
    });
    return products;
  },
  ['products'],
  {
    revalidate: 3600,
    tags: ['products']
  }
);

// app/products/[category]/page.tsx
export default async function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  // This call is cached and shared across requests
  const products = await getCachedProducts(params.category);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          reviews={product.reviews}
        />
      ))}
    </div>
  );
}`
      }
    }
  },
  {
    id: 'security',
    title: 'Security and Authorization',
    description: 'Secure data fetching patterns',
    icon: <Lock className="w-5 h-5" />,
    content: {
      explanation: 'Implement secure data fetching patterns with proper authentication, authorization, and data validation.',
      keyPoints: [
        'Protected API routes',
        'Token handling',
        'Rate limiting',
        'Data validation',
        'Error handling patterns'
      ],
      code: {
        language: 'typescript',
        title: 'Secure Data Fetching',
        snippet: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Check for protected routes
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Missing token' },
        { status: 401 }
      );
    }

    try {
      const verified = await verifyToken(token);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', verified.userId);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}`
      }
    }
  }
];

export default function DataFetchingPage() {
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
              <span className="badge badge-data">
                Data Fetching
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {dataFetchingTopics.length} concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Data Fetching
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Master modern data fetching patterns in Next.js 14 to build fast, dynamic applications with efficient data loading and caching strategies.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {dataFetchingTopics.map((topic) => (
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