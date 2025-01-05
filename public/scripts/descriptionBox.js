document.addEventListener("DOMContentLoaded",() => {

    const boldbutton = document.getElementById("bold");
    const italicbutton = document.getElementById("italic");

    console.log("pratik");


    boldbutton.addEventListener("click", () =>{
        document.execCommand("bold",false,null);
    })
    
})