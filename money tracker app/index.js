var express = require ('express');
var bodyParser = require ('body-parser');
var mongoose = require ('mongoose');

const app = express();
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/money-tracker-db")
var db = mongoose.connection
db.on("error",()=> console.log("error in connecting to db"))
db.once("open",()=> console.log("connected to db"))
app.post("/add",(req,res) =>{
    var category_sel = req.body.category_sel
    var amount_input = req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data = {
        "Category":category_sel,
        "Amount":amount_input,
        "Info":info,
        "Date":date_input
    }
    db.collection("users").insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("reccord inserted successfully")
    })

})
app.get("/",(req,res)=>{
    res.set({"Allow-access-Allow-Origin":"*"})
    return res.redirect("public/index.html")
}).listen(5000)
console.log("listening on port 5000")