const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');



router.get('/', (req, res, next)=>{
    Category.find()
    .exec()
    .then( docs =>{
        res.status(200).json({
            docs: docs
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next)=>{
    var category = new Category(req.body);
    category.save()
    
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

})

router.get('/:categoryId', (req, res, next)=>{
    Category.findById(req.params.categoryId)
    .then( doc =>{
        // if(!category){
        //     res.status(404).json({
        //         message: '404 not found'
        //     })
        // }
        res.status(200).json({
            docs: doc
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})



router.patch('/:categoryId', (req, res, next)=>{
    const id = req.params.categoryId;
    category.update({_id: id}, {$set: {name: req.body.name}})
    .then( doc =>{
  
        res.status(201).json({
            message: 'updated category',
            doc:doc
        })

    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:categoryId', (req, res, next)=>{
    Category.findByIdAndRemove(req.params.categoryId)
    .then( doc =>{
      
        res.status(200).json({
            message: 'category has been removed'

        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})



module.exports = router;
