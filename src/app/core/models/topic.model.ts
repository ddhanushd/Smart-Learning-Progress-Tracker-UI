export interface Revision {
  revisedAt: string;
  oldConfidence: number;
  newConfidence: number;
  note: string;
}

export type TopicStatus = 'WEAK' | 'AVERAGE' | 'STRONG';

export interface Topic {
  id: string;
  name: string;
  confidence: number;
  status: TopicStatus;
  completed: boolean;
  deadline: string; // ISO date string
  revisions?: Revision[];
}
