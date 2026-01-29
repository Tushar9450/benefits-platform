import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
  title: string;
  description: string;
  partnerName: string;
  category: string;
  promoCode: string;
  accessLevel: 'public' | 'locked';
  logoUrl?: string;
}

const DealSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  partnerName: { type: String, required: true },
  category: { type: String, required: true },
  promoCode: { type: String, required: true },
  accessLevel: { type: String, enum: ['public', 'locked'], default: 'public' },
  logoUrl: { type: String }
}, { timestamps: true });

export const Deal = mongoose.model<IDeal>('Deal', DealSchema);