const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) =>{
    Product.findById(req.body.productId)

    Order.find()
    .select('product  quantity _id')
    .populate('product', 'name')
    .exec()
    
    .then(docs =>{
        console.log(docs);
        res.status(200).json({
            count : docs.length,
            orders: docs.map(
                doc =>{
                    return {
                    _id: doc._id,
                    product: doc.product,
                    
                    quanity: doc.quanity,
                    reqest: {
                        type: 'GET',
                        url: 'http:localhost:3003/orders/'+ doc._id
                    }}
                }

            )
            
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) =>{
Product.findById(req.body.productId)

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
    .then(result =>  {
      console.log(result);
      res.status(201).json({
          message: 'Order created',
          createdOrder: {
              _id: result._id,
              product: result.productId,
              quantity: result.quantity
          },
          reqest: {
            type: 'POS',
            url: 'http:localhost:3003/orders/' + result._id
        }
      });
  })
  .catch( err =>{
      console.log(err);
      res.status(500).json({
          error: err
      });
      
  });

});

router.get('/:orderId', (req, res, next) =>{
    Order.findById(req.params.orderId)
    .populate('product', 'name price')
    .exec()
    .then( order =>{
        if(!order){
            return res.status(404).json({
                message: '404 order not found'
            })
        }
        res.status(200).json({
           order:{
               product: order.product,
               quantity: order.quantity,
               toTalPrice: order.quantity*order.product.price
           },
           request : {
               type: "GET",
               url: 'http://localhost:3003/orders'

           }
        })
    })
    .catch( err =>{
        res.status(500).json({
            error: err
        })
    })
})



    


router.delete('/:orderId', (req, res, next) =>{
    // const id = req.params.orderId
    
 Order.remove( {_id: req.params.orderId})
    .exec()
    .then( result =>{
        res.status(200).json({
            message: ' order has deleted',
           
           request : {
               type: "POST",
               url: 'http://localhost:3003/orders',
               body:{
                   productId:"ID", quantity: "Number"
               }

           }
        })
    })
    .catch( err =>{
        res.status(500).json({
            error: err
        })
    })
    })
    


module.exports = router;