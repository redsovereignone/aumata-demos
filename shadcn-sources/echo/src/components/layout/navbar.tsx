'use client';

import {
  GalleryVerticalEnd,
  Home,
  type LucideIcon,
  PencilLine,
  UserRound,
} from 'lucide-react';
import { motion } from 'motion/react';

import { GitHubIcon, XIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const MotionA = motion.create('a');

const iconVariants = {
  idle: { rotate: 0, scale: 1 },
  tap: { rotate: 12, scale: 1.1 },
};

const navItems: Array<{
  href: string;
  icon: LucideIcon;
  tooltip: string;
  ariaLabel: string;
}> = [
  {
    href: '/',
    icon: Home,
    tooltip: 'Home',
    ariaLabel: 'Home',
  },
  {
    href: '/projects',
    icon: GalleryVerticalEnd,
    tooltip: 'Projects',
    ariaLabel: 'Projects',
  },
  {
    href: '/about',
    icon: UserRound,
    tooltip: 'Profile',
    ariaLabel: 'Profile',
  },
  {
    href: '/articles',
    icon: PencilLine,
    tooltip: 'Articles',
    ariaLabel: 'Articles',
  },
];

const Navbar = () => {
  return (
    <header className="supports-backdrop-filter:bg-background/60 top-0 z-50 w-full backdrop-blur">
      <nav className="container mt-5 flex items-center justify-between gap-4 md:mt-8">
        {/* Left side - Icon buttons */}
        <div className="flex items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant="muted"
                size="icon-lg"
                className="rounded-full"
                tooltip={item.tooltip}
                asChild
              >
                <MotionA
                  href={item.href}
                  aria-label={item.ariaLabel}
                  initial="idle"
                  whileTap="tap"
                >
                  <motion.div
                    variants={iconVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Icon className="size-5" />
                  </motion.div>
                </MotionA>
              </Button>
            );
          })}
        </div>

        {/* Right side - Social links */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="muted"
            size="icon-lg"
            className="xs:flex hidden rounded-full"
            tooltip="Follow us on X"
            asChild
          >
            <MotionA
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              initial="idle"
              whileTap="tap"
            >
              <motion.div
                variants={iconVariants}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <XIcon className="size-[18px]" />
              </motion.div>
            </MotionA>
          </Button>
          <Button
            variant="muted"
            size="lg"
            className="rounded-full ps-2! pe-4!"
            tooltip="Star us on GitHub"
            asChild
          >
            <MotionA
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Stars"
              initial="idle"
              whileTap="tap"
            >
              <motion.div
                variants={iconVariants}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <GitHubIcon className="size-6" />
              </motion.div>
              <span className="text-sm leading-none">11.2k</span>
            </MotionA>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
