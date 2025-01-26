import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function getStatusIcon(status: string) {
  switch (status) {
    case 'fullført':
      return CheckCircle2;
    case 'pågående':
      return Clock;
    default:
      return AlertCircle;
  }
}