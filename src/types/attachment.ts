import type { LucideIcon } from 'lucide-react';
import { FileText, Video, Image, BarChart } from 'lucide-react';

export type AttachmentType = 'document' | 'video' | 'image' | 'chart';

export interface AttachmentStyle {
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
}

export interface Attachment {
  id: string;
  objectType: 'principle' | 'measure' | 'category' | 'policy' | 'other';
  objectId: string;
  fileName: string;
  fileUrl: string;
  mimeType?: string;
  fileSize?: number;
  attachmentType: AttachmentType;
  description?: string;
  uploadedBy?: string;
  uploadedAt: string;
  style: AttachmentStyle;
}

export const ATTACHMENT_STYLES: Record<AttachmentType, AttachmentStyle> = {
  document: {
    icon: FileText,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600'
  },
  video: {
    icon: Video,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-900',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600'
  },
  image: {
    icon: Image,
    bgColor: 'bg-green-50',
    textColor: 'text-green-900',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600'
  },
  chart: {
    icon: BarChart,
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600'
  }
};