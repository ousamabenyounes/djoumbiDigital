'use client';

import Navbar from "./Navbar";
import Footer from "./Footer";
import { LoaderProvider } from '@/context/LoaderContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoaderProvider>
      <Navbar />
      {children}
      <Footer />
    </LoaderProvider>
  );
} 