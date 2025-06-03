export type BlockType = 'prompt' | 'llm' | 'external' | 'condition';

export interface Block {
  id: string;
  type: BlockType;
  x: number;
  y: number;
}
