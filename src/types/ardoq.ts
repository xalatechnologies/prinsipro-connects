export interface ArdoqWorkspace {
  _id: string;
  name: string;
  description: string;
  componentModel: any;
  created: string;
  last_updated: string;
}

export interface ArdoqComponent {
  _id: string;
  name: string;
  description: string;
  type: string;
  parent: string | null;
  rootWorkspace: string;
  created: string;
  last_updated: string;
  fields: Record<string, any>;
}

export interface ArdoqReference {
  _id: string;
  type: string;
  source: string;
  target: string;
  rootWorkspace: string;
  created: string;
  last_updated: string;
  description: string;
}