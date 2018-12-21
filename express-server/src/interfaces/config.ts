/**
 * Interface for model ConfigModel
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {
  loaded: Boolean;
}

export class Config implements IConfig {
  loaded: Boolean;
  _id: any;

  constructor(loaded?) {
    this.loaded = loaded;
  }
}