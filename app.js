const fetchOptions = {
	headers: {
		'Content-Type': 'application/json'
	},
	mode: 'cors'
};
var http=require("http");
var mysql=require("mysql");
var express=require('express');
var fs=require('fs');
var bodyParser=require('body-parser');
var app=express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
console.log('Creating the http server');

var con= mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "budget_mgmt"
});

con.connect(function(err){
    if(err)
	{
	  console.log('Error connecting to db');
	  return;
	}
	console.log('Connection established');
});
var statement= "select * FROM budget_mgmt.item_description";
app.get('/',function(request,response)
{
	fs.readFile('index.html',function(err,data)
	{
		console.log("The home page: index.html");
		con.query(statement,function(error,results, fields)
		{
		   if(error) throw error;
			 console.log(results);
		});  //response.end(data);
	});
});
app.post('/',function(request,response)
{
	console.log("hi");
	console.log(request.body);
  console.log(request.body.description);
	console.log(request.body.category);
  console.log(request.body.amount);
  console.log(request.body.date);
    var sql = "INSERT INTO item_description(description,category,amount,today) VALUES ('"
		+request.body.description+"','"+request.body.category+"',"+request.body.amount+","+"date_format(str_to_date('"+request.body.date+
		"','%m-%d-%Y'),'%Y-%m-%d'));";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
// response.writeHeader(200, {'Content-Type': 'text/html'});
// response.send("success");
//response.write(result);
response.json({success : "Updated Successfully", status : 200});
});
http.createServer(app).listen(3000,"127.0.0.1");
