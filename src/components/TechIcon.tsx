import type { ReactNode } from 'react';

const labels: Record<string, string> = { PHP: 'PHP', Laravel: '⌁', Lumen: 'L', 'Node.js': '⬡', TypeScript: 'TS', React: '⚛', JavaScript: 'JS', MySQL: '◆' };

export function TechIcon({ technology }: { technology: string }): ReactNode {
  const className = technology.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return <span className={`tech-icon tech-icon-${className}`} aria-hidden="true">{labels[technology] ?? technology.slice(0, 2)}</span>;
}
