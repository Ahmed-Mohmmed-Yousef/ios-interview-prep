import Link from 'next/link';
import { brand } from '@/lib/brand';
import { ArrowLeft, Compass, ShieldCheck, BookOpen, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8 pb-20">
      <header className="space-y-3">
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline min-h-[36px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Settings
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center">
            <Compass className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {brand.name}
            </h1>
            <p className="text-sm text-muted-foreground">{brand.tagline}</p>
          </div>
        </div>
      </header>

      {/* Mission */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-foreground">Our Mission</h2>
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
          Preparing for iOS technical interviews is often fragmented between random blog posts and outdated interview questions. {brand.name} provides a clear, structured roadmap designed in plain English for developers worldwide.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
          Our curriculum spans five cumulative levels—from your first junior role to staff engineer—teaching core Swift mechanics, modern SwiftUI, memory management, and system design trade-offs.
        </p>
      </section>

      {/* Sources Policy */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-primary font-bold text-base">
          <BookOpen className="w-5 h-5" />
          <h2>Checked Sources</h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
          Every single lesson and question cites verified official documentation from Apple Developer and Swift.org. When modern architecture patterns require community consensus (like clean architecture or MVVM), sources are clearly marked as Community.
        </p>
      </section>

      {/* Privacy Guarantee */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-success font-bold text-base">
          <ShieldCheck className="w-5 h-5" />
          <h2>Privacy by Design</h2>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
          <li><strong>No accounts:</strong> We do not ask for your name, email, or credentials.</li>
          <li><strong>No trackers:</strong> We do not log your activity or sell your data.</li>
          <li><strong>Local storage:</strong> Your progress lives strictly inside your browser. You can export or delete it anytime.</li>
        </ul>
      </section>

      {/* Legal & Trademark */}
      <section className="p-4 rounded-xl bg-muted text-xs text-muted-foreground space-y-2">
        <p>
          Apple, iOS, iPadOS, Swift, SwiftUI, Xcode, iPhone, and iPad are trademarks of Apple Inc., registered in the U.S. and other countries.
        </p>
        <p>
          {brand.name} is an independent educational project and is not affiliated with, sponsored by, or endorsed by Apple Inc.
        </p>
      </section>
    </div>
  );
}
