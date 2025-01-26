import { ImplementationGuideline } from '@types/index';

const timestamp = new Date().toISOString();

export const mockImplementationGuidelines: ImplementationGuideline[] = [
  // OP-01 Implementation Guide
  {
    id: "impl-op01",
    category_id: "nasjonale-prinsipper",
    title: "Implementering av brukersentrert design",
    description: "Veileder for å sikre at løsninger utvikles med utgangspunkt i brukernes behov.",
    steps: [
      {
        order: 1,
        title: "Kartlegg brukergrupper",
        description: "Identifiser og dokumenter alle relevante brukergrupper og deres behov.",
        checklist: [
          "Gjennomfør brukerundersøkelser",
          "Lag personas for hovedbrukergrupper",
          "Dokumenter brukerbehov og smertepunkter"
        ],
        resources: [
          {
            title: "Mal for brukerkartlegging",
            type: "template",
            url: "https://example.com/templates/user-research",
            description: "Standard mal for kartlegging av brukergrupper"
          }
        ]
      },
      {
        order: 2,
        title: "Etabler brukerråd",
        description: "Opprett et brukerråd med representanter fra ulike brukergrupper.",
        checklist: [
          "Identifiser potensielle medlemmer",
          "Definer mandat og møtefrekvens",
          "Etabler rutiner for tilbakemeldinger"
        ],
        resources: [
          {
            title: "Veileder for brukerråd",
            type: "documentation",
            url: "https://example.com/docs/user-council",
            description: "Best practices for etablering av brukerråd"
          }
        ]
      }
    ],
    tools: [
      {
        name: "Miro",
        description: "Verktøy for brukerreisekartlegging og workshops",
        url: "https://miro.com",
        type: "software"
      },
      {
        name: "Typeform",
        description: "Verktøy for brukerundersøkelser",
        url: "https://typeform.com",
        type: "software"
      }
    ],
    created_at: timestamp
  },

  // SEC-01 Implementation Guide
  {
    id: "impl-sec01",
    category_id: "tilgangsstyring",
    title: "Implementering av Zero Trust",
    description: "Veileder for implementering av Zero Trust arkitektur.",
    steps: [
      {
        order: 1,
        title: "Kartlegg ressurser og tilganger",
        description: "Dokumenter alle systemer, data og tilgangsrettigheter.",
        checklist: [
          "Identifiser kritiske ressurser",
          "Kartlegg eksisterende tilgangsrettigheter",
          "Dokumenter dataflyt mellom systemer"
        ],
        resources: [
          {
            title: "Zero Trust Maturity Model",
            type: "documentation",
            url: "https://example.com/docs/zero-trust",
            description: "NIST Zero Trust Architecture guide"
          }
        ]
      },
      {
        order: 2,
        title: "Implementer MFA",
        description: "Innfør multifaktor-autentisering for alle brukere.",
        checklist: [
          "Velg MFA-løsning",
          "Planlegg utrulling",
          "Etabler support-rutiner"
        ],
        resources: [
          {
            title: "MFA Best Practices",
            type: "documentation",
            url: "https://example.com/docs/mfa",
            description: "Anbefalinger for MFA-implementering"
          }
        ]
      }
    ],
    tools: [
      {
        name: "Azure AD",
        description: "Identity and access management platform",
        url: "https://azure.microsoft.com/services/active-directory",
        type: "software"
      },
      {
        name: "YubiKey",
        description: "Hardware security keys for MFA",
        url: "https://www.yubico.com",
        type: "software"
      }
    ],
    created_at: timestamp
  },

  // API-01 Implementation Guide
  {
    id: "impl-api01",
    category_id: "api-design",
    title: "API-først implementering",
    description: "Veileder for implementering av API-først tilnærming.",
    steps: [
      {
        order: 1,
        title: "Design API-kontrakt",
        description: "Definer API-spesifikasjon før implementering.",
        checklist: [
          "Lag OpenAPI-spesifikasjon",
          "Definer ressursmodeller",
          "Planlegg versjonering"
        ],
        resources: [
          {
            title: "API Design Guidelines",
            type: "documentation",
            url: "https://example.com/docs/api-design",
            description: "Best practices for API-design"
          }
        ]
      },
      {
        order: 2,
        title: "Implementer API Gateway",
        description: "Sett opp sentral API Gateway for alle tjenester.",
        checklist: [
          "Velg API Gateway-løsning",
          "Konfigurer sikkerhet",
          "Sett opp overvåking"
        ],
        resources: [
          {
            title: "Gateway Setup Guide",
            type: "documentation",
            url: "https://example.com/docs/api-gateway",
            description: "Veileder for API Gateway implementering"
          }
        ]
      }
    ],
    tools: [
      {
        name: "Swagger",
        description: "API documentation and design tools",
        url: "https://swagger.io",
        type: "software"
      },
      {
        name: "Kong Gateway",
        description: "API Gateway platform",
        url: "https://konghq.com",
        type: "software"
      }
    ],
    created_at: timestamp
  },

  // CLOUD-01 Implementation Guide
  {
    id: "impl-cloud01",
    category_id: "sky-strategi",
    title: "Cloud Native implementering",
    description: "Veileder for implementering av sky-native løsninger.",
    steps: [
      {
        order: 1,
        title: "Velg skyplattform",
        description: "Evaluer og velg primær skyplattform.",
        checklist: [
          "Definer evalueringskriterier",
          "Gjennomfør POC",
          "Dokumenter beslutningsgrunnlag"
        ],
        resources: [
          {
            title: "Cloud Platform Comparison",
            type: "documentation",
            url: "https://example.com/docs/cloud-comparison",
            description: "Sammenligning av skyplattformer"
          }
        ]
      },
      {
        order: 2,
        title: "Etabler Landing Zone",
        description: "Sett opp grunnleggende skyinfrastruktur.",
        checklist: [
          "Definer nettverksarkitektur",
          "Implementer IAM",
          "Sett opp logging og overvåking"
        ],
        resources: [
          {
            title: "Landing Zone Guide",
            type: "documentation",
            url: "https://example.com/docs/landing-zone",
            description: "Best practices for sky-infrastruktur"
          }
        ]
      }
    ],
    tools: [
      {
        name: "Terraform",
        description: "Infrastructure as Code tool",
        url: "https://www.terraform.io",
        type: "software"
      },
      {
        name: "AWS Well-Architected Tool",
        description: "Cloud architecture assessment tool",
        url: "https://aws.amazon.com/well-architected-tool",
        type: "software"
      }
    ],
    created_at: timestamp
  },

  // DEV-01 Implementation Guide
  {
    id: "impl-dev01",
    category_id: "devops",
    title: "DevOps-praksis implementering",
    description: "Veileder for implementering av DevOps-praksis og verktøy.",
    steps: [
      {
        order: 1,
        title: "Etabler CI/CD",
        description: "Sett opp kontinuerlig integrasjon og leveranse.",
        checklist: [
          "Velg CI/CD-verktøy",
          "Definer pipeline-steg",
          "Implementer automatiserte tester"
        ],
        resources: [
          {
            title: "CI/CD Best Practices",
            type: "documentation",
            url: "https://example.com/docs/cicd",
            description: "Veileder for CI/CD-implementering"
          }
        ]
      },
      {
        order: 2,
        title: "Implementer overvåking",
        description: "Sett opp omfattende overvåking og logging.",
        checklist: [
          "Definer metrikker",
          "Sett opp dashboards",
          "Etabler varsling"
        ],
        resources: [
          {
            title: "Monitoring Guide",
            type: "documentation",
            url: "https://example.com/docs/monitoring",
            description: "Best practices for overvåking"
          }
        ]
      }
    ],
    tools: [
      {
        name: "GitHub Actions",
        description: "CI/CD platform",
        url: "https://github.com/features/actions",
        type: "software"
      },
      {
        name: "Grafana",
        description: "Monitoring and observability platform",
        url: "https://grafana.com",
        type: "software"
      }
    ],
    created_at: timestamp
  }
];