'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoaderProvider } from '@/context/LoaderContext';

export default function RootLayoutClient({
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