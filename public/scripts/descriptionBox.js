document.addEventListener("DOMContentLoaded", () => {
    const boldbutton = document.getElementById("bold");
    const italicbutton = document.getElementById("italic");

    

    boldbutton.addEventListener("click", () =>{
        document.execCommand("bold",false,null);
    })

    italicbutton.addEventListener("click", () =>{
        document.execCommand("italic",false,null);
    })
})