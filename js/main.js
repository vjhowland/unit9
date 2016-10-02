//initialize firebase db
var config = {
    apiKey: "AIzaSyC-rGdglfxwHN5jJAzLAv_phnMP_Bt85G4",
    authDomain: "reservation-site-5cdde.firebaseapp.com",
    databaseURL: "https://reservation-site-5cdde.firebaseio.com",
    storageBucket: "reservation-site-5cdde.appspot.com",
    messagingSenderId: "633204740030"
  };

  firebase.initializeApp(config);

//connect to firebase
var database = firebase.database();


//new object to capture reservations
var reservationData = {};

//add name & day property to reservationData
$('.reservation-day li').on('click', function() {
	reservationData.day = $(this).text();
});
$('.reservation-form').on('submit', function(e) {
	e.preventDefault();
	reservationData.name = $('.reservation-name').val();
  	var reservationsReference = database.ref('reservations');
  	reservationsReference.push(reservationData);
});

//provide confirm to end user
function getReservations() {
  database.ref('reservations').on('value', function(results) {
  	console.log(results);
  	var allReservations = results.val();
  	    
  //create an object for reservations
  	for(var reservation in allReservations) {
  		var context = {
    		name: allReservations[reservation].name,
    		day: allReservations[reservation].day,
    		reservationId: reservation
  		};
  	var source = $('#reservation-template').html();
    var template = Handlebars.compile(source);
    var reservationTableData = template(context);
    $('.reservation-list').append(reservationTableData);
  	} 
  });
}
getReservations();

//create google map
function initMap() {
	var styles = [
		{
			stylers: [
				{hue: '#00ffe6'},
				{saturation: 10}
			]
		}, {
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
				{lightness: 100},
				{visibility: 'simplified'}
			]
		}, {
			featureType: 'road',
			elementType: 'labels',
			stylers: [
				{visibility: 'simplified'}
			]
		}
	];
	var map = new google.maps.Map(document.getElementById('map'), {	
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 15,
		scrollWheel: false,
		styles: styles
	});
	var marker = new google.maps.Marker({
		position: {lat: 40.8054491, lng: -73.9654415},
		map: map,
		title: 'Monks Cafe'
	});
}	
initMap();

//connect to Yelp & get diner's hours, status, reviews
//var access_token = "nBihjWaeCvgc_5VfYJz-YxdZNwWRgCzjNOINk7Y5mrJok2S0y71fn5Ff_bxATcF9Za9sy8DRSiRxRX1sle_zbfPkIrlYs3gHb6IH9Hg9Xx1HWUUKhhSBXXojzFDwV3Yx";

//$.ajax({
	//type: 'GET',
	//url: "https://api.yelp.com/v3/businesses/toms-restaurant-new-york",
	//headers: {
    //    "Authorization": "Bearer " + access_token
    //  },
	//success: function (data) {
  	//	$("#yelp")
  	//		.append("Rating: " + data.rating)
  	//		.append("Hours: " + data.hours);
  	//}
//});

