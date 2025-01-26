import { Area } from '@types/index';
import { BookOpen, Shield, Key, Network, Cloud, Code, Brain } from 'lucide-react';

const timestamp = new Date().toISOString();

export const mockAreas: Area[] = [
  {
    id: "overordnede-arkitekturprinsipper",
    name: "Overordnede arkitekturprinsipper",
    description: "DigDir og nasjonale retningslinjer for digital samhandling i offentlig sektor (OP-xx).",
    responsible: "Linda Mari Bystrøm",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: BookOpen,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-gray-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-gray-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: BookOpen },
        { id: 'principles', label: 'Prinsipper', icon: BookOpen }
      ]
    }
  },
  {
    id: "sikkerhet",
    name: "Sikkerhet",
    description: "Prinsipper og krav knyttet til IKT-sikkerhet, NSM og risiko.",
    responsible: "Sikkerhetsleder",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: Shield,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-red-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-red-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: Shield },
        { id: 'principles', label: 'Prinsipper', icon: Shield }
      ]
    }
  },
  {
    id: "identitets-tilgangsstyring",
    name: "Identitets- og tilgangsstyring",
    description: "Retningslinjer for sikker pålogging og rettighetskontroll.",
    responsible: "IAM-arkitekt",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: Key,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-amber-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-amber-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: Key },
        { id: 'principles', label: 'Prinsipper', icon: Key }
      ]
    }
  },
  {
    id: "integrasjon-masterdata",
    name: "Integrasjon og masterdata",
    description: "Sørger for robuste dataflyter og bruk av autoritative kilder.",
    responsible: "Integrasjonsarkitekt",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: Network,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-purple-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-purple-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: Network },
        { id: 'principles', label: 'Prinsipper', icon: Network }
      ]
    }
  },
  {
    id: "sky-plattform",
    name: "Sky- og plattformsarkitektur",
    description: "Retningslinjer for valg av skyplattformer, infrastruktur og driftsmodeller.",
    responsible: "Skyarkitekt",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: Cloud,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-blue-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-blue-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: Cloud },
        { id: 'principles', label: 'Prinsipper', icon: Cloud }
      ]
    }
  },
  {
    id: "utvikling-testing",
    name: "Utvikling og testing",
    description: "Prinsipper for DevOps, smidig utvikling, testmetodikk, og endringshåndtering.",
    responsible: "Tech Lead",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: Code,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-emerald-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-emerald-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: Code },
        { id: 'principles', label: 'Prinsipper', icon: Code }
      ]
    }
  },
  {
    id: "automasjon-ai",
    name: "Automasjon og kunstig intelligens",
    description: "Retningslinjer for AI/ML-agenter og automatiserte prosesser.",
    responsible: "Data Science Lead",
    categories: [],
    useCases: [],
    created_at: timestamp,
    style: {
      icon: Brain,
      bgColor: 'bg-gray-50/80',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-800',
      descriptionColor: 'text-gray-600',
      responsibleColor: 'text-gray-500',
      hoverBg: 'hover:bg-indigo-100',
      hoverShadow: 'hover:shadow-lg',
      borderColor: 'border-indigo-200',
      tabs: [
        { id: 'overview', label: 'Oversikt', icon: Brain },
        { id: 'principles', label: 'Prinsipper', icon: Brain }
      ]
    }
  }
];