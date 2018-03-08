const Message = require('../models/message');
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
  create: (req,res) => {

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
  },
  update: (req,res) => {
    const id = req.params.id;
    const input = {
      text: req.body.text
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
