export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

export const tourSteps: TourStep[] = [
  {
    target: '[data-tour="navbar"]',
    title: "Velkommen til Arkitekturplattformen",
    content: "Her finner du oversikt over alle områder som Sikkerhet, IAM, Sky, og mer. Klikk på et område for å utforske prinsipper og tiltak.",
    placement: "bottom"
  },
  {
    target: '[data-tour="search"]',
    title: "Søk etter prinsipper",
    content: "Søk direkte etter prinsipper, kategorier eller tiltak. For eksempel 'OP-01' eller 'sikkerhet'.",
    placement: "top"
  },
  {
    target: '[data-tour="areas"]',
    title: "Utforsk områder",
    content: "Her finner du alle arkitekturområdene. Hvert område har sine egne prinsipper og tiltak.",
    placement: "top"
  },
  {
    target: '[data-tour="chat"]',
    title: "Arkitekturassistent",
    content: "Har du spørsmål? Vår innebygde assistent kan hjelpe deg med å finne relevant informasjon.",
    placement: "left"
  }
];