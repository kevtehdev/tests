import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const authTest: Test = {
  id: 'next-auth',
  category: TEST_CATEGORIES.AUTH,
  title: 'Next.js 14 Authentication with Auth.js',
  description: 'Master authentication patterns in Next.js 14 using Next Auth and Auth.js (NextAuth v5 Beta)',
  questions: [
    {
      id: 'a1',
      question: 'How do you properly configure Auth.js (NextAuth v5) in Next.js 14?',
      code: `
// Which implementation correctly configures Auth.js?

// Option A
// auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { authConfig } from './auth.config';
 
export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/dashboard')) return !!auth;
      return true;
    }
  }
});

// middleware.ts
import { auth } from './auth';
 
export default auth((req) => {
  // req.auth
});
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// Option B
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});

// Option C
// app/api/auth/[...nextauth]/route.ts
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler: NextApiHandler = NextAuth({
  providers: [GithubProvider],
});

export { handler as GET, handler as POST };`,
      options: [
        'Option A: Using Auth.js configuration with middleware',
        'Option B: Using pages directory configuration',
        'Option C: Using App Router API routes'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js (NextAuth v5) in Next.js 14 uses a new configuration pattern with auth.ts, explicitly exported handlers, and middleware integration.'
    },
    {
      id: 'a2',
      question: 'How do you implement protected routes using Auth.js in Next.js 14?',
      code: `
// Which implementation correctly protects routes?

// Option A
// middleware.ts
import { auth } from './auth';
 
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  
  if (isOnAdmin && !req.auth?.user?.isAdmin) {
    return Response.redirect(new URL('/login', req.url));
  }
  
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.url));
  }
});
 
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

// Option B
// app/dashboard/layout.tsx
export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  if (!session) redirect('/login');
  return children;
}

// Option C
// app/dashboard/page.tsx
'use client'
export default function Page() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'unauthenticated') {
    redirect('/login');
  }
  
  return <Dashboard />;
}`,
      options: [
        'Option A: Using middleware with auth check',
        'Option B: Using layout-based protection',
        'Option C: Using client-side session check'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 recommends using middleware with auth checks for protecting routes at the edge, before any rendering occurs.'
    },
    {
      id: 'a3',
      question: 'How do you implement session handling in Next.js 14 with Auth.js?',
      code: `
// Which implementation correctly handles sessions?

// Option A
// app/profile/page.tsx
import { auth } from '@/auth';

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }
  
  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}

// app/components/profile-client.tsx
'use client'
import { useSession } from 'next-auth/react';

export function ProfileClient() {
  const { data: session } = useSession();
  return <div>Client: {session?.user?.name}</div>;
}

// Option B
// app/profile/page.tsx
import { getServerSession } from 'next-auth';

export default async function ProfilePage() {
  const session = await getServerSession();
  return <div>Welcome {session?.user?.name}</div>;
}

// Option C
// app/profile/page.tsx
'use client'
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(setSession);
  }, []);
  
  return <div>Welcome {session?.user?.name}</div>;
}`,
      options: [
        'Option A: Using auth() function and useSession hook',
        'Option B: Using getServerSession',
        'Option C: Using fetch API'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 provides the auth() function for server components and useSession hook for client components, with proper typing and optimization.'
    },
    {
      id: 'a4',
      question: 'How do you implement custom sign-in pages with Auth.js in Next.js 14?',
      code: `
// Which implementation correctly creates a custom sign-in page?

// Option A
// app/login/page.tsx
import { LoginForm } from '@/components/login-form';
import { auth } from '@/auth';
 
export default async function LoginPage() {
  const session = await auth();
  
  if (session?.user) {
    redirect('/dashboard');
  }
 
  return <LoginForm />;
}

// components/login-form.tsx
'use client'
import { signIn } from 'next-auth/react';
 
export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
 
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
 
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    });
 
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input name="username" type="text" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}

// Option B
// pages/auth/signin.tsx
export default function SignIn() {
  return (
    <div>
      <button onClick={() => signIn('github')}>
        Sign in with GitHub
      </button>
    </div>
  );
}

// Option C
// app/login/page.tsx
'use client'
export default function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: new FormData(e.target),
    });
    if (res.ok) {
      router.push('/dashboard');
    }
  };
  
  return <form onSubmit={handleLogin}>...</form>;
}`,
      options: [
        'Option A: Using auth() check and signIn function',
        'Option B: Using pages directory signin page',
        'Option C: Using custom API route'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 uses the auth() function for session checks and signIn function for authentication, with proper error handling and redirects.'
    },
    {
      id: 'a5',
      question: 'How do you implement custom providers in Auth.js with Next.js 14?',
      code: `
// Which implementation correctly creates a custom provider?

// Option A
// auth.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { fetchUser } from '@/lib/users';
 
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;
 
        const user = await fetchUser(username);
        if (!user) return null;
 
        const validPassword = await bcrypt.compare(
          password,
          user.password
        );
 
        if (!validPassword) return null;
 
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

// Option B
// pages/api/auth/[...nextauth].ts
export default NextAuth({
  providers: [
    {
      id: 'custom',
      name: 'Custom Provider',
      type: 'credentials',
      authorize: async (credentials) => {
        return { id: 1, name: 'Test' };
      },
    },
  ],
});

// Option C
// app/api/auth/[...nextauth]/route.ts
const handler = NextAuth({
  providers: [
    {
      name: 'Custom',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        return null;
      },
    },
  ],
});`,
      options: [
        'Option A: Using NextAuthConfig with proper typing',
        'Option B: Using pages directory configuration',
        'Option C: Using basic credentials provider'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 uses NextAuthConfig with proper typing for custom providers, including JWT and session callback configuration.'
    },
    {
      id: 'a6',
      question: 'How do you implement role-based authorization with Auth.js in Next.js 14?',
      code: `
// Which implementation correctly handles role-based auth?

// Option A
// middleware.ts
import { auth } from './auth';

export default auth((req) => {
  const isAdmin = req.auth?.user?.role === 'admin';
  const isOnAdminPanel = req.nextUrl.pathname.startsWith('/admin');
  
  if (isOnAdminPanel && !isAdmin) {
    return Response.redirect(new URL('/unauthorized', req.url));
  }
});

// types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
  
  interface User {
    role?: string;
  }
}

// auth.ts
callbacks: {
  async jwt({ token, user }) {
    if (user?.role) {
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    if (token?.role) {
      session.user.role = token.role;
    }
    return session;
  },
}

// Option B
// app/admin/layout.tsx
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  
  if (session?.user?.role !== 'admin') {
    redirect('/unauthorized');
  }
  
  return children;
}

// Option C
// app/admin/page.tsx
'use client'
export default function AdminPage() {
  const { data: session } = useSession();
  
  if (session?.user?.role !== 'admin') {
    return <div>Unauthorized</div>;
  }
  
  return <AdminPanel />;
}`,
      options: [
        'Option A: Using middleware with proper type extensions',
        'Option B: Using layout-based role checking',
        'Option C: Using client-side role checking'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 recommends using middleware with proper TypeScript extensions for role-based auth, ensuring type safety and early auth checks.'
    },
    {
      id: 'a7',
      question: 'How do you implement OAuth provider configuration in Auth.js with Next.js 14?',
      code: `
// Which implementation correctly configures OAuth providers?

// Option A
// auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
 
export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? 'user',
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});

// Option B
// pages/api/auth/[...nextauth].ts
export default NextAuth({
  providers: [
    {
      id: 'github',
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    },
    {
      id: 'google',
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
  ],
});

// Option C
// app/api/auth/[...nextauth]/route.ts
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});`,
      options: [
        'Option A: Using Auth.js provider configuration with callbacks',
        'Option B: Using basic provider configuration',
        'Option C: Using route handler configuration'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 uses typed provider configurations with proper callbacks for handling OAuth flows, token management, and profile customization.'
    },
    {
      id: 'a8',
      question: 'How do you implement JWT token customization in Auth.js with Next.js 14?',
      code: `
// Which implementation correctly customizes JWT tokens?

// Option A
// auth.ts
import { JWT } from 'next-auth/jwt';

interface ExtendedToken extends JWT {
  customClaims?: {
    permissions: string[];
    orgId: string;
  };
}

export const { auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user, account }): Promise<ExtendedToken> {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          customClaims: {
            permissions: user.permissions,
            orgId: user.orgId,
          },
        };
      }

      // Token refresh
      if (isTokenExpired(token)) {
        const refreshedToken = await refreshAccessToken(token);
        return refreshedToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.customClaims = token.customClaims;
      return session;
    },
  },
});

// Option B
// pages/api/auth/[...nextauth].ts
export default NextAuth({
  jwt: {
    encode: async ({ token, secret }) => {
      return jwt.sign(token, secret);
    },
    decode: async ({ token, secret }) => {
      return jwt.verify(token, secret);
    },
  },
});

// Option C
// app/api/auth/[...nextauth]/route.ts
const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});`,
      options: [
        'Option A: Using typed JWT callbacks with token refresh',
        'Option B: Using custom JWT encoding',
        'Option C: Using basic JWT configuration'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 uses typed JWT callbacks for token customization, supporting token refresh and custom claims with proper type safety.'
    },
    {
      id: 'a9',
      question: 'How do you implement secure session management in Auth.js with Next.js 14?',
      code: `
// Which implementation correctly manages sessions?

// Option A
// auth.config.ts
export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: \`__Secure-next-auth.session-token\`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

// Option B
// pages/api/auth/[...nextauth].ts
export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
});

// Option C
// app/session/page.tsx
'use client'
export default function Page() {
  const session = useSession();
  return <div>{session?.data?.user?.name}</div>;
}`,
      options: [
        'Option A: Using secure session configuration with callbacks',
        'Option B: Using basic session configuration',
        'Option C: Using client-side session handling'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 uses secure session configuration with proper cookie settings, JWT strategy, and session callbacks for optimal security.'
    },
    {
      id: 'a10',
      question: 'How do you implement refresh token rotation in Auth.js with Next.js 14?',
      code: `
// Which implementation correctly handles refresh token rotation?

// Option A
// auth.ts
async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const { auth } = NextAuth({
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      }

      // Return previous token if not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Refresh token
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.error = token.error;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

// Option B
// auth.ts
export const { auth } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      if (isTokenExpired(token)) {
        const response = await fetch('/api/refresh');
        const data = await response.json();
        token.accessToken = data.access_token;
      }
      return token;
    },
  },
});

// Option C
// auth.ts
export const { auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
});`,
      options: [
        'Option A: Using refresh token rotation with error handling',
        'Option B: Using basic token refresh',
        'Option C: Using static JWT configuration'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 implements refresh token rotation with proper error handling, token expiration checks, and session updates.'
    },
    {
      id: 'a11',
      question: 'How do you implement multi-tenant authentication in Auth.js with Next.js 14?',
      code: `
// Which implementation correctly handles multi-tenant auth?

// Option A
// auth.ts
export const { auth } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, tenant }) {
      const allowedTenant = await validateTenant(tenant);
      return allowedTenant;
    },
    async jwt({ token, account, profile, tenant }) {
      if (account) {
        token.tenantId = tenant.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.tenantId = token.tenantId;
      return session;
    },
  },
  events: {
    async signIn({ user, account, tenant }) {
      await logTenantAccess(user.id, tenant.id);
    },
  },
  middleware: async (request) => {
    const tenant = await getTenantFromRequest(request);
    return { tenant };
  },
});

// middleware.ts
import { auth } from './auth';

export default auth((req) => {
  const tenant = req.auth?.tenant;
  const isValidTenant = validateTenantAccess(tenant, req.nextUrl.pathname);
  
  if (!isValidTenant) {
    return Response.redirect(new URL('/unauthorized', req.url));
  }
});

// Option B
// pages/api/auth/[...nextauth].ts
export default NextAuth({
  callbacks: {
    async session({ session }) {
      session.tenant = getTenantFromHeader();
      return session;
    },
  },
});

// Option C
// app/[tenant]/layout.tsx
export default async function Layout({
  params,
  children,
}: {
  params: { tenant: string };
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (session?.tenant !== params.tenant) {
    redirect('/unauthorized');
  }
  return children;
}`,
      options: [
        'Option A: Using tenant-aware callbacks and middleware',
        'Option B: Using basic tenant session modification',
        'Option C: Using layout-based tenant checking'
      ],
      correctAnswer: 0,
      explanation: 'Auth.js in Next.js 14 implements multi-tenant authentication using tenant-aware callbacks, middleware, and proper access validation.'
    }
  ]
};