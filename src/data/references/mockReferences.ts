import { Reference } from '@types/index';

const timestamp = new Date().toISOString();

export const mockReferences: Reference[] = [
  {
    id: "ref-digdir-op01",
    type: "DigDir",
    code: "OP-01",
    title: "Ta utgangspunkt i brukernes behov",
    description: "Overordnet prinsipp for å ivareta brukernes behov.",
    url: "https://www.digdir.no/",
    created_at: timestamp
  },
  {
    id: "ref-nsm-01",
    type: "NSM",
    code: "1.2.1",
    title: "Kartlegg enheter og programvare",
    description: "NSM-krav om å identifisere alle enheter, servere, nettverksutstyr og programvare.",
    url: "https://nsm.no",
    created_at: timestamp
  }
];