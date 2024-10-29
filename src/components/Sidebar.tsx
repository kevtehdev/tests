"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const menuItems = [
  {
    href: '/courses',
    label: 'Courses',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: '/practice',
    label: 'Practice',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/tests',
    label: 'Tests',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 border-r border-border bg-card/50 backdrop-blur-xl"
    >
      <div className="flex flex-col h-full px-3 py-4">
        <div className="mb-4 px-4">
          <h2 className="text-lg font-semibold text-foreground">
            Learning Path
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track your progress
          </p>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  group hover:bg-primary/5
                  ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <div className={`
                  p-1.5 rounded-lg transition-colors
                  ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                `}>
                  {item.icon}
                </div>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-primary/5 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="px-4 py-4 rounded-lg bg-muted/50">
            <h3 className="text-sm font-medium text-foreground">
              Need Help?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check our documentation or contact support
            </p>
            <button className="mt-3 w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}