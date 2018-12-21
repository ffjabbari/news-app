import * as newsJson from './news.json';
import { NewsModel } from "../models/news";
import { INews, News } from '../interfaces/news';
import { ConfigModel } from '../models/config';


async function loadNewsInitialData() {
  try {
    const loaderConfig = await ConfigModel.findOne().sort({ created_at: -1 }).lean();
    if (!loaderConfig || !loaderConfig.loaded) {
      const parsedNews = parseNews(newsJson);
      for (let doc of parsedNews) {
        await NewsModel.create(doc);
      }
      await ConfigModel.create({ loaded: true });
    }
  } catch (err) {
    throw err;
  }

  return true;
};

function parseNews(data) {
  const news: Array<INews> = [];
  for (let doc of data) {
    news.push(new News(doc.title, doc.body, new Date(doc.date)));
  }

  return news;
}

export { loadNewsInitialData }
