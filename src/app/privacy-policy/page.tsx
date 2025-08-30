import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your trust is important to us.
            </p>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="space-y-8 text-muted-foreground">
              <p>
                Welcome to StudyNest ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
                <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and class level, that you voluntarily give to us when you register with the application.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information our servers automatically collect when you access the app, such as your IP address, browser type, and the pages you have viewed.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
                 <ul className="list-inside list-disc space-y-2">
                  <li>Create and manage your account.</li>
                  <li>Personalize your experience and deliver content relevant to your class level.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the application.</li>
                  <li>Respond to your questions and provide support through our AI Chatbot.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Disclosure of Your Information</h2>
                <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share information we have collected about you in certain situations:</p>
                <ul className="list-inside list-disc space-y-2">
                    <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                    <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, hosting services, and customer service.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Security of Your Information</h2>
                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Policy for Children</h2>
                <p>We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of our updates.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Contact Us</h2>
                <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:contact@studynest.app" className="text-primary hover:underline">contact@studynest.app</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
