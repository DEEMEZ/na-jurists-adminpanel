'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth');
  }, [router]);

  return null; // Optional: You can return a loading state or nothing
}