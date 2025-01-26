import { Measure } from '@types/index';

const timestamp = new Date().toISOString();

export const mockMeasures: Measure[] = [
  // OP-01 measures
  {
    id: "measure-op01-01",
    principle_id: "op-01",
    title: "Etabler brukerråd",
    description: "Opprett et brukerråd med representanter fra ulike brukergrupper for å sikre kontinuerlig brukerinvolvering.",
    responsible: "Linda Mari Bystrøm",
    status: "fullført",
    priority: "høy",
    deadline: "2024-06-30",
    dependencies: [],
    milestones: [
      {
        id: "ms-op01-01-1",
        title: "Identifiser brukergrupper",
        completed: true,
        due_date: "2024-04-15"
      },
      {
        id: "ms-op01-01-2",
        title: "Rekrutter medlemmer",
        completed: true,
        due_date: "2024-05-15"
      }
    ],
    progress: [
      {
        date: timestamp,
        percentage: 100,
        description: "Brukerråd etablert og første møte gjennomført"
      }
    ],
    progress_percentage: 100,
    last_status_update: timestamp,
    next_review_date: "2024-12-31",
    created_at: timestamp,
    updated_at: timestamp,
    style: {
      statusColors: {
        fullført: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500'
        },
        pågående: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        },
        planlagt: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        }
      },
      priorityColors: {
        høy: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        },
        medium: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200'
        },
        lav: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        }
      },
      hoverBg: 'hover:bg-gray-50',
      progressBarColors: {
        bg: 'bg-gray-200',
        fill: 'bg-green-500',
        text: 'text-white'
      }
    }
  },
  {
    id: "measure-op01-02",
    principle_id: "op-01",
    title: "Implementer brukerundersøkelser",
    description: "Utvikle og gjennomføre regelmessige brukerundersøkelser for alle digitale tjenester.",
    responsible: "UX-team",
    status: "pågående",
    priority: "høy",
    deadline: "2024-09-30",
    dependencies: ["measure-op01-01"],
    milestones: [
      {
        id: "ms-op01-02-1",
        title: "Utvikle spørreskjema",
        completed: true,
        due_date: "2024-07-15"
      }
    ],
    progress: [
      {
        date: timestamp,
        percentage: 60,
        description: "Spørreskjema utviklet og pilottesting påbegynt"
      }
    ],
    progress_percentage: 60,
    last_status_update: timestamp,
    next_review_date: "2024-08-15",
    created_at: timestamp,
    updated_at: timestamp,
    style: {
      statusColors: {
        fullført: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500'
        },
        pågående: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        },
        planlagt: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        }
      },
      priorityColors: {
        høy: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        },
        medium: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200'
        },
        lav: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        }
      },
      hoverBg: 'hover:bg-gray-50',
      progressBarColors: {
        bg: 'bg-gray-200',
        fill: 'bg-yellow-500',
        text: 'text-white'
      }
    }
  },

  // SEC-01 measures
  {
    id: "measure-sec01-01",
    principle_id: "sec-01",
    title: "Implementer MFA",
    description: "Innfør multifaktor-autentisering for alle brukere og systemer.",
    responsible: "Sikkerhetsteam",
    status: "pågående",
    priority: "høy",
    deadline: "2024-12-31",
    dependencies: [],
    milestones: [
      {
        id: "ms-sec01-01-1",
        title: "Velg MFA-løsning",
        completed: true,
        due_date: "2024-09-15"
      }
    ],
    progress: [
      {
        date: timestamp,
        percentage: 40,
        description: "MFA-løsning valgt og pilot startet"
      }
    ],
    progress_percentage: 40,
    last_status_update: timestamp,
    next_review_date: "2024-10-15",
    created_at: timestamp,
    updated_at: timestamp,
    style: {
      statusColors: {
        fullført: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500'
        },
        pågående: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        },
        planlagt: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        }
      },
      priorityColors: {
        høy: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        },
        medium: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200'
        },
        lav: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        }
      },
      hoverBg: 'hover:bg-gray-50',
      progressBarColors: {
        bg: 'bg-gray-200',
        fill: 'bg-yellow-500',
        text: 'text-white'
      }
    }
  },

  // API-01 measures
  {
    id: "measure-api01-01",
    principle_id: "api-01",
    title: "API Gateway implementering",
    description: "Etabler sentral API Gateway for alle nye og eksisterende API-er.",
    responsible: "API-team",
    status: "pågående",
    priority: "høy",
    deadline: "2024-12-31",
    dependencies: [],
    milestones: [
      {
        id: "ms-api01-01-1",
        title: "Velg API Gateway",
        completed: true,
        due_date: "2024-08-15"
      }
    ],
    progress: [
      {
        date: timestamp,
        percentage: 30,
        description: "API Gateway valgt og installert i testmiljø"
      }
    ],
    progress_percentage: 30,
    last_status_update: timestamp,
    next_review_date: "2024-09-15",
    created_at: timestamp,
    updated_at: timestamp,
    style: {
      statusColors: {
        fullført: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500'
        },
        pågående: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        },
        planlagt: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        }
      },
      priorityColors: {
        høy: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        },
        medium: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200'
        },
        lav: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        }
      },
      hoverBg: 'hover:bg-gray-50',
      progressBarColors: {
        bg: 'bg-gray-200',
        fill: 'bg-yellow-500',
        text: 'text-white'
      }
    }
  },

  // CLOUD-01 measures
  {
    id: "measure-cloud01-01",
    principle_id: "cloud-01",
    title: "Sky-migreringsplan",
    description: "Utvikle detaljert plan for migrering av systemer til sky.",
    responsible: "Skyteam",
    status: "fullført",
    priority: "høy",
    deadline: "2024-06-30",
    dependencies: [],
    milestones: [
      {
        id: "ms-cloud01-01-1",
        title: "Systemkartlegging",
        completed: true,
        due_date: "2024-04-15"
      },
      {
        id: "ms-cloud01-01-2",
        title: "Migreringsstrategi",
        completed: true,
        due_date: "2024-05-15"
      }
    ],
    progress: [
      {
        date: timestamp,
        percentage: 100,
        description: "Migreringsstrategi godkjent av ledelsen"
      }
    ],
    progress_percentage: 100,
    last_status_update: timestamp,
    next_review_date: "2024-12-31",
    created_at: timestamp,
    updated_at: timestamp,
    style: {
      statusColors: {
        fullført: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500'
        },
        pågående: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        },
        planlagt: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        }
      },
      priorityColors: {
        høy: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        },
        medium: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200'
        },
        lav: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        }
      },
      hoverBg: 'hover:bg-gray-50',
      progressBarColors: {
        bg: 'bg-gray-200',
        fill: 'bg-green-500',
        text: 'text-white'
      }
    }
  },

  // DEV-01 measures
  {
    id: "measure-dev01-01",
    principle_id: "dev-01",
    title: "CI/CD Pipeline",
    description: "Implementer automatisert CI/CD pipeline for alle prosjekter.",
    responsible: "DevOps-team",
    status: "pågående",
    priority: "høy",
    deadline: "2024-09-30",
    dependencies: [],
    milestones: [
      {
        id: "ms-dev01-01-1",
        title: "Verktøyvalg",
        completed: true,
        due_date: "2024-07-15"
      }
    ],
    progress: [
      {
        date: timestamp,
        percentage: 50,
        description: "Pipeline implementert for pilotprosjekter"
      }
    ],
    progress_percentage: 50,
    last_status_update: timestamp,
    next_review_date: "2024-08-15",
    created_at: timestamp,
    updated_at: timestamp,
    style: {
      statusColors: {
        fullført: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500'
        },
        pågående: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        },
        planlagt: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        }
      },
      priorityColors: {
        høy: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        },
        medium: {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200'
        },
        lav: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        }
      },
      hoverBg: 'hover:bg-gray-50',
      progressBarColors: {
        bg: 'bg-gray-200',
        fill: 'bg-yellow-500',
        text: 'text-white'
      }
    }
  }
];