/*
  # Initial Database Seed

  This script populates the database with initial data for:
  1. Areas (Overordnede prinsipper, Sikkerhet, IAM, etc.)
  2. Categories (one per area)
  3. Principles (OP-01 through OP-07 plus domain-specific)
  4. Measures (implementation tasks)

  Note: Run this after migrations are complete and as a superuser or with proper RLS policies.
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Disable triggers temporarily for bulk insert
SET session_replication_role = replica;

---------------------------------------------------------------------------
-- Clean existing data (if any)
---------------------------------------------------------------------------
TRUNCATE TABLE measures CASCADE;
TRUNCATE TABLE principles CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE areas CASCADE;

---------------------------------------------------------------------------
-- Insert Areas
---------------------------------------------------------------------------
INSERT INTO areas (name, description, responsible, style)
VALUES
  (
    'Overordnede Arkitekturprinsipper',
    'DigDir og nasjonale retningslinjer for digital samhandling i offentlig sektor (OP-xx).',
    'Linda Mari Bystrøm',
    '{"icon":"BookOpen","bgColor":"bg-gray-50","iconColor":"text-gray-700","textColor":"text-gray-900","descriptionColor":"text-gray-800","responsibleColor":"text-gray-600","hoverBg":"hover:bg-gray-100","hoverShadow":"hover:shadow-lg","borderColor":"border-gray-200"}'
  ),
  (
    'Sikkerhet',
    'Prinsipper og krav knyttet til IKT-sikkerhet, NSM og risiko.',
    'Sikkerhetsleder',
    '{"icon":"Shield","bgColor":"bg-red-50","iconColor":"text-red-700","textColor":"text-red-900","descriptionColor":"text-red-800","responsibleColor":"text-red-600","hoverBg":"hover:bg-red-100","hoverShadow":"hover:shadow-lg","borderColor":"border-red-200"}'
  ),
  (
    'Identitets- og tilgangsstyring',
    'Retningslinjer for sikker pålogging og rettighetskontroll.',
    'IAM-arkitekt',
    '{"icon":"Key","bgColor":"bg-amber-50","iconColor":"text-amber-700","textColor":"text-amber-900","descriptionColor":"text-amber-800","responsibleColor":"text-amber-600","hoverBg":"hover:bg-amber-100","hoverShadow":"hover:shadow-lg","borderColor":"border-amber-200"}'
  ),
  (
    'Integrasjon og masterdata',
    'Sørger for robuste dataflyter og bruk av autoritative kilder.',
    'Integrasjonsarkitekt',
    '{"icon":"Network","bgColor":"bg-purple-50","iconColor":"text-purple-700","textColor":"text-purple-900","descriptionColor":"text-purple-800","responsibleColor":"text-purple-600","hoverBg":"hover:bg-purple-100","hoverShadow":"hover:shadow-lg","borderColor":"border-purple-200"}'
  ),
  (
    'Sky- og plattformsarkitektur',
    'Retningslinjer for valg av skyplattformer, infrastruktur og driftsmodeller.',
    'Skyarkitekt',
    '{"icon":"Cloud","bgColor":"bg-blue-50","iconColor":"text-blue-700","textColor":"text-blue-900","descriptionColor":"text-blue-800","responsibleColor":"text-blue-600","hoverBg":"hover:bg-blue-100","hoverShadow":"hover:shadow-lg","borderColor":"border-blue-200"}'
  ),
  (
    'Utvikling og testing',
    'Prinsipper for DevOps, smidig utvikling, testmetodikk, og endringshåndtering.',
    'Tech Lead',
    '{"icon":"Code","bgColor":"bg-emerald-50","iconColor":"text-emerald-700","textColor":"text-emerald-900","descriptionColor":"text-emerald-800","responsibleColor":"text-emerald-600","hoverBg":"hover:bg-emerald-100","hoverShadow":"hover:shadow-lg","borderColor":"border-emerald-200"}'
  ),
  (
    'Automasjon og kunstig intelligens',
    'Retningslinjer for AI/ML-agenter og automatiserte prosesser.',
    'Data Science Lead',
    '{"icon":"Brain","bgColor":"bg-indigo-50","iconColor":"text-indigo-700","textColor":"text-indigo-900","descriptionColor":"text-indigo-800","responsibleColor":"text-indigo-600","hoverBg":"hover:bg-indigo-100","hoverShadow":"hover:shadow-lg","borderColor":"border-indigo-200"}'
  );

---------------------------------------------------------------------------
-- Insert Categories (one per area)
---------------------------------------------------------------------------
WITH area_ids AS (
  SELECT id, name FROM areas
)
INSERT INTO categories (area_id, name, description, style)
SELECT 
  id,
  CASE 
    WHEN name = 'Overordnede Arkitekturprinsipper' THEN 'Nasjonale prinsipper'
    WHEN name = 'Sikkerhet' THEN 'Sikkerhetskontroller'
    WHEN name = 'Identitets- og tilgangsstyring' THEN 'Tilgangsstyring'
    WHEN name = 'Integrasjon og masterdata' THEN 'API-design'
    WHEN name = 'Sky- og plattformsarkitektur' THEN 'Skystrategi'
    WHEN name = 'Utvikling og testing' THEN 'DevOps'
    WHEN name = 'Automasjon og kunstig intelligens' THEN 'AI-etikk'
  END,
  CASE 
    WHEN name = 'Overordnede Arkitekturprinsipper' THEN 'Prinsipper fastsatt av DigDir: OP-01 til OP-07'
    WHEN name = 'Sikkerhet' THEN 'Tekniske og organisatoriske sikkerhetstiltak'
    WHEN name = 'Identitets- og tilgangsstyring' THEN 'Prinsipper for sikker tilgangsstyring og autentisering'
    WHEN name = 'Integrasjon og masterdata' THEN 'Retningslinjer for API-utforming og -implementering'
    WHEN name = 'Sky- og plattformsarkitektur' THEN 'Overordnede prinsipper for skybruk'
    WHEN name = 'Utvikling og testing' THEN 'Prinsipper for kontinuerlig leveranse og drift'
    WHEN name = 'Automasjon og kunstig intelligens' THEN 'Etiske retningslinjer for bruk av kunstig intelligens'
  END,
  '{"icon":"BookOpen","bgColor":"bg-white","textColor":"text-gray-900","borderColor":"border-gray-200","iconColor":"text-gray-600","hoverBg":"hover:bg-gray-50"}'
FROM area_ids;

---------------------------------------------------------------------------
-- Insert Principles
---------------------------------------------------------------------------
WITH cat_ids AS (
  SELECT id, name FROM categories
)
INSERT INTO principles (
  category_id, title, description, goal, importance, 
  consequences, rationale, status, version
)
-- OP-01 through OP-07 for Nasjonale prinsipper
SELECT 
  id,
  'OP-01 Ta utgangspunkt i brukernes behov',
  'Utform løsninger basert på faktiske behov, forenkling og tilgjengelighet.',
  'Brukervennlige, behovsdrevne tjenester som gir verdi for innbyggerne.',
  'Øker tilfredshet og reduserer feilinvesteringer ved å sikre at løsningene møter reelle behov.',
  'Krever grundig innsikt i brukerreiser og tidlig brukertesting. Kan medføre lengre planleggingsfase.',
  'Tjenester som ikke møter reelle behov blir lite brukt og gir dårlig kost/nytte.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'
UNION ALL
SELECT 
  id,
  'OP-02 Ta arkitekturbeslutninger på rett nivå',
  'Beslutninger skal tas nærmest mulig der kunnskapen finnes.',
  'Effektive beslutningsprosesser og riktig ressursbruk.',
  'Sikrer at beslutninger tas av de med best faglig innsikt.',
  'Krever tydelig definerte roller og ansvar.',
  'Unngår flaskehalser og fremmer eierskap til løsninger.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'
UNION ALL
SELECT 
  id,
  'OP-03 Sikkerhet og personvern skal være innebygd',
  'Implementer sikkerhet og personvern fra starten av utviklingen.',
  'Ivareta informasjonssikkerhet og personvern i alle løsninger.',
  'Beskytter sensitive data og oppfyller lovkrav.',
  'Økt kompleksitet i design- og utviklingsfasen.',
  'Etterpåmontert sikkerhet er ofte utilstrekkelig og kostbart.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'
UNION ALL
SELECT 
  id,
  'OP-04 Del og gjenbruk data og tjenester',
  'Tilgjengeliggjør data og tjenester for gjenbruk når mulig.',
  'Økt effektivitet gjennom deling og gjenbruk.',
  'Reduserer dobbeltarbeid og sikrer konsistente tjenester.',
  'Krever god API-styring og versjonshåndtering.',
  'Gjenbruk er mer effektivt enn å bygge alt på nytt.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'
UNION ALL
SELECT 
  id,
  'OP-05 Lag digitale løsninger som støtter samhandling',
  'Tjenester utformes med tanke på interoperabilitet.',
  'Bedre tverrsektoriell samhandling i offentlig sektor.',
  'Forhindrer silotenkning og fremmer datadeling.',
  'Krever felles standarder for integrasjon.',
  'Minimerer friksjon når nye systemer skal kobles på.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'
UNION ALL
SELECT 
  id,
  'OP-06 Lag løsninger som gjenbruker felleskomponenter',
  'Bruk eksisterende fellesløsninger fremfor å lage nye.',
  'Redusert kompleksitet og kostnader.',
  'Unngår unødvendig duplisering av funksjonalitet.',
  'Krever oversikt over tilgjengelige felleskomponenter.',
  'Sparer tid og ressurser på utvikling.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'
UNION ALL
SELECT 
  id,
  'OP-07 Sørg for tillit til digitale løsninger',
  'Bygg inn mekanismer som sikrer tillit og transparens.',
  'Økt tillit til digitale tjenester.',
  'Avgjørende for adopsjon av digitale tjenester.',
  'Krever fokus på sikkerhet og personvern.',
  'Tillit er fundamentalt for digitalisering.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Nasjonale prinsipper'

-- Domain-specific principles
UNION ALL
SELECT 
  id,
  'SEC-01 Zero Trust Architecture',
  'Implementer Zero Trust-prinsipper for all tilgangsstyring.',
  'Sikker tilgang til ressurser uavhengig av nettverkslokasjon.',
  'Reduserer risiko for datainnbrudd og uautorisert tilgang.',
  'Økt kompleksitet i implementering og autentisering.',
  'Tradisjonell perimetersikkerhet er utilstrekkelig.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Sikkerhetskontroller'
UNION ALL
SELECT 
  id,
  'IAM-01 Minste privilegiums prinsipp',
  'Gi kun nødvendige tilganger for å utføre en oppgave.',
  'Redusert angrepsflate og bedre sikkerhet.',
  'Fundamental for god sikkerhetspraksis.',
  'Krever nøye vurdering av tilgangsbehov.',
  'Begrenser skadeomfang ved kompromitterte kontoer.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Tilgangsstyring'
UNION ALL
SELECT 
  id,
  'API-01 API-først tilnærming',
  'Design tjenester med API som primærgrensesnitt.',
  'Gjenbrukbare og veldesignede API-er.',
  'Muliggjør effektiv integrasjon og gjenbruk.',
  'Krever mer planlegging i designfasen.',
  'Ettermonterte API-er blir ofte suboptimale.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'API-design'
UNION ALL
SELECT 
  id,
  'CLOUD-01 Cloud Native First',
  'Velg skybaserte løsninger som standard.',
  'Moderne, skalerbare og kostnadseffektive løsninger.',
  'Gir fleksibilitet og reduserte driftskostnader.',
  'Krever ny kompetanse og tilpassede rutiner.',
  'Skyteknologi er nå moden og gir betydelige fordeler.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'Skystrategi'
UNION ALL
SELECT 
  id,
  'DEV-01 Kontinuerlig leveranse',
  'Automatiser bygg, test og deployment.',
  'Rask og sikker leveranse av endringer.',
  'Reduserer risiko og øker leveransehastighet.',
  'Krever investering i automatisering.',
  'Manuelle prosesser er feilbare og trege.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'DevOps'
UNION ALL
SELECT 
  id,
  'AI-01 Ansvarlig AI',
  'Sikre etisk og transparent bruk av AI.',
  'Rettferdig og pålitelig AI-implementering.',
  'Kritisk for tillit til AI-løsninger.',
  'Krever grundig testing og validering.',
  'Unngår diskriminering og uetisk bruk.',
  'approved',
  '1.0'
FROM cat_ids WHERE name = 'AI-etikk';

---------------------------------------------------------------------------
-- Insert Measures
---------------------------------------------------------------------------
WITH principle_ids AS (
  SELECT id, title FROM principles
)
INSERT INTO measures (
  principle_id, title, description,
  responsible, status, priority,
  deadline, progress_percentage
)
-- Measures for OP-01
SELECT 
  id,
  'Etabler brukerråd',
  'Opprett et brukerråd med representanter fra ulike brukergrupper.',
  'Linda Mari Bystrøm',
  'pågående',
  'høy',
  NOW() + INTERVAL '6 months',
  30
FROM principle_ids WHERE title LIKE 'OP-01%'
UNION ALL
SELECT 
  id,
  'Gjennomfør brukerundersøkelser',
  'Utfør spørreundersøkelser for å kartlegge brukerbehov.',
  'UX-team',
  'planlagt',
  'høy',
  NOW() + INTERVAL '3 months',
  0
FROM principle_ids WHERE title LIKE 'OP-01%'

-- Measures for SEC-01
UNION ALL
SELECT 
  id,
  'Implementer MFA',
  'Innfør multifaktor-autentisering for alle brukere.',
  'Sikkerhetsteam',
  'pågående',
  'høy',
  NOW() + INTERVAL '4 months',
  40
FROM principle_ids WHERE title LIKE 'SEC-01%'

-- Measures for IAM-01
UNION ALL
SELECT 
  id,
  'Gjennomgang av tilganger',
  'Kartlegg og revider alle systemtilganger.',
  'IAM-team',
  'planlagt',
  'høy',
  NOW() + INTERVAL '2 months',
  0
FROM principle_ids WHERE title LIKE 'IAM-01%'

-- Measures for API-01
UNION ALL
SELECT 
  id,
  'API Gateway implementering',
  'Etabler sentral API Gateway for alle nye og eksisterende API-er.',
  'API-team',
  'pågående',
  'høy',
  NOW() + INTERVAL '5 months',
  30
FROM principle_ids WHERE title LIKE 'API-01%'

-- Measures for CLOUD-01
UNION ALL
SELECT 
  id,
  'Sky-migreringsplan',
  'Utvikle detaljert plan for migrering av systemer til sky.',
  'Skyteam',
  'planlagt',
  'høy',
  NOW() + INTERVAL '6 months',
  0
FROM principle_ids WHERE title LIKE 'CLOUD-01%'

-- Measures for DEV-01
UNION ALL
SELECT 
  id,
  'CI/CD Pipeline',
  'Implementer automatisert CI/CD pipeline for alle prosjekter.',
  'DevOps-team',
  'pågående',
  'høy',
  NOW() + INTERVAL '3 months',
  50
FROM principle_ids WHERE title LIKE 'DEV-01%'

-- Measures for AI-01
UNION ALL
SELECT 
  id,
  'AI-policy',
  'Etabler retningslinjer for ansvarlig bruk av AI.',
  'Data Science Lead',
  'planlagt',
  'høy',
  NOW() + INTERVAL '4 months',
  0
FROM principle_ids WHERE title LIKE 'AI-01%';

-- Re-enable triggers
SET session_replication_role = DEFAULT;