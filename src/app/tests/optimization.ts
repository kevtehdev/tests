import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const optimizationTest: Test = {
  id: 'optimization',
  category: TEST_CATEGORIES.OPTIMIZATION,
  title: 'Next.js 14 Performance Optimization',
  description: 'Master performance optimization techniques in Next.js 14 including partial prerendering, image optimization, and caching strategies',
  questions: [
    {
      id: 'opt1',
      question: 'What is the correct way to implement partial prerendering in Next.js 14?',
      code: `
// Which approach correctly implements partial prerendering?

// Option A
export default async function Page() {
  const staticData = await getStaticData();
  const dynamicData = await getDynamicData();
  
  return (
    <div>
      <Static data={staticData} />
      <Dynamic data={dynamicData} />
    </div>
  );
}

// Option B
export default async function Page() {
  const staticData = await getStaticData();
  
  return (
    <div>
      <Static data={staticData} />
      <Suspense fallback={<Loading />}>
        <Dynamic />
      </Suspense>
    </div>
  );
}

// Option C
export const dynamic = 'force-dynamic';
export default async function Page() {
  const allData = await getData();
  return <div>{allData}</div>;
}`,
      options: [
        'Loading all data in the page component',
        'Using Suspense boundaries for dynamic content',
        'Using force-dynamic for the entire page'
      ],
      correctAnswer: 1,
      explanation: 'In Next.js 14, partial prerendering is best implemented using Suspense boundaries around dynamic content. This allows static content to be served immediately while dynamic content is loaded progressively, improving initial page load performance.'
    },
    {
      id: 'opt2',
      question: 'How should you optimize image loading in Next.js 14?',
      code: `
// Which image implementation provides the best performance?

// Option A
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        width={1200}
        height={600}
        priority
        alt="Hero image"
      />
      <Image
        src="/thumbnail.jpg"
        width={300}
        height={200}
        loading="lazy"
        alt="Thumbnail"
      />
    </div>
  );
}

// Option B
export default function Gallery() {
  return (
    <div>
      <img 
        src="/hero.jpg" 
        width="1200"
        height="600"
        loading="eager"
        alt="Hero image"
      />
      <img
        src="/thumbnail.jpg"
        width="300"
        height="200"
        loading="lazy"
        alt="Thumbnail"
      />
    </div>
  );
}

// Option C
export default function Gallery() {
  return (
    <div>
      <picture>
        <source srcSet="/hero.webp" type="image/webp" />
        <source srcSet="/hero.jpg" type="image/jpeg" />
        <img src="/hero.jpg" alt="Hero image" />
      </picture>
      <picture>
        <source srcSet="/thumbnail.webp" type="image/webp" />
        <source srcSet="/thumbnail.jpg" type="image/jpeg" />
        <img src="/thumbnail.jpg" alt="Thumbnail" />
      </picture>
    </div>
  );
}`,
      options: [
        'Using next/image with priority for LCP images',
        'Using native img tags with loading attributes',
        'Using picture element with multiple sources'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14\'s Image component provides the best optimization by automatically handling responsive sizes, formats, lazy loading, and using priority for LCP (Largest Contentful Paint) images. It also optimizes images on-demand and caches them at the edge.'
    },
    {
      id: 'opt3',
      question: 'What is the correct way to implement code splitting in Next.js 14?',
      code: `
// Which code splitting approach is most optimal?

// Option A
import { lazy } from 'react';

const HeavyComponent = lazy(() => import('@/components/HeavyComponent'));

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}

// Option B
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Loading />,
  ssr: false
});

export default function Page() {
  return <HeavyComponent />;
}

// Option C
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Loading />
});

export default function Page() {
  return <HeavyComponent />;
}`,
      options: [
        'Using React.lazy with Suspense',
        'Using next/dynamic with ssr: false',
        'Using next/dynamic with default settings'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 recommends using next/dynamic with default settings for optimal code splitting. This approach supports both client and server-side rendering while automatically handling code splitting and loading states.'
    },
    {
      id: 'opt4',
      question: 'How should you implement route segment configuration for performance in Next.js 14?',
      code: `
// Which configuration provides the best performance for a product page?

// Option A
// app/products/[id]/page.tsx
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-cache';

export default async function Page({ params }) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}

// Option B
// app/products/[id]/page.tsx
export const dynamic = 'error';
export const revalidate = 3600;

export default async function Page({ params }) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}

// Option C
// app/products/[id]/page.tsx
export default async function Page({ params }) {
  const product = await getProduct(params.id, {
    next: { revalidate: 3600 }
  });
  return <ProductDetails product={product} />;
}`,
      options: [
        'Using force-dynamic with force-cache',
        'Using dynamic: error with page-level revalidation',
        'Using fetch-level revalidation'
      ],
      correctAnswer: 2,
      explanation: 'In Next.js 14, using fetch-level revalidation provides the most granular control over caching and revalidation. This allows different data fetching operations to have their own caching strategies while maintaining optimal performance.'
    },
    {
      id: 'opt5',
      question: 'What is the correct way to implement streaming for large data sets in Next.js 14?',
      code: `
// Which streaming implementation is most efficient?

// Option A
export default async function Page() {
  const products = await fetchAllProducts();
  return (
    <div>
      <header>Products</header>
      <ProductList products={products} />
    </div>
  );
}

// Option B
export default function Page() {
  return (
    <div>
      <header>Products</header>
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </div>
  );
}

// Option C
export default function Page() {
  return (
    <div>
      <header>Products</header>
      <Suspense fallback={<Loading />}>
        <ProductList initialFetch={10} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <RemainingProducts />
      </Suspense>
    </div>
  );
}`,
      options: [
        'Loading all data at once',
        'Using a single Suspense boundary',
        'Using multiple Suspense boundaries with chunked data'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 performs best when streaming large datasets using multiple Suspense boundaries with chunked data. This allows the most critical content to be displayed first while progressively loading the remaining data, improving perceived performance.'
    },
    {
      id: 'opt6',
      question: 'How should you optimize client-side navigation in Next.js 14?',
      code: `
// Which implementation provides the best navigation performance?

// Option A
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/products" prefetch={false}>
        Products
      </Link>
      <Link href="/about">
        About
      </Link>
    </nav>
  );
}

// Option B
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/products">
        Products
      </Link>
      <Link href="/about" prefetch>
        About
      </Link>
    </nav>
  );
}

// Option C
'use client'
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  return (
    <nav>
      <button onClick={() => router.push('/products')}>
        Products
      </button>
      <button onClick={() => router.push('/about')}>
        About
      </button>
    </nav>
  );
}`,
      options: [
        'Disabling prefetch for specific routes',
        'Using default Link behavior with explicit prefetch',
        'Using programmatic navigation with router'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 automatically optimizes client-side navigation using Link components with automatic prefetching. The default behavior prefetches links in viewport, improving perceived performance while managing browser resources effectively.'
    },
    {
      id: 'opt7',
      question: 'What is the correct way to implement static path generation for optimal performance?',
      code: `
// Which static path implementation is most efficient?

// Option A
// app/products/[category]/[id]/page.tsx
export async function generateStaticParams() {
  const categories = await getCategories();
  const products = await getAllProducts();
  
  return products.map((product) => ({
    category: product.category,
    id: product.id,
  }));
}

// Option B
// app/products/[category]/[id]/page.tsx
export async function generateStaticParams() {
  const categories = await getCategories();
  
  return categories.flatMap(async (category) => {
    const products = await getProductsByCategory(category);
    return products.map((product) => ({
      category: category,
      id: product.id,
    }));
  });
}

// Option C
// app/products/[category]/[id]/page.tsx
export async function generateStaticParams() {
  const categories = await getCategories();
  const paths = [];
  
  for (const category of categories) {
    const products = await getProductsByCategory(category);
    paths.push(...products.map((product) => ({
      category: category,
      id: product.id,
    })));
  }
  
  return paths;
}`,
      options: [
        'Fetching all products at once',
        'Using async flatMap',
        'Using sequential fetching with for...of'
      ],
      correctAnswer: 0,
      explanation: 'In Next.js 14, fetching all necessary data at once for generateStaticParams is most efficient. This approach minimizes database queries and allows for better build-time optimization when generating static paths.'
    },
    {
      id: 'opt8',
      question: 'How should you implement memory optimization for large lists in Next.js 14?',
      code: `
// Which implementation best handles large lists?

// Option A
export default function ProductList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

// Option B
'use client'
export default function ProductList({ products }) {
  const [visibleProducts, setVisibleProducts] = useState(
    products.slice(0, 20)
  );
  
  useEffect(() => {
    const observer = new IntersectionObserver(...);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div>
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      <div ref={loadMoreRef} />
    </div>
  );
}

// Option C
import { useVirtualizer } from '@tanstack/react-virtual';

export default function ProductList({ products }) {
  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });
  
  return (
    <div ref={parentRef}>
      <div
        style={{
          height: virtualizer.getTotalSize() + 'px',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <ProductCard
            key={virtualItem.key}
            product={products[virtualItem.index]}
            style={{
              position: 'absolute',
              top: 0,
              transform: \`translateY(\${virtualItem.start}px)\`,
            }}
          />
        ))}
      </div>
    </div>
  );
}`,
      options: [
        'Rendering all items directly',
        'Using intersection observer for infinite scroll',
        'Using virtualization for large lists'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 applications perform best with virtualization for large lists. This approach only renders items currently in view, significantly reducing memory usage and improving performance for large datasets.'
    },
    {
      id: 'opt9',
      question: 'What is the correct way to optimize font loading in Next.js 14?',
      code: `
// Which font loading implementation is most optimal?

// Option A
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// Option B
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

// Option C
// app/layout.tsx
import localFont from 'next/font/local';

const inter = localFont({
  src: '../assets/inter.woff2',
  display: 'block',
});`,
      options: [
        'Using next/font/google with display swap',
        'Using Google Fonts CSS link',
        'Using next/font/local with display block'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using next/font/google with display swap for optimal font loading. This approach automatically handles font optimization, including subsets, caching, and loading.'
    },
    {
        id: 'opt9',
      question: 'What is the correct way to optimize font loading in Next.js 14?',
      code: `
// Which font loading implementation is most optimal?

// Option A
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// Option B
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

// Option C
// app/layout.tsx
import localFont from 'next/font/local';

const inter = localFont({
  src: '../assets/inter.woff2',
  display: 'block',
});`,
      options: [
        'Using next/font/google with display swap',
        'Using Google Fonts CSS link',
        'Using next/font/local with display block'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using next/font/google with display swap for optimal font loading. This approach automatically handles font optimization, including subsets, caching, and prevents layout shift while ensuring fast font loading.'
    },
    {
      id: 'opt10',
      question: 'How should you optimize metadata handling in Next.js 14?',
      code: `
// Which metadata implementation is most performant?

// Option A
// app/layout.tsx
export const metadata = {
  title: 'My Site',
  description: 'Site description',
  openGraph: {
    title: 'My Site',
    description: 'Site description'
  }
};

// Option B
// app/[product]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.product);
  
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description
    }
  };
}

// Option C
// app/page.tsx
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Site</title>
        <meta name="description" content="Site description" />
      </Head>
      {/* content */}
    </>
  );
}`,
      options: [
        'Using static metadata export',
        'Using generateMetadata function',
        'Using next/head component'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 performs best with generateMetadata for dynamic routes, as it allows metadata to be generated at build time when possible and streamed efficiently when dynamic. This approach also enables proper cache management and optimization.'
    },
    {
      id: 'opt11',
      question: 'What is the correct way to implement parallel data loading in Next.js 14?',
      code: `
// Which implementation provides the most efficient parallel loading?

// Option A
export default async function Page() {
  const [products, categories, user] = await Promise.all([
    getProducts(),
    getCategories(),
    getUser()
  ]);
  
  return (
    <div>
      <ProductList products={products} />
      <CategoryNav categories={categories} />
      <UserProfile user={user} />
    </div>
  );
}

// Option B
export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();
  const user = await getUser();
  
  return (
    <div>
      <ProductList products={products} />
      <CategoryNav categories={categories} />
      <UserProfile user={user} />
    </div>
  );
}

// Option C
export default function Page() {
  return (
    <div>
      <Suspense fallback={<ProductSkeleton />}>
        <Products />
      </Suspense>
      <Suspense fallback={<CategorySkeleton />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<UserSkeleton />}>
        <User />
      </Suspense>
    </div>
  );
}`,
      options: [
        'Using Promise.all for parallel requests',
        'Using sequential await statements',
        'Using multiple Suspense boundaries'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 achieves optimal parallel loading using multiple Suspense boundaries. This approach allows independent loading of components, enabling streaming and progressive enhancement while showing meaningful loading states.'
    },
    {
      id: 'opt12',
      question: 'How should you implement client-side state management for optimal performance?',
      code: `
// Which state management approach is most efficient?

// Option A
'use client'
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Option B
'use client'
const store = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

export default function Counter() {
  const { count, increment } = store();
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}

// Option C
'use client'
export default function Counter() {
  const countRef = useRef(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  return (
    <button onClick={() => {
      countRef.current++;
      forceUpdate();
    }}>
      Count: {countRef.current}
    </button>
  );
}`,
      options: [
        'Using local useState',
        'Using global state management',
        'Using useRef with forceUpdate'
      ],
      correctAnswer: 0,
      explanation: 'For simple state management in Next.js 14, using local useState provides the best performance. It minimizes re-renders, keeps state management close to where it\'s needed, and avoids unnecessary complexity and overhead of global state management solutions.'
    },
    {
      id: 'opt13',
      question: 'What is the correct way to implement route caching in Next.js 14?',
      code: `
// Which caching strategy is most efficient?

// Option A
// app/products/[id]/page.tsx
export default async function Page({ params }) {
  const product = await fetch(\`/api/products/\${params.id}\`, {
    next: { revalidate: 3600 }
  });
  return <ProductDetails product={product} />;
}

// Option B
// app/products/[id]/page.tsx
export const dynamic = 'force-dynamic';
export default async function Page({ params }) {
  const product = await fetch(\`/api/products/\${params.id}\`);
  return <ProductDetails product={product} />;
}

// Option C
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({ params }) {
  const product = await fetch(\`/api/products/\${params.id}\`);
  return <ProductDetails product={product} />;
}`,
      options: [
        'Using fetch with revalidate',
        'Using force-dynamic',
        'Using generateStaticParams with default caching'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 performs best with granular cache control using fetch with revalidate. This approach allows for flexible cache invalidation strategies while maintaining optimal performance through incremental static regeneration.'
    },
    {
      id: 'opt14',
      question: 'How should you optimize third-party script loading in Next.js 14?',
      code: `
// Which script loading implementation is most optimal?

// Option A
import Script from 'next/script';

export default function Layout() {
  return (
    <>
      <Script
        src="https://analytics.com/script.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}

// Option B
export default function Layout() {
  return (
    <>
      <script
        src="https://analytics.com/script.js"
        async
        defer
      />
      {children}
    </>
  );
}

// Option C
export default function Layout() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://analytics.com/script.js';
    document.body.appendChild(script);
  }, []);
  
  return <>{children}</>;
}`,
      options: [
        'Using next/script with strategy',
        'Using script tag with async/defer',
        'Using useEffect for dynamic script loading'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 optimizes third-party script loading best using next/script with appropriate loading strategies. This provides automatic optimization, proper resource loading, and ensures scripts don\'t block initial page render.'
    },
    {
      id: 'opt15',
      question: 'What is the correct way to implement static site generation (SSG) with dynamic routes?',
      code: `
// Which SSG implementation is most efficient?

// Option A
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return <PostContent post={post} />;
}

// Option B
// app/[slug]/page.tsx
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return <PostContent post={post} />;
}

// Option C
// app/[slug]/page.tsx
export const dynamic = 'auto';

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return <PostContent post={post} />;
}`,
      options: [
        'Using generateStaticParams only',
        'Using generateStaticParams with dynamicParams: false',
        'Using dynamic: auto without generateStaticParams'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 achieves optimal SSG for dynamic routes using generateStaticParams with dynamicParams: false. This combination ensures all paths are generated at build time and prevents runtime fallbacks, maximizing performance and SEO benefits.'
    }
  ]
};