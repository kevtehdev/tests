import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const deploymentTest: Test = {
  id: 'deployment',
  category: TEST_CATEGORIES.DEPLOYMENT,
  title: 'Next.js 14 Deployment',
  description: 'Master deployment strategies, configurations, and optimization techniques for Next.js 14 applications',
  metadata: {
    difficulty: 'intermediate',
    duration: 30,
    passingScore: 70,
    prerequisites: ['Basic Next.js knowledge', 'Understanding of deployment concepts'],
    learningObjectives: [
      'Master environment configuration',
      'Learn deployment strategies',
      'Understand caching and optimization'
    ]
  },
  questions: [
    {
      id: 'dep1',
      question: 'What is the correct way to handle environment variables in Next.js 14?',
      code: `
// Which environment variable implementation is correct?

// Option A
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://...

// pages/api/data.ts
export async function GET() {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  const dbUrl = process.env.DATABASE_URL;
}

// Option B
// next.config.js
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  }
}

// Option C
// config/env.ts
export const env = {
  apiUrl: process.env.API_URL,
  databaseUrl: process.env.DATABASE_URL,
}`,
      options: [
        'Option A: Using next.config.js env configuration',
        'Option B: Using centralized env configuration',
        'Option C: Using .env.local with NEXT_PUBLIC prefix',
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using .env.local with NEXT_PUBLIC prefix for client-exposed variables. This approach ensures proper handling of environment variables, keeping sensitive variables server-side only and exposing public variables where needed.'
    },
    {
      id: 'dep2',
      question: 'How should you implement output configuration for deployment in Next.js 14?',
      code: `
// Which output configuration is most optimal?

// Option A
// next.config.js
module.exports = {
  output: 'standalone',
  generateBuildId: async () => {
    return 'my-build-id'
  },
  poweredByHeader: false,
  compress: true,
}

// Option B
// next.config.js
module.exports = {
  target: 'server',
  distDir: 'build',
  generateEtags: true
}

// Option C
// package.json
{
  "scripts": {
    "build": "next build && next export",
    "start": "next start"
  }
}`,
      options: [
        'Option A: Using standalone output with build optimization',
        'Option B: Using server target with custom build directory',
        'Option C: Using static export configuration'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 performs best with standalone output configuration for deployments. This creates a minimal production build that includes only the necessary dependencies and optimizes for production deployment.'
    },
    {
      id: 'dep3',
      question: 'What is the correct way to implement caching headers for deployment?',
      code: `
// Which caching implementation is correct?

// Option A
// app/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headers = new Headers();
  headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  
  const product = await getProduct(params.id);
  return new Response(JSON.stringify(product), {
    headers,
    status: 200
  });
}

// Option B
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  );
  return response;
}

// Option C
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ]
  }
}`,
      options: [
        'Option A: Using middleware for global cache headers',
        'Option B: Using next.config.js header configuration',
        'Option C: Using route handlers with granular cache control',
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 recommends implementing cache headers at the route handler level for granular control. This enables specific caching strategies for different routes and content types while maintaining flexibility.'
    },
    {
      id: 'dep4',
      question: 'How do you implement proper error tracking for production in Next.js 14?',
      code: `
// Which error tracking implementation is correct?

// Option A
// app/error.tsx
'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error tracking service
    captureException(error, {
      tags: { digest: error.digest }
    });
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Option B
// middleware.ts
export function middleware(request: NextRequest) {
  try {
    return NextResponse.next();
  } catch (error) {
    logError(error);
    return NextResponse.error();
  }
}

// Option C
// app/api/error/route.ts
export async function POST(request: Request) {
  const error = await request.json();
  await logError(error);
  return Response.json({ logged: true });
}`,
      options: [
        'Option A: Using error boundary with error tracking integration',
        'Option B: Using middleware error catching',
        'Option C: Using dedicated error logging endpoint'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 provides the best error tracking through error boundaries with integrated error tracking services. This captures both client and server errors with proper context and error digests for debugging.'
    },
    {
      id: 'dep5',
      question: 'What is the correct way to implement health checks for deployment?',
      code: `
// Which health check implementation is most reliable?

// Option A
// app/api/health/route.ts
export async function GET() {
  try {
    await Promise.all([
      prisma.$queryRaw\`SELECT 1\`,
      redis.ping(),
      checkExternalServices()
    ]);
    
    return new Response('OK', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    return new Response('ERROR', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Option B
// app/health/page.tsx
export default async function Health() {
  const health = await checkHealth();
  return <div>{health.status}</div>;
}

// Option C
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/health') {
    return new Response('OK');
  }
}`,
      options: [
        'Option A: Using page component for health status',
        'Option B; Using middleware health check response',
        'Option C: Using dedicated health check route with service checks'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 applications should implement health checks as dedicated API routes that verify all critical service dependencies. This ensures comprehensive system health monitoring and reliable deployment status checks.'
    },
    {
      id: 'dep6',
      question: 'How should you implement build caching for CI/CD pipelines?',
      code: `
// Which build cache configuration is most efficient?

// Option A
// next.config.js
module.exports = {
  experimental: {
    turbotrace: {
      contextDirectory: __dirname,
    },
  },
  outputFileTracing: true,
  generateBuildId: async () => {
    return GitRevisionPlugin.version();
  },
}

// .dockerignore
node_modules
.next
!.next/cache

// Dockerfile
COPY .next/cache .next/cache
COPY . .
RUN npm ci
RUN npm run build

// Option B
// package.json
{
  "scripts": {
    "build": "rm -rf .next && next build"
  }
}

// Option C
// next.config.js
module.exports = {
  distDir: process.env.BUILD_DIR || '.next'
}`,
      options: [
        'Option A: Using build cache with proper Docker configuration',
        'Option B: Clearing cache before each build',
        'Option C: Using custom build directory'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 builds are most efficient when properly utilizing build caches in CI/CD pipelines. This includes correct Docker cache configuration, output tracing, and proper handling of the Next.js cache directory.'
    },
    {
      id: 'dep7',
      question: 'What is the correct way to implement preview deployments?',
      code: `
// Which preview implementation is correct?

// Option A
// next.config.js
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [{ type: 'header', key: 'x-preview-token' }],
          destination: '/api/preview/:path*',
        },
      ],
    };
  },
};

// app/api/preview/[...path]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const previewToken = request.headers.get('x-preview-token');
  const previewData = await getPreviewData(previewToken);
  
  if (!previewData) {
    return Response.error();
  }
  
  const response = await fetch(\`\${process.env.API_URL}/\${params.path.join('/')}\`);
  return new Response(response.body, {
    headers: response.headers,
  });
}

// Option B
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.headers.has('x-preview')) {
    return NextResponse.rewrite(new URL('/preview' + request.nextUrl.pathname, request.url));
  }
}

// Option C
// app/api/preview/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (!token) {
    return Response.error();
  }
  
  const response = NextResponse.next();
  response.cookies.set('preview', token);
  return response;
}`,
      options: [
        'Option A: Using middleware preview redirection',
        'Option B: Using rewrites with preview API routes',
        'Option C: Using cookie-based preview system'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 preview deployments work best with rewrites and dedicated preview API routes. This enables secure preview functionality with dynamic parameter handling while maintaining proper separation of preview and production traffic.'
    },
    {
      id: 'dep8',
      question: 'How do you implement proper logging for production deployments?',
      code: `
// Which logging implementation is most appropriate?

// Option A
// lib/logger.ts
const logger = {
  info: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify({
        level: 'info',
        message,
        timestamp: new Date().toISOString(),
        ...meta
      }));
    } else {
      console.log(\`[INFO] \${message}\`, meta);
    }
  },
  error: (message: string, error?: Error, meta?: object) => {
    if (process.env.NODE_ENV === 'production') {
      console.error(JSON.stringify({
        level: 'error',
        message,
        error: error?.stack,
        timestamp: new Date().toISOString(),
        ...meta
      }));
    } else {
      console.error(\`[ERROR] \${message}\`, error, meta);
    }
  }
};

// Option B
// middleware.ts
export function middleware(request: NextRequest) {
  console.log(\`[Request] \${request.method} \${request.url}\`);
  return NextResponse.next();
}

// Option C
// app/api/log/route.ts
export async function POST(request: Request) {
  const log = await request.json();
  console.log(log);
  return Response.json({ logged: true });
}`,
      options: [
        'Option A: Using middleware request logging',
        'Option B: Using dedicated logging endpoint',
        'Option C: Using structured logging with environment awareness',
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 production deployments should use structured logging with environment-aware formatting. This ensures proper log aggregation, searchability, and debugging capabilities in production environments.'
    },
    {
      id: 'dep9',
      question: 'What is the correct way to implement CDN configuration?',
      code: `
// Which CDN configuration is most optimal?

// Option A
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};

// Option B
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ];
  }
}

// Option C
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'public, max-age=3600');
  return response;
}`,
      options: [
        'Option A: Using single global cache policy',
        'Option B: Using differentiated cache control headers',
        'Option C: Using middleware cache handling'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 performs best with differentiated CDN caching strategies. This allows for aggressive caching of static assets while maintaining appropriate caching policies for dynamic data and API routes.'
    },
    {
      id: 'dep10',
      question: 'How should you implement deployment monitoring?',
      code: `
      // Which monitoring implementation is most comprehensive?
      
      // Option A
      // instrumentation.ts
      export async function register() {
        if (process.env.NEXT_RUNTIME === 'nodejs') {
          const { setupMonitoring } = await import('./monitoring');
          const { metrics, traces } = setupMonitoring();
          
          return {
            middleware: async (req, res, next) => {
              const start = performance.now();
              try {
                await next();
              } finally {
                const duration = performance.now() - start;
                metrics.recordMetric('request_duration', duration, {
                  path: req.url,
                  status: res.statusCode
                });
              }
            },
            
            onError: (error) => {
              traces.recordError(error);
            }
          };
        }
      }
      
      // monitoring.ts
      export function setupMonitoring() {
        return {
          metrics: {
            recordMetric: (name, value, tags) => {
              // Send to metrics service
            }
          },
          traces: {
            recordError: (error) => {
              // Send to tracing service
            }
          }
        };
      }
      
      // Option B
      // middleware.ts
      export function middleware(request: NextRequest) {
        console.log(\`Request: \${request.method} \${request.url}\`);
        return NextResponse.next();
      }
      
      // Option C
      // app/api/monitor/route.ts
      export async function POST(request: Request) {
        const metrics = await request.json();
        console.log('Metrics:', metrics);
        return Response.json({ received: true });
      }`,
            options: [
              'Option A: Using middleware logging',
              'Option B: Using monitoring endpoint',
              'Option C: Using instrumentation with metrics and tracing'
            ],
            correctAnswer: 2,
            explanation: 'Next.js 14 provides comprehensive monitoring through instrumentation hooks, allowing proper metrics collection and tracing integration. This approach enables detailed performance monitoring, error tracking, and request tracing in production environments.'
          }
        ]
      };