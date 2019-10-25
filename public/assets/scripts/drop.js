// ************************ Drag and drop ***************** //
document.addEventListener('DOMContentLoaded', ()=> {
  let dropArea = document.getElementById("drop-area");

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  });

  // Highlight drop area when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  });

  // Handle dropped file
  dropArea.addEventListener('drop', handleDrop, false);
});

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  let dropArea = document.getElementById("drop-area");
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  let dropArea = document.getElementById("drop-area");
  dropArea.classList.remove('highlight');
}

function handleDrop(e) {
  if (e.dataTransfer.files[0].type !== "image/jpeg") {
    alert('Please, provide a JPEG or JPG image!');
  }
  else{
    document.getElementById('fileElem').files = e.dataTransfer.files;
    document.getElementById('fileElem').onchange();
  }
}


function upload() {
  let form_data = new FormData();
  let uploaded_img = document.getElementById('fileElem').files[0];
  form_data.set('image', uploaded_img);
  let req = new Request('/colors', {
    method: 'POST',
    enctype: "multipart/form-data",
    body: form_data,
  });
  // don't cache ajax or content won't be fresh
  $.ajaxSetup({
    cache: false
  });
  // load() functions
  $('body').load("2.html", (data) => {
    const img = new Image();
    img.src = URL.createObjectURL(uploaded_img);
    document.getElementsByClassName('covered_image')[0].setAttribute('src', img.src);
    getPixes();
    setColorInBlock();
    blowing_bulb();
  
    fetch(req)
      .then((response) => {
        console.log('OKAY!');
        response.json().then((data) => {
          fill_data(data);
          console.log(1);
        });
      })
      .catch((err) => {
        console.log('Error' + err.message);
      });
  });
};



function parse_data(element) {
  let oneClr = "rgb(" + element.red + ", " + element.green + "," + element.blue + ")";
  return oneClr;
}


function fill_data(data) {
  let Father = document.getElementById('colors');
  data.forEach(element => {
    const Child = document.createElement('div');
    Child.className = 'color';
    const ChildText = document.createElement('div');
    ChildText.className = 'color_text';
    Child.appendChild(ChildText);
    Child.style.backgroundColor = parse_data(element);
    Father.appendChild(Child);
  });
}