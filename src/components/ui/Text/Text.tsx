import { textVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface TextProps
  extends React.HtmlHTMLAttributes<HTMLParagraphElement | HTMLHeadingElement>,
    VariantProps<typeof textVariants> {
  className?: string;
  children?: React.ReactNode;
}

const createText = (variant: TextProps['variant']) => {
  switch (variant) {
    case 'body1':
    case 'cardContent':
    case 'miniCard':
      return 'p';
    case 'button':
      return 'span';
    case 'title':
      return 'h2';
    case 'cardName':
      return 'h3';
    default:
      throw new Error('Text Variant not supported');
  }
};
export const Text = ({ className, variant, ...props }: TextProps) => {
  const TextElement = createText(variant);
  return <TextElement className={cn(textVariants({ variant, className }))} {...props} />;
};

export default Text;
