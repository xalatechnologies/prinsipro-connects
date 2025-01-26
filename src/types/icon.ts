import type { LucideProps, LucideIcon as BaseLucideIcon } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

export interface IconProps extends LucideProps {
  name?: string;
}