const express = require('express');
const app = express();
const port = 4000;
const superheroes = require('superheroes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/"));


app.set('view engine', 'ejs');

var shoparray = [];

app.get('/', function(req, res){

        var date = new Date();
        date = date.toLocaleDateString();


    res.render(
        'index' , {
            message: "Hello world",
             username: "daim", 
                hero : superheroes.random(),
                data: date,
                shop : shoparray
                }
        
        
        );
});



app.get('/add', function(req, res){
    res.render('add');
})


app.post('/add', function(req, res){

    //title, author, description, url , dx
    var {title, author, description, url, dx, key, trimtext} = req.body;
     key = Date.now();
     trimtext = description.slice(0, 80);
    
     var newitem = {title, author, description, url, dx, key, trimtext};
    shoparray.push(newitem);
    res.redirect('/');
})


app.get('/:id', function(req, res){

    var query = req.params.id;

    function arrayfind(dynamo){
        key = Number(query);
        return dynamo.key === key;
    }

    var found =  shoparray.find(arrayfind);

    res.render('found', {data: found});
  

})



app.post('/delete', function(req, res){

    var {target} = req.body;

    function arrayfind(dynamo){
        key = Number(target);
        return dynamo.key === key;
    }
   var found =  shoparray.find(arrayfind);

   var position = shoparray.indexOf(found);
  

   shoparray.splice(position, 1);

   res.redirect('/');

})


app.listen(port, function(){
    console.log("Server is running on port" + port);
})