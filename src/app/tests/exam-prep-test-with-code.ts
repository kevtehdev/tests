import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const advancedExamPrepTest: Test = {
  id: 'nextjs-14-advanced-exam',
  category: TEST_CATEGORIES.EXAM_PREP,
  title: 'Next.js 14 Advanced Implementation Test',
  description: 'Complex implementation patterns and advanced concepts required for Next.js 14 certification',
  metadata: {
    difficulty: 'advanced',
    duration: 90,
    passingScore: 75,
    totalQuestions: 20,
    topics: [
      'Server Components',
      'Advanced Routing',
      'Data Patterns',
      'Performance Optimization',
      'Error Handling',
      'Cache Management'
    ]
  },
  questions: [
    {
      id: 'adv-1',
      question: 'How do you implement parallel data fetching with proper error boundaries in Next.js 14?',
      code: `
// Which implementation correctly handles parallel data fetching with error boundaries?

// Option A
// app/dashboard/page.tsx
export default async function DashboardPage() {
  return (
    <div className="dashboard-grid">
      <Suspense fallback={<UserSkeleton />}>
        <UserSection />
      </Suspense>
      
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsSection />
      </Suspense>
      
      <Suspense fallback={<ActivitySkeleton />}>
        <ActivitySection />
      </Suspense>
    </div>
  );
}

// app/dashboard/error.tsx
'use client'
export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong loading the dashboard</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/dashboard/@user/page.tsx
async function UserSection() {
  const user = await fetchUser();
  if (!user) notFound();
  return <UserProfile user={user} />;
}

// Option B
// app/dashboard/page.tsx
export default function DashboardPage() {
  const [user, analytics, activity] = await Promise.all([
    fetchUser(),
    fetchAnalytics(),
    fetchActivity()
  ]);

  return (
    <div className="dashboard-grid">
      <UserSection user={user} />
      <AnalyticsSection analytics={analytics} />
      <ActivitySection activity={activity} />
    </div>
  );
}

// Option C
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
  const { data: user } = useSWR('user', fetchUser);
  const { data: analytics } = useSWR('analytics', fetchAnalytics);
  const { data: activity } = useSWR('activity', fetchActivity);

  return (
    <div className="dashboard-grid">
      {user && <UserSection user={user} />}
      {analytics && <AnalyticsSection analytics={analytics} />}
      {activity && <ActivitySection activity={activity} />}
    </div>
  );
}`,
      options: [
        'Option A: Using Promise.all for parallel fetching',
        'Option B: Using Suspense boundaries with parallel slots',
        'Option C: Using SWR for data fetching'
      ],
      correctAnswer: 1,
      explanation: 'Option A is the best implementation as it uses Suspense boundaries with parallel route slots, allowing independent loading states and error handling for each section while maintaining optimal streaming and progressive rendering.'
    },
    {
      id: 'adv-2',
      question: 'What is the correct way to implement optimistic updates with proper error recovery in Next.js 14?',
      code: `
// Which implementation properly handles optimistic updates with error recovery?

// Option A
// app/actions.ts
'use server'
export async function updatePost(id: string, data: FormData) {
  try {
    await db.post.update({
      where: { id },
      data: { title: data.get('title') }
    });
    revalidatePath('/posts');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// app/posts/[id]/edit.tsx
'use client'
export default function EditPost({ post }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [optimisticPost, setOptimisticPost] = useOptimistic(post);

  async function handleSubmit(formData: FormData) {
    setError(null);
    
    // Optimistic update
    setOptimisticPost({
      ...optimisticPost,
      title: formData.get('title')
    });

    startTransition(async () => {
      const result = await updatePost(post.id, formData);
      if (result.status === 'error') {
        setError(result.message);
        // Reset optimistic state
        setOptimisticPost(post);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <input
        name="title"
        defaultValue={optimisticPost.title}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

// Option B
// app/posts/[id]/edit.tsx
'use client'
export default function EditPost({ post }) {
  const [title, setTitle] = useState(post.title);
  
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(\`/api/posts/\${post.id}\`, {
      method: 'PATCH',
      body: JSON.stringify({ title })
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

// Option C
// app/posts/[id]/edit.tsx
export default function EditPost({ post }) {
  return (
    <form action={updatePost}>
      <input name="title" defaultValue={post.title} />
      <input type="hidden" name="id" value={post.id} />
      <button type="submit">Save</button>
    </form>
  );
}`,
      options: [
        'Option A: Using client-side state management',
        'Option B: Using simple form submission',
        'Option C: Using useOptimistic with error recovery',
      ],
      correctAnswer: 2,
      explanation: 'Option A provides the most robust implementation using useOptimistic for immediate UI updates, useTransition for pending states, and proper error recovery with state rollback if the server action fails.'
    },
    {
      id: 'adv-3',
      question: 'How do you implement proper cache management with revalidation in Next.js 14?',
      code: `
// Which implementation correctly manages cache with revalidation?

// Option A
// app/lib/cache.ts
const CACHE_TAGS = {
  products: 'products',
  categories: 'categories',
  user: (id: string) => \`user-\${id}\`
};

// app/lib/actions.ts
'use server'
export async function fetchProducts(category?: string) {
  const products = await fetch(
    \`https://api.example.com/products?\${new URLSearchParams({
      category: category || ''
    })}\`,
    {
      next: {
        tags: [CACHE_TAGS.products, category && \`category-\${category}\`],
        revalidate: 3600
      }
    }
  );
  return products.json();
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id');
  const updates = Object.fromEntries(formData);
  
  try {
    await db.product.update({
      where: { id },
      data: updates
    });
    
    revalidateTag(CACHE_TAGS.products);
    revalidateTag(\`category-\${updates.category}\`);
    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update product');
  }
}

// Option B
// app/products/page.tsx
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ProductList products={products} />;
}

// Option C
// app/products/page.tsx
'use client'
export default function ProductsPage() {
  const { data, mutate } = useSWR('/api/products', {
    revalidateOnFocus: true,
    revalidateOnMount: true
  });

  return <ProductList products={data} onUpdate={mutate} />;
}`,
      options: [  
        'Option A: Using page-level revalidation',
        'Option B: Using tag-based caching with granular revalidation',
        'Option C: Using client-side caching'
      ],
      correctAnswer: 1,
      explanation: 'Option A provides the most sophisticated cache management using tagged caching for granular invalidation, proper fetch caching options, and coordinated revalidation of related data after mutations.'
    },
{
    id: 'adv-4',
    question: 'How do you implement nested streaming with proper loading states in Next.js 14?',
    code: `
// Which implementation correctly handles nested streaming?

// Option A
// app/dashboard/page.tsx
export default async function DashboardPage() {
return (
  <div className="dashboard">
    {/* Instant loading shell */}
    <DashboardHeader />
    
    <div className="dashboard-grid">
      <Suspense fallback={<RevenueCardSkeleton />}>
        <RevenueMetrics>
          {/* Nested streaming for details */}
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart />
          </Suspense>
          <Suspense fallback={<StatsSkeleton />}>
            <RevenueStats />
          </Suspense>
        </RevenueMetrics>
      </Suspense>

      <Suspense fallback={<UsersSkeleton />}>
        <ActiveUsers>
          <Suspense 
            key={new Date().getHours()} 
            fallback={<TrendsSkeleton />}
          >
            <UserTrends />
          </Suspense>
        </ActiveUsers>
      </Suspense>

      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed 
          fallback={<ActivityItemSkeleton />} 
        />
      </Suspense>
    </div>
  </div>
);
}

// components/ActivityFeed.tsx
async function ActivityFeed({ fallback }) {
const activities = await fetchActivities();

return (
  <div className="feed">
    {activities.map(activity => (
      <Suspense 
        key={activity.id} 
        fallback={fallback}
      >
        <ActivityItem id={activity.id} />
      </Suspense>
    ))}
  </div>
);
}

// Option B
// app/dashboard/page.tsx
export default async function DashboardPage() {
const [revenue, users, activities] = await Promise.all([
  fetchRevenue(),
  fetchUsers(),
  fetchActivities()
]);

return (
  <div className="dashboard">
    <DashboardHeader />
    <RevenueMetrics data={revenue} />
    <ActiveUsers data={users} />
    <ActivityFeed data={activities} />
  </div>
);
}

// Option C
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  Promise.all([
    fetchRevenue(),
    fetchUsers(),
    fetchActivities()
  ]).then(setData)
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) return <DashboardSkeleton />;
return <Dashboard data={data} />;
}`,
    options: [
      'Option A: Using nested Suspense boundaries with granular fallbacks',
      'Option B: Using Promise.all for parallel loading',
      'Option C: Using client-side loading state'
    ],
    correctAnswer: 0,
    explanation: 'Option A provides the most sophisticated streaming implementation with nested Suspense boundaries, allowing different parts of the UI to load progressively and independently. It also implements proper loading states at each level and handles dynamic content streaming.'
  },
  {
    id: 'adv-5',
    question: 'How do you implement route interception with proper state handling in Next.js 14?',
    code: `
// Which implementation correctly handles route interception with state?

// Option A
// app/products/page.tsx
export default function ProductsPage() {
return (
  <div className="products-layout">
    <ProductList />
    {/* Slot for intercepted route */}
    <div className="modal-slot" />
  </div>
);
}

// app/products/[id]/@modal/(.)preview/page.tsx
export default function ProductPreview({
params
}: {
params: { id: string }
}) {
return (
  <Modal>
    <ProductDetails id={params.id} />
  </Modal>
);
}

// app/products/[id]/page.tsx
export default function ProductPage({
params
}: {
params: { id: string }
}) {
return <ProductFullPage id={params.id} />;
}

// Option B
// app/products/layout.tsx
'use client'
export default function ProductsLayout({
children,
modal
}: {
children: React.ReactNode
modal: React.ReactNode
}) {
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  setIsOpen(!!modal);
}, [modal]);

return (
  <div className="products-layout">
    {children}
    {isOpen && <div className="modal">{modal}</div>}
  </div>
);
}

// Option C
// app/products/page.tsx
'use client'
export default function ProductsPage() {
const router = useRouter();
const [selectedProduct, setSelectedProduct] = useState(null);

return (
  <div className="products-layout">
    <ProductList onSelect={setSelectedProduct} />
    {selectedProduct && (
      <Modal 
        onClose={() => {
          setSelectedProduct(null);
          router.back();
        }}
      >
        <ProductDetails id={selectedProduct} />
      </Modal>
    )}
  </div>
);
}`,
    options: [
      'Option A: Using client state management',
      'Option B: Using manual modal management',
      'Option C: Using parallel routes with interception',
    ],
    correctAnswer: 2,
    explanation: 'Option A implements the correct pattern for route interception in Next.js 14 using parallel routes with the @modal convention and (.) for interception. This preserves URL states, enables back/forward navigation, and maintains proper modal contexts.'
  },
  {
    id: 'adv-6',
    question: 'How do you implement proper error handling with recovery in Next.js 14?',
    code: `
// Which implementation correctly handles errors with recovery?

// Option A
// app/error.tsx
'use client'
export default function GlobalError({
error,
reset,
}: {
error: Error & { digest?: string }
reset: () => void
}) {
useEffect(() => {
  // Log to error reporting service
  reportError(error);
}, [error]);

return (
  <html>
    <body>
      <ErrorPage
        error={error}
        reset={reset}
        digest={error.digest}
      />
    </body>
  </html>
);
}

// app/posts/error.tsx
'use client'
export default function PostError({
error,
reset,
}: {
error: Error & { digest?: string }
reset: () => void
}) {
return (
  <div role="alert" className="error-container">
    <h2>Error Loading Posts</h2>
    <p>{error.message}</p>
    {error.digest && (
      <p className="error-digest">
        Error ID: {error.digest}
      </p>
    )}
    <button
      onClick={() => {
        // Attempt partial data recovery
        clearPostsCache();
        reset();
      }}
    >
      Try Again
    </button>
  </div>
);
}

// Option B
// app/posts/page.tsx
export default async function PostsPage() {
try {
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
} catch (error) {
  return <ErrorComponent error={error} />;
}
}

// Option C
// app/posts/page.tsx
'use client'
export default function PostsPage() {
const [error, setError] = useState(null);

useEffect(() => {
  fetchPosts().catch(setError);
}, []);

if (error) {
  return <ErrorComponent error={error} />;
}

return <PostList />;
}`,
    options: [
      'Option A: Using error.tsx with error reporting and recovery',
      'Option B: Using try-catch blocks',
      'Option C: Using client-side error handling'
    ],
    correctAnswer: 0,
    explanation: 'Option A implements comprehensive error handling using error.tsx files with proper error reporting, recovery mechanisms, and granular error boundaries. It includes error digests for tracking and provides proper recovery options at different levels.'
  },
  {
    id: 'adv-7',
    question: 'How do you implement middleware with proper edge function patterns in Next.js 14?',
    code: `
// Which implementation correctly uses middleware with edge functions?

// Option A
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Geolocated rate limiting map
const rateLimit = new Map();

export async function middleware(request: NextRequest) {
// Get geo data from edge
const country = request.geo?.country || 'US';
const city = request.geo?.city || 'Unknown';

// Generate rate limit key
const ip = request.ip || 'anonymous';
const rateLimitKey = \`\${ip}-\${country}\`;

// Check rate limit
const requestCount = rateLimit.get(rateLimitKey) || 0;
if (requestCount > 100) {
  return new NextResponse('Rate limit exceeded', { status: 429 });
}
rateLimit.set(rateLimitKey, requestCount + 1);

// Clone response for modification
const response = NextResponse.next();

// Add security headers
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

// Add custom geo headers
response.headers.set('X-User-Country', country);
response.headers.set('X-User-City', city);

// Handle authentication
const token = request.cookies.get('auth-token');
if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
  return NextResponse.redirect(new URL('/login', request.url));
}

return response;
}

export const config = {
matcher: [
  '/dashboard/:path*',
  '/api/:path*',
  '/((?!_next/static|favicon.ico).*)',
],
};

// Option B
// middleware.ts
export async function middleware(request: NextRequest) {
if (request.nextUrl.pathname.startsWith('/api')) {
  const response = await fetch(request);
  return response;
}
return NextResponse.next();
}

// Option C
// middleware.ts
export function middleware(request: NextRequest) {
const token = request.cookies.get('token');
if (!token) {
  return NextResponse.redirect('/login');
}
return NextResponse.next();
}`,
    options: [
      'Option A: Using simple API middleware',
      'Option B: Using comprehensive edge middleware',
      'Option C: Using basic auth middleware'
    ],
    correctAnswer: 1,
    explanation: 'Option A implements sophisticated edge middleware with rate limiting, geolocation handling, security headers, and proper authentication. It uses edge capabilities effectively while maintaining performance.'
  },
  {
    id: 'adv-8',
    question: 'How do you implement metadata generation with proper SEO patterns in Next.js 14?',
    code: `
// Which implementation correctly handles dynamic metadata generation?

// Option A
// app/products/[category]/[id]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
params: { category: string; id: string }
searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
{ params, searchParams }: Props,
parent: ResolvingMetadata
): Promise<Metadata> {
// Fetch data
const product = await fetchProduct(params.id);
if (!product) {
  return notFound();
}

// Resolve parent metadata
const previousImages = (await parent).openGraph?.images || [];

return {
  title: \`\${product.name} | \${product.category} | Store\`,
  description: product.description,
  keywords: [product.category, ...product.tags],
  
  // OpenGraph
  openGraph: {
    title: product.name,
    description: product.description,
    images: [product.image, ...previousImages],
    type: 'product',
    productDetails: {
      price: {
        amount: product.price,
        currency: 'USD',
      },
    },
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: product.name,
    description: product.description,
    images: [product.image],
  },
  
  // Verification
  verification: {
    google: 'google-site-verification',
    yandex: 'yandex-verification',
  },
  
  // Alternate languages
  alternates: {
    canonical: \`/products/\${product.category}/\${product.id}\`,
    languages: {
      'en-US': \`/en/products/\${product.category}/\${product.id}\`,
      'es-ES': \`/es/products/\${product.category}/\${product.id}\`,
    },
  },
};
}

// Option B
// app/products/[category]/[id]/page.tsx
export const metadata = {
title: 'Product Page',
description: 'View our product',
};

// Option C
// app/products/[category]/[id]/page.tsx
'use client'
export default function ProductPage({ params }) {
useEffect(() => {
  document.title = \`Product \${params.id}\`;
}, [params.id]);
}`,
    options: [
      'Option A: Using dynamic metadata generation with parent resolution',
      'Option B: Using static metadata',
      'Option C: Using client-side metadata updates'
    ],
    correctAnswer: 0,
    explanation: 'Option A implements comprehensive metadata generation with proper SEO patterns, including OpenGraph, Twitter cards, alternate languages, and verification tags. It also handles parent metadata resolution and dynamic content.'
  },    
{
    id: 'adv-9',
    question: 'How do you implement Server Actions with proper optimistic mutations in Next.js 14?',
    code: `
// Which implementation correctly handles optimistic mutations with Server Actions?

// Option A
// app/actions.ts
'use server'

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addComment(postId: string, formData: FormData) {
const comment = formData.get('comment');

try {
  await db.comment.create({
    data: {
      content: comment,
      postId: postId,
      authorId: await getCurrentUserId()
    }
  });

  revalidateTag(\`post-\${postId}\`);
  return { success: true };
} catch (error) {
  return { error: 'Failed to add comment' };
}
}

// app/posts/[id]/page.tsx
export default function Post({ params }: { params: { id: string } }) {
const [optimisticComments, addOptimisticComment] = useOptimistic<Comment[]>(
  comments,
  (state, newComment: Comment) => [...state, newComment]
);

async function action(formData: FormData) {
  const optimisticComment = {
    id: Math.random().toString(),
    content: formData.get('comment'),
    authorId: 'pending',
    createdAt: new Date(),
    pending: true
  };

  // Add optimistic comment
  addOptimisticComment(optimisticComment);

  // Server action
  const result = await addComment(params.id, formData);
  if (result.error) {
    // Handle error and rollback
    toast.error(result.error);
  }
}

return (
  <div>
    <CommentsList comments={optimisticComments} />
    <form action={action}>
      <textarea name="comment" required />
      <button type="submit">Add Comment</button>
    </form>
  </div>
);
}

// Option B
// app/posts/[id]/page.tsx
'use client'
export default function Post({ params }) {
const [comments, setComments] = useState([]);

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  
  const response = await fetch('/api/comments', {
    method: 'POST',
    body: data
  });
  
  if (response.ok) {
    const newComment = await response.json();
    setComments([...comments, newComment]);
  }
}

return (
  <form onSubmit={handleSubmit}>
    <textarea name="comment" />
    <button>Submit</button>
  </form>
);
}

// Option C
// app/posts/[id]/page.tsx
export default async function Post({ params }) {
async function addComment(formData: FormData) {
  'use server'
  await db.comment.create({
    data: {
      content: formData.get('comment'),
      postId: params.id
    }
  });
  revalidatePath(\`/posts/\${params.id}\`);
}

return (
  <form action={addComment}>
    <textarea name="comment" />
    <button>Submit</button>
  </form>
);
}`,
    options: [
      'Option A: Using client-side state management',
      'Option B: Using Server Actions with useOptimistic',
      'Option C: Using basic Server Actions'
    ],
    correctAnswer: 1,
    explanation: 'Option A provides the most complete implementation of Server Actions with optimistic updates, including proper error handling, state rollback, and optimistic UI updates while maintaining server-side validation and type safety.'
  },
  {
    id: 'adv-10',
    question: 'How do you implement proper streaming with suspense boundaries in Next.js 14?',
    code: `
// Which implementation correctly handles streaming with suspense boundaries?

// Option A
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { RevenueChart } from './revenue-chart';

async function SlowRevenue() {
const revenue = await fetchRevenueWithDelay();
return <RevenueChart data={revenue} />;
}

export default async function DashboardPage() {
// Get initial data that's needed immediately
const [user, notifications] = await Promise.all([
  fetchUser(),
  fetchNotifications()
]);

return (
  <main>
    {/* Instant loading UI */}
    <header>
      <UserProfile user={user} />
      <NotificationBell count={notifications.length} />
    </header>

    {/* Streaming sections */}
    <div className="grid">
      <Suspense fallback={
        <div className="card animate-pulse">
          <RevenueChartSkeleton />
        </div>
      }>
        <SlowRevenue />
      </Suspense>

      <Suspense fallback={
        <div className="card animate-pulse">
          <MetricsSkeleton />
        </div>
      }>
        <Metrics />
      </Suspense>

      <Suspense fallback={
        <div className="card animate-pulse">
          <FeedSkeleton />
        </div>
      }>
        <Feed 
          userId={user.id}
          fallback={<FeedItemSkeleton />}
        />
      </Suspense>
    </div>
  </main>
);
}

// components/Feed.tsx
async function Feed({ 
userId,
fallback 
}: { 
userId: string
fallback: React.ReactNode
}) {
const items = await fetchFeedItems(userId);

return (
  <div className="feed">
    {items.map(item => (
      <Suspense 
        key={item.id} 
        fallback={fallback}
      >
        <FeedItem 
          id={item.id}
          fallback={fallback}
        />
      </Suspense>
    ))}
  </div>
);
}

// Option B
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  Promise.all([
    fetchRevenue(),
    fetchMetrics(),
    fetchFeed()
  ])
    .then(setData)
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) return <Loading />;
return <Dashboard data={data} />;
}

// Option C
// app/dashboard/page.tsx
export default async function DashboardPage() {
const data = await Promise.all([
  fetchRevenue(),
  fetchMetrics(),
  fetchFeed()
]);

return <Dashboard data={data} />;
}`,
    options: [
      'Option A: Using client-side loading state',
      'Option B: Using nested Suspense with progressive loading',
      'Option C: Using Promise.all'
    ],
    correctAnswer: 1,
    explanation: 'Option A implements the most sophisticated streaming pattern with nested Suspense boundaries, progressive loading, proper loading states, and granular fallbacks. It optimizes the initial page load while streaming in slower content progressively.'
  },
  {
    id: 'adv-11',
    question: 'How do you properly implement authentication with middleware protection in Next.js 14?',
    code: `
// Which implementation correctly handles authentication with middleware?

// Option A
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
const token = request.cookies.get('session-token');

// Protected routes pattern matching
const isProtectedRoute = request.nextUrl.pathname.match(
  /^\/(?:dashboard|admin|settings)/
);

if (isProtectedRoute) {
  if (!token) {
    // Store attempted URL
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verify token at edge
    const payload = await verifyAuth(token);
    
    // Clone response and add user context
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.sub);
    response.headers.set('x-user-role', payload.role);

    // Role-based access control
    if (
      request.nextUrl.pathname.startsWith('/admin') && 
      payload.role !== 'admin'
    ) {
      return NextResponse.redirect(
        new URL('/unauthorized', request.url)
      );
    }

    return response;
  } catch (error) {
    // Invalid token - clear and redirect
    const response = NextResponse.redirect(
      new URL('/login', request.url)
    );
    response.cookies.delete('session-token');
    return response;
  }
}

return NextResponse.next();
}

export const config = {
matcher: [
  '/dashboard/:path*',
  '/admin/:path*',
  '/settings/:path*',
],
};

// Option B
// app/dashboard/layout.tsx
export default async function DashboardLayout({
children
}: {
children: React.ReactNode
}) {
const session = await getSession();
if (!session) {
  redirect('/login');
}
return children;
}

// Option C
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
const { data: session, status } = useSession();

if (status === 'loading') {
  return <Loading />;
}

if (!session) {
  return redirect('/login');
}

return <Dashboard />;
}`,
    options: [
      'Option A: Using layout-based authentication',
      'Option B: Using client-side authentication',
      'Option C: Using middleware with edge authentication',
    ],
    correctAnswer: 2,
    explanation: 'Option A implements the most secure and performant authentication pattern using middleware with edge authentication, proper token verification, role-based access control, and efficient request handling before rendering begins.'
  },
  {
    id: 'adv-12',
    question: 'How do you implement advanced caching patterns with proper revalidation in Next.js 14?',
    code: `
// Which implementation correctly handles advanced caching patterns?

// Option A
// lib/cache.ts
import { unstable_cache } from 'next/cache';

// Cached data fetcher with tags
export const getProduct = unstable_cache(
async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
    include: { category: true }
  });
  return product;
},
['product'],
{
  tags: ['products'],
  revalidate: 3600
}
);

// Cached computation with dependencies
export const getProductRecommendations = unstable_cache(
async (productId: string, userId: string) => {
  const [product, userPreferences] = await Promise.all([
    getProduct(productId),
    getUserPreferences(userId)
  ]);

  return generateRecommendations(product, userPreferences);
},
['recommendations'],
{
  tags: (productId, userId) => [
    \`product-\${productId}\`,
    \`user-\${userId}\`
  ],
  revalidate: 300
}
);

// actions.ts
'use server'
export async function updateProduct(formData: FormData) {
const updates = Object.fromEntries(formData);
const productId = formData.get('id');

await db.product.update({
  where: { id: productId },
  data: updates
});

// Granular cache invalidation
revalidateTag('products');
revalidateTag(\`product-\${productId}\`);
revalidateTag(\`category-\${updates.categoryId}\`);
}

// Option B
// app/products/[id]/page.tsx
export const revalidate = 3600;

export default async function ProductPage({
params
}: {
params: { id: string }
}) {
const product = await fetchProduct(params.id);
return <Product data={product} />;
}

// Option C
// app/products/[id]/page.tsx
'use client'
export default function ProductPage({
params
}: {
params: { id: string }
}) {
const { data, mutate } = useSWR(
  \`/api/products/\${params.id}\`,
  fetcher,
  { revalidateOnFocus: true }
);

return <Product data={data} onUpdate={mutate} />;
}`,
    options: [
      'Option A: Using page revalidation',
      'Option B: Using client-side caching',
      'Option C: Using advanced cache patterns with dependencies',
    ],
    correctAnswer: 2,
    explanation: 'Option A implements sophisticated caching patterns using unstable_cache with proper tags, cache dependencies, and granular invalidation strategies. It handles complex data relationships while maintaining performance.'
  },
{
    id: 'adv-13',
    question: 'How do you implement advanced form handling with file uploads and progress in Next.js 14?',
    code: `
// Which implementation correctly handles complex form submissions?

// Option A
// app/actions.ts
'use server'

export async function uploadProduct(formData: FormData) {
try {
  // Parse form data
  const title = formData.get('title');
  const images = formData.getAll('images');
  const variants = JSON.parse(formData.get('variants') as string);

  // Upload images with progress
  const uploadPromises = Array.from(images).map(async (image: File) => {
    const uploadUrl = await getSignedUrl(image.name);
    const upload = await uploadWithProgress(image, uploadUrl);
    return upload.url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  // Create product with variants
  const product = await db.$transaction(async (tx) => {
    // Create main product
    const product = await tx.product.create({
      data: {
        title,
        images: imageUrls,
        status: 'draft'
      }
    });

    // Create variants
    await tx.variant.createMany({
      data: variants.map((v: any) => ({
        ...v,
        productId: product.id
      }))
    });

    return product;
  });

  revalidatePath('/products');
  revalidateTag('products');
  return { success: true, product };
} catch (error) {
  return { error: 'Failed to upload product' };
}
}

// app/products/new/page.tsx
'use client'
export default function NewProductPage() {
const [isPending, startTransition] = useTransition();
const [progress, setProgress] = useState(0);
const [variants, setVariants] = useState([]);
const formRef = useRef<HTMLFormElement>(null);

async function action(formData: FormData) {
  // Add variants to form data
  formData.append('variants', JSON.stringify(variants));

  startTransition(async () => {
    const result = await uploadProduct(formData);
    if (result.success) {
      formRef.current?.reset();
      setVariants([]);
      toast.success('Product created!');
    } else {
      toast.error(result.error);
    }
  });
}

return (
  <form
    ref={formRef}
    action={action}
    className="space-y-8"
  >
    <input 
      type="text" 
      name="title" 
      required 
    />

    <ImageUpload
      onProgress={setProgress}
      maxFiles={5}
    />

    <VariantBuilder
      variants={variants}
      onChange={setVariants}
    />

    {progress > 0 && progress < 100 && (
      <ProgressBar value={progress} />
    )}

    <button
      type="submit"
      disabled={isPending}
    >
      {isPending ? 'Creating...' : 'Create Product'}
    </button>
  </form>
);
}

// Option B
// app/products/new/page.tsx
'use client'
export default function NewProductPage() {
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  await fetch('/api/products', {
    method: 'POST',
    body: data
  });
}

return (
  <form onSubmit={handleSubmit}>
    <input type="text" name="title" />
    <input type="file" name="images" multiple />
    <button>Submit</button>
  </form>
);
}

// Option C
// app/products/new/page.tsx
export default function NewProductPage() {
return (
  <form action={uploadProduct}>
    <input type="text" name="title" />
    <input type="file" name="images" multiple />
    <button>Submit</button>
  </form>
);
}`,
    options: [
      'Option A: Using Server Actions with progress and transactions',
      'Option B: Using fetch with FormData',
      'Option C: Using basic form submission'
    ],
    correctAnswer: 0,
    explanation: 'Option A implements a sophisticated form handling pattern with file upload progress, transaction support, variant management, and proper error handling using Server Actions.'
  },
  {
    id: 'adv-14',
    question: 'How do you implement complex route interception with state preservation in Next.js 14?',
    code: `
// Which implementation correctly handles complex route interception?

// Option A
// app/@modal/(.)photos/[id]/page.tsx
import { getPhoto } from '@/lib/photos';
import { Modal } from '@/components/modal';

export default async function PhotoModal({
params: { id }
}: {
params: { id: string };
}) {
// Fetch in parallel with parent route
const photo = await getPhoto(id);

return (
  <Modal>
    <div className="modal-content">
      <PhotoViewer
        photo={photo}
        className="modal-photo"
      />
      
      <Suspense fallback={<CommentsSkeleton />}>
        <PhotoComments id={id} />
      </Suspense>

      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedPhotos 
          tags={photo.tags}
          currentId={id}
        />
      </Suspense>
    </div>
  </Modal>
);
}

// app/photos/[id]/page.tsx
export default async function PhotoPage({
params: { id }
}: {
params: { id: string };
}) {
const photo = await getPhoto(id);

return (
  <div className="photo-page">
    <PhotoViewer photo={photo} />
    <PhotoComments id={id} />
    <RelatedPhotos 
      tags={photo.tags}
      currentId={id}
    />
  </div>
);
}

// app/photos/layout.tsx
export default function PhotosLayout({
children,
modal
}: {
children: React.ReactNode;
modal: React.ReactNode;
}) {
return (
  <div className="photos-layout">
    {children}
    {modal}
  </div>
);
}

// Option B
// app/photos/page.tsx
'use client'
export default function PhotosPage() {
const [selectedPhoto, setSelectedPhoto] = useState(null);

return (
  <div>
    <PhotoGrid onSelect={setSelectedPhoto} />
    {selectedPhoto && (
      <Modal>
        <PhotoViewer photo={selectedPhoto} />
      </Modal>
    )}
  </div>
);
}

// Option C
// app/photos/[id]/page.tsx
export default function PhotoPage({
params: { id }
}: {
params: { id: string };
}) {
const isModal = useSearchParams().has('modal');
const photo = await getPhoto(id);

if (isModal) {
  return (
    <Modal>
      <PhotoViewer photo={photo} />
    </Modal>
  );
}

return <PhotoViewer photo={photo} />;
}`,
    options: [
      'Option A: Using client-side state management',
      'Option B: Using parallel routes with intercepted modals',
      'Option C: Using search params for modal state'
    ],
    correctAnswer: 1,
    explanation: 'Option A implements the most sophisticated route interception pattern using parallel routes with proper state preservation, parallel data fetching, and nested Suspense boundaries for optimal loading.'
  },
  {
    id: 'adv-15',
    question: 'How do you implement advanced Middleware patterns with rate limiting and geo-routing in Next.js 14?',
    code: `
// Which implementation correctly handles advanced middleware patterns?

// Option A
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize rate limiter
const ratelimit = new Ratelimit({
redis: Redis.fromEnv(),
limiter: Ratelimit.slidingWindow(10, '10s'),
});

export async function middleware(request: NextRequest) {
const ip = request.ip ?? '127.0.0.1';
const geo = request.geo ?? { country: 'US' };

// Rate limiting check
const { success, limit, reset, remaining } = await ratelimit.limit(
  \`ratelimit_\${ip}\`
);

if (!success) {
  return new NextResponse('Too many requests', {
    status: 429,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  });
}

// Geo-based routing
if (request.nextUrl.pathname.startsWith('/shop')) {
  const countryCode = geo.country?.toLowerCase() ?? 'us';
  const response = NextResponse.next();
  
  // Add country code to headers
  response.headers.set('X-Country', countryCode);
  
  // Currency based on region
  const currency = getCurrencyForCountry(countryCode);
  response.cookies.set('currency', currency);
  
  // Regional redirects
  if (geo.country === 'CA' && !request.nextUrl.pathname.startsWith('/shop/ca')) {
    return NextResponse.redirect(
      new URL(\`/shop/ca\${request.nextUrl.pathname}\`, request.url)
    );
  }
}

// Bot detection
const userAgent = request.headers.get('user-agent') ?? '';
if (isBotUserAgent(userAgent)) {
  return new NextResponse('Bot access denied', { status: 403 });
}

// Security headers
const response = NextResponse.next();
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
response.headers.set('Strict-Transport-Security', 'max-age=31536000');

return response;
}

export const config = {
matcher: [
  '/api/:path*',
  '/shop/:path*',
  '/((?!_next/static|favicon.ico).*)',
],
};

// Option B
// middleware.ts
export function middleware(request: NextRequest) {
const response = NextResponse.next();
response.headers.set('X-Country', request.geo?.country ?? 'US');
return response;
}

// Option C
// middleware.ts
export function middleware(request: NextRequest) {
if (request.nextUrl.pathname.startsWith('/api')) {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
return NextResponse.next();
}`,
    options: [
      'Option A: Using comprehensive middleware with multiple features',
      'Option B: Using basic geo-headers',
      'Option C: Using simple CORS middleware'
    ],
    correctAnswer: 0,
    explanation: 'Option A implements sophisticated middleware patterns including rate limiting, geo-based routing, bot detection, and security headers while maintaining proper error handling and response management.'
  },
  {
    id: 'adv-16',
    question: 'How do you implement advanced error boundaries with analytics and recovery in Next.js 14?',
    code: `
// Which implementation correctly handles error boundaries with analytics?

// Option A
// app/error.tsx
'use client'

import { ErrorBoundary } from '@/components/error-boundary';
import { captureError } from '@/lib/analytics';

interface ErrorProps {
error: Error & { 
  digest?: string;
  statusCode?: number;
  details?: any;
};
reset: () => void;
}

function ErrorComponent({ error, reset }: ErrorProps) {
useEffect(() => {
  // Log error to analytics
  captureError({
    error,
    errorInfo: {
      digest: error.digest,
      statusCode: error.statusCode,
      details: error.details
    },
    location: window.location.href
  });
}, [error]);

// Attempt auto-recovery for specific errors
useEffect(() => {
  if (error.statusCode === 401) {
    // Token expired - attempt refresh
    refreshToken()
      .then(() => reset())
      .catch(() => {/* Handle refresh failure */});
  }
}, [error, reset]);

return (
  <div role="alert" className="error-container">
    {error.statusCode === 404 ? (
      <NotFoundError />
    ) : error.statusCode === 401 ? (
      <UnauthorizedError onLogin={reset} />
    ) : error.statusCode === 403 ? (
      <ForbiddenError />
    ) : (
      <GenericError 
        message={error.message}
        digest={error.digest}
      />
    )}
    {error.statusCode !== 404 && (
      <button 
        onClick={reset}
        className="retry-button"
      >
        Try again
      </button>
    )}
  </div>
);
}

export default function GlobalError({ error, reset }: ErrorProps) {
return (
  <ErrorBoundary fallback={<ErrorComponent error={error} reset={reset} />}>
    <html>
      <body>
        <ErrorComponent error={error} reset={reset} />
      </body>
    </html>
  </ErrorBoundary>
);
}

// Option B
// error.tsx
export default function Error({ error }: { error: Error }) {
return (
  <div>
    <h2>Something went wrong!</h2>
    <p>{error.message}</p>
  </div>
);
}

// Option C
// app/error.tsx
'use client'
export default function Error({ error, reset }) {
useEffect(() => {
  console.error(error);
}, [error]);

return (
  <div>
    <h2>Error</h2>
    <button onClick={reset}>Try again</button>
  </div>
);
}`,
    options: [
      'Option A: Using basic error display',
      'Option B: Using console logging',
      'Option C: Using comprehensive error handling with analytics',
    ],
    correctAnswer: 2,
    explanation: 'Option A implements sophisticated error boundary patterns with analytics integration, automatic recovery attempts, and proper error categorization while maintaining accessibility and user recovery options.'
  },

{
    id: 'adv-17',
    question: 'How do you implement advanced streaming patterns with nested suspense and loading states in Next.js 14?',
    code: `
// Which implementation correctly handles complex streaming patterns?

// Option A
// app/dashboard/page.tsx
export default async function DashboardPage() {
// Critical data fetched immediately
const user = await getCurrentUser();

return (
  <div className="dashboard">
    {/* Instant load shell */}
    <DashboardShell user={user}>
      <div className="dashboard-grid">
        {/* Primary content stream */}
        <Suspense fallback={<MetricsSkeleton />}>
          <AsyncMetrics>
            {/* Nested streams for details */}
            <Suspense fallback={<ChartSkeleton />}>
              <RevenueChart />
            </Suspense>
            <Suspense fallback={<StatsSkeleton />}>
              <UserStats />
            </Suspense>
          </AsyncMetrics>
        </Suspense>

        {/* Secondary content stream */}
        <Suspense fallback={<ActivitySkeleton />}>
          <ActivityFeed 
            userId={user.id}
            render={({ items }) => (
              <ul>
                {items.map(item => (
                  <Suspense
                    key={item.id}
                    fallback={<ActivityItemSkeleton />}
                  >
                    <ActivityItem
                      id={item.id}
                      onUpdate={revalidateActivity}
                    />
                  </Suspense>
                ))}
              </ul>
            )}
          />
        </Suspense>

        {/* Notification stream with deferred loading */}
        <Suspense fallback={null}>
          <Notifications>
            {(notifications) => 
              notifications.length > 0 && (
                <NotificationsList items={notifications} />
              )
            }
          </Notifications>
        </Suspense>
      </div>
    </DashboardShell>
  </div>
);
}

// components/AsyncMetrics.tsx
async function AsyncMetrics({
children
}: {
children: React.ReactNode
}) {
// Fetch shared data for children
const metrics = await fetchMetrics();

return (
  <MetricsContext.Provider value={metrics}>
    {children}
  </MetricsContext.Provider>
);
}

// Option B
// app/dashboard/page.tsx
export default async function DashboardPage() {
const [user, metrics, activities] = await Promise.all([
  getCurrentUser(),
  fetchMetrics(),
  fetchActivities()
]);

return (
  <DashboardContent
    user={user}
    metrics={metrics}
    activities={activities}
  />
);
}

// Option C
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
const { data: metrics } = useSWR('metrics', fetchMetrics);
const { data: activities } = useSWR('activities', fetchActivities);

if (!metrics || !activities) return <Loading />;

return <DashboardContent metrics={metrics} activities={activities} />;
}`,
    options: [
      'Option A: Using parallel data fetching',
      'Option B: Using nested streaming with progressive loading',
      'Option C: Using client-side data fetching'
    ],
    correctAnswer: 1,
    explanation: 'Option A implements the most sophisticated streaming pattern with proper loading hierarchies, nested suspense boundaries, deferred loading, and progressive enhancement while maintaining optimal user experience.'
  },
  {
    id: 'adv-18',
    question: 'How do you implement dynamic metadata generation with schema markup in Next.js 14?',
    code: `
// Which implementation correctly handles advanced metadata with schema markup?

// Option A
// app/products/[id]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getRelatedProducts } from '@/lib/products';

interface Props {
params: { id: string }
searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
{ params, searchParams }: Props,
parent: ResolvingMetadata
): Promise<Metadata> {
// Fetch data
const product = await getProduct(params.id);
if (!product) return notFound();

// Get related products
const relatedProducts = await getRelatedProducts(params.id);

// Get parent metadata
const previousImages = (await parent).openGraph?.images || [];

// Generate schema markup
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images,
  sku: product.sku,
  mpn: product.mpn,
  brand: {
    '@type': 'Brand',
    name: product.brand
  },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
    availability: product.inStock 
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviewCount
  },
  isRelatedTo: relatedProducts.map(related => ({
    '@type': 'Product',
    name: related.name,
    url: \`https://example.com/products/\${related.id}\`
  }))
};

return {
  title: product.name,
  description: product.description,
  
  openGraph: {
    title: product.name,
    description: product.description,
    images: [...product.images, ...previousImages],
    type: 'product',
    videos: product.videos,
    locale: searchParams.locale || 'en_US',
    countryName: searchParams.country,
  },
  
  twitter: {
    card: 'summary_large_image',
    title: product.name,
    description: product.description,
    images: product.images,
    creator: '@storefront'
  },
  
  alternates: {
    canonical: \`https://example.com/products/\${product.id}\`,
    languages: {
      'en-US': \`/en-US/products/\${product.id}\`,
      'es-ES': \`/es-ES/products/\${product.id}\`
    }
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  },
  
  verification: {
    google: 'google-site-verification',
    yandex: 'yandex-verification'
  },
  
  other: {
    'schema': JSON.stringify(schema)
  }
};
}

// Option B
// app/products/[id]/page.tsx
export const metadata = {
title: 'Product Page',
description: 'Product description'
};

// Option C
// app/products/[id]/page.tsx
'use client'
export default function ProductPage({ params }) {
useEffect(() => {
  document.title = \`Product \${params.id}\`;
}, [params.id]);
}`,
    options: [
      'Option A: Using static metadata',
      'Option B: Using comprehensive metadata with schema',
      'Option C: Using client-side metadata'
    ],
    correctAnswer: 1,
    explanation: 'Option A implements the most sophisticated metadata generation pattern with proper schema markup, OpenGraph tags, Twitter cards, alternates, and robots directives while maintaining SEO best practices.'
  },
  {
    id: 'adv-19',
    question: 'How do you implement advanced performance optimization in Next.js 14?',
    code: `
// Which implementation correctly handles performance optimization?

// Option A
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { preloadResources } from '@/lib/preload';
import { headers } from 'next/headers';

async function RootLayout({
children
}: {
children: React.ReactNode
}) {
// Prioritize critical resources
preloadResources([
  { type: 'font', src: '/fonts/inter.woff2' },
  { type: 'image', src: '/hero.webp' },
  { type: 'style', src: '/critical.css' }
]);

// Extract user preferences
const headersList = headers();
const userAgent = headersList.get('user-agent');
const prefersReducedMotion = headersList.get('sec-ch-prefers-reduced-motion');

return (
  <html lang="en" 
    data-prefers-reduced-motion={prefersReducedMotion === 'reduce'}
  >
    <head>
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://api.example.com" />
      <link rel="dns-prefetch" href="https://api.example.com" />
      
      {/* Preload critical assets */}
      <link
        rel="preload"
        href="/fonts/inter.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </head>
    <body>
      {/* Dynamic imports for non-critical components */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      {/* Main content */}
      <main>{children}</main>

      {/* Deferred loading of non-critical content */}
      <Suspense fallback={null}>
        <NonCriticalContent />
      </Suspense>

      {/* Performance monitoring */}
      <SpeedInsights />
    </body>
  </html>
);
}

// lib/preload.ts
export async function preloadResources(resources) {
resources.forEach(resource => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource.src;
  
  switch (resource.type) {
    case 'font':
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      break;
    case 'image':
      link.as = 'image';
      break;
    case 'style':
      link.as = 'style';
      break;
  }
  
  document.head.appendChild(link);
});
}

// Option B
// app/layout.tsx
export default function RootLayout({
children
}: {
children: React.ReactNode
}) {
return (
  <html>
    <body>{children}</body>
  </html>
);
}

// Option C
// app/layout.tsx
'use client'
export default function RootLayout({
children
}: {
children: React.ReactNode
}) {
useEffect(() => {
  loadFonts();
  loadStyles();
}, []);

return (
  <html>
    <body>{children}</body>
  </html>
);
}`,
    options: [
      'Option A: Using comprehensive performance optimizations',
      'Option B: Using basic layout',
      'Option C: Using client-side resource loading'
    ],
    correctAnswer: 0,
    explanation: 'Option A implements sophisticated performance optimization patterns including resource preloading, critical CSS, proper font loading, deferred non-critical content, and performance monitoring while maintaining accessibility.'
  },
  {
    id: 'adv-20',
    question: 'How do you implement optimized image handling with art direction in Next.js 14?',
    code: `
// Which implementation correctly handles optimized images?

// Option A
// components/ResponsiveImage.tsx
import Image from 'next/image';

interface ImageProps {
src: string;
alt: string;
sizes?: string;
priority?: boolean;
className?: string;
}

export function ResponsiveImage({
src,
alt,
sizes = '100vw',
priority = false,
className
}: ImageProps) {
// Art direction breakpoints
const breakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920
};

// Generate srcSet for art direction
const generateSrcSet = (baseSrc: string) => {
  const [path, ext] = baseSrc.split('.');
  return {
    mobile: \`\${path}-mobile.\${ext}\`,
    tablet: \`\${path}-tablet.\${ext}\`,
    desktop: \`\${path}-desktop.\${ext}\`
  };
};

const srcSet = generateSrcSet(src);

return (
  <picture>
    {/* Mobile */}
    <source
      media={\`(max-width: \${breakpoints.mobile}px)\`}
      srcSet={srcSet.mobile}
      sizes={sizes}
    />
    
    {/* Tablet */}
    <source
      media={\`(max-width: \${breakpoints.tablet}px)\`}
      srcSet={srcSet.tablet}
      sizes={sizes}
    />
    
    {/* Desktop */}
    <source
      media={\`(min-width: \${breakpoints.tablet + 1}px)\`}
      srcSet={srcSet.desktop}
      sizes={sizes}
    />
    
    {/* Fallback */}
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      quality={90}
      fill
      style={{ objectFit: 'cover' }}
    />
  </picture>
);
}

// Usage example
export function HeroSection() {
return (
  <div className="relative h-screen">
    <ResponsiveImage
      src="/hero.jpg"
      alt="Hero image"
      priority
      sizes="(max-width: 640px) 100vw,
             (max-width: 1024px) 50vw,
             33vw"
    />
    <div className="relative z-10">
      <h1>Welcome</h1>
    </div>
  </div>
);
}

// Option B
// components/Image.tsx
import Image from 'next/image';

export function BasicImage({ src, alt }) {
return (
  <Image
    src={src}
    alt={alt}
    width={1200}
    height={800}
  />
);
}

// Option C
// components/Image.tsx
export function SimpleImage({ src, alt }) {
return (
  <img
    src={src}
    alt={alt}
    loading="lazy"
  />
);
}`,
    options: [
      'Option A: Using basic Next.js Image component',
      'Option B: Using standard img tag',
      'Option C: Using art direction with responsive images',
    ],
    correctAnswer: 2,
    explanation: 'Option A implements sophisticated image optimization patterns including art direction, responsive breakpoints, proper loading strategies, and SEO best practices while maintaining performance and accessibility.'
  }
]
};