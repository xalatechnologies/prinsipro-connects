import { Exception } from '@/types/exception';

const timestamp = new Date().toISOString();

export const mockExceptions: Exception[] = [
  {
    id: 'exception-1',
    principle_id: 'zero-trust',
    title: 'Midlertidig unntak fra MFA-krav',
    description: 'Unntak fra MFA-krav for legacy system under migrering',
    justification: 'Kritisk system som ikke støtter moderne autentisering',
    risk_assessment: {
      level: 'high',
      impact: 'Potensielt uautorisert tilgang til sensitive data',
      probability: 'Middels',
      mitigation: [
        'Begrenset tilgang til spesifikke IP-adresser',
        'Utvidet logging og overvåkning',
        'Planlagt migrering innen 3 måneder'
      ]
    },
    status: 'approved',
    approved_by: 'jan.johansen@nordrefollo.kommune.no',
    approval_date: '2024-01-15T00:00:00.000Z',
    expiry_date: '2024-04-15T00:00:00.000Z',
    created_by: 'per.hansen@nordrefollo.kommune.no',
    created_at: timestamp,
    updated_at: timestamp,
    comments: [
      {
        id: 'comment-1',
        exception_id: 'exception-1',
        user_id: 'kari.olsen@nordrefollo.kommune.no',
        content: 'Godkjent under forutsetning av implementerte sikkerhetstiltak',
        created_at: timestamp
      }
    ]
  },
  {
    id: 'exception-2',
    principle_id: 'api-first',
    title: 'Direkte databasetilgang for rapporteringsverktøy',
    description: 'Behov for direkte databasetilgang for kritisk rapportering',
    justification: 'Eksisterende API-er støtter ikke nødvendig funksjonalitet',
    risk_assessment: {
      level: 'medium',
      impact: 'Potensielt redusert dataintegritet',
      probability: 'Lav',
      mitigation: [
        'Read-only tilgang',
        'Begrenset til spesifikke tabeller',
        'Overvåkning av queries'
      ]
    },
    status: 'pending',
    created_by: 'ole.nordmann@nordrefollo.kommune.no',
    created_at: timestamp,
    updated_at: timestamp,
    comments: []
  }
];