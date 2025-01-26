import { Category } from '@types/index';
import { BookOpen, Shield, Key, Network, Cloud, Code, Brain, Lock, Database, Webhook, Activity, Users } from 'lucide-react';

const timestamp = new Date().toISOString();

export const mockCategories: Category[] = [
  // Overordnede arkitekturprinsipper
  {
    id: "nasjonale-prinsipper",
    area_id: "overordnede-arkitekturprinsipper",
    name: "Nasjonale overordnede prinsipper (OP-xx)",
    description: "Prinsipper fastsatt av DigDir: OP-01 til OP-07",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: BookOpen,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: BookOpen },
        { id: 'guidelines', label: 'Veiledere', icon: BookOpen }
      ]
    }
  },

  // Sikkerhet
  {
    id: "tilgangsstyring",
    area_id: "sikkerhet",
    name: "Tilgangsstyring",
    description: "Prinsipper for sikker tilgangsstyring og autentisering",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Lock,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Shield },
        { id: 'guidelines', label: 'Veiledere', icon: Shield }
      ]
    }
  },
  {
    id: "sikkerhetskontroller",
    area_id: "sikkerhet",
    name: "Sikkerhetskontroller",
    description: "Tekniske og organisatoriske sikkerhetstiltak",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Shield,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Shield },
        { id: 'guidelines', label: 'Veiledere', icon: Shield }
      ]
    }
  },

  // IAM
  {
    id: "autentisering",
    area_id: "identitets-tilgangsstyring",
    name: "Autentisering",
    description: "Prinsipper for sikker pålogging og identitetsbekreftelse",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Key,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Key },
        { id: 'guidelines', label: 'Veiledere', icon: Key }
      ]
    }
  },

  // Integrasjon
  {
    id: "api-design",
    area_id: "integrasjon-masterdata",
    name: "API-design",
    description: "Retningslinjer for API-utforming og -implementering",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Webhook,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Network },
        { id: 'guidelines', label: 'Veiledere', icon: Network }
      ]
    }
  },
  {
    id: "masterdata",
    area_id: "integrasjon-masterdata",
    name: "Masterdata",
    description: "Forvaltning av autoritative datakilder",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Database,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Network },
        { id: 'guidelines', label: 'Veiledere', icon: Network }
      ]
    }
  },

  // Sky
  {
    id: "sky-strategi",
    area_id: "sky-plattform",
    name: "Skystrategi",
    description: "Overordnede prinsipper for skybruk",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Cloud,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Cloud },
        { id: 'guidelines', label: 'Veiledere', icon: Cloud }
      ]
    }
  },

  // Utvikling
  {
    id: "devops",
    area_id: "utvikling-testing",
    name: "DevOps",
    description: "Prinsipper for kontinuerlig leveranse og drift",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Activity,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Code },
        { id: 'guidelines', label: 'Veiledere', icon: Code }
      ]
    }
  },

  // AI
  {
    id: "ai-etikk",
    area_id: "automasjon-ai",
    name: "AI-etikk",
    description: "Etiske retningslinjer for bruk av kunstig intelligens",
    principles: [],
    guidelines: [],
    created_at: timestamp,
    style: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50',
      icon: Users,
      tabs: [
        { id: 'principles', label: 'Prinsipper', icon: Brain },
        { id: 'guidelines', label: 'Veiledere', icon: Brain }
      ]
    }
  }
];