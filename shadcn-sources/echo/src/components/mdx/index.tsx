import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Pre } from './code-block';

function MdxImage(props: ComponentPropsWithoutRef<'img'>) {
  return (
    <div className="not-prose bigger-container">
      <img {...props} className="rounded-3xl" alt={props.alt || ''} />
    </div>
  );
}

function H2({ children, ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <div className="container">
      <h2 {...props}>{children}</h2>
    </div>
  );
}

function P({ children, className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return (
    <div className="container">
      <p className={className} {...props}>
        {children}
      </p>
    </div>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <p className="lead text-muted-foreground">{children}</p>
    </div>
  );
}

function Ul({ children, ...props }: ComponentPropsWithoutRef<'ul'>) {
  return (
    <div className="container">
      <ul {...props}>{children}</ul>
    </div>
  );
}

export const mdxComponents = {
  pre: Pre,
  img: MdxImage,
  h2: H2,
  p: P,
  ul: Ul,
  Lead,
};
