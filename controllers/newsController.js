const NewsModel = require('../models/News');

module.exports.getAllNews = async function (req, res) {
    try {
        const news = await NewsModel.find();
        res.status(200).render('news', {news: news})
    } catch(error) {
        res.status(404).render('message', {message: error.message})
    }
}


module.exports.getNews = async function (req, res) {
    try {
        const news = await NewsModel.findOne({_id: req.params.id}).exec();
        res.status(200).render('detailed', {news: news})
    } catch(error) {
        res.status(404).render('message', {message: error.message})
    }
}

module.exports.addNews = async function (req, res) {
    const candidate = await NewsModel.findOne({name: req.body.name});
    if (candidate) {
        res.status(404).json({
            message: 'This news already added'
        })
    } else {
        if (!req.body.name){
            return res.status(400).json({
                message: "Enter required parameters"
            })
        }
        const news = new NewsModel({
            name: req.body.name,
            description: req.body.description,
            productImg: req.body.productImg
        });
        try {
            await news.save();
            res.status(201).json(news)
        } catch (err) {
            res.status(404).json({
                message: err.message
            })
        }
    }
}

module.exports.updateNews = async function(req, res){
    const query = req.params.id;
    await NewsModel.findOneAndUpdate({_id: query}, {
        name: req.body.name,
        description: req.body.description,
        productImg: req.body.productImg,
    }).then(data => {
        res.status(200).render('message', {status: 200, message: "News updated successfully."});
    }).catch(err => {
        res.status(500).render('message', {status: 200, message: err.message});
    });
}

module.exports.deleteNews = async function (req, res) {
    await NewsModel.deleteOne({_id: req.params.id}).then(data => {
        if (data.deletedCount === 0) {
            res.status(404).render('message', {status: 404, message: "news not found"})
        } else {
            res.status(200).render('message', {status: 200, message: "news deleted succesfully!" });
        }
    }).catch(err => {
        res.status(500).render('message', {status: 500, message: err.message});
    });
}
