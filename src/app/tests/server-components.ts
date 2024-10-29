import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const serverComponentsTest: Test = {
  id: 'next-server-components',
  category: TEST_CATEGORIES.SERVER_COMPONENTS,
  title: 'Next.js 14 Server Components Fundamentals',
  description: 'Master Server Components patterns and best practices in Next.js 14',
  questions: [
    {
      id: 'sc1',
      question: 'How do you properly implement data fetching in Server Components?',
      code: `
// Which implementation correctly fetches data in a Server Component?

// Option A
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { 
      revalidate: 3600,
      tags: ['products']
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
    <section>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </section>
  );
}

// Option B
// app/products/page.tsx
'use client'
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('https://api.example.com/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  return <ProductList products={products} />;
}

// Option C
// app/products/page.tsx
export default function ProductsPage() {
  const { data: products } = useSWR(
    'https://api.example.com/products',
    fetcher
  );
  
  return <ProductList products={products} />;
}`,
      options: [
        'Option A: Using async Server Component with fetch',
        'Option B: Using useEffect with fetch',
        'Option C: Using SWR for data fetching'
      ],
      correctAnswer: 0,
      explanation: 'Server Components in Next.js 14 should use async/await with fetch for data fetching, taking advantage of automatic request deduplication and built-in caching mechanisms.'
    },
    {
      id: 'sc2',
      question: 'How do you properly mix Client and Server Components?',
      code: `
// Which implementation correctly combines Client and Server Components?

// Option A
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { Analytics } from './analytics';
import { UserProfile } from './profile';

// Server Component
export default async function DashboardPage() {
  const userData = await fetchUserData();
  
  return (
    <div className="dashboard">
      {/* Static part rendered on server */}
      <h1>Dashboard</h1>
      
      {/* Server Component with Suspense */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
      
      {/* Client Component with server-fetched props */}
      <UserProfile 
        initialData={userData}
        className="profile-section"
      />
    </div>
  );
}

// components/analytics.tsx
// Server Component
export async function Analytics() {
  const data = await fetchAnalytics();
  return <AnalyticsChart data={data} />;
}

// components/profile.tsx
'use client'
export function UserProfile({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  return <ProfileCard data={data} />;
}

// Option B
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return (
    <div>
      <Analytics />
      <UserProfile data={data} />
    </div>
  );
}

// Option C
// app/dashboard/page.tsx
export default async function DashboardPage() {
  'use client'
  const data = await fetchData();
  return (
    <div>
      <Analytics data={data} />
      <UserProfile data={data} />
    </div>
  );
}`,
      options: [
        'Option A: Using Server Components with selective client components',
        'Option B: Using Client Component with useEffect',
        'Option C: Using mixed directives'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends keeping components server-side by default and selectively marking interactive parts as client components, using Suspense for streaming and passing server data as props.'
    },
    {
      id: 'sc3',
      question: 'How do you implement forms with Server Actions in Next.js 14?',
      code: `
// Which implementation correctly uses Server Actions with forms?

// Option A
// app/actions.ts
'use server'
 
export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
 
  try {
    await db.post.create({
      data: { title, content }
    });
    revalidateTag('posts');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create post' };
  }
}

// app/posts/new/page.tsx
export default function NewPost() {
  return (
    <form action={createPost}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}

// Option B
// app/posts/new/page.tsx
'use client'
export default function NewPost() {
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="title" />
      <button type="submit">Create</button>
    </form>
  );
}

// Option C
// app/api/posts/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  await db.post.create({ data });
  return Response.json({ success: true });
}`,
      options: [
        'Option A: Using Server Actions with form action',
        'Option B: Using Client Component with fetch',
        'Option C: Using API Route handler'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 Server Actions allow direct form submissions from Server Components, with proper error handling and cache revalidation.'
    },
    {
      id: 'sc4',
      question: 'How do you implement streaming with Server Components?',
      code: `
// Which implementation correctly uses streaming?

// Option A
// app/dashboard/page.tsx
export default async function DashboardPage() {
  return (
    <div className="dashboard">
      {/* Instantly loaded header */}
      <Header />
      
      {/* Stream in profile data */}
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      
      {/* Stream in feed items */}
      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed />
      </Suspense>
      
      {/* Nested streaming for recommendations */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations>
          <Suspense fallback={<ItemSkeleton />}>
            <RecommendedItems />
          </Suspense>
        </Recommendations>
      </Suspense>
    </div>
  );
}

// app/components/activity-feed.tsx
async function ActivityFeed() {
  const activities = await fetchActivities();
  return <FeedList items={activities} />;
}

// Option B
// app/dashboard/page.tsx
'use client'
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    Promise.all([
      loadProfile(),
      loadFeed(),
      loadRecommendations()
    ]).finally(() => setIsLoading(false));
  }, []);
  
  if (isLoading) return <Loading />;
  return <Dashboard />;
}

// Option C
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const [profile, feed, recommendations] = await Promise.all([
    fetchProfile(),
    fetchFeed(),
    fetchRecommendations(),
  ]);
  
  return (
    <Dashboard 
      profile={profile}
      feed={feed}
      recommendations={recommendations}
    />
  );
}`,
      options: [
        'Option A: Using nested Suspense boundaries',
        'Option B: Using Promise.all with loading state',
        'Option C: Using parallel data fetching'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 Server Components support streaming through nested Suspense boundaries, allowing progressive loading of UI elements as data becomes available.'
    },
    {
      id: 'sc5',
      question: 'How do you handle errors in Server Components?',
      code: `
// Which implementation correctly handles errors in Server Components?

// Option A
// app/products/error.tsx
'use client'
export default function ErrorBoundary({
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
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/products/page.tsx
export default async function ProductsPage() {
  const products = await fetchProducts();
  
  if (!products) {
    throw new Error('Failed to fetch products');
  }
  
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductList products={products} />
    </Suspense>
  );
}

// Option B
// app/products/page.tsx
export default async function ProductsPage() {
  try {
    const products = await fetchProducts();
    return <ProductList products={products} />;
  } catch (error) {
    return <ErrorComponent error={error} />;
  }
}

// Option C
// app/products/page.tsx
'use client'
export default function ProductsPage() {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchProducts().catch(setError);
  }, []);
  
  if (error) return <ErrorComponent error={error} />;
  return <ProductList />;
}`,
      options: [
        'Option A: Using error.tsx boundary with reset',
        'Option B: Using try-catch in component',
        'Option C: Using client-side error handling'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 Server Components use error.tsx boundaries for declarative error handling, with built-in reset functionality and error details.'
    },
    {
      id: 'sc6',
      question: 'How do you implement Server Component patterns with search and filtering?',
      code: `
// Which implementation correctly handles search/filtering in Server Components?

// Option A
// app/products/page.tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string }
}) {
  // URL: /products?q=phone&category=electronics
  const query = searchParams.q ?? '';
  const category = searchParams.category;
  
  const products = await fetchProducts({
    query,
    category,
    next: { tags: ['products'] }
  });
  
  return (
    <div>
      {/* Server-side search form */}
      <form>
        <input 
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search..."
        />
        <select name="category" defaultValue={category}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
        </select>
        <button type="submit">Search</button>
      </form>
      
      <Suspense 
        key={\`\${query}-\${category}\`}
        fallback={<ProductsSkeleton />}
      >
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}

// Option B
// app/products/page.tsx
'use client'
export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts({ query })
      .then(setProducts);
  }, [query]);
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ProductList products={products} />
    </div>
  );
}

// Option C
// app/products/page.tsx
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  return (
    <Suspense>
      <ProductList query={query} />
    </Suspense>
  );
}`,
      options: [
        'Option A: Using searchParams with server-side form',
        'Option B: Using client-side state management',
        'Option C: Using useSearchParams hook'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 Server Components can handle search and filtering through URL searchParams, maintaining a stateless architecture with server-side rendering.'
    },
    {
        id: 'sc7',
        question: 'How do you implement data mutations with Server Actions and optimistic updates?',
        code: `
      // Which implementation correctly handles data mutations with optimistic updates?
      
      // Option A
      // app/actions.ts
      'use server'
      
      export async function updatePost(id: string, data: FormData) {
        try {
          await db.post.update({
            where: { id },
            data: {
              title: data.get('title'),
              content: data.get('content')
            }
          });
          revalidateTag('posts');
          return { success: true };
        } catch (error) {
          return { error: 'Failed to update post' };
        }
      }
      
      // app/posts/[id]/edit.tsx
      'use client'
      export function EditPost({ post }) {
        const [optimisticPost, setOptimisticPost] = useOptimistic(post);
        
        async function onSubmit(formData: FormData) {
          setOptimisticPost({
            ...optimisticPost,
            title: formData.get('title'),
            content: formData.get('content')
          });
          
          await updatePost(post.id, formData);
        }
        
        return (
          <form action={onSubmit}>
            <input
              name="title"
              defaultValue={optimisticPost.title}
            />
            <textarea
              name="content"
              defaultValue={optimisticPost.content}
            />
            <button type="submit">Save Changes</button>
          </form>
        );
      }
      
      // Option B
      // app/posts/[id]/edit.tsx
      'use client'
      export default function EditPost({ post }) {
        const [isLoading, setIsLoading] = useState(false);
        
        async function onSubmit(e) {
          e.preventDefault();
          setIsLoading(true);
          await fetch(\`/api/posts/\${post.id}\`, {
            method: 'PATCH',
            body: new FormData(e.target),
          });
          setIsLoading(false);
        }
        
        return (
          <form onSubmit={onSubmit}>
            <input name="title" defaultValue={post.title} />
            <textarea name="content" defaultValue={post.content} />
            <button disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </form>
        );
      }
      
      // Option C
      // app/posts/[id]/edit.tsx
      export default function EditPost({ post }) {
        const mutation = useMutation(updatePost);
        
        return (
          <form onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(new FormData(e.target));
          }}>
            <input name="title" defaultValue={post.title} />
            <textarea name="content" defaultValue={post.content} />
            <button>Save</button>
          </form>
        );
      }`,
        options: [
          'Option A: Using Server Actions with optimistic updates',
          'Option B: Using client-side fetch with loading state',
          'Option C: Using mutation library'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 Server Components work best with Server Actions and useOptimistic hook for immediate UI feedback while mutations complete.'
      },
        {
          id: 'sc8',
          question: 'How do you implement progressive enhancement in Server Components?',
          code: `
      // Which implementation correctly handles progressive enhancement?
      
      // Option A
      // app/posts/[id]/page.tsx
      export default async function PostPage({ params }) {
        const post = await fetchPost(params.id);
        
        return (
          <article>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            
            {/* Progressive enhancement for likes */}
            <form action={likePost}>
              <input type="hidden" name="postId" value={params.id} />
              <button type="submit">Like Post</button>
            </form>
            
            {/* Progressive enhancement for comments */}
            <CommentsSection 
              postId={params.id}
              initialComments={post.comments}
            />
          </article>
        );
      }
      
      // components/comments-section.tsx
      'use client'
      export function CommentsSection({ postId, initialComments }) {
        return (
          <div>
            <CommentList comments={initialComments} />
            {/* Enhanced commenting experience */}
            <CommentInput postId={postId} />
          </div>
        );
      }
      
      // Option B
      // app/posts/[id]/page.tsx
      'use client'
      export default function PostPage({ params }) {
        const { data: post } = useSWR(
          \`/api/posts/\${params.id}\`,
          fetcher
        );
        
        if (!post) return null;
        return <PostContent post={post} />;
      }
      
      // Option C
      // app/posts/[id]/page.tsx
      export default function PostPage({ params }) {
        useEffect(() => {
          enhancePostInteractions(params.id);
        }, [params.id]);
        
        return <PostContent id={params.id} />;
      }`,
          options: [
            'Option A: Using server-first approach with client enhancements',
            'Option B: Using client-side data fetching',
            'Option C: Using useEffect for enhancements'
          ],
          correctAnswer: 0,
          explanation: 'Next.js 14 Server Components support progressive enhancement by starting with server-rendered HTML and selectively adding client-side interactivity.'
        },
        {
          id: 'sc9',
          question: 'How do you implement data revalidation in Server Components?',
          code: `
      // Which implementation correctly handles data revalidation?
      
      // Option A
      // app/lib/actions.ts
      'use server'
      
      async function fetchPosts() {
        const res = await fetch('https://api.example.com/posts', {
          next: { 
            tags: ['posts'],
            revalidate: 60
          }
        });
        return res.json();
      }
      
      export async function createPost(data: FormData) {
        await db.post.create({
          data: Object.fromEntries(data)
        });
        revalidateTag('posts');
      }
      
      export async function deletePost(id: string) {
        await db.post.delete({ where: { id } });
        revalidateTag('posts');
        revalidatePath('/posts');
      }
      
      // Option B
      // app/posts/page.tsx
      'use client'
      export default function PostsPage() {
        const { data, mutate } = useSWR('/api/posts', fetcher, {
          revalidateOnFocus: true,
          revalidateOnMount: true
        });
        
        return <PostList posts={data} onMutate={mutate} />;
      }
      
      // Option C
      // app/posts/page.tsx
      export default async function PostsPage() {
        const posts = await fetchPosts();
        
        setInterval(() => {
          fetchPosts();
        }, 60000);
        
        return <PostList posts={posts} />;
      }`,
          options: [
            'Option A: Using tag-based and path-based revalidation',
            'Option B: Using SWR with revalidation options',
            'Option C: Using interval-based revalidation'
          ],
          correctAnswer: 0,
          explanation: 'Next.js 14 Server Components support granular revalidation through tags and paths, allowing efficient cache invalidation after mutations.'
        },
        {
          id: 'sc10',
          question: 'How do you implement dynamic rendering decisions in Server Components?',
          code: `
      // Which implementation correctly handles dynamic rendering?
      
      // Option A
      // app/posts/[id]/page.tsx
      export default async function PostPage({ params }) {
        // Check if dynamic rendering is needed
        const post = await fetchPost(params.id);
        const hasRealtimeComments = post.settings.realtime;
        const hasUserSpecificContent = post.settings.personalized;
        
        // Force dynamic rendering if needed
        export const dynamic = hasRealtimeComments || hasUserSpecificContent ? 
          'force-dynamic' : 
          'force-static';
        
        return (
          <article>
            <PostContent post={post} />
            {hasRealtimeComments ? (
              <RealtimeComments postId={params.id} />
            ) : (
              <StaticComments comments={post.comments} />
            )}
          </article>
        );
      }
      
      // Option B
      // app/posts/[id]/page.tsx
      export const dynamic = 'force-dynamic';
      
      export default async function PostPage({ params }) {
        const post = await fetchPost(params.id);
        return <PostContent post={post} />;
      }
      
      // Option C
      // app/posts/[id]/page.tsx
      'use client'
      export default function PostPage({ params }) {
        const shouldUpdate = useMemo(
          () => checkIfShouldUpdate(),
          []
        );
        
        if (shouldUpdate) {
          return <DynamicPost id={params.id} />;
        }
        
        return <StaticPost id={params.id} />;
      }`,
          options: [
            'Option A: Using conditional dynamic rendering',
            'Option B: Using forced dynamic rendering',
            'Option C: Using client-side rendering decision'
          ],
          correctAnswer: 0,
          explanation: 'Next.js 14 Server Components support conditional dynamic rendering based on runtime checks, allowing optimal caching strategies for different content types.'
        }
    ]
    };