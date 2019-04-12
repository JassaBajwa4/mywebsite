
var count=0;
function change(){

    document.getElementById("image").src = "images/IMG_9959.jpg";
}
function back(){
    document.getElementById("image").src = "images/me.JPG";
}

function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
}

function signIn(){
    alert("Signing In");
    var email= document.getElementById("exampleInputEmail2").value;
    var password = document.getElementById("exampleInputPassword2").value;

    firebase.auth().signInWithEmailAndPassword(email,
        password).catch(function(error) {
        alert("Error signing in");
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
    });
}


var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var holder = document.getElementById("holder");
var storage = firebase.storage();
function getImageForPath(p){
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(p);
    storageRef.child(p).getDownloadURL().then(function(url) {
        var fullurl = url;
        alert(fullurl);
        holder.src = fullurl;
    }).catch(function(error) {

    });
}
getImageForPath('myimages/');

fileButton.addEventListener('change', function(e){
    alert("uploading file...");
    var file = e.target.files[0];
    var firebase;
    var storageRef = firebase.storage().ref('myimages/'+file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage =
                (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },
        function error(err){
            console.log(err);
        },
        function complete(){
            alert("upload complete");
            getImageForPath('images/'+file.name);
        }
    );
});





