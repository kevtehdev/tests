// src/app/tests/data-fetching.ts
import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const dataFetchingTest: Test = {
  id: 'data-fetching',
  category: TEST_CATEGORIES.DATA_FETCHING,
  title: 'Next.js 14 Data Fetching',
  description: 'Master data fetching patterns and best practices in Next.js 14',
  questions: [
    {
      id: 'df1',
      question: 'What is the recommended way to fetch data in Next.js 14 Server Components?',
      code: `
// Which approach is correct for Server Components?

// Option A
export default async function Page() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  const data = await res.json();
  return <div>{data.title}</div>;
}

// Option B
'use client'
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  return <div>{data?.title}</div>;
}

// Option C
export default function Page() {
  const { data } = useSWR('https://api.example.com/data', fetcher);
  return <div>{data?.title}</div>;
}`,
      options: [
        'Using native fetch with async/await in Server Components',
        'Using useState and useEffect for data fetching',
        'Using SWR or React Query for data fetching'
      ],
      correctAnswer: 0,
      explanation: 'In Next.js 14, the recommended way to fetch data in Server Components is using native fetch with async/await. This approach provides automatic request deduplication, built-in caching, and runs on the server, reducing client-side JavaScript.'
    },
    {
      id: 'df2',
      question: 'How do you implement revalidation in Next.js 14?',
      code: `
// Which revalidation approach is correct?

// Option A
// app/products/page.tsx
export const revalidate = 60; // seconds

export default async function Page() {
  const data = await fetch('https://api.example.com/products');
  return <ProductList products={data} />;
}

// Option B
// app/products/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }
  });
  return <ProductList products={data} />;
}

// Option C
// app/products/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/products', {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'max-age=60'
    }
  });
  return <ProductList products={data} />;
}`,
      options: [
        'Using route segment config with revalidate',
        'Using fetch with next.revalidate option',
        'Using Cache-Control headers'
      ],
      correctAnswer: 1,
      explanation: 'In Next.js 14, the recommended way to implement revalidation is using the next.revalidate option in the fetch options. This provides more granular control over revalidation at the request level rather than the entire route segment.'
    },
    {
      id: 'df3',
      question: 'What is the correct way to handle dynamic data fetching with params in Next.js 14?',
      code: `
// Which implementation is correct?

// Option A
// app/products/[id]/page.tsx
export default async function Page({ params }: { params: { id: string }}) {
  const res = await fetch(\`https://api.example.com/products/\${params.id}\`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  const product = await res.json();
  return <ProductDetails product={product} />;
}

// Option B
// app/products/[id]/page.tsx
'use client'
export default function Page({ params }: { params: { id: string }}) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(\`https://api.example.com/products/\${params.id}\`)
      .then(res => res.json())
      .then(setProduct);
  }, [params.id]);
  return product ? <ProductDetails product={product} /> : <Loading />;
}

// Option C
// app/products/[id]/page.tsx
import { getProduct } from '@/lib/products';

export default function Page({ params }: { params: { id: string }}) {
  const product = getProduct(params.id);
  return <ProductDetails product={product} />;
}`,
      options: [
        'Using async Server Component with error handling',
        'Using client-side data fetching with useEffect',
        'Using synchronous data fetching function'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using async Server Components with proper error handling for dynamic data fetching. This approach provides better error handling, type safety, and automatic caching while keeping the data fetching on the server.'
    },
    {
      id: 'df4',
      question: 'How should you implement parallel data fetching in Next.js 14?',
      code: `
// Which approach is correct for parallel data fetching?

// Option A
async function getProduct(id: string) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  return res.json();
}

async function getRecommendations(id: string) {
  const res = await fetch(\`https://api.example.com/recommendations/\${id}\`);
  return res.json();
}

export default async function Page({ params }: { params: { id: string }}) {
  const product = await getProduct(params.id);
  const recommendations = await getRecommendations(params.id);
  return (
    <>
      <ProductDetails product={product} />
      <Recommendations items={recommendations} />
    </>
  );
}

// Option B
export default async function Page({ params }: { params: { id: string }}) {
  const [product, recommendations] = await Promise.all([
    getProduct(params.id),
    getRecommendations(params.id)
  ]);
  
  return (
    <>
      <ProductDetails product={product} />
      <Recommendations items={recommendations} />
    </>
  );
}

// Option C
export default function Page({ params }: { params: { id: string }}) {
  useEffect(() => {
    Promise.all([
      getProduct(params.id),
      getRecommendations(params.id)
    ]).then(([product, recommendations]) => {
      // handle data
    });
  }, [params.id]);
}`,
      options: [
        'Sequential fetching with multiple await statements',
        'Using Promise.all for parallel fetching',
        'Using useEffect with Promise.all'
      ],
      correctAnswer: 1,
      explanation: 'In Next.js 14, using Promise.all in Server Components is the recommended way to fetch data in parallel. This approach allows multiple requests to be made simultaneously, improving performance while maintaining the benefits of server-side rendering.'
    },
    {
      id: 'df5',
      question: 'What is the correct way to implement streaming with suspense in Next.js 14?',
      code: `
// Which streaming implementation is correct?

// Option A
export default async function Page() {
  const data = await slowDataFetch();
  return (
    <>
      <Header />
      <Content data={data} />
      <Footer />
    </>
  );
}

// Option B
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

// Option C
'use client'
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    slowDataFetch().then(() => setIsLoading(false));
  }, []);
  
  return (
    <>
      <Header />
      {isLoading ? <Loading /> : <Content />}
      <Footer />
    </>
  );
}`,
      options: [
        'Using await for all data fetching',
        'Using Suspense boundaries around slow components',
        'Using useState and useEffect for loading states'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 recommends using Suspense boundaries for streaming content. This allows parts of the page to be displayed immediately while slower components are loaded progressively, improving the perceived performance and user experience.'
    },
    {
        id: '',
        question: '',
        options: [],
        correctAnswer: 0,
        explanation: ''
    },
    {
        id: 'df6',
        question: 'How should you implement data mutations in Next.js 14?',
        code: `
  // Which mutation pattern is correct?
  
  // Option A
  // app/actions.ts
  'use server'
  async function updateProduct(formData: FormData) {
    const product = await db.product.update({
      where: { id: formData.get('id') },
      data: { title: formData.get('title') }
    });
    revalidatePath('/products');
    return product;
  }
  
  // app/products/page.tsx
  export default function Page() {
    return (
      <form action={updateProduct}>
        <input name="title" />
        <button type="submit">Update</button>
      </form>
    );
  }
  
  // Option B
  // app/api/products/route.ts
  export async function POST(request: Request) {
    const product = await request.json();
    const updated = await db.product.update({
      where: { id: product.id },
      data: { title: product.title }
    });
    return Response.json(updated);
  }
  
  // Option C
  'use client'
  export function updateProduct(data) {
    return fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }`,
        options: [
          'Using Server Actions with form actions',
          'Using API routes with POST requests',
          'Using client-side fetch calls'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 recommends using Server Actions for data mutations. They provide progressive enhancement, type safety, and direct database access while automatically handling revalidation and optimistic updates.'
      },
      {
        id: 'df7',
        question: 'What is the correct way to implement error handling in data fetching for Next.js 14?',
        code: `
  // Which error handling pattern is correct?
  
  // Option A
  async function getData() {
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  
  export default async function Page() {
    const data = await getData();
    return <div>{data.title}</div>;
  }
  
  // app/error.tsx
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
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </div>
    );
  }
  
  // Option B
  'use client'
  export default function Page() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://api.example.com/data')
        .catch(err => setError(err));
    }, []);
  
    if (error) return <div>Error loading data</div>;
    return <div>{data?.title}</div>;
  }
  
  // Option C
  export default async function Page() {
    try {
      const data = await getData();
      return <div>{data.title}</div>;
    } catch (error) {
      return <div>Error loading data</div>;
    }
  }`,
        options: [
          'Using error.tsx files with Server Components',
          'Using try-catch in client components',
          'Using try-catch in Server Components'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 recommends using error.tsx files for error handling with Server Components. This provides a consistent error boundary that can handle any errors in the Server Component tree and allows for recovery through the reset function.'
      },
      {
        id: 'df8',
        question: 'How do you implement request memoization in Next.js 14?',
        code: `
  // Which memoization pattern is correct?
  
  // Option A
  export default async function Layout({ children }) {
    const data = await fetch('https://api.example.com/data');
    return (
      <>
        <Header data={data} />
        {children}
        <Footer data={data} />
      </>
    );
  }
  
  // Option B
  const getData = cache(async () => {
    const res = await fetch('https://api.example.com/data');
    return res.json();
  });
  
  export default async function Layout({ children }) {
    const data = await getData();
    return (
      <>
        <Header data={data} />
        {children}
        <Footer data={data} />
      </>
    );
  }
  
  // Option C
  'use client'
  const getData = useMemo(async () => {
    const res = await fetch('https://api.example.com/data');
    return res.json();
  }, []);`,
        options: [
          'Using multiple fetch calls',
          'Using the cache function from React',
          'Using useMemo in client components'
        ],
        correctAnswer: 1,
        explanation: 'Next.js 14 provides automatic request memoization for fetch, but for other async operations, you can use the cache function from React. This ensures that multiple calls to the same function with the same arguments return the cached result.'
      },
      {
        id: 'df9',
        question: 'What is the correct way to implement sequential data fetching in Next.js 14?',
        code: `
  // Which sequential fetching pattern is correct?
  
  // Option A
  async function getUser(userId: string) {
    const user = await db.user.findUnique({ where: { id: userId }});
    const posts = await db.post.findMany({ where: { authorId: userId }});
    return { user, posts };
  }
  
  // Option B
  async function getUser(userId: string) {
    const user = await db.user.findUnique({ where: { id: userId }});
    if (!user) throw new Error('User not found');
    const posts = await db.post.findMany({ where: { authorId: userId }});
    return { user, posts };
  }
  
  // Option C
  async function getUser(userId: string) {
    return await db.user.findUnique({
      where: { id: userId },
      include: { posts: true }
    });
  }`,
        options: [
          'Simple sequential queries',
          'Sequential queries with error handling',
          'Using database relations and includes'
        ],
        correctAnswer: 1,
        explanation: 'In Next.js 14, when performing sequential data fetching, it\'s important to include proper error handling between dependent queries. This ensures that subsequent queries don\'t run if previous ones fail.'
      },
      {
        id: 'df10',
        question: 'How should you handle loading states for data fetching in Next.js 14?',
        code: `
  // Which loading state implementation is correct?
  
  // Option A
  // app/products/loading.tsx
  export default function Loading() {
    return <div>Loading products...</div>;
  }
  
  // app/products/page.tsx
  export default async function Page() {
    const products = await getProducts();
    return <ProductList products={products} />;
  }
  
  // Option B
  // app/products/page.tsx
  'use client'
  export default function Page() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      getProducts().then(setProducts).finally(() => setLoading(false));
    }, []);
  
    if (loading) return <div>Loading...</div>;
    return <ProductList products={products} />;
  }
  
  // Option C
  // app/products/page.tsx
  'use client'
  export default function Page() {
    const { data: products, isLoading } = useSWR('/api/products');
    
    if (isLoading) return <div>Loading...</div>;
    return <ProductList products={products} />;
  }`,
        options: [
          'Using loading.tsx files',
          'Using useState for loading states',
          'Using SWR loading states'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 uses loading.tsx files for handling loading states. These files are automatically wrapped in Suspense boundaries and shown while the content is loading, providing a consistent loading experience across the application.'
      },
      {
        id: 'df11',
        question: 'How do you implement data revalidation on demand in Next.js 14?',
        code: `
  // Which on-demand revalidation pattern is correct?
  
  // Option A
  // app/api/revalidate/route.ts
  import { revalidatePath, revalidateTag } from 'next/cache';
  
  export async function POST(request: Request) {
    const { path, tag } = await request.json();
    if (tag) {
      revalidateTag(tag);
    } else {
      revalidatePath(path);
    }
    return Response.json({ revalidated: true });
  }
  
  // Option B
  // app/page.tsx
  'use client'
  export default function Page() {
    const refreshData = () => {
      window.location.reload();
    };
  
    return <button onClick={refreshData}>Refresh</button>;
  }
  
  // Option C
  // app/page.tsx
  export default function Page() {
    const router = useRouter();
    
    const refreshData = () => {
      router.refresh();
    };
  
    return <button onClick={refreshData}>Refresh</button>;
  }`,
        options: [
          'Using revalidatePath and revalidateTag',
          'Using window.location.reload',
          'Using router.refresh'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 provides revalidatePath and revalidateTag functions for on-demand revalidation. These functions allow you to revalidate specific paths or cached data tagged with specific keys, providing fine-grained control over cache invalidation.'
      },
      {
        id: 'df12',
        question: 'What is the correct way to handle dynamic segments with data fetching in Next.js 14?',
        code: `
  // Which pattern is correct for dynamic segments?
  
  // Option A
  // app/[category]/page.tsx
  export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((category) => ({
      category: category.slug,
    }));
  }
  
  export default async function Page({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);
    return <ProductList products={products} />;
  }
  
  // Option B
  // app/[category]/page.tsx
  export const dynamicParams = false;
  
  export default async function Page({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);
    return <ProductList products={products} />;
  }
  
  // Option C
  // app/[category]/page.tsx
  export const dynamic = 'force-dynamic';
  
  export default async function Page({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);
    return <ProductList products={products} />;
  }`,
        options: [
          'Using generateStaticParams with dynamic segments',
          'Using dynamicParams: false',
          'Using dynamic: force-dynamic'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 recommends using generateStaticParams for dynamic segments when possible. This generates static paths at build time, improving performance while still allowing for dynamic data fetching within each path.'
      },
      {
        id: 'df13',
        question: 'How should you implement optimistic updates in Next.js 14?',
        code: `
  // Which optimistic update pattern is correct?
  
  // Option A
  'use server'
  async function addTodo(formData: FormData) {
    const todo = await db.todo.create({
      data: { title: formData.get('title') }
    });
    revalidatePath('/todos');
    return todo;
  }
  
  // Option B
  'use client'
  export default function TodoList() {
    const [todos, setTodos] = useState([]);
    
    async function addTodo(formData: FormData) {
      const newTodo = {
        id: Math.random(),
        title: formData.get('title'),
        status: 'pending'
      };
      
      setTodos([...todos, newTodo]);
      
      try {
        await createTodo(formData);
      } catch (error) {
        setTodos(todos);
        throw error;
      }
    }
  }
  
  // Option C
  export default function TodoList() {
    const { data, mutate } = useSWR('/api/todos');
    
    async function addTodo(formData: FormData) {
      await mutate(
        async () => {
          return createTodo(formData);
        },
        { optimisticData: [...data, newTodo] }
      );
    }
  }`,
        options: [
          'Using Server Actions without optimistic updates',
          'Using state updates with rollback',
          'Using SWR mutate with optimisticData'
        ],
        correctAnswer: 1,
        explanation: 'In Next.js 14, implementing optimistic updates with state management and rollback handling provides the best user experience. This pattern updates the UI immediately while handling the server request in the background, with proper error recovery.'
      },
      {
        id: 'df14',
        question: 'How do you implement cache tags in Next.js 14?',
        code: `
  // Which cache tagging pattern is correct?
  
  // Option A
  async function getProduct(id: string) {
    const res = await fetch(\`https://api.example.com/products/\${id}\`, {
      next: { tags: [\`product-\${id}\`] }
    });
    return res.json();
  }
  
  // app/api/revalidate/route.ts
  import { revalidateTag } from 'next/cache';
  
  export async function POST(request: Request) {
    const { id } = await request.json();
    revalidateTag(\`product-\${id}\`);
    return Response.json({ revalidated: true });
  }
  
  // Option B
  const cache = new Map();
  
  async function getProduct(id: string) {
    if (cache.has(id)) return cache.get(id);
    const res = await fetch(\`https://api.example.com/products/\${id}\`);
    const data = await res.json();
    cache.set(id, data);
    return data;
  }
  
  // Option C
  async function getProduct(id: string) {
    const res = await fetch(\`https://api.example.com/products/\${id}\`, {
      cache: 'force-cache',
      headers: {
        'Cache-Tag': \`product-\${id}\`
      }
    });
    return res.json();
  }`,
        options: [
          'Using next.tags with revalidateTag',
          'Using manual cache management',
          'Using cache headers with tags'
        ],
        correctAnswer: 0,
        explanation: 'Next.js 14 provides a cache tagging system through the next.tags option in fetch and revalidateTag function. This allows for fine-grained cache invalidation based on specific data dependencies.'
      },
      {
          id: 'df15',
          question: 'What is the correct way to implement data preloading in Next.js 14?',
          code: `
  // Which preloading pattern is correct?
  
  // Option A
  async function PreloadPosts() {
    // Preload the posts
    const posts = fetch('https://api.example.com/posts').then(res => res.json());
    
    return {
      posts: await posts
    };
  }
  
  export default async function Page() {
    const { posts } = await PreloadPosts();
    return <PostList posts={posts} />;
  }
  
  // Option B
  const preload = (id: string) => {
    void getPost(id);
  };
  
  export default function PostPage({ id }: {
    },
    
      ]
};`,
          options: [],
          correctAnswer: 0,
          explanation: 'The correct way to implement data preloading in Next.js 14 is by using the Option A approach, which involves fetching the data asynchronously and then using the fetched data in the component.'
        }
    ]
  };