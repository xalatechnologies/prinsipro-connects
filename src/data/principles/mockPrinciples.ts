import { Principle } from '@types/index';
import { BookOpen, Target, HelpCircle, AlertTriangle, XCircle, Layers } from 'lucide-react';

const timestamp = new Date().toISOString();

const defaultPrincipleStyle = {
  icon: BookOpen,
  implementationIcon: Layers,
  goalIcon: Target,
  importanceIcon: HelpCircle,
  consequencesIcon: AlertTriangle,
  exceptionsIcon: XCircle,
  
  bgColor: 'bg-gray-50',
  textColor: 'text-gray-900',
  descriptionColor: 'text-gray-600',
  borderColor: 'border-gray-200',
  
  goalBg: 'bg-blue-50',
  goalTextColor: 'text-blue-900',
  goalDescriptionColor: 'text-blue-800',
  goalIconColor: 'text-blue-600',
  
  importanceBg: 'bg-purple-50',
  importanceTextColor: 'text-purple-900',
  importanceDescriptionColor: 'text-purple-800',
  importanceIconColor: 'text-purple-600',
  
  consequencesBg: 'bg-amber-50',
  consequencesTextColor: 'text-amber-900',
  consequencesDescriptionColor: 'text-amber-800',
  consequencesIconColor: 'text-amber-600',
  
  exceptionsBg: 'bg-gray-50',
  exceptionsTextColor: 'text-gray-900',
  exceptionsDescriptionColor: 'text-gray-700',
  exceptionsIconColor: 'text-gray-600',
  
  statusColors: {
    draft: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200'
    },
    review: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    },
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200'
    },
    deprecated: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200'
    }
  },
  
  hoverBg: 'hover:bg-gray-100'
};

