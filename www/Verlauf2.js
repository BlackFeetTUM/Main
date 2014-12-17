/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
        function Verlauf(container, id){
            var name = "chart" + id;
            var svgwidth = 270;
            var svgheight = 160;
            var y_legend_leftspace = 50;
            var y_legend_topspace = 10;
            var x_legend_space = 20;
            var chartheight = svgheight - y_legend_topspace - x_legend_space;
            var chartwidth = svgwidth - y_legend_leftspace;
            var svg = d3.select("#" + container).append("svg")
                    .attr("class", "verlauf")
                    .attr("id", "chart" + id)
                    .attr("height", svgheight)
                    .attr("width", svgwidth);

            var content = svg.append("g")
                    .attr("class", "content");    

            var x_max = 0;
                    
            var xAxisScale = d3.scale.linear()
                    .domain([0,x_max])
                    .range([0,chartwidth]);
            
            var yAxisScale = d3.scale.linear()
                    .domain([1, 5])
                    .range([chartheight, 0]);
            
//            var xAxis = d3.svg.axis()
//                    .scale(xAxisScale)
//                    .orient("bottom")
//                    .ticks(2)
//                    .tickSize(5,5);
            
            var yAxis = d3.svg.axis()
                    .scale(yAxisScale)
                    .orient("left")
                    .ticks(5, ">")
                    .tickSize(5,0);
            
            var xAxisContainer = content.append("g")
                    .attr("class", "xaxis")
                    .attr("transform", "translate(" + y_legend_leftspace + ", " + (svgheight-x_legend_space) + ")");
                    
            
            var yAxisContainer = content.append("g")
                    .attr("class", "yaxis")
                    .attr("transform", "translate(" + y_legend_leftspace + "," + y_legend_topspace + ")")
                    .call(yAxis);
            
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
                x_max += 0.05;
                
                xAxisScale = d3.scale.linear()
                    .domain([0,x_max])
                    .range([0,chartwidth]);
 
                var xAxis = d3.svg.axis()
                        .scale(xAxisScale)
                        .orient("bottom")
                        .ticks(3)
                        .tickSize(5,5);
                
                xAxisContainer.transition().duration(3000).ease("linear").call(xAxis);
            
                var votes = 0;
                var steplength = 5;
                for(var i in data){
                    votes += data[i];
                }
                datalist.push(this.getSpeedAverage(data, votes));
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
                        if(i===0){
                            return yAxisScale(d) + y_legend_topspace;
                        }else{
                            return yAxisScale(datalist[i-1]) + y_legend_topspace ;
                        }})
                    .attr("x2", function(d,i){
                        if(i===0){
                            return chartwidth + y_legend_leftspace;
                        }else{
                            return ((i+2)*chartwidth/datalist.length + y_legend_leftspace);
                        }})
                    .attr("y2", function(d,i){return yAxisScale(d) + y_legend_topspace;})
                    .style("stroke-width", 2);

                
                //update
                linien.transition()
                    .duration(3000)
                    .ease("linear")
                    .attr("x1", function(d,i){
                            return (i*chartwidth/datalist.length) + y_legend_leftspace;
                        })
                    .attr("x2", function(d,i){return ((i+1)*chartwidth/datalist.length) + y_legend_leftspace;});
                    
                
            };
        }




