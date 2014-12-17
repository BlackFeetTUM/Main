/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    function countPersons(){
        /*var randomNumber = Math.round((Math.random() * 100));
        if(randomNumber > 80){
            return 50;
        }else if(randomNumber < 20){
            return -50;
        }else return 0;*/
		$.ajaxSetup({async:false});
		var result = null;
		
		$.post( "phpOperations/getCount.php", function( data ) {
			result = data;
		});
		
		return result;
		
    }
    
    function generateData(num, sum) {
       var dataArray = [];
       for(var i=0; i<(num-1); i++){
           var randomNumber = Math.round((Math.random() * sum));
           dataArray.push(randomNumber);
           sum = sum -randomNumber;
       }
       dataArray.push(sum);
       return dataArray;
    }
    
    function generateQuestions(){
        var randomNumber = Math.round((Math.random() * 100));
        if(randomNumber > 80){
            return true;
        }
    }

    function QuestionAlert(container){
        var questionnumber = 0;
		
        $("#content").append("<div id='questionalert'><h2>Question alert</h2><div id='questions'></div></div>");
        var questionalert = d3.select("#questionalert")
                .attr("class", "clearfix");
        var questions = $("#questions");
        questions.text(questionnumber);
        var button = questionalert.append("button");
        button.text("\u2713");
        button.on("click", function(){
            if(questionnumber > 0){
				$.ajaxSetup({async:false});
				$.post( "phpOperations/updateQuestionCount.php");
				$.post( "phpOperations/getQuestionCount.php", function( data ) {
					questionnumber = data;
				});           
                if(questionnumber < 1){
                    questionalert.style("color", "black");
                }
                questions.text(questionnumber);
            }           
        });
        $("#questionalert").draggable();
        this.actualize = function(){
			$.ajaxSetup({async:false});
            questionnumber = 0;
			/*if(generateQuestions() === true){
                questionnumber += 1;
                
                
            }*/
			$.post( "phpOperations/getQuestionCount.php", function( data ) {
				questionnumber = data;
			});
			if(questionnumber > 0)
			{
				questionalert.style("color", "orange");
			}
            questions.text(questionnumber);
        };
        
    }
    
    function PersonControl(){
        this.chartlist = [];
        this.chartNameList = ["Number", "Timeline"];
        var chartcounter = 0;
        var number_height = 140;
        var timeline_height = 260;
       
        this.addChart = function(chart){
            chartcounter += 1;
            var id = "personchartcontainer" + chartcounter;
            var chartcounter2 = chartcounter;
            var copy = this;
            $("#content").append("<div class='personchartcontainer' id='" + id + "'></div>");
            var auswahl = d3.select("#" + id).append("select");
            for(i in this.chartNameList){
                var option = auswahl.append("option").text(this.chartNameList[i]);
                if(this.chartNameList[i].toUpperCase() === chart.toUpperCase()){
                    option.attr("selected", "selected");
                }
            }
            var button = d3.select("#" + id).append("button");
            button.text("X");
            if(chart === "number"){
                $("#" + id).css("height", number_height);
                i = new Personcounter(id, chartcounter);
            }
            if(chart === "timeline"){
                $("#" + id).css("height", timeline_height);
                auswahl.style("top", "10px");
                auswahl.style("left", "80px");
                i = new Timeline(id, chartcounter, true);
            }
            
            //DELETE BUTTON                      
            button.on("click", function(){
                   copy.remove("personchart" + chartcounter2);
                   $(".personchartcontainer#" + id).remove();
               });

            $(".personchartcontainer").draggable();
            this.chartlist[i.getName()] = i;
                       
            //CHART-SELECTBOX            
            auswahl.on("change", function(){copy.changeCharttype(chartcounter2, this[this.selectedIndex].text);});   
        };
        
        this.changeCharttype = function(id, charttype){
            var copy = this;
            $("#personchart" + id).remove();
            $("#personchartcontainer" + id + " .slowfast").remove();
            copy.remove("personchart" + id);
            var container = d3.select("#personchartcontainer" + id);
            if(charttype === "Number"){
                auswahl = d3.select("#personchartcontainer" + id + " select");
                auswahl.style("top", "110px");
                auswahl.style("left", "90px");
                container.style("height", number_height + "px");
                i = new Personcounter("personchartcontainer" + id, id);
            
            }else if(charttype === "Timeline"){
                auswahl = d3.select("#personchartcontainer" + id + " select");
                auswahl.style("top", "10px");
                auswahl.style("left", "80px");
                container.style("height", timeline_height + "px");
                i = new Timeline("personchartcontainer" + id, id, true);
            }
            this.chartlist[i.getName()] = i;
            
        };
       
        this.actualize = function(data){
           for(var a in this.chartlist){
               this.chartlist[a].update(data);
            } 
        };
       
        this.remove = function(name){
           delete this.chartlist[name];
        };
    }
    function ChartControl(){
       this.chartlist = [];
       this.chartNameList = ["Barchart", "Linepie", "Range", "Piechart", "Xborder", "Xborder2", "Timeline"];
       var chartcounter = 0;
       var barchart_height = 260;
       var linepie_height = 140;
       var range_height = 140;
       var piechart_height = 260;
       var xborder_height = 140;
       var xborder2_height = 140;
       var timeline_height = 260;
       var personcounter_height = 140;

       this.addChart = function(chart){
           chartcounter += 1;
            var id = "chartcontainer" + chartcounter;
            var chartcounter2 = chartcounter;
            var copy = this;
            $("#content").append("<div class='chartcontainer' id='" + id + "'></div>");
            var auswahl = d3.select("#" + id).append("select");
            for(i in this.chartNameList){
                var option = auswahl.append("option").text(this.chartNameList[i]);
                if(this.chartNameList[i].toUpperCase() === chart.toUpperCase()){
                    option.attr("selected", "selected");
                }
            }
            var button = d3.select("#" + id).append("button");
            button.text("X");
            if(chart === "linepie"){
               $("#" + id).css("height", linepie_height);
               i = new Linepie(["red", "orange", "yellow", "green", "blue"], id, chartcounter);
               
            }
            if(chart === "barchart"){             
               $("#" + id).css("height", barchart_height);
               i = new Barchart(["green", "blue", "purple", "black", "pink"], id, chartcounter);
               
            }
            
            if(chart === "range"){
                $("#" + id).css("height", range_height);
                i = new Range(id, chartcounter);
            }
            
            if(chart === "piechart"){
                $("#" + id).css("height", piechart_height);
                i = new Piechart(["red", "orange", "yellow", "green", "blue"], id, chartcounter);
            }
            if(chart === "xborder"){
                $("#" + id).css("height", xborder_height);
                i = new Crossingborder(id, chartcounter);                
            }
            if(chart === "xborder2"){
                $("#" + id).css("height", xborder2_height);
                i = new Crossingborder2(id, chartcounter);
            }
            if(chart === "timeline"){
                $("#" + id).css("height", timeline_height);
                i = new Timeline(id, chartcounter, false);
            }
            if(chart === "personcounter"){
                $("#" + id).css("height", personcounter_height);
                auswahl.style("display", "none");
                i = new Personcounter(id, chartcounter);
            }
            //DELETE BUTTON
                       
            button.on("click", function(){
                   copy.remove("chart" + chartcounter2);
                   $(".chartcontainer#" + id).remove();
               });

            $(".chartcontainer").draggable();
            this.chartlist[i.getName()] = i;
            
            
            //CHART-SELECTBOX
            
            auswahl.on("change", function(){copy.changeCharttype(chartcounter2, this[this.selectedIndex].text);});

            
       };

       this.changeCharttype = function(id, charttype){
            var copy = this;
            $("#chart" + id).remove();
            $("#chartcontainer" + id + " .slowfast").remove();
            copy.remove("chart" + id);
            var container = d3.select("#chartcontainer" + id);
            if(charttype === "Linepie"){
                container.style("height", linepie_height + "px");
                i = new Linepie(["red", "orange", "yellow", "green", "blue"], "chartcontainer" + id, id);
            }else if(charttype === "Barchart"){
                container.style("height", barchart_height + "px");
                i = new Barchart(["green", "blue", "purple", "black", "pink"], "chartcontainer" + id, id);
            }else if(charttype === "Range"){
                container.style("height", range_height + "px");
                i = new Range("chartcontainer" + id, id);
            }else if(charttype === "Piechart"){
                container.style("height", piechart_height + "px");
                i = new Piechart(["red", "orange", "yellow", "green", "blue"], "chartcontainer" + id, id);
            }else if(charttype === "Xborder"){
                container.style("height", xborder_height + "px");
                i = new Crossingborder("chartcontainer" + id, id);               
           
            }else if(charttype === "Xborder2"){
                container.style("height", xborder2_height + "px");
                i = new Crossingborder2("chartcontainer" + id, id);
            
            }else if(charttype === "Timeline"){
                container.style("height", timeline_height + "px");
                i = new Timeline("chartcontainer" + id, id, false);
            }
            this.chartlist[i.getName()] = i;
            
       };
       this.actualize = function(data){
           for(var a in this.chartlist){
               this.chartlist[a].update(data);
           }
       };
       this.remove = function(name){
           delete this.chartlist[name];
       };

   }

    function Linepie(colorArray, container, id){
        this.colorArray = colorArray;
        var name = "chart" + id;
        var barwidth = 200;
        var svgwidth = 270;
        var svgheight = 55;
        var svg = d3.select("#" + container).append("svg")
                .attr("class", "linepie")
                .attr("id", "chart" + id)
                .attr("height", svgheight)
                .attr("width", svgwidth);

        for(var i=0; i<5; i++){
        svg.append("rect")
                    .attr("fill", this.colorArray[i])
                    .attr("height", "40");
        }
        $("#" + container).append("<img class='slowfast' src='slow-fast.svg' onError=\"this.src='slow-fast.png';\"/>");
        
        
        this.getName = function(){
            return name;
        };

        this.setColorArray = function(colorArray){
            this.colorArray = colorArray;
        };

        this.update = function(data){
            var votes = 0;
            for(i in data){
                votes += data[i];
            }
            var barscale = d3.scale.linear()
                .domain([0,votes])
                .range([0, barwidth]);
            var rect = svg.selectAll("rect").data(data);
            rect.enter().append("rect");

            rect.transition()
                .duration(1000)
                .attr("x", function(d,i){
                    var k = i;
                    if(k===0){return 50;}
                    var sum  = 50;
                    for(var j=0; j<k; j++){
                        sum += barscale(data[j]);
                    }
                    return sum;
                })
                .attr("width", function(d){return barscale(d);});
        };
        this.update([20,30,40,30,20]);
    }

    function Barchart(colorArray, container, id){
        var colorArray = colorArray;
        var name = "chart" + id;
        var svgwidth = 270;
        var svgheight = 160;
        var barwidth = 200;
        var barheight = 150;
        var y_legend_leftspace = 50;
        var y_legend_topspace = 5;
        var svg = d3.select("#" + container).append("svg")
                .attr("class", "barchart")
                .attr("id", "chart" + id)
                .attr("height", svgheight)
                .attr("width", svgwidth);
 
    // Define the gradient colors for bars  
    var gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "barchart-gradient")
            .attr("x1", "0%")
            .attr("y1", "50%")
            .attr("x2", "100%")
            .attr("y2", "50%")
            .attr("spreadMethod", "pad");


    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#2fa805")
        .attr("stop-opacity", 1);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#087f01")
        .attr("stop-opacity", 1);

        //Add Bars
        for(var r=0; r < 5; r++) {
            svg.append("rect")
                    .attr("fill", "url(#barchart-gradient)");
        }

        //make xAxis
        var xAxis = d3.svg.axis()
            .scale(d3.scale.linear().domain([0,200]).range([0,barwidth]))
            .ticks(0)
            .tickSize(3, 0)
            .orient("bottom");

        svg.append("g")
           .attr("class", "xaxis")
           .attr("transform", "translate(" + y_legend_leftspace + "," + (barheight + y_legend_topspace) + ")")
           .call(xAxis); 

        this.y_axis = svg.append("g")
           .attr("class", "yaxis")
           .attr("transform", "translate(" + y_legend_leftspace + "," + y_legend_topspace + ")");

        $("#" + container).append("<img class='slowfast' src='slow-fast.svg' onError=\"this.src='slow-fast.png';\"/>");



        this.getName = function(){
            return name;
        };

        this.update = function(data){
            var data_max = d3.max(data);

            var xScale = d3.scale.ordinal()
                .domain(d3.range(data.length))
                .rangeRoundBands([0, barwidth], 0.05); 

            var yScale = d3.scale.linear()
                    .domain([0,data_max])
                    .range([barheight, 0]);

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5, ">");

            this.y_axis.transition().duration(1000)
                .call(yAxis);

            var yBarScale = d3.scale.linear()
                    .domain([0, data_max])
                    .range([0,barheight]);                    

            var bars = svg.selectAll("rect")
                .data(data);                   

            bars.attr("width", xScale.rangeBand())
                .transition()
                .duration(1000)
                .attr("y", function(d) {return barheight - yBarScale(d) + y_legend_topspace;})
                .attr("x", function(d,i) {return xScale(i) + y_legend_leftspace - 0.05 * xScale.rangeBand();})
                .attr("height", function (d) { return yBarScale(d);});                


        };
        
        this.update([20, 30, 40, 30, 20]);
    }
    
    function Range(container, id){
        var name = "chart" + id;
        var svgwidth = 270;
        var svgheight = 55;
        var dataMax = 200; 
        var name = "chart" + id;
        var svg = d3.select("#" + container).append("svg")
            .attr("class", "range")
            .attr("id", "chart" + id)
            .attr("width", svgwidth)
            .attr("height", svgheight);

        var gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "range-gradient")
            .attr("x1", "0%")
            .attr("y1", "50%")
            .attr("x2", "100%")
            .attr("y2", "50%")
            .attr("spreadMethod", "pad");

        // Define the gradient colors
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#d40000")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#00aa00")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#d40000")
            .attr("stop-opacity", 1);

        var range_rect = svg.append("rect")
                .attr("width", "200")
                .attr("height", "40")
                .attr("x", "50")
                .attr("y", "10")
                .attr("fill", "url(#range-gradient)");
        
        var triangle = svg.append("g")
               .attr("id", "triangle")
               .attr("transform", "translate(49.5, -1468), scale(1.4)")
               .append("path")
                    .attr("d", "m 5.0084763,1048.752 -4.50339999,7.8001 -4.50340011,-7.8001 z")
                    .attr("fill", "black");
        $("#" + container).append("<img class='slowfast' src='slow-fast.svg' onError=\"this.src='slow-fast.png';\"/>");
        
        this.getName = function(){
            return name;
        };
        
        this.update = function(data){
            var sum = 0;
            var votes = 0;
            for(var i=0; i<data.length; i++){
                sum += data[i] * (i + 1);
                votes += data[i];
            }
            if(votes === 0){
                svg.select("#triangle")
                    .attr("transform", "translate(49.5,0),scale(1.4)");
                return;
            }
            var average = sum/votes;
            var value = (average - 1) * 50;
            svg.select("#triangle")
                    .transition()
                    .ease("linear")
                    .duration(1000)
                    .attr("transform", "translate(" + (49.5 + value) + ",-1468), scale(1.4)");
        };
    }  
    
    function Piechart(colorArray, container, id){
        var name = "chart" + id;
        var pie = d3.layout.pie().sort(null);
        var outerRadius = 100;
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(outerRadius);
        var initialdata = [40, 40, 40, 40, 40];
        var svgwidth = 270;
        var svgheight = 220;
        var colors = ["red", "orange", "yellow", "green", "blue"];
        var svg = d3.select("#" + container).append("svg")
            .attr("class", "piechart")
            .attr("id", "chart" + id)
            .attr("width", svgwidth)
            .attr("height", svgheight)
            .append("g")
            .attr("id", "pieChart")
            .attr("transform", "translate(" + (outerRadius + 50) + "," + (outerRadius + 10) + ")");
        
        var path = svg.selectAll("path")
            .data(pie(initialdata))
            .enter()
            .append("path");

        path.attr("fill", function(d, i) {return colors[i]; })
              .transition()
              .duration(500)
              .attr("d", arc)
              .each(function(d) { 
                  this._current = d; 
                  this.helper = d;
              }); // store the initial angles

        this.getName = function(){
            return name;
        };

        this.update = function(data){
            var path = svg.selectAll("path");
            path.data(pie(data));
            path.transition().duration(1000).attrTween("d", this.arcTween); // redraw the arcs
        };
            // Store the displayed angles in _current.
            // Then, interpolate from _current to the new angles.
            // During the transition, _current is updated in-place by d3.interpolate.
        this.arcTween = function(a){
            if(isNaN(this._current.startAngle) || isNaN(this._current.endAngle)){
                  this._current = this.helper;
            }
            var i = d3.interpolate(this._current, a);
            this._current = i(0);

            return function(t) {
              return arc(i(t));
            };
        };
        
    }

    function Crossingborder(container, id){
        var name = "chart" + id;
        var width = 270;
        var height = 65;
        var svg = d3.select("#" + container).append("svg")
            .attr("class", "xborder")
            .attr("id", "chart" + id)
            .attr("width", width)
            .attr("height", height);
        svg.append("g")
            .attr("class", "rectContainer");
        svg.append("g")
                .attr("class", "circleContainer");
        
        $("#" + container).append("<img class='slowfast' src='slow-fast.svg' onError=\"this.src='slow-fast.png';\"/>");
        $("#" + container + " .slowfast").css("top", "-10px");
        
        this.getName = function(){
                return name;
            };

        this.update = function(data){
            data2 = new Array(5);
            var barwidth = 200;
            var votes = 0;
            for(i in data){
                votes += data[i];
            }
            var colors = ["red", "orange", "green", "blue"];

            var barscale = d3.scale.linear()
                .domain([0,votes])
                .range([0, barwidth/2]);

            var circle = svg.select(".circleContainer").selectAll("ellipse").data([data[2]]);
            var radius = 30;
            var strokewidth = 3;
            var barheight = 40;
            circle.enter().append("ellipse");
            circle.attr("ry", "30")
                    .attr("transform", "translate(" + (50)+ ",0)")
                    .attr("cx", barwidth/2)
                    .attr("cy", radius + strokewidth)
                    .attr("fill", "none")
                    .attr("stroke", "purple")
                    .attr("stroke-width", strokewidth)
                    .attr("z-index", "5")
                    .transition()
                    .duration(1000)
                    .attr("rx", barscale(data[2]));
                    
            for(i in data){
                data2[i] = data[i];
            }
            data2.splice(2,1);
            var rect = svg.select(".rectContainer").selectAll("rect").data(data2);
            rect.enter().append("rect");
            rect.attr("height", barheight)
                .attr("transform", "translate(" + (50)+ ",0)")
                .attr("fill", function(d,i){return colors[i];})
                .transition()
                .duration(1000)
                .attr("width", function(d){return barscale(d);})
                .attr("x", function(d,i){
                    if(i===0){
                        return barwidth/2 - barscale(d) - barscale(data2[1]);
                    }
                    if(i===1){
                        return barwidth/2 - barscale(d);
                    }
                    if(i===2){
                        return barwidth/2;
                    }
                    if(i===3){
                        return barwidth/2 + barscale(data2[2]);
                    }
        })
                .attr("y", radius + strokewidth - barheight/2);
                 
                
            
        };
 
        this.update([20,30,40,30,20]);
    }
    
    function Crossingborder2(container, id){
        var name = "chart" + id;
        var width = 270;
        var height = 65;
        var svg = d3.select("#" + container).append("svg")
            .attr("class", "xborder2")
            .attr("id", "chart" + id)
            .attr("width", width)
            .attr("height", height);
        svg.append("g")
            .attr("class", "rectContainer");
        svg.append("g")
                .attr("class", "circleContainer");
   
        $("#" + container).append("<img class='slowfast' src='slow-fast.svg' onError=\"this.src='slow-fast.png';\"/>");
        $("#" + container + " .slowfast").css("top", "-10px");
    this.getName = function(){
            return name;
        };
        
    this.update = function(data){
        var data2 = new Array(5);
        var barwidth = 200;
        var colors = ["red", "blue"];
        var basedata = 0;
        var votes = 0;
        for(i in data){
            votes += data[i];
        }
        for(var k=1; k<4; k++){
            basedata += data[k];
        }
        
        
        var barscale = d3.scale.linear()
            .domain([0,votes])
            .range([0, barwidth/2]);

        var basedata2 = [basedata];
        var circle = svg.select(".circleContainer").selectAll("ellipse").data(basedata2);
        var radius = 30;
        var strokewidth = 3;
        var barheight = 40;
        circle.enter().append("ellipse");
        circle.attr("ry", "30")
                .attr("transform", "translate(" + (50)+ ",0)")
                .attr("cx", barwidth/2)
                .attr("cy", radius + strokewidth)
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("stroke-width", strokewidth)
                .attr("z-index", "5")
                .transition()
                .duration(1000)
                .attr("rx", function(d){return barscale(d);});
        for(i in data){
            data2[i] = data[i];
        }
        data2.splice(1,3);
        var rect = svg.select(".rectContainer").selectAll("rect").data(data2);
        rect.enter().append("rect");
        rect.attr("height", barheight)
                .attr("transform", "translate(" + (50)+ ",0)")
                .attr("fill", function(d,i){return colors[i];})
                .transition()
                .duration(1000)
                .attr("width", function(d){return barscale(d);})
                .attr("x", function(d,i){
                    if(i===0){
                        return barwidth/2 - barscale(d);
                    }
                    if(i===1){
                        return barwidth/2;
                    }
        })
                .attr("y", radius + strokewidth - barheight/2);        
    };

        this.update([20,30,40,30,20]);
    }
    
    function Personcounter(container, id){
        var name = "personchart" + id;
        var numPersons = 0;
        $("#" + container).append("<div id='personchart"+ id + "'><h2>Spectators</h2><div id='spectators" + id + "' class='spectators'></div></div>");
        var personcounter = d3.select("#personchart" + id )
                .attr("class", "personcounter clearfix");
        var spectators = $("#spectators" + id);
        spectators.text(numPersons);
        
        this.getName = function(){
            return name;
        };
               
        this.update = function(data){
            numPersons = 0;
            for(i in data){
                numPersons += data[i];
            }
            spectators.text(numPersons);
        };
        $("#personcounter").draggable();
    }
        
    function Timeline(container, id, countpersons){
     if(countpersons === true){
         var name = "personchart" + id;
     }else var name = "chart" + id;
     var margin_right = 20;
     var svgwidth = 270 - margin_right;
     var svgheight = 180;
     var y_legend_leftspace = 50;
     var y_legend_topspace = 10;
     var x_legend_space = 20;
     
     var chartheight = svgheight - y_legend_topspace - x_legend_space;
     var chartwidth = svgwidth - y_legend_leftspace;
     var svg = d3.select("#" + container).append("svg")
             .attr("class", "timeline")        
             .attr("height", svgheight)
             .attr("width", svgwidth);
    
    if(countpersons === true){
             svg.attr("id", "personchart" + id);
    }else svg.attr("id", "chart" + id);

     var content = svg.append("g")
             .attr("class", "content");    

     var x_max = 0;

     var xAxisScale = d3.scale.linear()
             .domain([0,x_max])
             .range([0,chartwidth]);

    if(countpersons === false){         
        var yAxisScale = d3.scale.linear()
                .domain([1, 5])
                .range([chartheight, 0]);

        var yAxis = d3.svg.axis()
                .scale(yAxisScale)
                .orient("left")
                .ticks(5, ">")
                .tickSize(5,0);
        
        var yAxisContainer = content.append("g")
        .attr("class", "timeline_yaxis")
        .attr("transform", "translate(" + y_legend_leftspace + "," + y_legend_topspace + ")")
        .call(yAxis);

    }else{
        var yAxisContainer = content.append("g")
        .attr("class", "timeline_yaxis")
        .attr("transform", "translate(" + y_legend_leftspace + "," + y_legend_topspace + ")");
    } 
        var xAxisContainer = content.append("g")
         .attr("class", "timeline_xaxis")
         .attr("transform", "translate(" + y_legend_leftspace + ", " + (svgheight-x_legend_space) + ")");




     this.getSpeedAverage = function(data, num){
         var sum = 0;
         for(var i=0; i<data.length; i++){
             sum += data[i] * (i + 1);
         }
         var average = sum/num;
         return average;               
     };

     var datalist = [];

    this.getName = function(){
            return name;
        };

     this.update = function(data){
         x_max += 0.05;


        xAxisScale = d3.scale.linear()
             .domain([0,x_max])
             .range([0,chartwidth]);

         var xAxis = d3.svg.axis()
                 .scale(xAxisScale)
                 .orient("bottom")
                 .ticks(3)
                 .tickSize(5,5);

         xAxisContainer.transition().duration(1000).ease("linear").call(xAxis);

         var votes = 0;
         var steplength = 5;
         for(var i in data){
             votes += data[i];
         }
        if(countpersons === false){
            datalist.push(this.getSpeedAverage(data, votes));
        }else{
            datalist.push(votes);
        }
        
        if(countpersons === true){ 
        yAxisScale = d3.scale.linear()
            .domain([0, d3.max(datalist)])
            .range([chartheight, 0]);
    
        yAxis = d3.svg.axis()
             .scale(yAxisScale)
             .orient("left")
             .ticks(5, ">")
             .tickSize(5,0);
     
        yAxisContainer.transition().duration(1000).ease("linear").call(yAxis);
        }
         var linien = content.selectAll(".speeddata")
             .data(datalist);

         //enter
         linien.enter()
             .append("line")
             .attr("class", "speeddata")
             .attr("x1", function(d,i){
                 if(i===0){
                     return chartwidth + y_legend_leftspace;
                 }else{                           
                     return ((i+1)*chartwidth/datalist.length + y_legend_leftspace);
                 }})
             .attr("y1", function(d,i){
                 if(isNaN(d)){
                     this.style.stroke = "red";
                     //linien[i][0].attr("stroke", "red");
                     return yAxisScale(3) + y_legend_topspace;
                 }
                if(i===0){
                     return yAxisScale(d) + y_legend_topspace;
                }else{
                     if(isNaN(datalist[i-1])){
                         this.style.stroke = "transparent";
                         return yAxisScale(3) + y_legend_topspace;
                     }else{ 
                        return yAxisScale(datalist[i-1]) + y_legend_topspace;
                      }
                }})
             .attr("x2", function(d,i){
                 if(i===0){
                     return chartwidth + y_legend_leftspace;
                 }else{
                     return ((i+2)*chartwidth/datalist.length + y_legend_leftspace);
                 }})
             .attr("y2", function(d,i){
                 if(isNaN(d)){
                     
                    return yAxisScale(3)+ y_legend_topspace;
                 }
                     return yAxisScale(d) + y_legend_topspace;
                 })
             .style("stroke-width", 2);


         //update
        if(countpersons === false){
         
        //Speeddata
            linien.transition()
                .duration(1000)
                .ease("linear")
                .attr("x1", function(d,i){
                       return (i*chartwidth/datalist.length) + y_legend_leftspace;
                   })
                .attr("x2", function(d,i){return ((i+1)*chartwidth/datalist.length) + y_legend_leftspace;});
        }else{
            
        //Personcount
            linien.transition()
                .duration(1000)
                .ease("linear")
                .attr("x1", function(d,i){
                       return (i*chartwidth/datalist.length) + y_legend_leftspace;
                   })
                .attr("x2", function(d,i){return ((i+1)*chartwidth/datalist.length) + y_legend_leftspace;})
                .attr("y1", function(d,i){
                if(i===0){
                    return yAxisScale(d) + y_legend_topspace;
                }else{
                    return yAxisScale(datalist[i-1]) + y_legend_topspace;
                      }
                })
                .attr("y2", function(d,i){
                    return yAxisScale(d) + y_legend_topspace;
                });
        }
         
     };
 } 