// API used: http://reqres.in/api/users

var $ = {}; 

$.ajax = function(args){
	
	// @function - to be called after success and/or failure (optional)
	this.complete = function(){
		if(args.complete){
			return args.complete;
		}
	}

	// @object - data to be sent with the request. Appended to URL in GET
	//  passed as a string in POST. (optional)
	this.data = function(){
		if(args.data){
			return args.data;
		} else {
			return {};
		}
	}

	// @function - callback to run if there is an error (optional)
	this.error = function(){
		if(args.error){
			return args.error;
		}
	}

	// @object - additional headers to send along with the request (optional)
	this.headers = function(){
		if(args.headers){
			return args.headers;
		} else {
			return {};
		}
	}

	// @string - GET or POST (default: GET)
	this.method = function(){
		if(args.method){
			return args.method;
		} else {
			return 'GET';
		}
	}

	// @function - callback to run upon success (optional)
	this.success = function(){
		if(args.success){
			return args.success;
		}
	}

	// @string - url to send request to (required)
	this.url = args.url;

	// @boolean - should this be synchronous or asynchronous (default: true)
	this.async = function(){
		if(args.async){
			return args.async;
		} else {
			return true;
		}
	}

	// Now let's actually run our XML HTTP Request
	var xhr = new XMLHttpRequest();

	// We're going to log the response text from the 
	//  xhr request via this listener.
	xhr.addEventListener( "load", function(){
		console.log(this);
	});

	// Open the request with the method, url, and async boolean
	xhr.open(this.method(), this.url, this.async());
	
	// This is the code to set any additional headers with our 
	//  HTTP request if given.
	for(var i in this.headers()){
		if(this.headers().hasOwnProperty(i)){
			xhr.setRequestHeader(i, this.headers()[i]);
		}
	}

	// And finally send the data along as part of our send.
	xhr.send(this.data());

	// QUESTION: I feel like I shouldn't have to use args.___ here
	//  is there a better way to go about this? 
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4){
			if(xhr.status == 200 || xhr.status == 201){
				// success
				args.success();
			} else {
				// failure
				args.error();
			}
			args.complete();
		}
	};
}


// And now I'll finally run the request with some 
//  information below. 
$.ajax({
	url: 'http://reqres.in/api/users', 
	method: 'GET', 
	data: {'id': 2}, 
	success: function(){
		alert("SUCCESS!");
	}, 
	error: function(){
		alert("Nope, nope...");
	}, 
	complete: function(){
		alert("But, we're gonna run this");
	}
});