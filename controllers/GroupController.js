const groupSchema = require('../models/Groups')

class Groups {

    static viewGroup(req,res){
        groupSchema.find()
        .populate('user')
        .exec()
        .then(groupData=>{
          console.log(groupDatan)
          res.status(200).json(groupData)
        }).catch(err=>{
          res.status(500).json({
            message:'something when wrong',
            err
          })
        })
      }
    
      static addGroups(req,res){
        let objCreate = {
         title:req.body.title,
         language:req.body.language
        } 
        groupSchema.create(objCreate)
        .then((data)=>{
          res.status(200).json({
              message:"create group success",
              data:data
          })
        }).catch(err=>{
          res.status(404).json({
            message:'failed at creating group data'
          })
        })
      }
    
      static updateGroups(req,res){
        let id = req.params.id
        let objUpdate = {
          title:req.body.title,
          language:req.body.language
        }
        groupSchema.findOneAndUpdate({_id:id},objUpdate)
        .exec()
        .then(data=>{
          res.status(200).json({
            message:'successfully updated groups data',
            data
          })
        }).catch(err=>{
          res.status(404).json({
            message:'failed at updating groups data'
          })
        })
      }
    
      static deleteGroups(req,res){
        const id = req.params.id
        groupSchema.remove({_id:id})
        .exec()
        .then(()=>{
          res.status(200).json({
            message:'successfully deleted book data'
          })
        }).catch(err=>{
          res.status(404).json({
            message:'failed at deleting book data'
          })
        })
      }
    
}

module.exports = Groups