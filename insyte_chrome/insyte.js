


function getAllURLS() {
	console.log("Getting all URLs..");
	
	var urls = {};
	var scripts = document.getElementsByTagName("script");
	var links = document.links;
	var img_src = document.getElementsByTagName("img");

	for (var i = 0; i < scripts.length; i++)
	 	if (scripts[i].src) urls[i] = scripts[i].src;
/*
    for (var i = 0; i < links.length; i++)
   		if (links[i].href) urls.push(links[i].href);

   	for (var i = 0; i < img_src.length; i++)
   		if (img_src[i].src) urls.push(img_src[i].src);
*/
	checkURLS(urls);
	   
}

function checkURLS(urls) {
	console.log("Checking.. " );

	var myJson = JSON.stringify(urls);

	var xmlhttp = new XMLHttpRequest();
  	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText != null)
      	blockURLS(urls, this.responseText);
    }
  };

  console.log(myJson);

  xmlhttp.open("POST", "//ec2-54-215-220-149.us-west-1.compute.amazonaws.com:8080/predict");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(urls);
}

function blockURLS(urls, vec) {
	console.log("Blocking..");
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < urls.length; i++) {
    for (var j = 0; j < scripts.length; j++) {
      if (urls[i] == scripts[j].src && vec[i] == 1)
        scripts[j].src = "";
    }
  }
}


window.addEventListener("load", function(){
    
    console.log("On Load..");
    getAllURLS();
});



