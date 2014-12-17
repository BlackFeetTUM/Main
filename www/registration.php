<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Registration</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="../js/libs/d3/d3.v3.js" charset="utf-8"></script>
        <script src="Container.js"></script>
        <script src="Inputcontrol.js"></script>
        <script type="text/javascript" src="../js/libs/jquery/jquery.js"></script>
        <script type="text/javascript" src="../js/libs/jquery-ui-1.11.2/jquery-ui.min.js"></script>
        <link href="interact/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    </head>
    <body class="body" onload="inputcontrolinit()">
        <div id="header"></div>
        <a><img id="link-icon" src="arrow.svg" onError="this.src='arrow.png';"/>Registration</a>
        <div class="content">
            <form method="post" action="phpOperations/registration.php">
                <div class="label-container">
                <label>Registration</label>
                </div>
                <div class="input-container">
                    <input type="text" name="username" id="username" value="Username"/>
                </div>
                <div class="input-container">
                    <input type="text" name="institution" id="institution" value="Institution"/>
                </div>
                <div class="input-container">
                    <input type="text" name="email" id="email" value="Email address"/>
                </div>    
                <div class="input-container">
                    <input type="text" name="prename" id="prename" value="Vorname"/>
                </div>  
                <div class="input-container">
                    <input type="text" name="surname" id="surname" value="Nachname"/>
                </div>              
                <div class="input-container">
                    <input type="text" name="password" id="password" value="Password"/>
                </div>
                <div class="input-container">
                    <input type="text" name="password-confirm" id="password-confirm" value="Confirm password"/>
                </div>               
                <input class="submit" type="submit" value=""/>
            </form>
        </div>
        <img id="logo" src="logo.svg" onError="this.src='logo.png';" alt="logo"/>
        <script>
        </script>
    </body>
</html>