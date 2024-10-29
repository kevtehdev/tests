import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const routingTest: Test = {
  id: 'next-routing',
  category: TEST_CATEGORIES.ROUTING,
  title: 'Next.js 14 Routing Fundamentals',
  description: 'Master the essential routing concepts in Next.js 14 including advanced patterns and best practices',
  questions: [
    {
      id: 'r1',
      question: 'How do you implement dynamic routes in Next.js 14?',
      code: `
// Which implementation correctly handles dynamic routes?

// Option A
// app/products/[id]/page.tsx
export default function Page({ params }: { 
  params: { id: string } 
}) {
  return <ProductDetails id={params.id} />;
}

// app/products/[id]/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}

// app/products/[id]/error.tsx
'use client'
export default function Error({ 
  error, 
  reset 
}: { 
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}

// Option B
// app/products/[...id].tsx
export default function Page(props: any) {
  const id = props.params.id.join('/');
  return <ProductDetails id={id} />;
}

// Option C
// app/products/page.tsx
export default function Page() {
  const { id } = useParams();
  return <ProductDetails id={id} />;
}`,
      options: [
        'Option A: Using folder-based dynamic routes with proper error handling',
        'Option B: Using catch-all dynamic routes',
        'Option C: Using useParams hook'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using folder-based dynamic routes with proper error and loading states. This structure provides type-safe params and built-in error boundaries and loading states.'
    },
    {
      id: 'r2',
      question: 'What is the correct way to implement parallel routes in Next.js 14?',
      code: `
// Which implementation correctly uses parallel routes?

// Option A
// app/layout.tsx
export default function Layout({
  children,
  team,
  analytics
}: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div>
      {children}
      {team}
      {analytics}
    </div>
  )
}

// app/@team/page.tsx
export default function Team() {
  return <TeamList />
}

// app/@analytics/page.tsx
export default function Analytics() {
  return <AnalyticsDashboard />
}

// Option B
// app/page.tsx
export default function Page() {
  return (
    <>
      <TeamList />
      <AnalyticsDashboard />
    </>
  )
}

// Option C
// app/layout.tsx
export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Suspense>
        <TeamList />
        <AnalyticsDashboard />
      </Suspense>
      {children}
    </div>
  )
}`,
      options: [
        'Option A: Rendering components side by side',
        'Option B: Using @folder convention with parallel route slots',
        'Option C: Using Suspense in layout'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 uses the @folder convention for parallel routes, allowing independent loading states and error handling for each route slot.'
    },
    {
      id: 'r3',
      question: 'How do you implement intercepting routes in Next.js 14?',
      code: `
// Which implementation correctly uses intercepting routes?

// Option A
// app/feed/page.tsx
export default function Feed() {
  return <PostList />;
}

// app/feed/(..)post/[id]/page.tsx
export default function Post({ params }: { 
  params: { id: string } 
}) {
  return <PostModal id={params.id} />;
}

// Option B
// app/feed/page.tsx
export default function Feed() {
  return (
    <Dialog>
      <PostList />
      <Route path="/post/:id">
        <PostModal />
      </Route>
    </Dialog>
  );
}

// Option C
// app/feed/page.tsx
'use client'
export default function Feed() {
  const [selectedPost, setSelectedPost] = useState(null);
  
  return (
    <>
      <PostList onSelect={setSelectedPost} />
      {selectedPost && <PostModal id={selectedPost} />}
    </>
  );
}`,
      options: [
        'Option A: Using client-side state management',
        'Option B: Using nested routes with Dialog',
        'Option C: Using (..) convention for intercepting routes'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 uses the (..) convention for intercepting routes, allowing you to show a route in a different context while preserving the ability to navigate to the original route.'
    },
    {
      id: 'r4',
      question: 'What is the correct way to implement route groups in Next.js 14?',
      code: `
// Which implementation correctly uses route groups?

// Option A
// app/(shop)/layout.tsx
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="shop-layout">
      <ShopNav />
      {children}
    </div>
  )
}

// app/(shop)/products/page.tsx
// app/(shop)/categories/page.tsx

// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="marketing-layout">
      <MarketingNav />
      {children}
    </div>
  )
}

// Option B
// app/shop/layout.tsx
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  if (isShopRoute()) {
    return <ShopLayout>{children}</ShopLayout>;
  }
  return <MarketingLayout>{children}</MarketingLayout>;
}

// Option C
// app/layout.tsx
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider>
      {children}
    </LayoutProvider>
  )
}`,
      options: [
        'Option A: Using layout provider',
        'Option B: Using conditional layouts',
        'Option C: Using (folder) convention for route groups'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 uses (folder) convention for route groups to organize routes without affecting the URL structure and share common layouts between specific routes.'
    },
    {
      id: 'r5',
      question: 'How do you implement server-side data fetching with revalidation in Next.js 14?',
      code: `
// Which implementation correctly handles server-side data fetching?

// Option A
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: {
      revalidate: 3600,
      tags: ['product-data']
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}
 
export default async function Page() {
  const data = await getData();
  return <DataDisplay data={data} />;
}

// Option B
'use client'
export default function Page() {
  const { data, error } = useSWR(
    'https://api.example.com/data',
    fetcher,
    { refreshInterval: 3600 }
  );
  
  if (error) return <Error />;
  if (!data) return <Loading />;
  
  return <DataDisplay data={data} />;
}

// Option C
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: {
      data
    },
    revalidate: 3600
  };
}`,
      options: [   
        'Option A: Using SWR with refresh interval',
        'Option B: Using fetch with next.revalidate and tags',
        'Option C: Using getServerSideProps with revalidate'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 recommends using fetch with next.revalidate and tags for granular control over data revalidation in Server Components.'
    },
    {
      id: 'r6',
      question: 'What is the correct way to implement route handlers in Next.js 14?',
      code: `
// Which implementation correctly uses route handlers?

// Option A
// app/api/products/route.ts
import { NextResponse } from 'next/server';
 
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
 
export async function POST(request: Request) {
  const data = await request.json();
  const newProduct = await createProduct(data);
  return NextResponse.json(newProduct, { status: 201 });
}

// Option B
// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const products = await getProducts();
    res.status(200).json(products);
  }
}

// Option C
// app/api/products/page.ts
export default async function handler(req: Request) {
  if (req.method === 'GET') {
    const products = await getProducts();
    return Response.json(products);
  }
}`,
      options: [
        'Option A: Using route.ts with HTTP method exports',
        'Option B: Using pages/api handlers',
        'Option C: Using page.ts as API handler'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses route.ts files with exported HTTP methods for API routes, providing better type safety and native Request/Response objects.'
    },
    {
      id: 'r7',
      question: 'How do you implement streaming with Suspense in Next.js 14?',
      code: `
// Which implementation correctly uses streaming?

// Option A
// app/page.tsx
export default async function Page() {
  return (
    <div>
      <Suspense fallback={<NavSkeleton />}>
        <Navigation />
      </Suspense>
      
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<ProductsSkeleton />}>
        <Products />
      </Suspense>
    </div>
  );
}

// Option B
// app/page.tsx
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    Promise.all([
      loadNavigation(),
      loadHeader(),
      loadProducts()
    ]).then(() => setIsLoading(false));
  }, []);
  
  if (isLoading) return <Loading />;
  return <Content />;
}

// Option C
// app/page.tsx
export default async function Page() {
  const [nav, header, products] = await Promise.all([
    getNavigation(),
    getHeader(),
    getProducts()
  ]);
  
  return (
    <div>
      <Navigation data={nav} />
      <Header data={header} />
      <Products data={products} />
    </div>
  );
}`,
      options: [
        'Option A: Using multiple Suspense boundaries',
        'Option B: Using useEffect with Promise.all',
        'Option C: Using Promise.all in Server Component'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using multiple Suspense boundaries for streaming different parts of the page, allowing for progressive loading and improved user experience.'
    },
    {
      id: 'r8',
      question: 'What is the correct way to implement route caching in Next.js 14?',
      code: `
// Which implementation correctly uses route caching?

// Option A
// app/products/[id]/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const product = await fetch(
    \`https://api.example.com/products/\${params.id}\`,
    {
      next: { revalidate: 3600 }
    }
  );
  return <ProductDetails product={product} />;
}

// Option B
// app/products/[id]/page.tsx
export default function Page({
  params
}: {
  params: { id: string }
}) {
  const { data } = useSWR(
    \`/api/products/\${params.id}\`,
    fetcher,
    { revalidateOnFocus: false }
  );
  return <ProductDetails product={data} />;
}

// Option C
// app/products/[id]/page.tsx
export async function getStaticProps({ params }) {
  return {
    props: {
      product: await getProduct(params.id)
    },
    revalidate: 3600
  };
}`,
      options: [
        'Option A: Using segment config options and fetch caching',
        'Option B: Using SWR with cache configuration',
        'Option C: Using getStaticProps with ISR'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 uses segment config options (dynamic, revalidate) along with fetch caching options for fine-grained control over route and data caching.'
    },
    {
      id: 'r9',
      question: 'How do you implement client-side navigation with prefetching in Next.js 14?',
      code: `
// Which implementation correctly handles client-side navigation?

// Option A
// app/components/navigation.tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/products">
        Products
      </Link>
      <Link href="/categories" prefetch={false}>
        Categories
      </Link>
      <Link 
        href={\`/product/\${id}\`}
        prefetch={true}
      >
        Product Details
      </Link>
    </nav>
  );
}

// Option B
// app/components/navigation.tsx
'use client'
export default function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      <a onClick={() => router.push('/products')}>
        Products
      </a>
    </nav>
  );
}

// Option C
// app/components/navigation.tsx
export default function Navigation() {
  return (
    <nav>
      <a href="/products">Products</a>
      <a href="/categories">Categories</a>
    </nav>
  );
}`,
options: [ 
    'Option A: Using useRouter for navigation',
    'Option B: Using next/link with prefetch controls',
    'Option C: Using standard anchor tags'
  ],
  correctAnswer: 1,
  explanation: 'Next.js 14 uses the Link component with prefetch controls for optimal client-side navigation and automatic prefetching of routes.'
},
{
  id: 'r10',
  question: 'How do you implement optimized images in Next.js 14 routes?',
  code: `
// Which implementation correctly uses Next.js Image optimization?

// Option A
// app/gallery/page.tsx
import Image from 'next/image';

export default function Gallery() {
return (
<div>
  <Image
    src="/hero.jpg"
    alt="Hero image"
    width={1200}
    height={600}
    priority
    className="hero-image"
  />
  <Image
    src={\`https://example.com/products/\${id}.jpg\`}
    alt="Product image"
    width={400}
    height={300}
    loading="lazy"
  />
</div>
);
}

// Option B
// app/gallery/page.tsx
export default function Gallery() {
return (
<div>
  <img 
    src="/hero.jpg" 
    alt="Hero image"
    loading="lazy"
  />
</div>
);
}

// Option C
// app/gallery/page.tsx
'use client'
export default function Gallery() {
const [loaded, setLoaded] = useState(false);

return (
<div>
  <img 
    src="/hero.jpg"
    alt="Hero image"
    onLoad={() => setLoaded(true)}
    style={{ opacity: loaded ? 1 : 0 }}
  />
</div>
);
}`,
  options: [
    'Option A: Using standard img tags with lazy loading',
    'Option B: Using client-side image loading',
    'Option C: Using next/image with proper configuration'
  ],
  correctAnswer: 2,
  explanation: 'Next.js 14 uses the Image component with proper configuration for automatic optimization, lazy loading, and priority loading for critical images.'
},
{
  id: 'r11',
  question: 'How do you implement route middleware in Next.js 14?',
  code: `
// Which implementation correctly uses middleware?

// Option A
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
const { pathname } = request.nextUrl;

// Match admin routes
if (pathname.startsWith('/admin')) {
const token = request.cookies.get('admin-token');

if (!token) {
  return NextResponse.redirect(
    new URL('/login', request.url)
  );
}
}

return NextResponse.next();
}

export const config = {
matcher: [
'/admin/:path*',
'/((?!api|_next/static|_next/image|favicon.ico).*)',
],
}

// Option B
// app/admin/layout.tsx
export default async function AdminLayout({
children,
}: {
children: React.ReactNode
}) {
const isAuthenticated = await checkAuth();
if (!isAuthenticated) redirect('/login');
return children;
}

// Option C
// app/admin/page.tsx
'use client'
export default function AdminPage() {
useEffect(() => {
if (!isAuthenticated()) {
  window.location.href = '/login';
}
}, []);

return <AdminPanel />;
}`,
  options: [
    'Option A: Using middleware.ts with matchers',
    'Option B: Using layout-based authentication',
    'Option C: Using client-side authentication'
  ],
  correctAnswer: 0,
  explanation: 'Next.js 14 recommends using middleware.ts with proper matchers for route protection and modification at the edge, before any rendering occurs.'
},
{
  id: 'r12',
  question: 'What is the correct way to implement route segments with loading UI in Next.js 14?',
  code: `
// Which implementation correctly uses loading UI for route segments?

// Option A
// app/products/layout.tsx
export default function Layout({
children,
}: {
children: React.ReactNode
}) {
return (
<div>
  <Suspense fallback={<CategorySkeleton />}>
    <Categories />
  </Suspense>
  
  <div className="products-grid">
    <Suspense fallback={<ProductsSkeleton />}>
      {children}
    </Suspense>
  </div>
  
  <Suspense fallback={<FiltersSkeleton />}>
    <Filters />
  </Suspense>
</div>
);
}

// app/products/loading.tsx
export default function Loading() {
return <ProductsGridSkeleton />;
}

// Option B
// app/products/page.tsx
'use client'
export default function Page() {
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
loadProducts().finally(() => setIsLoading(false));
}, []);

if (isLoading) return <Loading />;
return <Products />;
}

// Option C
// app/products/page.tsx
export default async function Page() {
try {
await new Promise(r => setTimeout(r, 100));
return <Products />;
} catch (error) {
return <Error />;
}
}`,
  options: [
    'Option A: Using useState for loading state',
    'Option B: Using try-catch with async component',
    'Option C: Using Suspense boundaries and loading.tsx'
  ],
  correctAnswer: 2,
  explanation: 'Next.js 14 uses a combination of Suspense boundaries and loading.tsx files for optimal loading UI at the route segment level.'
},
{
  id: 'r13',
  question: 'How do you implement proper error handling in Next.js 14 routes?',
  code: `
// Which implementation correctly handles errors in routes?

// Option A
// app/products/error.tsx
'use client'
export default function Error({
error,
reset,
}: {
error: Error & { digest?: string }
reset: () => void
}) {
useEffect(() => {
console.error(error);
}, [error]);

return (
<div className="error-container">
  <h2>Something went wrong!</h2>
  <button
    onClick={reset}
    className="retry-button"
  >
    Try again
  </button>
</div>
);
}

// app/products/page.tsx
export default async function Page() {
const data = await fetchProducts();

if (!data) {
notFound();
}

return <ProductList products={data} />;
}

// Option B
// app/products/page.tsx
'use client'
export default function Page() {
const [error, setError] = useState(null);

if (error) {
return <div>Error: {error.message}</div>;
}

return <Products onError={setError} />;
}

// Option C
// app/products/page.tsx
export default async function Page() {
try {
const products = await fetchProducts();
return <ProductList products={products} />;
} catch (error) {
return <ErrorComponent error={error} />;
}
}`,
  options: [
    'Option A: Using state-based error handling',
    'Option B: Using try-catch blocks',
    'Option C: Using error.tsx and notFound()'
  ],
  correctAnswer: 2,
  explanation: 'Next.js 14 uses error.tsx files for error boundaries and the notFound() function for 404 errors, providing automatic error handling at the route segment level.'
},
{
  id: 'r14',
  question: 'What is the correct way to implement route parameters validation in Next.js 14?',
  code: `
// Which implementation correctly validates route parameters?

// Option A
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';

interface Props {
params: { id: string }
}

export async function generateStaticParams() {
return [{
id: '1'
}, {
id: '2'
}];
}

export default async function Page({ params }: Props) {
const id = parseInt(params.id);

if (isNaN(id) || id < 1) {
notFound();
}

const product = await fetchProduct(id);

if (!product) {
notFound();
}

return <ProductDetails product={product} />;
}

// Option B
// app/products/[id]/page.tsx
export default function Page({ params }: {
params: { id: string }
}) {
if (!params.id.match(/^\\d+$/)) {
return <Error message="Invalid ID" />;
}

return <ProductDetails id={params.id} />;
}

// Option C
// app/products/[id]/page.tsx
'use client'
export default function Page({
params
}: {
params: { id: string }
}) {
useEffect(() => {
if (!validateId(params.id)) {
  router.push('/404');
}
}, [params.id]);

return <ProductDetails id={params.id} />;
}`,
  options: [
    'Option A: Using generateStaticParams and notFound()',
    'Option B: Using client-side validation',
    'Option C: Using useEffect validation'
  ],
  correctAnswer: 0,
  explanation: 'Next.js 14 recommends using generateStaticParams for static parameter validation and notFound() for dynamic validation, providing proper 404 handling.'
},
{
  id: 'r15',
  question: 'How do you implement route-specific metadata in Next.js 14?',
  code: `
// Which implementation correctly handles route metadata?

// Option A
// app/products/[id]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
params: { id: string }
}

export async function generateMetadata(
{ params }: Props,
parent: ResolvingMetadata
): Promise<Metadata> {
const product = await fetchProduct(params.id);

return {
title: product.name,
description: product.description,
openGraph: {
  images: [product.image],
},
};
}

export default function Page({ params }: Props) {
return <ProductDetails id={params.id} />;
}

// Option B
// app/products/[id]/page.tsx
'use client'
export default function Page({ params }: {
params: { id: string }
}) {
useEffect(() => {
document.title = \`Product \${params.id}\`;
}, [params.id]);

return <ProductDetails id={params.id} />;
}

// Option C
// app/products/[id]/page.tsx
export const metadata = {
title: 'Product Page',
description: 'View product details',
};

export default function Page({ params }: {
params: { id: string }
}) {
return <ProductDetails id={params.id} />;
}`,
  options: [
    'Option A: Using useEffect for metadata',
    'Option B: Using generateMetadata with dynamic values',
    'Option C: Using static metadata export'
  ],
  correctAnswer: 1,
  explanation: 'Next.js 14 uses generateMetadata for dynamic metadata generation and supports cascading metadata through the route hierarchy.'
}
]
};