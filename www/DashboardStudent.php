<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="dashboard_header.css" rel="stylesheet" type="text/css"/>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="Container.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
        <style>
            
            html, body{
                margin: 0px;
                font-family: "Calibri";
            } 
            body{
                background-image: linear-gradient(to right, #f0f0f0, #ffffff 80%, #f0f0f0);
            }
                       
            #speedcontrolform{
                margin: 0 auto;
                width: 770px;
                height: 170px;
            }
            #speedcontrolform input{
                float: left;
                border: none;
                background-repeat: no-repeat;
                background-size: cover;
                background-color: transparent;
                color: transparent;
                display: block;
                position: static;
                width: 150px;
                height: 150px;
                cursor: pointer;               
            }
            
            #speedcontrolform input:hover{
                width: 170px;
                height: 170px;
            }
            #boreout{
                background-image: url(boreout.svg);
                background-image: url(boreout.png);

            }
            
            #tooslow{
                background-image: url(tooslow.svg);
                background-image: url(tooslow.png);
            }
            
            #perfect{
                background-image: url(perfect.svg);
                background-image: url(perfect.png);
            }
            
            #toofast{
                background-image: url(toofast.svg);
                background-image: url(toofast.png);
            }
            
            #burnout{
                background-image: url(burnout.svg);
                background-image: url(burnout.png);
            }
            
            #questionalertform{
                margin: 0 auto;
                width: 70%;
            }
            #questionalert{
                background-image: url(questionalert.svg);
                background-image: url(questionalert.png);
                background-repeat: no-repeat;
                background-size: cover;
                display: block;
                width: 100px;
                height: 100px;
                margin-left: 30px;
                border: none;
                cursor: pointer;
            }
            #logo {
              display: block;
              margin: auto auto;
              width: 25%;
              max-width: 250px;
              min-width: 150px;
            }
            
            h2{
                font-size: 2em;
            }

            .clearfix:after{
                content: ".";
                display: block;
                clear: both;
                height: 0px;
                visibility: hidden;

            }
            @media all and (max-width: 750px){
                #speedcontrolform{
                    width: 55%;
                    max-width: 300px;
                    height: auto;
                }
                #speedcontrolform input{
                    background-size: 100%;
                    background-image: -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, #31a805), color-stop(100%, #087f01));
                    background-image: -moz-linear-gradient(top, #31a805, #087f01);
                    background-image: -webkit-linear-gradient(top, #31a805, #087f01);
                    background-image: linear-gradient(to bottom right, #31a805, #087f01);
                    margin-bottom: 15px;
                    font-size: 1.5em;
                    position: absolute;
                    width: 100%;
                    height: 30px;
                    border-color: black;
                    border-width: 2px;
                    border-style: solid;
                    padding-left: 2px;
                    float: none;
                    display: block;
                    position: static;
                    width: 100%;
                    height: 40px;
                    cursor: pointer;
                    margin-top: 0px; 
                    color: black;
                }
                
                #speedcontrolform input:hover{
                    width: 100%;
                    height: 40px;
                } 
                
                #boreout{
                    background-image: none;

                }

                #tooslow{
                    background-image: none;
                }

                #perfect{
                    background-image: none;
                }

                #toofast{
                    background-image: none;
                }

                #burnout{
                    background-image: none;
                }
                #questionalertform{
                    width: auto;
                }
                #questionalertform h2{
                    margin: 0px;
                }
                #questionalert{
                    width: 70px;
                    height: 70px;
                }
            }
            
        </style>
    </head>
    <body>
        <div id="header" class="clearfix">
            <div id="header-left">Statistics</div>
            <div id="title">Dashboard</div>
            <div id="header-middle">Navigation</div>
            <div id="header-right">Stop event</div>
        </div>
        
        <form id="speedcontrolform" class="clearfix">
            <input type="button" id="boreout" name="boreout" value="Bore out"/>
            <input type="button" id="tooslow" name="tooslow" value="Too slow"/>
            <input type="button" id="perfect" name="perfect" value="Perfect"/>
            <input type="button" id="toofast" name="toofast" value="Too fast"/>
            <input type="button" id="burnout" name="burnout" value="Burn out"/>
        </form>
        
        <form id="questionalertform" method="post" action="phpOperations/questionAlertInput.php">
            <h2>Question alert</h2>
            <input type="button" id="questionalert" name="questionalert"/>
        </form>
        
        <img id="logo" src="logo.svg" onError="this.src='logo.png';" alt="logo"/>
		
		<script>
            d3.select("#questionalert").on("click", function(){
                $.post( "phpOperations/questionAlertInput.php");
            });
		</script>
    </body>
</html>
