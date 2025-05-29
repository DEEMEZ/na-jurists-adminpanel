import { Schema } from "mongoose";

// src/types/case.ts
export interface ICase {
    title: string;
    description: string;
    category: string;
    tags: string[];
    status: 'open' | 'closed' | 'pending';
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    attachments?: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CaseInput = Omit<ICase, 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;