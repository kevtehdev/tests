// src/app/tests/fundamentals.ts
import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const fundamentalsTest: Test = {
  id: 'fundamentals',
  category: TEST_CATEGORIES.FUNDAMENTALS,
  title: 'Next.js 14 Fundamentals',
  description: 'Master the core concepts and fundamentals of Next.js 14 including the App Router, Server Components, and project structure',
  questions: [
    {
      id: 'f1',
      question: 'Which statement about Server Components in Next.js 14 is correct?',
      code: `
// Example usage scenarios:

// Scenario A
async function DataComponent() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// Scenario B
'use client'
function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState()}>Click</button>;
}

// Scenario C
function MixedComponent() {
  return (
    <div>
      <ServerPart />
      <ClientPart />
    </div>
  );
}`,
      options: [
        'Server Components must always be marked with "use server" directive',
        'Server Components are the default in Next.js 14 App Router and can directly fetch data without client-side JavaScript',
        'Server Components cannot be mixed with Client Components in any way'
      ],
      correctAnswer: 1,
      explanation: 'In Next.js 14, components in the App Router are Server Components by default. They can fetch data directly, access backend resources, and reduce client-side JavaScript. They don\'t require any special directives and can be mixed with Client Components when needed.'
    },
    {
      id: 'f2',
      question: 'How do you properly implement layouts in Next.js 14?',
      code: `
// Which implementation is correct?

// Option A
app/
  layout.tsx      // Root layout
  blog/
    layout.tsx    // Blog layout
    [slug]/
      layout.tsx  // Individual blog layout
      page.tsx

// Option B
app/
  _layout.tsx
  blog/
    _layout.tsx
    [slug]/
      page.tsx

// Option C
app/
  layouts/
    RootLayout.tsx
    BlogLayout.tsx
  blog/
    [slug]/
      page.tsx`,
      options: [
        'Using layout.tsx files in corresponding directories',
        'Using _layout.tsx naming convention',
        'Using a centralized layouts directory'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses layout.tsx files placed in corresponding directories to define layouts. These layouts wrap their children automatically and can be nested. The layout.tsx file name is specifically recognized by Next.js for this purpose.'
    },
    {
      id: 'f3',
      question: 'What is the correct way to handle dynamic routes in Next.js 14?',
      code: `
// Which folder structure is correct?

// Option A
app/
  blog/
    [slug]/
      page.tsx
    [...catchAll]/
      page.tsx
    [[...optional]]/
      page.tsx

// Option B
app/
  blog/
    :slug/
      page.tsx
    *catchAll/
      page.tsx
    ?optional/
      page.tsx

// Option C
app/
  blog/
    (dynamic)/
      $slug/
        page.tsx
      $catchAll/
        page.tsx`,
      options: [
        'Using [slug], [...catchAll], and [[...optional]] syntax',
        'Using :slug, *catchAll, and ?optional syntax',
        'Using (dynamic)/$slug syntax'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses square brackets for dynamic routes: [slug] for single dynamic segments, [...catchAll] for catch-all routes, and [[...optional]] for optional catch-all routes. This is part of the file-system based routing in the App Router.'
    },
    {
      id: 'f4',
      question: 'How should you fetch data in Next.js 14 Server Components?',
      code: `
// Which pattern is recommended?

// Option A
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return <div>{data.title}</div>;
}

// Option B
'use client'
function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  return <div>{data?.title}</div>;
}

// Option C
function Page() {
  const { data } = useSWR('https://api.example.com/data');
  return <div>{data?.title}</div>;
}`,
      options: [
        'Using async/await with fetch directly in Server Components',
        'Using useEffect for data fetching',
        'Using SWR or React Query'
      ],
      correctAnswer: 0,
      explanation: 'In Next.js 14 Server Components, you can use fetch directly with async/await. This approach provides automatic request deduping, caching controls via the next options, and runs on the server, reducing client-side JavaScript.'
    },
    {
      id: 'f5',
      question: 'What is the correct way to implement loading states in Next.js 14?',
      code: `
// Which implementation provides the best loading experience?

// Option A
app/
  loading.tsx
  page.tsx
  products/
    loading.tsx
    page.tsx

// Option B
app/
  page.tsx
  products/
    page.tsx
    LoadingSpinner.tsx
    useLoading.ts

// Option C
app/
  loading/
    root.tsx
    products.tsx
  page.tsx
  products/
    page.tsx`,
      options: [
        'Using loading.tsx files in corresponding directories',
        'Using custom loading components and hooks',
        'Using a centralized loading directory'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses loading.tsx files for handling loading states. These files are automatically wrapped in Suspense boundaries and shown while the route segment is loading. They can be placed in any route segment to create a loading UI for that segment and its children.'
    },
    {
      id: 'f6',
      question: 'How do you handle errors in Next.js 14?',
      code: `
// Which error handling pattern is correct?

// Option A
app/
  error.tsx
  page.tsx
  products/
    error.tsx
    page.tsx

// Option B
app/
  page.tsx
  products/
    page.tsx
    ErrorBoundary.tsx
    useError.ts

// Option C
app/
  errors/
    root.tsx
    products.tsx
  page.tsx
  products/
    page.tsx`,
      options: [
        'Using error.tsx files in corresponding directories',
        'Using custom error boundaries and hooks',
        'Using a centralized errors directory'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses error.tsx files for error handling. These files must be Client Components and receive error and reset props. They act as React Error Boundaries and can be placed in any route segment to handle errors for that segment and its children.'
    },
    {
      id: 'f7',
      question: 'What is the correct way to implement route handlers in Next.js 14?',
      code: `
// Which API route implementation is correct?

// Option A
// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ data: 'products' });
}

// Option B
// pages/api/products.ts
export default function handler(req, res) {
  res.json({ data: 'products' });
}

// Option C
// app/api/products/api.ts
export class ProductsAPI {
  static async getProducts() {
    return { data: 'products' };
  }
}`,
      options: [
        'Using route.ts files with HTTP method exports',
        'Using API routes in pages directory',
        'Using class-based API handlers'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses route.ts files in the App Router for API routes. These files export functions named after HTTP methods (GET, POST, etc.) and use NextResponse for handling responses. This provides better type safety and more granular control over API endpoints.'
    },
        {
            id: 'f8',
            question: 'How should you implement metadata in Next.js 14?',
            code: `
      // Which metadata implementation is correct?
      
      // Option A
      // app/page.tsx
      export const metadata = {
        title: 'My Page',
        description: 'Page description'
      };
      
      // Option B
      // app/page.tsx
      export async function generateMetadata({ params }) {
        const product = await getProduct(params.id);
        return {
          title: product.name,
          description: product.description
        };
      }
      
      // Option C
      // app/layout.tsx
      export default function Layout({ children }) {
        return (
          <html>
            <head>
              <title>My Site</title>
              <meta name="description" content="Description" />
            </head>
            <body>{children}</body>
          </html>
        );
      }`,
            options: [
              'Using static metadata exports',
              'Using generateMetadata for dynamic metadata',
              'Manually setting meta tags in layout'
            ],
            correctAnswer: 1,
            explanation: 'Next.js 14 supports both static and dynamic metadata. generateMetadata is the recommended approach for dynamic metadata as it allows you to fetch data and generate metadata based on route parameters. Static metadata can be exported for simple cases.'
          },
          {
            id: 'f9',
            question: 'What is the correct way to implement parallel routes in Next.js 14?',
            code: `
      // Which implementation correctly uses parallel routes?
      
      // Option A
      app/
        @team/
          page.tsx
        @analytics/
          page.tsx
        layout.tsx
      
      // Option B
      app/
        parallel/
          team/
            page.tsx
          analytics/
            page.tsx
        layout.tsx
      
      // Option C
      app/
        team.parallel/
          page.tsx
        analytics.parallel/
          page.tsx
        layout.tsx`,
            options: [
              'Using @ prefix for parallel route folders',
              'Using a parallel directory structure',
              'Using .parallel suffix in folder names'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses the @ prefix for parallel routes. This allows you to render multiple pages in the same layout simultaneously. The matched slots are passed as props to the layout component.'
          },
          {
            id: 'f10',
            question: 'How do you properly implement private folders in Next.js 14?',
            code: `
      // Which approach correctly implements private folders?
      
      // Option A
      app/
        _private/
          components/
          utils/
        page.tsx
      
      // Option B
      app/
        (private)/
          components/
          utils/
        page.tsx
      
      // Option C
      app/
        private/
          components/
          utils/
        page.tsx`,
            options: [
              'Using _private prefix',
              'Using (private) convention',
              'Using private folder name'
            ],
            correctAnswer: 1,
            explanation: 'Next.js 14 uses parentheses (private) for route groups and private folders. This convention prevents the folder from affecting the route\'s URL path while organizing code. Private folders are useful for organizing internal components, utilities, and other non-route files.'
          },
          {
            id: 'f11',
            question: 'What is the correct way to handle redirects in Next.js 14?',
            code: `
      // Which redirect implementation is correct?
      
      // Option A
      // middleware.ts
      import { NextResponse } from 'next/server';
      
      export function middleware(request) {
        return NextResponse.redirect(new URL('/new-page', request.url));
      }
      
      // Option B
      // app/old-page/page.tsx
      import { redirect } from 'next/navigation';
      
      export default function Page() {
        redirect('/new-page');
      }
      
      // Option C
      // next.config.js
      module.exports = {
        async redirects() {
          return [
            {
              source: '/old-page',
              destination: '/new-page',
              permanent: true,
            },
          ];
        },
      };`,
            options: [
              'Using middleware for dynamic redirects',
              'Using redirect function in Server Components',
              'Using redirects in next.config.js'
            ],
            correctAnswer: 1,
            explanation: 'Next.js 14 provides the redirect function for handling redirects in Server Components. This is the recommended approach for dynamic redirects within your application logic. Middleware is better for request-time modifications, while next.config.js is better for static redirects.'
          },
          {
            id: 'f12',
            question: 'How should you implement route interception in Next.js 14?',
            code: `
      // Which implementation correctly intercepts routes?
      
      // Option A
      app/
        feed/
          page.tsx
          (..)photo/[id]/
            page.tsx
        photo/[id]/
          page.tsx
      
      // Option B
      app/
        feed/
          page.tsx
          intercept/
            photo/[id]/
              page.tsx
        photo/[id]/
          page.tsx
      
      // Option C
      app/
        feed/
          page.tsx
          @photo/[id]/
            page.tsx
        photo/[id]/
          page.tsx`,
            options: [
              'Using (..) convention for intercepting routes',
              'Using intercept directory',
              'Using @ prefix for intercepted routes'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses the (..) convention for route interception. This allows you to intercept routes and show them in a different context, like displaying a photo in a modal when navigating from a feed but as a full page when accessed directly.'
          },
          {
            id: 'f13',
            question: 'What is the correct way to implement default pages in Next.js 14?',
            code: `
      // Which implementation correctly handles default pages?
      
      // Option A
      app/
        (marketing)/
          default.tsx
          page.tsx
        (shop)/
          default.tsx
          page.tsx
      
      // Option B
      app/
        (marketing)/
          index.tsx
          page.tsx
        (shop)/
          index.tsx
          page.tsx
      
      // Option C
      app/
        (marketing)/
          [...default]/
            page.tsx
        (shop)/
          [...default]/
            page.tsx`,
            options: [
              'Using default.tsx files',
              'Using index.tsx files',
              'Using catch-all default routes'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses default.tsx files to provide fallback UI for slots in parallel routes. When a slot doesn\'t have a matching segment, the default.tsx file will be rendered instead.'
          },
          {
            id: 'f14',
            question: 'How do you properly implement not-found handling in Next.js 14?',
            code: `
      // Which implementation correctly handles not-found pages?
      
      // Option A
      app/
        not-found.tsx
        [category]/
          not-found.tsx
          page.tsx
      
      // Option B
      app/
        404.tsx
        [category]/
          404.tsx
          page.tsx
      
      // Option C
      app/
        _404/
          page.tsx
        [category]/
          _404/
            page.tsx`,
            options: [
              'Using not-found.tsx files',
              'Using 404.tsx files',
              'Using _404 directories'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses not-found.tsx files for handling not-found pages. These files can be placed at any level and will be shown when notFound() is thrown or when a route segment is not matched.'
          },
          {
            id: 'f15',
            question: 'What is the correct way to implement server-side revalidation in Next.js 14?',
            code: `
      // Which revalidation approach is correct?
      
      // Option A
      // app/api/revalidate/route.ts
      import { revalidatePath } from 'next/cache';
      
      export async function POST(request: Request) {
        const path = await request.json();
        revalidatePath(path);
        return Response.json({ revalidated: true });
      }
      
      // Option B
      // app/page.tsx
      export const revalidate = 60;
      
      export default async function Page() {
        const data = await fetch('https://api.example.com/data');
        return <div>{data}</div>;
      }
      
      // Option C
      // next.config.js
      module.exports = {
        revalidate: {
          paths: ['/blog/*'],
          interval: 60
        }
      };`,
            options: [
              'Using revalidatePath in API routes',
              'Using revalidate option in page components',
              'Using revalidate in next.config.js'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 provides revalidatePath for on-demand revalidation of cached data. This is typically used in API routes or Server Actions to trigger revalidation when data changes. The revalidate export in components is for time-based revalidation.'
          },
          {
            id: 'f16',
            question: 'How should you handle static params generation in Next.js 14?',
            code: `
      // Which implementation correctly generates static params?
      
      // Option A
      // app/blog/[slug]/page.tsx
      export async function generateStaticParams() {
        const posts = await getPosts();
        return posts.map((post) => ({
          slug: post.slug,
        }));
      }
      
      // Option B
      // app/blog/[slug]/page.tsx
      export async function getStaticPaths() {
        const posts = await getPosts();
        return {
          paths: posts.map((post) => ({
            params: { slug: post.slug },
          })),
          fallback: false,
        };
      }
      
      // Option C
      // app/blog/[slug]/static.ts
      export async function getParams() {
        const posts = await getPosts();
        return posts.map((post) => post.slug);
      }`,
            options: [
              'Using generateStaticParams function',
              'Using getStaticPaths function',
              'Using separate static param generator'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses generateStaticParams for generating static params at build time. This function is used in combination with dynamic route segments to specify which routes should be pre-rendered.'
          },
          {
            id: 'f17',
            question: 'What is the correct way to implement route segment configuration in Next.js 14?',
            code: `
      // Which configuration approach is correct?
      
      // Option A
      // app/products/page.tsx
      export const dynamic = 'force-dynamic';
      export const revalidate = 60;
      export const fetchCache = 'force-cache';
      
      // Option B
      // app/products/config.ts
      export default {
        dynamic: true,
        revalidate: 60,
        cache: true
      };
      
      // Option C
      // next.config.js
      module.exports = {
        routeConfig: {
          '/products': {
            dynamic: true,
            revalidate: 60
          }
        }
      };`,
            options: [
              'Using segment config exports in page files',
              'Using separate config files',
              'Using next.config.js route configuration'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses route segment configuration through exports in page files. These configs (dynamic, revalidate, fetchCache) control how the route segment behaves in terms of rendering and caching.'
          },
          {
            id: 'f18',
            question: 'How do you implement proper image optimization in Next.js 14?',
            code: `
      // Which image implementation is correct?
      
      // Option A
      import Image from 'next/image';
      
      export default function Gallery() {
        return (
          <Image
            src="/photo.jpg"
            width={500}
            height={300}
            alt="Photo"
            priority={true}
          />
        );
      }
      
      // Option B
      export default function Gallery() {
        return (
          <img
            src="/photo.jpg"
            width="500"
            height="300"
            alt="Photo"
            loading="eager"
          />
        );
      }
      
      // Option C
      import { OptimizedImage } from '@/components/OptimizedImage';
      
      export default function Gallery() {
        return (
          <OptimizedImage
            src="/photo.jpg"
            dimensions={{ width: 500, height: 300 }}
            alt="Photo"
          />
        );
      }`,
            options: [
              'Using next/image component with required props',
              'Using standard img tag with loading attribute',
              'Using custom optimized image component'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 provides the Image component from next/image for automatic image optimization. It requires width and height props, supports priority loading for LCP images, and automatically handles responsive images and lazy loading.'
          },
          {
            id: 'f19',
            question: 'What is the correct way to implement streaming with suspense in Next.js 14?',
            code: `
      // Which streaming implementation is correct?
      
      // Option A
      import { Suspense } from 'react';
      
      export default function Page() {
        return (
          <>
            <Header />
            <Suspense fallback={<Loading />}>
              <SlowComponent />
            </Suspense>
            <Footer />
          </>
        );
      }
      
      // Option B
      export default async function Page() {
        const data = await fetchSlowData();
        return (
          <>
            <Header />
            <SlowComponent data={data} />
            <Footer />
          </>
        );
      }
      
      // Option C
      'use client'
      export default function Page() {
        const { data, loading } = useSlowData();
        return (
          <>
            <Header />
            {loading ? <Loading /> : <SlowComponent data={data} />}
            <Footer />
          </>
        );
      }`,
            options: [
              'Using Suspense boundaries around slow components',
              'Using await for all data fetching',
              'Using loading states in client components'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses Suspense boundaries for streaming content. This allows faster page loads by showing a fast initial page with fallbacks, then streaming in the slower content progressively as it becomes available.'
          },
          {
            id: 'f20',
            question: 'How should you implement route handlers in Next.js 14?',
            code: `
      // Which route handler implementation is correct?
      
      // Option A
      // app/api/posts/route.ts
      import { NextResponse } from 'next/server';
      
      export async function GET(request: Request) {
        const data = await getData();
        return NextResponse.json(data);
      }
      
      export async function POST(request: Request) {
        const body = await request.json();
        const data = await createData(body);
        return NextResponse.json(data, { status: 201 });
      }
      
      // Option B
      // pages/api/posts.ts
      export default async function handler(req, res) {
        if (req.method === 'GET') {
          const data = await getData();
          res.json(data);
        } else if (req.method === 'POST') {
          const data = await createData(req.body);
          res.status(201).json(data);
        }
      }
      
      // Option C
      // app/api/posts/api.ts
      export class PostsAPI {
        static async get(req: Request) {
          const data = await getData();
          return Response.json(data);
        }
        
        static async post(req: Request) {
          const data = await createData(await req.json());
          return Response.json(data);
        }
      }`,
            options: [
              'Using separate HTTP method exports with NextResponse',
              'Using a single handler function with method checks',
              'Using static class methods for each HTTP method'
            ],
            correctAnswer: 0,
            explanation: 'Next.js 14 uses separate HTTP method exports (GET, POST, etc.) in route.ts files for API routes. This provides better type safety, clearer separation of concerns, and supports the Web Request and Response APIs. Each method is isolated and can handle its specific logic independently.'
          }
        ]
      };