'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const menuItems = [
    { label: 'Tests', href: '/tests' },
    { label: 'Courses', href: '/courses' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              href="/"
              className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors"
            >
              <div className="p-1.5 rounded-xl bg-primary/10 text-primary">
                <svg 
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span>Next.js Learning</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${pathname === item.href 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <svg 
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </motion.div>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}