const header = document.querySelector("header");
const submenu = document.querySelectorAll(".submenu");
const button_left = document.getElementById("buttonleft");
const button_right = document.getElementById("buttonright");
const wrapper = document.getElementById("wrapper");
const slides = document.querySelectorAll(".slide");

const buttons = document.querySelectorAll(".btn");

window.addEventListener("scroll", function(){
    if(window.scrollY > header.offsetTop){
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.height = "40px";
        header.style.borderBottom = "1px solid #9E9E9E";
        for(menu of submenu){
            menu.style.top = "80%";
        };
    }
    else{
        header.style.height = "66px";
        header.style.top = "7px";
        header.style.borderBottom = "none";
        for(menu of submenu){
            menu.style.top = "100%";
        };
    }
});


caroussel_infini(3)

function caroussel_infini(initSlide, slideToScroll = 1){
    /* Besoin d'un container de vw avec overflow hidden, et dedans un wrapper contenant les élements à faire défiler. C'est le wrapper qu'on fait bouger pour faire défiler les élements. 
    Il faut que initSlide et slideToScroll soient divisible entre eux, sinon ça rend mal
    */
   
    for(let elem of slides){
        wrapper.appendChild((elem.cloneNode(true)))
        wrapper.insertBefore(elem.cloneNode(true), slides[0])
    }

    const slidesVisible = initSlide
    const wrapper_width = (100 / slidesVisible) * slides.length*3 /* for 100vw */
    wrapper.style.width = wrapper_width + "vw"
    let index = slides.length
    let transitionVal = "all 400ms"
    let scaleBtnVal = "scale(1.5)"
    buttons[0].style.transform = scaleBtnVal

    function toSlide(i = index){
        return (100 / (slides.length*3)) * i
    }

    wrapper.style.transform = "translateX(-" + toSlide() + "%)"
    
    button_left.addEventListener("click", function(){
        index = index - slideToScroll
        if(index > 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else if(index < 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(" + toSlide(index * -1) + "%)"
        }
        else{
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(" + toSlide() + "%)"
        }

        (function infiniteEffectLeft(){
            wrapper.addEventListener("transitionend", function(){
                if(index <= slides.length - slidesVisible){
                    index += slides.length
                    wrapper.style.transitionDuration = "0s"
                    wrapper.style.transform = "translateX(-" + toSlide() + "%)"
                }
            })
        })()

        console.log(index + "   gauche")

        // Pour faire grossir les btns en fonctions du caroussel
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        if(index < slides.length){
            buttons[index].style.transform = scaleBtnVal
        }
        else{
            buttons[index - slides.length].style.transform = scaleBtnVal
        }
    })
    
    button_right.addEventListener("click", function(){
        index = index + slideToScroll
        if(index > 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else if(index < 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(" + toSlide(index * -1) + "%)"
        }
        else{
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }

        (function infiniteEffectRight(){
            wrapper.addEventListener("transitionend", function(){
                if(index >= slides.length * 2){
                    index -= slides.length
                    wrapper.style.transitionDuration = "0s"
                    wrapper.style.transform = "translateX(-" + toSlide() + "%)"
                }
            })
        })()

        console.log(index + "   droite")

        // Pour faire grossir les btns en fonctions du caroussel
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        if(index >= slides.length*2){
            buttons[index - slides.length*2].style.transform = scaleBtnVal
        }
        else{
            buttons[index - slides.length].style.transform = scaleBtnVal
        }
    })
    
    buttons_len = buttons.length
    for(let i = 0; i < buttons_len; i++){
        ((i) => {
            buttons[i].addEventListener("click", function(){
                console.log(i)
                index = slides.length + i
                wrapper.style.transition = transitionVal
                for(btn of buttons){
                    btn.style.transform = "scale(1)"
                }
                buttons[i].style.transform = scaleBtnVal
                wrapper.style.transform = "translateX(-" + toSlide(slides.length + i) + "%)"
            })
        })(i)
    }

    (function autoSliding(){
        setInterval(function(){
            wrapper.style.transition = transitionVal
            index++
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
            console.log(index)
            for(btn of buttons){
                btn.style.transform = "scale(1)"
            }
            if(index >= slides.length*2){
                buttons[index - slides.length*2].style.transform = scaleBtnVal
            }
            else{
                buttons[index - slides.length].style.transform = scaleBtnVal
            }
            (function infiniteEffectRight(){
                wrapper.addEventListener("transitionend", function(){
                    if(index >= slides.length * 2){
                        index -= slides.length
                        wrapper.style.transitionDuration = "0s"
                        wrapper.style.transform = "translateX(-" + toSlide() + "%)"
                    }
                })
            })()
        }, 3000)
    })()

}