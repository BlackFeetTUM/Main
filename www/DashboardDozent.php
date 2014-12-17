<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<? include 'phpOperations/includor.php'; ?>
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="dashboard.css" rel="stylesheet" type="text/css" />
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="Container.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
    </head>
    <body>
        <div id="header" class="clearfix">
            <div id="header-left">Statistics
                <div id="statisticsmenu">
                    <ul>
                        <li id="speedcontrol">Speedcontrol</li>
                        <li>Question alert</li>
                        <li id="students">Students</li>
                    </ul>
                </div>
            </div>
            <div id="title">Dashboard</div>
            <div id="header-middle">Navigation</div>
            <div id="header-right">Stop event</div>
        </div>
		<?php echo $_SESSION['lecturePw']; ?>
        
        <div id="content" class="clearfix">
        <script>
            var switcher = 0;
            var numPersons = 0; 
            test1 = new ChartControl();
            test2 = new PersonControl();
            d3.select("#speedcontrol").on("click", function(){
                test1.addChart("range");
            });
            d3.select("#students").on("click", function(){
                test2.addChart("number");
            });
            d3.select("#header-right").on("click", function(){
                var userinput = confirm("Do you really want to stop the event?");
                if(userinput === true){
                    clearInterval(schleife);
                }
                
            });
            test1.addChart("timeline");
            test2.addChart("timeline");
            crazy = new QuestionAlert("depp");
            var data = generateData(5,numPersons);
            test1.actualize(data);
            test2.actualize(data);
            var schleife = setInterval(function(){
                var result = countPersons();
                /*if(result < 0 && numPersons > 0){
                    numPersons += result;
                }else if(result >= 0){
                    numPersons += result;
                }*/
				numPersons = result;
                
                crazy.actualize();
                data = generateData(5, numPersons);
//                if(switcher === 3){
//                    data = generateData(5, 0);
//                    switcher = 0;
//                }else{
//                    data = generateData(5, 200);
//                    switcher += 1;
//                }
                test1.actualize(data);
                test2.actualize(data);
            }, 3000);
        </script>            
            
        </div>
        <img id="logo" src="logo.svg" onError="this.src='logo.png';" alt="logo"/>
    </body>
</html>
