import { Component, OnInit } from '@angular/core';
import { Http, Response,HttpModule } from '@angular/http';
import 'rxjs';
import 'rxjs/add/operator/map'
// import { Ng}


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
  addressFix:any[] = [];
  message = 'Welcome!'
  statuses:any[] = [];
//vars for google maps
	positions:string[] = []
  problem:string[] = []




  constructor(private http: Http){}

  ngOnInit(){
  	this.get911Info()
  	var that = this

  	// var that = this;
  	// setInterval(
  	// 	function(){
  	// 		that.positions = []
  	// 		that.get911Info();
  	// 	},10000)
  }

  get911Info(){
  	  	this.http.get('/test').subscribe(
  		(data:any):any => {
        // console.log('Data returned from server');
  			 const htmlBody = data._body;
        // console.log(htmlBody);
  			var arr = htmlBody.split(/<table/g)
        // console.log('arr[4] is', arr[4])
  			var arrayHolder = arr[4];
        // console.log(arrayHolder);

  			this.individualRecord = arrayHolder.split(/">/)
  			

 //make sure to replace number with below length so as to use all recordes
// this.individualRecord.length;
  			for( var x =0; x< this.individualRecord.length; x ++){
          // console.log(x);
  				if(x%6 ==0){
  					const ind = this.individualRecord[x];
  					const indexOfGreaterThan = ind;
   					this.addresses.push(indexOfGreaterThan);           
            const responder =this.individualRecord[x+5]
            const status = this.individualRecord[x+1];
            const alive = this.individualRecord[x+2]
            // console.log('status String is', status.substring(5,10))
            const statusSubstring = status.substring(0, 22).split(/</g);

            console.log('Alive is ', alive);
            this.statuses.push(statusSubstring);


            // const indexOf = this.responder.indexOf('<');
            // console.log('Index of < is', indexOf)
            this.problem.push(responder);

  				}
  			}
  			//remove first entry in array as it is blank
  			this.addresses.splice(0,1);
        // console.log('this.addresses is:', this.addresses);
  			for( var x = 0; x< this.addresses.length; x++){
  				//split off < to clean up back of address.
  				// console.log(this.addresses[x].split(/</g));

  				this.addresses[x] = (this.addresses[x].split(/</g)[0]);
          // console.log('results, different positions', this.addresses[x].split(/</g)[3])

          

     

//get lat long from address
			this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.addresses[x]+', Seattle, WA').subscribe(
//push lat long positions into positions array for array of markers
							(data) =>{
                  if(data.json().results[0].geometry != undefined){

                     this.positions.push(data.json().results[0].geometry.location);

                  }
              }
						)
  			}

  		}
  	)
  }

//handle link for more info
  onclickAddress(i){
    console.log(i, 'clicked');
    const cut = this.problem[i];
    const cutIndex = cut.indexOf('<');
    this.message = 'Responders: ' + cut.substring(0,cutIndex) +  '\nEvent: ' + this.statuses[i][0] ;
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
