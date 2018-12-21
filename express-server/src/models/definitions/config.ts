import { SchemaDefinition } from 'mongoose';

export const ConfigDefiniton: SchemaDefinition = {
  loaded: { type: Boolean, default: false },
  __v: { type: Number, select: false},
};