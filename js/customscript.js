// MEMBER SECTION ON ABOUT US PAGE
var bsideMembers = [{
  fname: 'Adriana',
  lname: 'Hernandez',
  image: '/img/profileImg/Adriana%-%Soprano.JPG',
  voicepart: 'Soprano'
}, {
  fname: 'Emerald',
  lname: 'Kaitryn',
  image: '',
  voicepart: 'Soprano'
}, {  
  fname: 'Sierra',
  lname: 'Bertolone-Smith',
  image: '',
  voicepart: 'Soprano'
}, {
  fname: 'Amy',
  lname: 'Waters',
  image: '',
  voicepart: 'Soprano' 
}, {
  fname: 'Alison',
  lname: 'Noe',
  image: '',
  voicepart: 'Soprano' 
}, {
  fname: 'Kushi',
  lname: 'Beauchamp',
  image: '',
  voicepart: 'Alto' 
}, {
  fname: 'Siani',
  lname: 'Grace',
  image: '',
  voicepart: 'Alto' 
}, {
  fname: 'Charlie',
  lname: 'Best',
  image: '',
  voicepart: 'Tenor & Alto' 
}, {
  fname: 'Louis',
  lname: 'Umbarger',
  image: '',
  voicepart: 'Tenor' 
}, {
  fname: 'Kimo',
  lname: 'Camat',
  image: '',
  voicepart: 'Tenor' 
}, {
  fname: 'Mason',
  lname: 'Wordell',
  image: '',
  voicepart: 'Bass & Tenor' 
}, {
  fname: 'Robert',
  lname: 'Pirtle',
  image: '',
  voicepart: 'Bass & Tenor' 
}, {
  fname: 'Ted',
  lname: 'Jack',
  image: '',
  voicepart: 'Bass' 
}, {
  fname: 'Andy',
  lname: 'Erickson',
  image: '',
  voicepart: 'Bass' 
}, {
  fname: 'Sam',
  lname: 'Wellander',
  image: '',
  voicepart: 'Bass' 
}]

var bsidevue = new Vue({
  el: '#bsidevue',
  data: {
    members: bsideMembers
  }
});


// IMAGE GALLERY PAGE
var url = '../images.json';
var req = new XMLHttpRequest();
req.onreadystatechange = function() {
  //do stuff here
  var images = JSON.parse(req.responseText);
  var imageGallery = new Vue({
  el: '#bsideImageGallery',
  data: {
    imageGallery: images
  }
});
  
}
req.open('GET', url);
req.send();


// FORM SUBMITTION
// $.ajax({
//     url: "https://formspree.io/you@email.com", 
//     method: "POST",
//     data: {message: "hello!"},
//     dataType: "json"
// });
