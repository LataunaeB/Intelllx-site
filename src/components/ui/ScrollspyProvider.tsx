"use client";

import { usePathname } from 'next/navigation';
import { getScrollspyConfig } from '@/config/scrollspy';
import MicroNav from './MicroNav';
import MobileScrollspy from './MobileScrollspy';

export default function ScrollspyProvider() {
  const pathname = usePathname();
  const config = getScrollspyConfig(pathname);

  return (
    <>
      <MicroNav />
      <MobileScrollspy config={config} />
    </>
  );
}
