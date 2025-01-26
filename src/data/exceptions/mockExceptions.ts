import { Exception } from '@types/index';

const timestamp = new Date().toISOString();

export const mockExceptions: Exception[] = [
  {
    id: "ex-001",
    principle_id: "op-04",
    title: "Midlertidig bruk av dupliserte data i legacy-system",
    description: "Gamle fagsystemet mangler støtte for real-time API, krever egen kopi av data.",
    justification: "Planlagt modernisering i Q4 2025, inntil da nødvendig workaround.",
    risk_assessment: {
      level: "medium",
      impact: "Mulig inkonsistens mellom datasett.",
      probability: "likely",
      mitigation: ["Sette opp manuell synk hver uke."]
    },
    status: "pending",
    approved_by: undefined,
    approval_date: undefined,
    expiry_date: "2026-01-01",
    created_by: "ole.hansen@example.org",
    created_at: timestamp,
    updated_at: timestamp,
    comments: []
  }
];