'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const menuItems = [
    { 
      label: 'Learn', 
      href: '/learn',
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Interactive learning paths'
    },
    { 
      label: 'Tests', 
      href: '/tests',
      icon: <GraduationCap className="w-4 h-4" />,
      description: 'Practice and certification'
    }
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo and Title */}
            <Link 
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="p-2 rounded-xl gradient-learning">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold heading-gradient">
                Next.js 14
              </span>
            </Link>

            {/* Menu Items */}
            <div className="hidden sm:flex items-center gap-2">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium transition-all
                      hover:bg-primary/10 group
                      ${isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 border-2 border-primary/20 rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-popover text-popover-foreground px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shadow-lg border border-border">
                        {item.description}
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-popover" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
</div>

        {/* Mobile Menu */}
        <div className="sm:hidden border-t border-border">
          <div className="grid grid-cols-2 gap-1 p-2">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                    ${isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}