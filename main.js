var mongoose = require('mongoose');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/dbproducts');

var Product = mongoose.model('Product',schema,'products');

var registro1 = new Product( {
    code: "Crema",
    description: "Crema LaLa",
    price: 50,
    quantity: 10,
    minimum: 5
})

var registro2 = new Product ({
    code: "Sabritas",
    description: "Saladas",
    price: 10,
    quantity: 20,
    minimum: 50
})

var registro3 = new Product({
    code: "Pan Bimbo",
    description: "Pan Blanco",
    price: 30,
    quantity: 10,
    minimum: 20
})

var registro4 = new Product({
    code: "FUD",
    description: "Jamón Clasico",
    price: 80,
    quantity: 100,
    minimum: 50
})

var guarda = () => {
    registro1.save(function(err){
        if(err){
            console.log(err);
        }
        console.log("guardado");
    })

    registro2.save(function(err){
        if(err){
            console.log(err);
        }
        console.log("guardado");
    })

    registro3.save(function(err){
        if(err){
            console.log(err);
        }
        console.log("guardado");
    })

    registro4.save(function(err){
        if(err){
            console.log(err);
        }
        console.log("guardado")
    })
}

var find = () => {
    Product.find({},function(err,docs){
        if(err){
            console.log(err)
        }

        docs.forEach(element=>{
            if(element.quantity < element.minimum){
               console.log("El producto: "+element.code+" necesita reorden");
            }
        })
        
    })
}



var update = () => {
    Product.find({},function(err,docs){

        if(err){
            console.log(err);
        }

        docs.forEach(element => {
            if(element.quantity < element.minimum){
                Product.updateMany({code:element.code},{$set:{quantity:300}},function(err,docs){
                    if(err){
                        console.log(err);
                    }
                    console.log(docs);
                })
            }   
        });
    })
}

var deletes = () =>{
    Product.deleteOne({code:"Crema"},function(err){
        if(err){
            console.log(err)
        }

        console.log("Producto Crema Borrado");
        process.exit(0);
    })

    
}



setTimeout(function(){
    find();
},2000)

setTimeout(function(){
    update();
},4000)

setTimeout(function(){
    deletes();
},6000)



guarda();