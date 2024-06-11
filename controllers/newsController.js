const NewsModel = require('../models/News');
const UserModel = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, 
    auth: {
        user: '211683@astanait.edu.kz', 
        pass: 'Aitu2021!'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: '211683@astanait.edu.kz',
        to: email,
        subject: subject,
        html: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};


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
    const candidate = await NewsModel.findOne({ name: req.body.name });
    if (candidate) {
        return res.status(404).json({
            message: 'This news already added'
        });
    } 

    if (!req.body.name) {
        return res.status(400).json({
            message: "Enter required parameters"
        });
    }

    const news = new NewsModel({
        name: req.body.name,
        description: req.body.description,
        productImg: req.body.productImg
    });

    try {
        await news.save();

        const users = await UserModel.find({});
        const userEmails = users.map(user => user.email);

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #007bff;">New News Added: ${news.name}</h2>
                <img src="${news.productImg}" alt="${news.name}" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
                <p style="font-size: 1.1rem; color: #555;">${news.description}</p>
                <a href="http://yourwebsite.com/news/${news._id}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none; font-size: 1rem;">Read More</a>
            </div>
        `;

        // Send email to all users
        userEmails.forEach(email => {
            sendEmail(email, 'New News Added', htmlContent);
        });

        res.status(201).json(news);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
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
