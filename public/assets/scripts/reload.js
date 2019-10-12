function upload() {
  let form_data = new FormData();
  let uploaded_img = document.getElementById('file').files[0];
  let our_colors_data;
  form_data.set('image', uploaded_img);
  let req = new Request('/colors', {
    method: 'POST',
    enctype: "multipart/form-data",
    body: form_data,
  });
   fetch(req)
       .then((response)=>{
         console.log('OKAY!');
         response.json().then((data)=> {
           our_colors_data = data;
           console.log(1);
         });
       })
       .catch((err)=>{
         console.log('Error' + err.message);
       });
      
  // don't cache ajax or content won't be fresh
  $.ajaxSetup({
    cache: false
  });
  // load() functions
  $('body').load("2.html");

  console.log(2);
    // end
    

    setTimeout(() => {
      console.log(3);
      // var reader = new FileReader();
      var img = new Image();
      img.src = URL.createObjectURL(uploaded_img);
      document.getElementsByClassName('covered_image')[0].setAttribute('src', img.src);
      getPixes();
      blowing_bulb();
    }, 2000);
   
};



function parse_data(data) {

  data.forEach(element => {
    console.log(element.red);
  });
}