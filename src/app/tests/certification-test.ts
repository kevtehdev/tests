import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const certificationTest: Test = {
  id: 'next-certification',
  category: TEST_CATEGORIES.CERTIFICATION,
  title: 'Next.js 14 Certification Exam Preparation',
  description: 'Comprehensive test covering core concepts likely to appear in Next.js 14 certification',
  questions: [
    {
      id: 'cert1',
      question: 'How do you properly implement hybrid rendering in Next.js 14?',
      code: [
        '// Which implementation correctly uses hybrid rendering strategies?',
        '',
        '// Option A',
        '// app/page.tsx',
        'export default async function HomePage() {',
        '  return (',
        '    <main>',
        '      {/* Static content */',
        '      <Header />',
        '      ',
        '      {/* Dynamic content */',
        '      <Suspense fallback={<ProductsSkeleton />}>',
        '        <Products />',
        '      </Suspense>',
        '      ',
        '      {/* Static with client interactivity */',
        '      <Suspense fallback={<UserSkeleton />}>',
        '        <UserProfile />',
        '      </Suspense>',
        '    </main>',
        '  );',
        '}',
        '',
        '// app/components/products.tsx',
        'async function Products() {',
        '  // Revalidate every hour',
        '  const products = await fetch("https://api.example.com/products", {',
        '    next: { revalidate: 3600 }',
        '  });',
        '  return <ProductList products={products} />;',
        '}',
        '',
        '// app/components/user-profile.tsx',
        '"use client"',
        'function UserProfile() {',
        '  const { data: user } = useSession();',
        '  return user ? <Profile user={user} /> : <LoginButton />;',
        '}',
        '',
        '// Option B',
        '// app/page.tsx',
        '"use client"',
        'export default function HomePage() {',
        '  const { data: products } = useSWR("/api/products");',
        '  const { data: user } = useSession();',
        '  ',
        '  return (',
        '    <main>',
        '      <Header />',
        '      <ProductList products={products} />',
        '      <Profile user={user} />',
        '    </main>',
        '  );',
        '}',
        '',
        '// Option C',
        '// app/page.tsx',
        'export const dynamic = "force-dynamic";',
        '',
        'export default async function HomePage() {',
        '  const products = await fetchProducts();',
        '  const user = await fetchUser();',
        '  ',
        '  return (',
        '    <main>',
        '      <Header />',
        '      <ProductList products={products} />',
        '      <Profile user={user} />',
        '    </main>',
        '  );',
        '}'
      ].join('\n'),
      options: [
        'Option A: Using selective hydration with Server and Client Components',
        'Option B: Using client-side data fetching',
        'Option C: Using force-dynamic rendering'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 best practices recommend using selective hydration with Server Components as default and Client Components only where needed, combined with Suspense for optimal loading patterns.'
    },
    {
      id: 'cert2',
      question: 'How do you implement proper data mutation patterns in Next.js 14?',
      code: [
        '// Which implementation follows best practices for data mutations?',
        '',
        '// Option A',
        '// app/actions.ts',
        '"use server"',
        '',
        'export async function updatePost(id: string, data: FormData) {',
        '  try {',
        '    // 1. Validate input',
        '    const { title, content } = validate(data);',
        '    ',
        '    // 2. Optimistic update',
        '    revalidateTag(`post-${id}`);',
        '    ',
        '    // 3. Persist data',
        '    await db.post.update({',
        '      where: { id },',
        '      data: { title, content }',
        '    });',
        '    ',
        '    // 4. Revalidate cached data',
        '    revalidateTag("posts");',
        '    revalidatePath("/posts");',
        '    ',
        '    return { success: true };',
        '  } catch (error) {',
        '    return { error: error.message };',
        '  }',
        '}',
        '',
        '// app/posts/[id]/edit.tsx',
        '"use client"',
        'export function EditPost({ post }) {',
        '  const [isPending, startTransition] = useTransition();',
        '  const [error, setError] = useState(null);',
        '  const [optimisticPost, setOptimisticPost] = useOptimistic(post);',
        '  ',
        '  async function onSubmit(formData: FormData) {',
        '    setError(null);',
        '    ',
        '    // Optimistic update',
        '    setOptimisticPost({',
        '      ...optimisticPost,',
        '      title: formData.get("title"),',
        '      content: formData.get("content")',
        '    });',
        '    ',
        '    startTransition(async () => {',
        '      const result = await updatePost(post.id, formData);',
        '      if (result.error) setError(result.error);',
        '    });',
        '  }',
        '  ',
        '  return (',
        '    <form action={onSubmit}>',
        '      {error && <ErrorMessage error={error} />}',
        '      <input name="title" defaultValue={optimisticPost.title} />',
        '      <textarea name="content" defaultValue={optimisticPost.content} />',
        '      <button disabled={isPending}>',
        '        {isPending ? "Saving..." : "Save"}',
        '      </button>',
        '    </form>',
        '  );',
        '}',
        '',
        '// Option B',
        '// app/posts/[id]/edit.tsx',
        '"use client"',
        'export default function EditPost({ post }) {',
        '  async function onSubmit(e) {',
        '    e.preventDefault();',
        '    await fetch(`/api/posts/${post.id}`, {',
        '      method: "PUT",',
        '      body: new FormData(e.target)',
        '    });',
        '    router.refresh();',
        '  }',
        '  ',
        '  return <form onSubmit={onSubmit}>...</form>;',
        '}',
        '',
        '// Option C',
        '// app/posts/[id]/edit.tsx',
        'export default function EditPost({ post }) {',
        '  async function handleSubmit(formData: FormData) {',
        '    "use server"',
        '    const { title, content } = Object.fromEntries(formData);',
        '    await db.post.update({',
        '      where: { id: post.id },',
        '      data: { title, content }',
        '    });',
        '  }',
        '  ',
        '  return <form action={handleSubmit}>...</form>;',
        '}'
      ].join('\n'),
      options: [
        'Option A: Using Server Actions with optimistic updates and proper error handling',
        'Option B: Using API routes with manual refresh',
        'Option C: Using inline Server Action'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using Server Actions with optimistic updates, proper error handling, and revalidation strategies for the best user experience and data consistency.'
    },

    {
      id: 'cert3',
      question: 'How do you implement proper authentication patterns in Next.js 14?',
      code: [
        '// Which implementation correctly handles authentication?',
        '',
        '// Option A',
        '// auth.ts',
        'import NextAuth from "next-auth";',
        'import { authConfig } from "./auth.config";',
        ' ',
        'export const { ',
        '  auth,',
        '  signIn,',
        '  signOut,',
        '  handlers: { GET, POST }',
        '} = NextAuth({',
        '  ...authConfig,',
        '  callbacks: {',
        '    authorized({ request, auth }) {',
        '      const isLoggedIn = !!auth?.user;',
        '      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");',
        '      ',
        '      if (isOnDashboard) {',
        '        if (isLoggedIn) return true;',
        '        return false; // Redirect to login',
        '      } else if (isLoggedIn) {',
        '        return Response.redirect(new URL("/dashboard", request.url));',
        '      }',
        '      return true;',
        '    },',
        '  },',
        '});',
        '',
        '// middleware.ts',
        'import { auth } from "./auth";',
        ' ',
        'export default auth((req) => {',
        '  // Verify auth status',
        '});',
        ' ',
        'export const config = {',
        '  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],',
        '};',
        '',
        '// Option B',
        '// app/dashboard/layout.tsx',
        'export default async function Layout({',
        '  children',
        '}: {',
        '  children: React.ReactNode',
        '}) {',
        '  const session = await getServerSession();',
        '  if (!session) redirect("/login");',
        '  return children;',
        '}',
        '',
        '// Option C',
        '// app/dashboard/page.tsx',
        '"use client"',
        'export default function DashboardPage() {',
        '  const { data: session, status } = useSession();',
        '  ',
        '  if (status === "loading") {',
        '    return <LoadingSpinner />;',
        '  }',
        '  ',
        '  if (status === "unauthenticated") {',
        '    redirect("/login");',
        '  }',
        '  ',
        '  return <Dashboard user={session.user} />;',
        '}'
      ].join('\n'),
      options: [
        'Option A: Using middleware-based auth with NextAuth v5',
        'Option B: Using layout-based auth checks',
        'Option C: Using client-side auth checks'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 with NextAuth v5 recommends using middleware-based authentication for better performance and security, handling auth checks before rendering begins.'
    },
    {
      id: 'cert4',
      question: 'How do you implement proper metadata handling in Next.js 14?',
      code: [
        '// Which implementation correctly handles metadata?',
        '',
        '// Option A',
        '// app/layout.tsx',
        'import { Metadata } from "next";',
        '',
        'export const metadata: Metadata = {',
        '  title: {',
        '    template: "%s | My App",',
        '    default: "My App",',
        '  },',
        '  description: "Next.js 14 Application",',
        '  metadataBase: new URL("https://myapp.com"),',
        '  alternates: {',
        '    canonical: "/",',
        '    languages: {',
        '      "en-US": "/en-US",',
        '      "de-DE": "/de-DE",',
        '    },',
        '  },',
        '};',
        '',
        '// app/products/[id]/page.tsx',
        'export async function generateMetadata({ ',
        '  params ',
        '}: { ',
        '  params: { id: string } ',
        '}): Promise<Metadata> {',
        '  const product = await fetchProduct(params.id);',
        '  ',
        '  return {',
        '    title: product.name,',
        '    description: product.description,',
        '    openGraph: {',
        '      images: [product.image],',
        '    },',
        '  };',
        '}',
        '',
        '// Option B',
        '// app/layout.tsx',
        '"use client"',
        'export default function RootLayout({',
        '  children',
        '}: {',
        '  children: React.ReactNode',
        '}) {',
        '  useEffect(() => {',
        '    document.title = "My App";',
        '  }, []);',
        '  ',
        '  return (',
        '    <html lang="en">',
        '      <body>{children}</body>',
        '    </html>',
        '  );',
        '}',
        '',
        '// Option C',
        '// app/layout.tsx',
        'export const metadata = {',
        '  title: "My App",',
        '  description: "Next.js 14 Application",',
        '};',
        '',
        'export default function RootLayout({',
        '  children',
        '}: {',
        '  children: React.ReactNode',
        '}) {',
        '  return (',
        '    <html lang="en">',
        '      <head>',
        '        <title>{metadata.title}</title>',
        '        <meta name="description" content={metadata.description} />',
        '      </head>',
        '      <body>{children}</body>',
        '    </html>',
        '  );',
        '}'
      ].join('\n'),
      options: [
        'Option A: Using typed metadata with templates and dynamic generation',
        'Option B: Using client-side metadata updates',
        'Option C: Using static metadata with manual head tags'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using the Metadata API with proper typing, templates for consistent branding, and dynamic metadata generation for optimal SEO.'
    },
    {
      id: 'cert5',
      question: 'How do you implement proper error handling in Next.js 14?',
      code: [
        '// Which implementation correctly handles errors?',
        '',
        '// Option A',
        '// app/error.tsx',
        '"use client"',
        'export default function GlobalError({',
        '  error,',
        '  reset,',
        '}: {',
        '  error: Error & { digest?: string }',
        '  reset: () => void',
        '}) {',
        '  useEffect(() => {',
        '    // Log to error reporting service',
        '    reportError(error);',
        '  }, [error]);',
        '',
        '  return (',
        '    <html>',
        '      <body>',
        '        <div className="error-container">',
        '          <h2>Something went wrong!</h2>',
        '          {process.env.NODE_ENV === "development" && (',
        '            <div className="error-details">',
        '              {error.message}',
        '              <pre>{error.stack}</pre>',
        '            </div>',
        '          )}',
        '          <button onClick={reset}>Try again</button>',
        '        </div>',
        '      </body>',
        '    </html>',
        '  );',
        '}',
        '',
        '// app/products/error.tsx',
        '"use client"',
        'export default function ProductError({',
        '  error,',
        '  reset,',
        '}: {',
        '  error: Error & { digest?: string }',
        '  reset: () => void',
        '}) {',
        '  return (',
        '    <div className="error-container">',
        '      <p>Failed to load products</p>',
        '      <button onClick={reset}>Retry</button>',
        '    </div>',
        '  );',
        '}',
        '',
        '// app/not-found.tsx',
        'export default function NotFound() {',
        '  return (',
        '    <div>',
        '      <h2>404 Not Found</h2>',
        '      <p>Could not find requested resource</p>',
        '      <Link href="/">Return Home</Link>',
        '    </div>',
        '  );',
        '}',
        '',
        '// Option B',
        '// app/products/page.tsx',
        '"use client"',
        'export default function ProductsPage() {',
        '  const [error, setError] = useState(null);',
        '  ',
        '  if (error) {',
        '    return <div>Error: {error.message}</div>;',
        '  }',
        '  ',
        '  return <Products onError={setError} />;',
        '}',
        '',
        '// Option C',
        '// app/products/page.tsx',
        'export default async function ProductsPage() {',
        '  try {',
        '    const products = await fetchProducts();',
        '    return <ProductList products={products} />;',
        '  } catch (error) {',
        '    return <div>Error loading products</div>;',
        '  }',
        '}'
      ].join('\n'),
      options: [
        'Option A: Using error boundaries with proper error reporting',
        'Option B: Using state-based error handling',
        'Option C: Using try-catch blocks'
      ],
      correctAnswer: 0,
      explanation: 'Next.js 14 recommends using error.tsx boundaries for granular error handling, combined with proper error reporting and development-mode details.'
    }
  ]
};