export type GovernanceRole = 
  | 'architect'
  | 'security_officer'
  | 'risk_owner'
  | 'system_owner'
  | 'reviewer';

export interface Role {
  id: string;
  name: GovernanceRole;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  scope: 'global' | 'area' | 'category' | 'principle';
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  area_ids?: string[];  // For area-scoped roles
  created_at: string;
}

export interface GovernanceBoard {
  id: string;
  name: string;
  description: string;
  members: BoardMember[];
  created_at: string;
}

export interface BoardMember {
  id: string;
  board_id: string;
  user_id: string;
  role: 'chair' | 'member' | 'secretary';
  created_at: string;
}