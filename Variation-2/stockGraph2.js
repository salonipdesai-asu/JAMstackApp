var stocksymbols = [];
var currentprices = [];
var stockdata =[];
stockdata.push(['StockSymbol', 'Opening Price','Current Stock Price', 'Highest Price', 'Lowest Price']);
var j=0,k=0;

google.charts.load('current', {packages: ['corechart', 'bar']});

// myFunction is called on 'Add' Button Click
function myFunction()
{

	var x = document.getElementById("textinput").value.toUpperCase();
	stocksymbols.push(x);

// Finnhub API used to obtain Stock Price Quotes using Fetch API
	let url = "https://finnhub.io/api/v1/quote?symbol=" + stocksymbols	[stocksymbols.length-1] + "&token=brk2lrfrh5r9g3oths00";


	fetch(url)
 	 	.then(response => response.json())
  	.then(function(data) 	{
  		 currentprices.push(data['o']);//opening price
    	 currentprices.push(data['c']); //current price
    	 currentprices.push(data['h']); //high price
    	 currentprices.push(data['l']); //low price
   
  	//console.log(data);
    //console.log(currentprices);
		stockdata.push([stocksymbols[j],currentprices[k],currentprices[k+1], currentprices[k+2], currentprices[k		+3]]);
		j++; 
		k = k + 4; 
    drawChart(stockdata);
    
  });
	// creates an unordered list 
	var text = "<ul>";
	var i;
	for (i = 0; i < stocksymbols.length; i++) 
  {
  	text += "<li>" + stocksymbols[i] + "</li>";
	}
	text = text +"</ul>";
	document.getElementById("para1").innerHTML = text;
	document.getElementById('textinput').value='';

}


//This fuction converts stockdata into a DataTable and draws the bar chart
function drawChart(stockdata)
{
	var show_data = google.visualization.arrayToDataTable(stockdata);
	//console.log(show_data);
	var options = 
  		{
        	title: 'Static Real Time Stock Graph',
        	chartArea: {width: '50%'},
        	colors: ['00688B', '0099CC', '87CEEB', 'BFEFFF'	],
        	hAxis: 
          	{
          		title: 'Stock Price in USD',
          		minValue: 0
        		},
        	vAxis:
          	{
          		title: 'Stock Symbols'
        		}
      };
      
  var chart = new google.visualization.BarChart(document.getElementById('price_chart'));
  chart.draw(show_data, options); 

}
