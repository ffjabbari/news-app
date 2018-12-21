import { SchemaDefinition } from 'mongoose';

export const NewsDefinition: SchemaDefinition = {
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  __v: { type: Number, select: false},
};