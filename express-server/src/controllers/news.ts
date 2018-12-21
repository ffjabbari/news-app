import newsRepo from '../repository/news';
import { News } from '../interfaces/news';
import IoServer from '../socket';
import ExpressServer from '../express';

namespace NewsCtrl {
  const io: SocketIO.Server = IoServer.getInstance(ExpressServer.getInstance().getServer()).getIo();

  function getSocket(socketId?) {
    if (socketId) {
      return io.sockets.sockets[socketId].broadcast;
    } else {
      return io;
    }
  }

  export async function getNews(req, res, next) {
    let news: News[] = await newsRepo.getNews(req.query) as News[];
    res.send(news);
  };

  export async function createNews(req, res, next) {
    const newsItem = req.body.data;
    const socketId = req.body.socketId;
    if (!newsItem || newsItem._id) {
      throw new Error;
    }

    let createdNews: News[] = [await newsRepo.createNews(newsItem) as News];

    getSocket(socketId).emit('new-news', { data: JSON.stringify(createdNews) });
      
    res.send(createdNews);

  };

  export async function editNews(req, res, next) {
    const newsId = req.params.id;
    const newsItem = req.body.data;
    const socketId = req.body.socketId;
    if (!newsItem || !newsId) {
      throw new Error;
    }

    let editedNews: News[] = [await newsRepo.editNews(newsItem) as News];
    const news = await newsRepo.getSingleNews(newsId);
    getSocket(socketId).emit('edit-news', { data: JSON.stringify([news]) });
    res.send(editedNews);
  }

  export async function deleteNews(req, res, next) {
    const newsItemId = req.params.id;
    if (!newsItemId) {
      throw new Error;
    }

    let deletedNews = [await newsRepo.deleteNews(newsItemId)];
    res.send(deletedNews);
  };
}

export default NewsCtrl;