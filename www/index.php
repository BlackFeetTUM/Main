<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Mainpage</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="Inputcontrol.js"></script>
        <link href="interact/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    </head>
    <body class="body" onload="inputcontrolinit()">
        <div id="header"></div>
        <a href="registration.php"><img id="link-icon" src="arrow.svg" onError="this.src='arrow.png';" />Registration</a>
        <div class="content">
            <form method="post" action="phpOperations/login.php">
                <div class="label-container">
                <label>Login</label>
                </div>
                <div class="input-container">
                <input type="text" name="username" id="username" value="Username"/>
                </div>
                <div class="input-container">
                <input type="text" name="login_password" id="login_password" value="Password"/>
                </div>
                <input class="submit" type="submit" value=""/>

            </form>
            <form method="post" action="phpOperations/joinEvent.php">
                <div class="label-container">
                <label>Join Event</label>
                </div>
                <div class="input-container">
                <input type="text" name="event_password" id="event_password" value="Password"/>
                </div>
                <input class ="submit" type="submit" value=""/>
            </form>
        </div>
        <img id="logo" src="logo.svg" onError="this.src='logo.png';" alt="logo"/>
    </body>
</html>
