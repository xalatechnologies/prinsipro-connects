import { Attachment, ATTACHMENT_STYLES } from '@/types/attachment';

const timestamp = new Date().toISOString();

export const mockAttachments: Attachment[] = [
  // OP-01 attachments
  {
    id: "att-001",
    objectType: "principle",
    objectId: "op-01",
    fileName: "brukerbehov_sammendrag.pdf",
    fileUrl: "https://example.com/files/brukerbehov_sammendrag.pdf",
    mimeType: "application/pdf",
    fileSize: 204800,
    attachmentType: "document",
    description: "Sammendrag av brukerbehov tilknyttet OP-01",
    uploadedBy: "linda.bystrøm@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.document
  },
  {
    id: "att-002",
    objectType: "principle",
    objectId: "op-01",
    fileName: "brukertest_resultater.mp4",
    fileUrl: "https://example.com/videos/brukertest_resultater.mp4",
    mimeType: "video/mp4",
    fileSize: 5097152,
    attachmentType: "video",
    description: "Opptak av brukertesting for innbyggerportalen",
    uploadedBy: "ux-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.video
  },

  // SEC-01 attachments
  {
    id: "att-003",
    objectType: "principle",
    objectId: "sec-01",
    fileName: "zero_trust_arkitektur.png",
    fileUrl: "https://example.com/images/zero_trust_arkitektur.png",
    mimeType: "image/png",
    fileSize: 102400,
    attachmentType: "chart",
    description: "Oversikt over Zero Trust arkitekturprinsipper",
    uploadedBy: "security-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.chart
  },
  {
    id: "att-004",
    objectType: "principle",
    objectId: "sec-01",
    fileName: "sikkerhetsvurdering.pdf",
    fileUrl: "https://example.com/files/sikkerhetsvurdering.pdf",
    mimeType: "application/pdf",
    fileSize: 153600,
    attachmentType: "document",
    description: "Sikkerhetsvurdering av Zero Trust implementering",
    uploadedBy: "security-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.document
  },

  // API-01 attachments
  {
    id: "att-005",
    objectType: "principle",
    objectId: "api-01",
    fileName: "api_guidelines.pdf",
    fileUrl: "https://example.com/files/api_guidelines.pdf",
    mimeType: "application/pdf",
    fileSize: 307200,
    attachmentType: "document",
    description: "Retningslinjer for API-design og implementering",
    uploadedBy: "api-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.document
  },
  {
    id: "att-006",
    objectType: "principle",
    objectId: "api-01",
    fileName: "api_arkitektur.png",
    fileUrl: "https://example.com/images/api_arkitektur.png",
    mimeType: "image/png",
    fileSize: 81920,
    attachmentType: "chart",
    description: "Oversikt over API-arkitektur og gateway-løsning",
    uploadedBy: "api-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.chart
  },

  // CLOUD-01 attachments
  {
    id: "att-007",
    objectType: "principle",
    objectId: "cloud-01",
    fileName: "cloud_strategi.pdf",
    fileUrl: "https://example.com/files/cloud_strategi.pdf",
    mimeType: "application/pdf",
    fileSize: 409600,
    attachmentType: "document",
    description: "Skystrategi og veikart for sky-transformasjon",
    uploadedBy: "cloud-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.document
  },
  {
    id: "att-008",
    objectType: "principle",
    objectId: "cloud-01",
    fileName: "cloud_demo.mp4",
    fileUrl: "https://example.com/videos/cloud_demo.mp4",
    mimeType: "video/mp4",
    fileSize: 15728640,
    attachmentType: "video",
    description: "Demonstrasjon av sky-native arkitektur",
    uploadedBy: "cloud-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.video
  },

  // DEV-01 attachments
  {
    id: "att-009",
    objectType: "principle",
    objectId: "dev-01",
    fileName: "cicd_pipeline.png",
    fileUrl: "https://example.com/images/cicd_pipeline.png",
    mimeType: "image/png",
    fileSize: 71680,
    attachmentType: "chart",
    description: "Oversikt over CI/CD pipeline og verktøykjede",
    uploadedBy: "devops-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.chart
  },
  {
    id: "att-010",
    objectType: "principle",
    objectId: "dev-01",
    fileName: "deployment_metrics.pdf",
    fileUrl: "https://example.com/files/deployment_metrics.pdf",
    mimeType: "application/pdf",
    fileSize: 184320,
    attachmentType: "document",
    description: "Analyse av deployment-frekvens og stabilitet",
    uploadedBy: "devops-team@example.org",
    uploadedAt: timestamp,
    style: ATTACHMENT_STYLES.document
  }
];