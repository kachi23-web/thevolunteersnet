import type { CtaContent } from '@/types';
import { CtaBand } from '@/components/ui';

interface CtaSectionProps {
  content: CtaContent;
}

export default function CtaSection({ content }: CtaSectionProps) {
  return (
    <CtaBand
      heading={content.heading}
      description={content.description}
      primary={content.primaryCta}
      secondary={content.secondaryCta}
    />
  );
}
