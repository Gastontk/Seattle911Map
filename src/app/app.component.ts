import { Component, OnInit } from '@angular/core';
import { Http, Response,HttpModule } from '@angular/http';
import 'rxjs';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	htmlBody: any;
	htmlSplit:any[]
	individualRecord:string
	addresses:any[] =[]
	ind:string;
	indexOfGreaterThan:string;
	finalString:string
//vars for google maps
	positions:string[] = []


  constructor(private http: Http){}

  ngOnInit(){
  	this.get911Info()
  	var that = this
  	setTimeout(
  		function(){
  			that.get911Info()
  		},300000)
  	// var that = this;
  	// setInterval(
  	// 	function(){
  	// 		that.positions = []
  	// 		that.get911Info();
  	// 	},10000)
  }

  get911Info(){
  	  	this.http.get('http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?action=Today&incDate=&rad1=des').subscribe(
  		(data:any):any => {
  			// console.log('Data from server:', data._body); 
  			this.htmlBody = data._body;
  			var arr = this.htmlBody.toString().split(/<table/g)

  			this.htmlBody = arr[4];

  			this.individualRecord = this.htmlBody.split(/valign="top">/g)
  			


 //make sure to replace number with below length so as to use all recordes
// this.individualRecord.length;
  			for( var x =0; x< this.individualRecord.length; x ++){
  				if(x%6 ==0){
  					this.ind = this.individualRecord[x-1];
  					this.indexOfGreaterThan = this.ind;
   					this.addresses.push(this.indexOfGreaterThan);

  				}
  			}
  			//remove first entry in array as it is blank
  			this.addresses.splice(0,1);
  			for( var x = 0; x< this.addresses.length; x++){
  				//split off < to clean up back of address.
  				// console.log(this.addresses[x].split(/</g));

  				this.addresses[x] = (this.addresses[x].split(/</g)[0])

//get lat long from address

			this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.addresses[x]+', Seattle, WA').subscribe(
							data =>
								// console.log(data.json().results[0].geometry.location);
//push lat long positions into positions array for array of markers
								this.positions.push(data.json().results[0].geometry.location)
							,
							e => console.log('Their Was AN ERROR'),
							()=> console.log('Subscription Finished')
						 	
						)





  				// this.positions.push(this.addresses[x] +', Seattle, Wa, USA');
  			}
  			// console.log('Number of positions found:', this.positions.length)

  		}
  	)
  }

//google maps stuff and converting address into lat long

	onSubmitToGoogle(){

		this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=9014 25th ave nw, seattle, wa').subscribe(
				(data) =>{
					console.log(data.json().results[0].geometry.location);
				}
			)
		// const	myMapInfo = this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAKWE1JinLb5yLSoxHiEjiq1CMuOqbx_s4')
		// console.log('myMapInfo is:', myMapInfo);
	}

// methods for ng2-ui/map for Google Maps
 onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 
  }
  onIdle(event) {
    console.log('map', event.target);
  }
  onMarkerInit(marker) {
    // console.log('marker', marker);
  }
  onMapClick(event) {
  	console.log(event.latLng)
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);
  }



	
//Original google maps key
// AIzaSyCnuf3q7lupq_LcSqmcGR0NRM6aqSvZus8

// second js key
// AIzaSyAKWE1JinLb5yLSoxHiEjiq1CMuOqbx_s4









}
