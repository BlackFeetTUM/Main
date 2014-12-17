/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
        function Verlauf(container, id){
            var name = "chart" + id;
            var svgwidth = 270;
            var svgheight = 160;
            var svg = d3.select("#" + container).append("svg")
                    .attr("class", "verlauf")
                    .attr("id", "chart" + id)
                    .attr("height", svgheight)
                    .attr("width", svgwidth);

            var content = svg.append("g")
                    .attr("class", "content");    

            var xAxisScale = d3.scale.linear()
                    .domain([0,600])
                    .range([0,svgwidth]);
            
            var yAxisScale = d3.scale.linear()
                    .domain([1, 5])
                    .range([svgheight, 0]);
            
            var xAxis = d3.svg.axis()
                    .scale(xAxisScale)
                    .orient("bottom")
                    .ticks(10)
                    .tickSize(5,5);
            
            var yAxis = d3.svg.axis()
                    .scale(yAxisScale)
                    .orient("left")
                    .ticks(5, ">")
                    .tickSize(5,0);
            
            var xAxisContainer = content.append("g")
                    .attr("class", "xaxis")
                    .attr("transform", "translate(0, " + svgheight + ")")
                    .call(xAxis);
            
            this.getSpeedAverage = function(data, num){
                var sum = 0;
                for(var i=0; i<data.length; i++){
                    sum += data[i] * (i + 1);
                }
                var average = sum/num;
                return average;               
            };
            
            var datalist = [];
            
            this.update = function(data){
                var votes = 0;
                var steplength = 5;
                for(var i in data){
                    votes += data[i];
                }
                datalist.push(this.getSpeedAverage(data, votes));
                content.selectAll(".speeddata")
                    .data(datalist)
                    .enter()
                    .append("line")
                    .attr("class", "speeddata")
                    .style("stroke-width", 2)
                    .style("stroke", "steelblue")
                    .style("fill", "none")
                    .attr("x1", function(d,i){
                        if(i===0){
                            return 0;
                        }else{
                            return (i-1) * 5;
                        }})
                    .attr("y1", function(d,i){
                        if(i===0){
                            return yAxisScale(d);
                        }else{
                            return yAxisScale(datalist[i-1]);
                        }})
                    .attr("x2", function(d,i){
                        if(i===0){
                            return 0;
                        }else{
                            return (i-1) * 5;
                        }})
                    .attr("y2", function(d,i){
                        if(i===0){
                            return yAxisScale(d);
                        }else{
                            return yAxisScale(datalist[i-1]);
                        }})
                    .transition()
                    .duration(2000)
                    .ease("linear")
                    .attr("x2", function(d,i){return i*5;})
                    .attr("y2", function(d,i){return yAxisScale(d);});
            };
        }

