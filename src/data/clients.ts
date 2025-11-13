import type { Client } from '../types/index';

export const clients: Client[] = [
  {
    id: 'client_streaming',
    name: 'StreamFlix Entertainment',
    industry: 'Media & Entertainment',
    description: 'Global streaming platform with 200M+ subscribers',
    constraintCount: 47,
    languages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'pt-BR'],
    primaryContact: 'Maria Chen, Head of Localization'
  },
  {
    id: 'client_fintech',
    name: 'SecurePay Financial',
    industry: 'Financial Services',
    description: 'Digital banking and payment processing platform',
    constraintCount: 62,
    languages: ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE'],
    primaryContact: 'James Morrison, Compliance Director'
  },
  {
    id: 'client_saas',
    name: 'CloudSync Technologies',
    industry: 'Enterprise SaaS',
    description: 'Cloud-based collaboration and productivity tools',
    constraintCount: 38,
    languages: ['en-US', 'ja-JP', 'ko-KR', 'zh-CN'],
    primaryContact: 'Sarah Park, Product Localization Lead'
  }
];

export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};
