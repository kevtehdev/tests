import React from 'react';
import { Shield, ArrowLeft, Key, Lock, UserCog, Workflow, RefreshCw } from 'lucide-react';
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

const authTopics: Topic[] = [
  {
    id: 'auth-setup',
    title: 'Authentication Setup',
    description: 'Setting up authentication in Next.js 14',
    icon: <Shield className="w-5 h-5" />,
    content: {
      explanation: 'Implement secure authentication in Next.js 14 using NextAuth.js (Auth.js) with various providers and custom configurations.',
      keyPoints: [
        'NextAuth.js configuration',
        'Multiple auth providers',
        'Custom credentials provider',
        'Session management',
        'Environment setup'
      ],
      code: {
        language: 'typescript',
        title: 'NextAuth Configuration',
        snippet: `// auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql\`
      SELECT * FROM users WHERE email=\${email}
    \`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        
        return null;
      },
    }),
  ],
});`
      }
    }
  },
  {
    id: 'middleware',
    title: 'Authentication Middleware',
    description: 'Protecting routes and handling auth state',
    icon: <Workflow className="w-5 h-5" />,
    content: {
      explanation: 'Implement middleware to protect routes and handle authentication state across your application.',
      keyPoints: [
        'Route protection',
        'Auth state management',
        'Role-based access',
        'Custom middleware',
        'Public/private routes'
      ],
      code: {
        language: 'typescript',
        title: 'Auth Middleware',
        snippet: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
 
export async function middleware(request: NextRequest) {
  const session = await auth();
  const isPublicRoute = request.nextUrl.pathname === '/login' || 
                       request.nextUrl.pathname === '/register';

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Handle role-based access
  if (session && request.nextUrl.pathname.startsWith('/admin')) {
    if (session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register'
  ]
};`
      }
    }
  },
  {
    id: 'session-management',
    title: 'Session Management',
    description: 'Managing user sessions and tokens',
    icon: <RefreshCw className="w-5 h-5" />,
    content: {
      explanation: 'Implement secure session management with token handling, refresh strategies, and session persistence.',
      keyPoints: [
        'JWT token handling',
        'Session persistence',
        'Token refresh strategy',
        'Secure cookie management',
        'Session expiration'
      ],
      code: {
        language: 'typescript',
        title: 'Session Configuration',
        snippet: `// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith('/protected');
      
      if (isProtected) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Return previous token if not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token expired, try to refresh
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};`
      }
    }
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Managing user data and profiles',
    icon: <UserCog className="w-5 h-5" />,
    content: {
      explanation: 'Implement user management features including profile updates, role management, and account settings.',
      keyPoints: [
        'User profile management',
        'Role-based permissions',
        'Account settings',
        'Password management',
        'User preferences'
      ],
      code: {
        language: 'typescript',
        title: 'User Management Actions',
        snippet: `// app/actions/user.ts
'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const UpdateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
});

export async function updateUser(
  id: string, 
  formData: FormData
) {
  const validatedFields = UpdateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, role } = validatedFields.data;

  try {
    await sql\`
      UPDATE users
      SET name = \${name}, email = \${email}, role = \${role}
      WHERE id = \${id}
    \`;

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    return {
      error: 'Database Error: Failed to Update User.',
    };
  }
}

export async function updatePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  try {
    const user = await sql\`
      SELECT * FROM users WHERE id = \${userId}
    \`;

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.rows[0].password
    );

    if (!passwordMatch) {
      return {
        error: 'Current password is incorrect.',
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sql\`
      UPDATE users
      SET password = \${hashedPassword}
      WHERE id = \${userId}
    \`;

    return { success: true };
  } catch (error) {
    return {
      error: 'Failed to update password.',
    };
  }
}`
      }
    }
  },
  {
    id: 'oauth-integration',
    title: 'OAuth Integration',
    description: 'Implementing social authentication',
    icon: <Key className="w-5 h-5" />,
    content: {
      explanation: 'Set up social authentication with popular providers while maintaining secure user data and session management.',
      keyPoints: [
        'Multiple OAuth providers',
        'Provider configuration',
        'Account linking',
        'Profile data syncing',
        'OAuth error handling'
      ],
      code: {
        language: 'typescript',
        title: 'OAuth Provider Setup',
        snippet: `// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? 'USER',
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        // Verify organization membership
        const res = await fetch(
          'https://api.github.com/user/memberships/orgs/your-org',
          {
            headers: {
              Authorization: \`token \${account.access_token}\`,
            },
          }
        );
        
        if (!res.ok) {
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {
      // Add additional user data to session
      session.user.role = user.role;
      return session;
    },
  },
};`
      }
    }
  },
  {
    id: 'security-practices',
    title: 'Security Best Practices',
    description: 'Implementing security measures',
    icon: <Lock className="w-5 h-5" />,
    content: {
      explanation: 'Implement essential security measures to protect your application and user data from common vulnerabilities.',
      keyPoints: [
        'CSRF protection',
        'XSS prevention',
        'Rate limiting',
        'Security headers',
        'Input validation'
      ],
      code: {
        language: 'typescript',
        title: 'Security Implementation',
        snippet: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';

  // Rate limiting
  if (request.nextUrl.pathname.startsWith('/api')) {
    const { success, limit, reset, remaining } = await ratelimit.limit(
      \`ratelimit_\${ip}\`
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }
  }

  // Security headers
  const response = NextResponse.next();
  
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  );
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}`
      }
    }
  }
];

export default function AuthPage() {
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
              <span className="badge badge-auth">
                Authentication
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">
                {authTopics.length} concepts
              </span>
            </div>
            <h1 className="text-4xl font-bold heading-gradient">
              Next.js 14 Authentication
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Master authentication and security patterns in Next.js 14 to build secure, production-ready applications with robust user management.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {authTopics.map((topic) => (
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