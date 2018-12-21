import { SchemaOptions, Schema, SchemaDefinition } from 'mongoose';
import { assign } from 'lodash'

export class MasterSchema<T> extends Schema {
  constructor(definition: SchemaDefinition, options: MasterSchemaOptions<T>) {
    super(definition, options.getOptions());
  }
}

export class MasterSchemaOptions<T> {
  options: SchemaOptions

  constructor(private schemaType: new () => T) {
    this.setOptions();
  }

  setOptions() {
    const context = this;
    this.options = {
      toObject: {
        transform: function (doc: any, ret: any, options: any) {
          // delete ret._id;
          ret = assign(new context.schemaType(), ret);
          return ret;
        }
      }
    }
  }

  getOptions() {
    return this.options;
  }
}