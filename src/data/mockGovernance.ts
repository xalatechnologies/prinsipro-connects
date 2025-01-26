import { GovernanceBoard, BoardMember } from '@/types/governance';

const timestamp = new Date().toISOString();

export const mockBoard: GovernanceBoard = {
  id: 'main',
  name: 'Arkitekturstyret',
  description: 'Hovedstyret for arkitektur og tekniske beslutninger i Nordre Follo kommune',
  members: [
    {
      id: 'member-1',
      board_id: 'main',
      user_id: 'jan.johansen@nordrefollo.kommune.no',
      role: 'chair',
      created_at: timestamp
    },
    {
      id: 'member-2',
      board_id: 'main',
      user_id: 'kari.olsen@nordrefollo.kommune.no',
      role: 'secretary',
      created_at: timestamp
    },
    {
      id: 'member-3',
      board_id: 'main',
      user_id: 'per.hansen@nordrefollo.kommune.no',
      role: 'member',
      created_at: timestamp
    }
  ],
  created_at: timestamp
};