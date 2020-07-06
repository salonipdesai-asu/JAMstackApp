//the array below stores stocksymbols
var stocksymbols = [];
//the array below stores the fetched stock prices
var currentprices = [];
// the array below combines the stocksymbol and corresponding price and is passed to drawChart() for building a Data Table
var stockdata =[];
var j =0;
google.charts.load('current', {packages: ['corechart', 'bar']});
stockdata.push(['StockSymbol', 'Current Stock Price']);
// myFunction is called on 'Add' Button Click
function myFunction()
{

	var x = document.getElementById("textinput").value.toUpperCase();
	stocksymbols.push(x);

// Finnhub API used to obtain Stock Price Quotes using Fetch API
	let url = "https://finnhub.io/api/v1/quote?symbol=" + stocksymbols[stocksymbols.length-1] + "&token=brk2lrfrh5r9g3oths00";

	fetch(url)
 	 	.then(response => response.json())
  	.then(function(data) 	{
  		
    	 currentprices.push(data['c']); //current price
    	 stockdata.push([stocksymbols[j], currentprices[j]]);
			 j++;
   
  	   //console.log(data);
       //console.log(currentprices);
		
				console.log(stockdata);
				
				//call the fucntion drawChart and pass stockdata - an array of arrays to it
				drawChart(stockdata);
    
  });
	// creates an unordered list 
	//var text = "<ul>";
	
	var text = "<ul>";
	var i;
	for(i=0; i<stocksymbols.length; i++)
  text += "<li>" + stocksymbols[i] + "</li>";

	text = text +"</ul>";
	document.getElementById("para1").innerHTML = text;
	document.getElementById('textinput').value='';

}

//This fuction converts stockdata into a DataTable and draws the bar chart
function drawChart(stockdata)
{

	var show_data = google.visualization.arrayToDataTable(stockdata);
	//console.log(show_data);
	var options = {
        title: "Current Stock Prices",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
			
			var view = new google.visualization.DataView(show_data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                        ]);
      
  var chart = new google.visualization.BarChart(document.getElementById('price_chart'));
  chart.draw(view, options); 

}
