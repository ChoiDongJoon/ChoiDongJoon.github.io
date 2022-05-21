const images = ["0.jpg","1.jpg","2.jpg","3.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.className = "background"

bgImage.src = `img/${chosenImage}`; //src = "  " 만들기

document.body.appendChild(bgImage); //html에 bgImage 생성 
