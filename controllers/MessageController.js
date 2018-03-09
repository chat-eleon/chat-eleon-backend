const Message = require('../models/message');
const translate = require('google-translate-api');
const axios = require('axios');
module.exports = {

  index : (req,res) => {
    const grupId = req.params.id;
    Message.find({
      grup: grupId
    }).exec((err,data) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
          err
        });
      }
      return res.status(200).json({
        message: 'Success Read Message',
        data
      });
    });
  },
  search : (req,res) => {
    const query = req.query.q;
    axios.get('https://api.cognitive.microsoft.com/bing/v7.0/search?q='+query,{ headers: {
      ['Ocp-Apim-Subscription-Key']: '3d5ddfb55ec448e69abf2f64e2e5e34f'
    }}).then((data) => {
      res.send(data.data.webPages.value);
    }).catch((err) => {
      res.send(err);
    })
  },
  create: (req,res) => {
    if (req.body.link) {
      let message = new Message({
        text: req.body.text,
        user: req.body.user,
        grup: req.body.grup
      });
      message.save((err,data) => {
        if (err) return res.status(500).json({
          message: "Something Went Wrong, Failed Create Message"
        })
        return res.status(200).json({
          message: "Success Create Message",
          data
        })
      });
    } else {
      translate(req.body.text, {to: req.body.language}).then(response => {
        let message = new Message({
          text: response.text,
          user: req.body.user,
          grup: req.body.grup
        });
        message.save((err,data) => {
          if (err) return res.status(500).json({
            message: "Something Went Wrong, Failed Create Message"
          })
          return res.status(200).json({
            message: "Success Create Message",
            data
          })
        });

      }).catch(err => {
          console.error(err);
      });
    }

  },
  update: (req,res) => {
    const id = req.params.id;
    translate(req.body.text, {to: req.body.language}).then(response => {
      const input = {
        text: response.text
      }
      Message.findOneAndUpdate({ _id : id},input,{new: true},(err,data) => {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong"
          });
        }
        return res.status(200).json({
          message: 'Success Update Message',
          data
        });
      });
    }).catch(err => {
        console.error(err);
    });
  },
  destroy: (req,res) => {
    const id = req.params.id;
    Message.findOneAndRemove({ _id : id},(err,book) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Delete Message',
        data: book
      });
    });
  },
};
