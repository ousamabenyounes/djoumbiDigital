'use client';

import Image from 'next/image';

export default function Background() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/pattern-bg.png"
        alt="Pattern background"
        fill
        className="object-cover opacity-50"
        sizes="100vw"
        quality={100}
      />
    </div>
  );
} 