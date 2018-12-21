import { model, SchemaDefinition, SchemaOptions } from "mongoose";
import { Document, Schema, Model } from "mongoose";
import { INews, News } from "../interfaces/news";
import { NewsDefinition } from "./definitions/news";
import { MasterSchemaOptions } from "./schema";
import { MasterSchema } from './schema';

// Document
export interface INewsDocument extends News, Document { }

// Schema
const newsSchemaOptions = new MasterSchemaOptions<INews>(News);
const newsSchema = new MasterSchema<INews>(NewsDefinition, newsSchemaOptions);

// Model
export const NewsModel: Model<INewsDocument> = model<INewsDocument>('News', newsSchema);