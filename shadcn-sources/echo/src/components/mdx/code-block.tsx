import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export function Pre({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'pre'>) {
  return (
    <div className="not-prose bigger-container">
      <div className="code-block bg-card relative overflow-hidden rounded-3xl border shadow-xs">
        <pre
          className={cn(
            'overflow-x-auto p-5 text-sm leading-relaxed',
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
