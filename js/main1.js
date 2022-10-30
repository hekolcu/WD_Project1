/*
 * Rory Nee - A00190040

 * 
 * 
 */

var rootURL = "http://localhost:4006/racecard/api/runners";


var findAll = function () {
   alert("findall");
    $.ajax({
       type:"GET",
       url: rootURL,
       dataType:"json",
       cashe: false,
       success: renderList
    });
    return false;
};

function findByID(id) {
    
    $.ajax({
       type:"GET",
       url: rootURL+'/'+id,
       dataType:"json",
       cashe: false,
       success: function(data){
          
          $('#details table').remove();
          $('#details #moredetails').remove();
          $('#details #more').remove();
          $('#details').append($('#name').append(data.name));
       $('#details').append('<table><tr><th>Entry</th><th>Colors</th><th>Trainer</th><th>Jockey</th><th>Betting</th>'+
              '</tr><tr><td>'+data.id+'</td><td><img  src="images/'+data.picture+'"</td><td>'+data.trainer+'</td>'+
              '<td>'+data.jockey+'</td><td>'+data.betting+'</td></tr></table>'+
              '<a id="moredetails" href="">More about '+data.name+'</a>');
        $(document).on("click", "#moredetails", function(){ return moredetails(data);});
       }
    });
    return false;
};
function moredetails(data){
    $('#details #more').remove();
    $('#details').append('<table id="more" ><tr><th>Age</th><th>Owner</th><th>Breeder</th><th>Sire</th><th>Dam</th>'+
              '</tr><tr><td>'+data.age+'</td><td>'+data.owner+'</td><td>'+data.breader+'</td>'+
              '<td>'+data.sire+'</td><td>'+data.dam+'</td></tr></table>');

    return false;
};

function findByName(key) {
    
    $.ajax({
       type:"GET",
       url: rootURL+'/search/'+key,
       dataType:"json",
       cashe: false,
       success: function(data, textStatus, jqXHR){

          $('#details table').remove();
          $('#details #moredetails').remove();
          $('#details #more').remove();
          
          $('#details #name').remove();
          
          $('#details #name').append(data.name); 
          // could not remove the text after you pic a second horse
          
        $('#details').append('<table><tr><th>Entry</th><th>Colors</th><th>Trainer</th><th>Jockey</th><th>Betting</th>'+
               '</tr><tr><td>'+data.id+'</td><td><img  src="images/'+data.picture+'"</td><td>'+data.trainer+'</td>'+
               '<td>'+data.jockey+'</td><td>'+data.betting+'</td></tr></table>'+
               '<a id="moredetails" href="">More about '+data.name+'</a>');
         $(document).on("click", "#moredetails", function(){ return moredetails(data);});
   
        },
       error: function(jqXHR, textStatus, errorThrown){
   
            alert('Entry Not Found');
             // could not Get the error checking working
       }
    });
    return false;
};

var renderList = function(data){
	alert("render list");
    $('#raceCard li').remove();
    $.each(data.runners, function(index, card){
						  alert("here");
        $('#raceCard').append('<li><a href="#" id="'+card.id+'">'+card.name+'</a></li>');
    });

    $(document).on("click", "#raceCard a", function(){ return findByID(this.id);});
};

$(document).ready(function(){
   
   findAll();
   
   $('#searchKey').val("");
   
   $(document).on("click", "#btnSearch", function(){
       return findByName($('#searchKey').val());
   });
   
   
});