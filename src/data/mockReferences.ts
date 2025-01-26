import { Reference, ReferenceMapping } from '@/types/reference';

const timestamp = new Date().toISOString();

export const mockReferences: Reference[] = [
  {
    id: 'digdir-1',
    type: 'DigDir',
    code: 'OP-1',
    title: 'Tjenesteorientering',
    description: 'IT-løsninger skal utvikles som gjenbrukbare tjenester',
    url: 'https://www.digdir.no/digitalisering-og-samordning/overordnede-arkitekturprinsipper/1065',
    created_at: timestamp
  },
  {
    id: 'nsm-1',
    type: 'NSM',
    code: '1.1',
    title: 'Kartlegging av enheter',
    description: 'Virksomheten må ha oversikt over enheter i egen infrastruktur',
    url: 'https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet-2-0/',
    created_at: timestamp
  },
  {
    id: 'nfk-1',
    type: 'NFK',
    code: 'NFK-1',
    title: 'Skybaserte tjenester',
    description: 'Nye løsninger skal primært implementeres som skytjenester',
    created_at: timestamp
  }
];

export const mockReferenceMappings: ReferenceMapping[] = [
  {
    id: 'mapping-1',
    reference_id: 'digdir-1',
    principle_id: 'api-first',
    description: 'API-først tilnærming støtter tjenesteorientering gjennom standardiserte grensesnitt',
    created_at: timestamp
  },
  {
    id: 'mapping-2',
    reference_id: 'nsm-1',
    principle_id: 'zero-trust',
    description: 'Zero Trust arkitektur krever full oversikt over enheter og tilganger',
    created_at: timestamp
  }
];