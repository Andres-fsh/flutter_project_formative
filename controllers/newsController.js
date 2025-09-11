const newsService = require('../services/newsService');

const getAllNews = async (req, res) => {
    const allNews = await newsService.getAllNews();
    if (allNews)
        res.status(200).send({ status: "OK", data: allNews });
    else
        res.status(400).send({ status: "FAILED", data: allNews});
};

const getNews = async (req, res) => {
    let id = req.params.newsId;
    const news = await newsService.getNews(id);
    if(news)
        res.status(200).send({ status: "OK", data: news });
    else
       res.status(400).send({status: "FAILED", data: news});
    
};

const createNews = async (req, res) => {
    const { body } = req;
    const createdNews = await newsService.createNews(
        body.title,
        body.summary,
        body.picture,
        body.date,
        body.fkIdCategoriesNews
    );
   if(createdNews)
        res.status(201).send({ status: "OK", data: createdNews });
    else
       res.status(400).send({status: "FAILED", data: createdNews});
};

const updateNews = async (req, res) => {
        let id = req.params.newsId;
        let { title, summary, picture, date, fkIdCategoriesNews } = req.body;
        const updatedNews = await newsService.updateNews(
            id, title, summary, picture, date, fkIdCategoriesNews
        );
        if (updatedNews)
        res.status(200).send({ status: "OK", data: updatedNews });
    else
      res.status(400).send({ status: "FAILED", data: updatedNews });
    };

const deleteNews = async (req, res) => {
    
        let id = req.params.newsId;
        const deletedNews = await newsService.deleteNews(id);
        if (deletedNews)
            res.status(200).send({ status: "OK", data: deletedNews });
        else
         res.status(400).send({ status: "FAILED", data: deletedNews });
};
module.exports = {
    getAllNews,
    getNews,
    createNews,
    updateNews,
    deleteNews
};