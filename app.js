const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.sendFile(__dirname + "/index.html");     //sending the index file when user loading the url via GET \\ 
})

app.set('view engine','ejs');                      //setting the ejs as the template\\



app.post('/',function(req,res){
                                                          // Retrieving weather datas from open weather api when user submitting the query//
const unit = "metric";
const key = "8d1a8b0b32407ecd79179b50f8779c04";
var query = req.body.city;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" +key+"&units="+unit+"";


http.get(url,function(response){
	response.on("data",function(data)
	{
		
		var datas = JSON.parse(data);      //parsing the datas into a JSON format\\
		var temp = datas.main.temp;
		var desc = datas.weather[0].description;
		var hum = datas.main.humidity;


res.render('view',{t:temp,d:desc,h:hum,c:query});          //rendering the view template and sending the particular weather datas to the view\\
		
		
	})
	
})
})

app.listen(3000,function()                                  //enabling the server on port 3000\\
{
	console.log("server started on 3000");
})