export const mockPrinciples: Principle[] = [
  // Nasjonale prinsipper (OP-xx)
  {
    id: "op-01",
    category_id: "nasjonale-prinsipper",
    title: "OP-01 Ta utgangspunkt i brukernes behov",
    description: "Utform løsninger basert på faktiske behov, forenkling og tilgjengelighet.",
    goal: "Brukervennlige, behovsdrevne tjenester som gir verdi for innbyggerne.",
    importance: "Øker tilfredshet og reduserer feilinvesteringer ved å sikre at løsningene møter reelle behov.",
    consequences: "Krever grundig innsikt i brukerreiser og tidlig brukertesting. Kan medføre lengre planleggingsfase.",
    rationale: "Tjenester som ikke møter reelle behov blir lite brukt og gir dårlig kost/nytte.",
    measures: [],
    exceptions: [
      "Interne støttesystemer med begrenset brukermasse",
      "Kritiske sikkerhetstiltak"
    ],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "op-02",
    category_id: "nasjonale-prinsipper",
    title: "OP-02 Dataene skal være autoritative",
    description: "Bruk autoritative kilder og unngå duplisering av data.",
    goal: "Sikre konsistente og pålitelige data på tvers av løsninger.",
    importance: "Reduserer feil og inkonsistens i data. Forenkler vedlikehold og oppdateringer.",
    consequences: "Krever god datakatalog og styring av masterdata.",
    rationale: "Dupliserte data fører til inkonsistens og økte vedlikeholdskostnader.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "op-03",
    category_id: "nasjonale-prinsipper",
    title: "OP-03 Sikkerhet og personvern skal være innebygd",
    description: "Implementer sikkerhet og personvern fra starten av utviklingen.",
    goal: "Ivareta informasjonssikkerhet og personvern i alle løsninger.",
    importance: "Beskytter sensitive data og oppfyller lovkrav.",
    consequences: "Økt kompleksitet i design- og utviklingsfasen.",
    rationale: "Etterpåmontert sikkerhet er ofte utilstrekkelig og kostbart.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "op-04",
    category_id: "nasjonale-prinsipper",
    title: "OP-04 Del og gjenbruk av data og tjenester",
    description: "Tilgjengeliggjør data og tjenester for gjenbruk når mulig.",
    goal: "Økt effektivitet gjennom deling og gjenbruk.",
    importance: "Reduserer dobbeltarbeid og sikrer konsistente tjenester.",
    consequences: "Krever god API-styring og versjonshåndtering.",
    rationale: "Gjenbruk er mer effektivt enn å bygge alt på nytt.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "op-05",
    category_id: "nasjonale-prinsipper",
    title: "OP-05 Interoperabilitet gjennom åpne standarder",
    description: "Bruk åpne standarder for å sikre samhandling.",
    goal: "Enkel integrasjon mellom systemer og tjenester.",
    importance: "Reduserer leverandøravhengighet og forenkler integrasjon.",
    consequences: "Kan begrense valg av teknologi og løsninger.",
    rationale: "Proprietære formater skaper innlåsing og økte kostnader.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },

  // Sikkerhet - Tilgangsstyring
  {
    id: "sec-01",
    category_id: "tilgangsstyring",
    title: "SEC-01 Zero Trust Architecture",
    description: "Implementer Zero Trust-prinsipper for all tilgangsstyring.",
    goal: "Sikker tilgang til ressurser uavhengig av nettverkslokasjon.",
    importance: "Reduserer risiko for datainnbrudd og uautorisert tilgang.",
    consequences: "Økt kompleksitet i implementering og autentisering.",
    rationale: "Tradisjonell perimetersikkerhet er utilstrekkelig i moderne IT-miljøer.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "sec-02",
    category_id: "tilgangsstyring",
    title: "SEC-02 Multifaktor-autentisering",
    description: "Krev MFA for all tilgang til sensitive systemer og data.",
    goal: "Styrket autentisering og redusert risiko for identitetstyveri.",
    importance: "Beskytter mot kompromitterte påloggingsdetaljer.",
    consequences: "Økt kompleksitet for brukere og support.",
    rationale: "Passord alene er ikke tilstrekkelig sikkerhet.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "sec-03",
    category_id: "tilgangsstyring",
    title: "SEC-03 Minste privilegium",
    description: "Tildel minimale rettigheter nødvendig for å utføre oppgaver.",
    goal: "Redusere risiko ved kompromitterte kontoer.",
    importance: "Begrenser skadeomfang ved sikkerhetsbrudd.",
    consequences: "Krever detaljert tilgangsstyring og jevnlig revisjon.",
    rationale: "For vide rettigheter øker risiko for misbruk.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "sec-04",
    category_id: "tilgangsstyring",
    title: "SEC-04 Rollebasert tilgangskontroll",
    description: "Implementer RBAC for all tilgangsstyring.",
    goal: "Standardisert og effektiv håndtering av tilgang.",
    importance: "Forenkler administrasjon og reduserer feil.",
    consequences: "Krever god rollemodell og vedlikehold.",
    rationale: "Direkte rettigheter er vanskelig å vedlikeholde.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "sec-05",
    category_id: "tilgangsstyring",
    title: "SEC-05 Kontinuerlig autentisering",
    description: "Valider tilgang kontinuerlig, ikke bare ved pålogging.",
    goal: "Dynamisk sikkerhetskontroll basert på kontekst.",
    importance: "Reduserer risiko for misbruk av aktive sesjoner.",
    consequences: "Økt kompleksitet i implementering.",
    rationale: "Statisk sesjonshåndtering er ikke tilstrekkelig.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },

  // API-design
  {
    id: "api-01",
    category_id: "api-design",
    title: "API-01 API-først tilnærming",
    description: "Design tjenester med API som primærgrensesnitt fra starten.",
    goal: "Gjenbrukbare og veldesignede API-er.",
    importance: "Muliggjør effektiv integrasjon og gjenbruk.",
    consequences: "Krever mer planlegging i designfasen.",
    rationale: "Ettermonterte API-er blir ofte suboptimale.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "api-02",
    category_id: "api-design",
    title: "API-02 REST-baserte tjenester",
    description: "Bruk REST-arkitektur for alle nye API-er.",
    goal: "Standardiserte og forståelige API-er.",
    importance: "Forenkler utvikling og vedlikehold.",
    consequences: "Kan være begrensende for enkelte use-cases.",
    rationale: "REST er en velprøvd og moden arkitekturstil.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "api-03",
    category_id: "api-design",
    title: "API-03 OpenAPI-spesifikasjon",
    description: "Dokumenter alle API-er med OpenAPI/Swagger.",
    goal: "Selvdokumenterende og testbare API-er.",
    importance: "Forenkler integrasjon og reduserer feil.",
    consequences: "Krever vedlikehold av API-dokumentasjon.",
    rationale: "God dokumentasjon er kritisk for API-adopsjon.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "api-04",
    category_id: "api-design",
    title: "API-04 Versjonshåndtering",
    description: "Implementer eksplisitt versjonering av alle API-er.",
    goal: "Forutsigbar evolusjon av API-er.",
    importance: "Muliggjør trygg videreutvikling.",
    consequences: "Økt kompleksitet i vedlikehold.",
    rationale: "Uversjonerte API-er er risikable å endre.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "api-05",
    category_id: "api-design",
    title: "API-05 Sikkerhet i API-er",
    description: "Implementer OAuth 2.0 og OIDC for API-sikkerhet.",
    goal: "Standardisert og sikker API-autentisering.",
    importance: "Beskytter mot uautorisert API-bruk.",
    consequences: "Økt kompleksitet i implementering.",
    rationale: "API-nøkler alene er ikke tilstrekkelig.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },

  // Skystrategi
  {
    id: "cloud-01",
    category_id: "sky-strategi",
    title: "CLOUD-01 Cloud Native First",
    description: "Velg skybaserte løsninger som standard for nye systemer.",
    goal: "Moderne, skalerbare og kostnadseffektive løsninger.",
    importance: "Gir fleksibilitet og reduserte driftskostnader.",
    consequences: "Krever ny kompetanse og tilpassede rutiner.",
    rationale: "Skyteknologi er nå moden og gir betydelige fordeler.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "cloud-02",
    category_id: "sky-strategi",
    title: "CLOUD-02 Multicloud-strategi",
    description: "Design for portabilitet mellom skyleverandører.",
    goal: "Unngå leverandørlåsing og øk fleksibilitet.",
    importance: "Reduserer risiko og øker forhandlingskraft.",
    consequences: "Økt kompleksitet og potensielt høyere kostnader.",
    rationale: "Avhengighet av én leverandør er risikabelt.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "cloud-03",
    category_id: "sky-strategi",
    title: "CLOUD-03 Automatisert infrastruktur",
    description: "All infrastruktur skal defineres som kode.",
    goal: "Repeterbar og dokumentert infrastruktur.",
    importance: "Reduserer feil og forenkler endringer.",
    consequences: "Krever ny kompetanse og verktøy.",
    rationale: "Manuell infrastruktur er risikabelt.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "cloud-04",
    category_id: "sky-strategi",
    title: "CLOUD-04 Kostnadsoptimalisering",
    description: "Implementer aktiv kostnadsstyring i skyen.",
    goal: "Optimal ressursbruk og kostnadskontroll.",
    importance: "Hindrer ukontrollert kostnadsvekst.",
    consequences: "Krever kontinuerlig oppfølging.",
    rationale: "Skyressurser kan bli kostbare uten styring.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "cloud-05",
    category_id: "sky-strategi",
    title: "CLOUD-05 Sikkerhet i skyen",
    description: "Implementer sky-spesifikke sikkerhetstiltak.",
    goal: "Sikker drift i offentlig sky.",
    importance: "Beskytter mot nye trusler i skymiljøer.",
    consequences: "Krever spesialisert kompetanse.",
    rationale: "Tradisjonell sikkerhet er utilstrekkelig.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },

  // DevOps
  {
    id: "dev-01",
    category_id: "devops",
    title: "DEV-01 Kontinuerlig leveranse",
    description: "Automatiser bygg, test og deployment.",
    goal: "Rask og sikker leveranse av endringer.",
    importance: "Reduserer risiko og øker leveransehastighet.",
    consequences: "Krever investering i automatisering.",
    rationale: "Manuelle prosesser er feilbare og trege.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "dev-02",
    category_id: "devops",
    title: "DEV-02 Automatisert testing",
    description: "Implementer omfattende testautomatisering.",
    goal: "Høy kodekvalitet og rask feedback.",
    importance: "Muliggjør trygg og rask utvikling.",
    consequences: "Krever investering i testinfrastruktur.",
    rationale: "Manuell testing skalerer ikke.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "dev-03",
    category_id: "devops",
    title: "DEV-03 Monitorering og logging",
    description: "Implementer omfattende overvåking.",
    goal: "Proaktiv problemdeteksjon.",
    importance: "Muliggjør tidlig problemløsning.",
    consequences: "Krever investering i verktøy.",
    rationale: "Reaktiv feilsøking er ineffektivt.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "dev-04",
    category_id: "devops",
    title: "DEV-04 Infrastruktur som kode",
    description: "All infrastruktur defineres som kode.",
    goal: "Repeterbar og dokumentert infrastruktur.",
    importance: "Sikrer konsistent miljø.",
    consequences: "Krever ny kompetanse.",
    rationale: "Manuell konfigurasjon er risikabelt.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  },
  {
    id: "dev-05",
    category_id: "devops",
    title: "DEV-05 Kontinuerlig forbedring",
    description: "Implementer DevOps-måling og forbedring.",
    goal: "Stadig forbedring av leveranseprosessen.",
    importance: "Sikrer langsiktig effektivitet.",
    consequences: "Krever dedikert fokus og ressurser.",
    rationale: "Stagnasjon fører til teknisk gjeld.",
    measures: [],
    exceptions: [],
    references: [],
    reviews: [],
    status: "approved",
    version: "1.0",
    created_at: timestamp,
    updated_at: timestamp,
    style: defaultPrincipleStyle
  }
];