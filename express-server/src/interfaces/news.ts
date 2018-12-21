/**
 * Interface for model NewsModel
 *
 * @export
 * @interface INews
 */
export interface INews {
  title: String;
  body: String;
  date: Date;
  archived: Boolean;
  deleted: Boolean;
}

export class News implements INews {
  archived: Boolean;
  deleted: Boolean;
  _id: any;
  title: String;
  body: String;
  date: Date;

  constructor(title?, body?, date?, archived?, deleted?) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.archived = archived;
    this.deleted = deleted;
  }

  public getDateAsString = function() {
    return this.date ? this.date.toDateString() : '';
  }
}