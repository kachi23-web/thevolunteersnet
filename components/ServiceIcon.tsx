import { icons, type LucideProps } from 'lucide-react';

/**
 * Renders any Lucide icon by name. The admin lets staff pick any icon from
 * lucide.dev, so we look it up in the full set rather than a short allow-list.
 * Server-only usage keeps the icon set out of the client bundle.
 */
export default function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? icons.HeartHandshake;
  return <Icon aria-hidden="true" {...props} />;
}
