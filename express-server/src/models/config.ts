import { model, SchemaDefinition, SchemaOptions } from "mongoose";
import { Document, Schema, Model } from "mongoose";
import { MasterSchemaOptions } from "./schema";
import { MasterSchema } from './schema';
import { IConfig, Config } from '../interfaces/config';
import { ConfigDefiniton } from './definitions/config';

// Document
export interface IConfigDocument extends Config, Document { }

// Schema
const configSchemaOptions = new MasterSchemaOptions<IConfig>(Config);
const configSchema = new MasterSchema<IConfig>(ConfigDefiniton, configSchemaOptions);

// Model
export const ConfigModel: Model<IConfigDocument> = model<IConfigDocument>('Config', configSchema);