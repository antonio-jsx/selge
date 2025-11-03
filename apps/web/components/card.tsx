import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as CardUI,
} from '@bakan/ui/components/card';
import { cn } from '@bakan/ui/lib/utils';

type CardProps = {
  title: string;
  description?: string;
  children?: Readonly<React.ReactNode>;
};

export default function Card({
  children,
  className,
  ...props
}: CardProps & React.ComponentProps<'div'>) {
  return (
    <CardUI className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardUI>
  );
}
