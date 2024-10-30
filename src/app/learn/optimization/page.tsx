import React from 'react';
import { ArrowLeft, Image, Zap, Globe, BarChart, Code, Gauge } from 'lucide-react';
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

const optimizationTopics: Topic[] = [
  {
    id: 'image-optimization',
    title: 'Image Optimization',
    description: 'Advanced image handling and optimization techniques',
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: <Image className="w-5 h-5" />,
    content: {
      explanation: 'Next.js provides automatic image optimization with the next/image component, offering modern image formats, responsive sizes, and lazy loading out of the box.',
      keyPoints: [
        'Automatic WebP/AVIF conversion',
        'Lazy loading and blur placeholders',
        'Responsive image sizes',
        'Automatic size optimization',
        'CDN source optimization'
      ],
      code: {
        language: 'typescript',
        title: 'Optimized Image Component',
        snippet: `import Image from 'next/image';

export default function ProductImage() {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src="/products/camera.jpg"
        alt="Digital Camera"
        fill
        sizes="(max-width: 768px) 100vw, 
               (max-width: 1200px) 50vw,
               33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j..."
        priority={true}
        className="object-cover"
      />
    </div>
  );
}`
      }
    }
  },
  {
    id: 'metadata-seo',
    title: 'Metadata and SEO',
    description: 'Search engine optimization and metadata management',
    icon: <Globe className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 introduces a powerful Metadata API for managing SEO, enabling both static and dynamic metadata generation at the page level.',
      keyPoints: [
        'Static and dynamic metadata',
        'OpenGraph and Twitter cards',
        'JSON-LD structured data',
        'Robots and sitemap generation',
        'Title and meta description templates'
      ],
      code: {
        language: 'typescript',
        title: 'Metadata Implementation',
        snippet: `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Page',
  description: 'View our latest products',
  openGraph: {
    images: ['/images/product.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};`
      }
    }
  },
  {
    id: 'static-dynamic',
    title: 'Static and Dynamic Optimization',
    description: 'Balancing static generation and dynamic rendering',
    icon: <Zap className="w-5 h-5" />,
    content: {
      explanation: 'Next.js offers multiple rendering strategies to optimize performance and data freshness based on your specific use case.',
      keyPoints: [
        'Static Site Generation (SSG)',
        'Incremental Static Regeneration (ISR)',
        'Dynamic rendering when needed',
        'Partial prerendering strategy',
        'Cache revalidation patterns'
      ],
      code: {
        language: 'typescript',
        title: 'Mixed Rendering Patterns',
        snippet: `// Set revalidation time for the entire page
export const revalidate = 3600; // Revalidate every hour

// Generate static pages at build time
export async function generateStaticParams() {
  const products = await getTopProducts();
  return products.map((product) => ({
    id: product.id
  }));
}

// Page component with mixed static/dynamic data
export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Static data - cached for 1 hour
  const product = await getProduct(params.id);
  
  // Dynamic data - never cached
  const inventory = await getInventory(params.id, {
    next: { revalidate: 0 }
  });
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>In stock: {inventory.count}</p>
    </div>
  );
}`
      }
    }
  },
  {
    id: 'performance-monitoring',
    title: 'Performance Monitoring',
    description: 'Tracking and improving core web vitals',
    icon: <BarChart className="w-5 h-5" />,
    content: {
      explanation: 'Monitor and optimize your application\'s performance using built-in Next.js analytics and third-party tools to track Core Web Vitals.',
      keyPoints: [
        'Core Web Vitals tracking',
        'Custom performance metrics',
        'Real user monitoring (RUM)',
        'Server-side metrics',
        'Performance regression detection'
      ],
      code: {
        language: 'typescript',
        title: 'Performance Monitoring Setup',
        snippet: `// app/layout.tsx
export function reportWebVitals(metric: {
  id: string;
  name: string;
  label: string;
  value: number;
}) {
  switch (metric.name) {
    case 'FCP':
      console.log('FCP:', metric.value);
      break;
    case 'LCP':
      console.log('LCP:', metric.value);
      break;
    case 'CLS':
      console.log('CLS:', metric.value);
      break;
  }
}`
      }
    }
  },
  {
    id: 'code-splitting',
    title: 'Code Splitting',
    description: 'Optimizing bundle size and load time',
    icon: <Code className="w-5 h-5" />,
    content: {
      explanation: 'Next.js provides automatic code splitting and dynamic imports to optimize initial page load and improve application performance.',
      keyPoints: [
        'Automatic route-based splitting',
        'Dynamic component imports',
        'Route segment optimization',
        'Module preloading strategies',
        'Bundle analyzer integration'
      ],
      code: {
        language: 'typescript',
        title: 'Dynamic Import Usage',
        snippet: `import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => 
  import('@/components/Chart'), {
    loading: () => <p>Loading chart...</p>,
    ssr: false
});

export default function Dashboard() {
  return (
    <div>
      <h1>Analytics</h1>
      <DynamicChart data={analyticsData} />
    </div>
  );
}`
      }
    }
  },
  {
    id: 'caching-strategies',
    title: 'Caching Strategies',
    description: 'Implementing effective caching patterns',
    icon: <Gauge className="w-5 h-5" />,
    content: {
      explanation: 'Next.js 14 provides multiple layers of caching to optimize performance, including Router Cache, Data Cache, and Full Route Cache.',
      keyPoints: [
        'Router cache implementation',
        'Data cache configurations',
        'Full route cache strategy',
        'Cache revalidation patterns',
        'Cache optimization techniques'
      ],
      code: {
        language: 'typescript',
        title: 'Advanced Caching Implementation',
        snippet: `import { unstable_cache } from 'next/cache';

const getCachedData = unstable_cache(
  async (key: string) => {
    const data = await fetchData(key);
    return data;
  },
  ['data-cache'],
  {
    revalidate: 3600,
    tags: ['data']
  }
);`
      }
    }
  }
];

export default function OptimizationPage() {
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
              <span className="badge badge-optimization">
                Optimization
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {optimizationTopics.length} concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Optimization
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Master performance optimization techniques in Next.js 14 to build lightning-fast applications with excellent user experience and SEO rankings.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {optimizationTopics.map((topic) => (
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