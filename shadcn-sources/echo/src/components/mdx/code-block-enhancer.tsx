'use client';

import { Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';

function CopyButton({ codeBlock }: { codeBlock: HTMLElement }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const handleCopy = async () => {
    if (copied || !navigator.clipboard) return;

    const pre = codeBlock.querySelector('pre');
    const code = pre?.textContent ?? '';
    await navigator.clipboard.writeText(code);
    setCopied(true);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="absolute top-3 right-3"
      onClick={handleCopy}
      aria-label="Copy code"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={copied ? 'check' : 'copy'}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.15 }}
        >
          {copied ? (
            <Check className="text-success size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}

export function CodeBlockEnhancer() {
  const [codeBlocks, setCodeBlocks] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll('.code-block')
    ) as HTMLElement[];
    setCodeBlocks(blocks);
  }, []);

  return (
    <>
      {codeBlocks.map((block, index) =>
        createPortal(<CopyButton key={index} codeBlock={block} />, block)
      )}
    </>
  );
}
