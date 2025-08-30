import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <Logo />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground md:mt-0">
            © {new Date().getFullYear()} StudyNest. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
