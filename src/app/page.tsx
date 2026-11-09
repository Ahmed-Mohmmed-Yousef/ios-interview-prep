import { brand } from '@/lib/brand';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          {brand.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {brand.tagline}
        </p>
      </div>
    </main>
  );
}
