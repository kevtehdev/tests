'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const menuItems = [
    { label: 'Tests', href: '/tests' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo and Title */}
            <Link 
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-blue-400 hover:text-blue-200 transition-colors"
            >
              
              <span>Next.js 14 - Learning</span>
            </Link>

            {/* Menu Items */}
            <div className="hidden sm:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${pathname === item.href 
                      ? 'text-blue-400' 
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                    }
                  `}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-blue-500/10 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right-side Actions */}
          <div className="flex items-center gap-4">
            {/* Additional elements or actions can go here */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
