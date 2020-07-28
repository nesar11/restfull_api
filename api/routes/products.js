const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const  mongoose  = require('mongoose');
const Category = require('../models/category');



// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
    Product.find()
      .select("name price _id")
      .populate('category')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          categories: docs.map(doc => {
            return {
              _id: doc._id,
              name: doc.name,
              price: doc.price,
              category:doc.category,
              request: {
                type: "GET",
                url: "http://localhost:3003/products/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  

// router.get('/', (req, res, next) =>{
//    Product.find()
//    .select('name price category')
//    .populate('Category', 'name')
//    .exec()
//    .then(docs =>{
//        res.status(200).json({
//         const: docs.length,
//         products: docs.map(doc =>{
//             return{
//                 name: doc.name,
//                 price: doc.price,
//                 category: doc._id,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3001/products/' +doc._id
//                 }
//             }
//         })

//        }) 
//        res.status(200).json();
//    })
//    .catch(err =>{
//        console.log(err);
//        res.status(500).json({
//           error:err 
//        })
//    });
// });


router.post('/', (req, res, next) =>{
Category.findById(req.body.categoryId)
const product = new Product({
            _id: mongoose.Types.ObjectId(),
            category: req.body.categoryId,
            name: req.body.name,
            price: req.body.price
            });
    product.save()
            .then(result =>{
            console.log(result);
            res.status(201).json({
            message: 'Product added successfully',
            
            doc: {
                _id: result._id,
                category: result.categoryId,
                name: result.name,
                price:result.price,

                request:{
                    type: 'GET',
                    url: "http://localhost:3003/products/"+ result._id
                }
            }
            });

        })
.catch(err => {
    console.log(err);
    res.status(500).json({
       error: err

        })
    })

})





router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
       Product.findById(id)
       .select('name price _id')
       .populate('category')
       .exec()
       .then(doc =>{
           console.log(doc);
           if(doc){
               res.status(200).json({
                   _id: doc._id,
                   name:doc.name,
                   price: doc.price,
                   category:doc.category,
                   request:  {
                       type: 'GET',
                       url: 'http://localhost:3003/product'
                   }
               })
           } else {
               res.status(404).json({message: 'No valid Entry found from DB'});
           }
       })
       .catch(err =>
        {
            console.log(err);
            res.status(500).json({ error: err
            });

        }) 

    });



router.patch('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  // Only Single Field Update
  const updateOps=  {};
  for(const ops of req.body){
      updateOps[ops.propName] = ops.value;
  }
  // alter method MULTIPLE FIELD UPDATE to patch date 
//   Product.update({_id: id}, {$set: {name: req.body.name, price: req.body.price}})
Product.updateOne({_id: id}, {$set: updateOps})
  .exec()
  .then( docUpdate =>{
      res.status(200).json(docUpdate)
  })
 
  .catch( err =>{
    console.log(err);
    res.status(500).json({
        error :err
    })
})

});

router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.deleteOne({_id :id })
    .exec()
    .then( result =>{
        res.status(200).json({
            mesasge: ' Product deleted',
            request: {
                type: "POST",
                url: 'http:localhost:3001/products/',
                body: {name: 'String', price:'Number'}
             
            }
        });
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json({
            error :err
        })
    })

    
});

module.exports = router;