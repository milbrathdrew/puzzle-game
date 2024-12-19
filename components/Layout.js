// components/Layout.js
import Head from 'next/head';

export default function Layout({ children, title = 'Puzzle Game' }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Interactive puzzle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {children}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-gray-800 text-white text-center py-2">
        <p className="text-sm">Puzzle Game Challenge</p>
      </footer>
    </div>
  );
}
