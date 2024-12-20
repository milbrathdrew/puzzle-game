// components/Layout.js
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}

