const span = document.querySelector("span");
const botons = document.querySelectorAll(".buttons");

//Contador
let count = 0;

botons.forEach(function(boton){
    boton.addEventListener("click",function(event){
        const styles = event.currentTarget.classList;     
                //Incremento y reduccion
                if(styles.contains("decrease")) {
                    count--;
                }
                else if(styles.contains("increase")) {
                    count++;
                }
                else {
                    count = 0;
                }    
                
                //Color
                if(count > 0){
                    span.style.color = "#0d6251"
                }
                else if(count < 0){
                    span.style.color = "#922b20"
                }
                else{
                    span.style.color = "black"
                }
                
                span.textContent = count;
    });
});