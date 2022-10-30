// The root URL for the RESTful services
//mg
var rootURL = "http://localhost/racecard/api/runners";
var list;

// Retrieve list of race entries


var findAll= function () {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", 
		success: renderList
	});
};

var renderList = function (data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	//list = data == null ? [] : (data instanceof Array ? data : [data]);
//	$('#raceCard li').remove();
	data=data.runners;
	//alert("hello");
	$.each(data, function(index, entry) {
		$('#raceCard').append('<li><a href="#" id="' + entry.id + '">'+entry.name+'</a></li>');
	});
};

var findById = function(id){
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			console.log('findById success: ' + data.name);
			currentEntry = data;
			renderDetails(currentEntry);
		}
		});
	};
	
	var findByIdMore = function(id){
		console.log('findById: ' + id);
		$.ajax({
			type: 'GET',
			url: rootURL + '/' + id,
			dataType: "json",
			success: function(data){
				console.log('findByIdMore success: ' + data.name);
				currentEntry = data;
				renderDetailsMore(currentEntry);
			}
			});
		};
	
	var findByName = function(name){
		console.log('findByName: ' + name);
		$.ajax({
			type: 'GET',
		    url: rootURL + '/search/' + name,
			dataType: "json",
			success: function(data){
				console.log('findByName success: ' + data.name);
				currentEntry = data;
				if (currentEntry==false){
					alert("Entry not found");
				}
				else{
					renderDetails(currentEntry);
				}
			}
			});
		};

function renderDetails(entry) {
	$('#name').text(entry.name);
	$('#details tr').remove();
	$('#details a').remove();
	picture="images/"+entry.picture;
	output='<table><thead>'+
	'<tr><th>Entry</th><th>Colors</th><th>Trainer</th><th>Jockey</th><th>Betting</th></tr></thead>';
	output+='<tbody><tr><td>'+entry.id+'</td><td><img src='+picture+'></td><td>'+entry.trainer+'</td><td>'+
	entry.jockey+'</td><td>'+entry.betting+'</td></tr></tbody></table>';
	$('#details').append(output);
	output='<a href="#" id="' + entry.id + '">More about ' +entry.name+'</a>';
	//alert(entry.name);
	$('#details').append(output);
}
function renderDetailsMore(entry) {
	
	output='<table><thead>'+
	'<tr><th>Age</th><th>Owner</th><th>Breeder</th><th>Sire</th><th>Dam</th></tr></thead>';
	output+='<tbody><tr><td>'+entry.age+'</td><td>'+entry.owner+'</td><td>'+entry.breeder+'</td><td>'+
	entry.sire+'</td><td>'+entry.dam+'</td></tr></tbody></table>';
	$('#details').append(output);
}

//When the DOM is ready.
$(document).ready(function(){
	$(document).on("click", "#raceCard a", function(){findById(this.id);});
	$(document).on("click", "#details a", function(){findByIdMore(this.id);});
	$(document).on("click", "#btnSearch", function(){findByName($('#searchKey').val());});
	$('#searchKey').val("");
	findAll();
});

