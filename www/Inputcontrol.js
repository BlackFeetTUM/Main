/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function inputcontrolinit(){
    d3.selectAll("input").on("keydown", function(){
        this.userinput = true;
    });
    d3.selectAll("input").on("blur", function(){
        if(this.userinput === true){
        }else{
            this.value = this.valuemem;
        }
    });
    d3.selectAll("input").on("click", function(){
        if(this.userinput === true){                   
        }else{
            this.valuemem = this.value;
            this.value = null;
        };
    });
}