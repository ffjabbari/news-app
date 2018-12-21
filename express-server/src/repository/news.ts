import { NewsModel, INewsDocument } from "../models/news";
import { map } from "lodash";
import { News } from "../interfaces/news";

namespace NewsRepo {
  export async function getNews(filter: any): Promise<INewsDocument[]> {
    const newsQuery = NewsModel.find(getFilter(filter));
    if (filter.offset) {
      newsQuery.skip(filter.offset);
    }

    if (filter.limit) {
      newsQuery.limit(filter.limit);
    }
    
    const news = await newsQuery.exec();
    return map(news, item => item.toObject());
  }

  export async function getSingleNews(id): Promise<INewsDocument> {
    if (!id) {
      throw Error;
    }

    return await NewsModel.findById(id);
  }

  export async function createNews(newsItem: News): Promise<INewsDocument> {
    return await NewsModel.create(newsItem);
  }

  export async function editNews(newsItem: News): Promise<INewsDocument> {
    return await NewsModel.updateOne({ _id: newsItem._id}, newsItem, { upsert: true });
  }

  export async function deleteNews(newsId: number): Promise<INewsDocument> {
    return await NewsModel.deleteOne({ _id: newsId });
  }

  function getFilter(config) {
    const filter: { [key: string]: any } = {};
    if (config._id) {
      filter._id = config._id;
    }

    filter.archived = config.archived ? config.archived : false;
    filter.deleted = false;

    return filter;
  }
}

export default NewsRepo;
