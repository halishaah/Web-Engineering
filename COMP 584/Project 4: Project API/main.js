
let enter_btn = document.querySelector(".btn");
let card = document.querySelector(".card");


enter_btn.addEventListener("click", getFacts);
enter_btn.addEventListener("click", getMotion);

function getFacts() {
  let input = document.querySelector(".input").value;
  let card_title = document.querySelector(".card-title");
  let card_text = document.querySelector(".card-text");
  
  fetch('http://numbersapi.com/' +input)
  .then((response)=>response.text())
  .then((data)=>{
    card_title.innerHTML = input;
    card_text.innerHTML = data;
  });
}

const container = popmotion.styler(document.querySelector('.wrapper'));
        
        enter_btn.addEventListener("click", getFacts);
        function getMotion() {
        popmotion.tween({
            from: {
                scale: .7,
                opacity: 0,
                y:0
            },
            to: {
                scale:1,
                opacity:1,
                y:200
            },
            duration:1000
        }).start(container.set)
    }


