<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>User-account</title>
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
        <link href="dashboard_header.css" rel="stylesheet" type="text/css"/>
    </head>
    <body class="body" onload="inputcontrolinit()">
        <div id="header" class="clearfix">
            <div id="header-left">Collections</div>
            <div id="title">User-Account</div>
            <div id="header-middle">Navigation</div>
            <div id="header-right">Log out</div>
        </div>
        <div class="content">
            <form method="post" action="phpOperations/createLecture.php">
                <div class="label-container">
                    <label><span>Create event</span></label>
                </div>
                <div class="input-container">
                    <input type="text" name="name" id="name" value="Name"/>
                </div>
                <div class="input-container">
                    <input type="text" name="collection" id="collection" value="Collection"/>
                </div>              
                <input class="submit" type="submit" value=""/>
            </form>
        </div>
        <img id="logo" src="logo.svg" onError="this.src='logo.png';" alt="logo"/>
        
        <script>
        </script>
    </body>
</html>
