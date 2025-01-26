export interface SystemSettings {
  organization: {
    name: string;
    domain: string;
    logo?: string;
  };
  email: {
    notifications: string;
    format: 'html' | 'text';
  };
  notifications: {
    email: boolean;
    system: boolean;
  };
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
    accentColor: string;
  };
}

export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  fields: SettingsField[];
}

export interface SettingsField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'toggle' | 'color';
  value: any;
  options?: { label: string; value: any }[];
  description?: string;
}