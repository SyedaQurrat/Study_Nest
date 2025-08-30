import Image from 'next/image';

export function Screenshots() {
  return (
    <section id="screenshots" className="bg-muted py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A Glimpse Inside the App
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the clean, intuitive, and powerful interface of StudyNest.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="transform transition-transform hover:scale-105">
            <Image
              src="https://picsum.photos/800/600"
              alt="App screenshot 1"
              width={800}
              height={600}
              data-ai-hint="app screen"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="transform transition-transform hover:scale-105 md:col-span-2">
             <Image
              src="https://picsum.photos/1200/600"
              alt="App screenshot 2"
              width={1200}
              height={600}
              data-ai-hint="dashboard ui"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
