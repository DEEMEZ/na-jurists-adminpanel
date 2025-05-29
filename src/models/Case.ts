// src/models/Case.ts
import { Schema, model } from 'mongoose';
import { ICase } from '../types/case';

const caseSchema = new Schema<ICase>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['open', 'closed', 'pending'], default: 'open' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attachments: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Case = model<ICase>('Case', caseSchema);

export default Case;