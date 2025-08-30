
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#features' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '#' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] bg-background">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-4">
                   <Button asChild className="w-full" onClick={closeMobileMenu}>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" onClick={closeMobileMenu}>
                    <Link href="/login">Log In</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
