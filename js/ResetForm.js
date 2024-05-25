
(function() {

    console.log("HOLAA");
    let resetForm = document.getElementById("reset-form");
    resetForm.addEventListener("click", ResetForm);
// document.addEventListener("DOMContentLoaded", () => {
// })

    function ResetForm()
    {
        let form        = document.getElementsByClassName("workwith-form")[0];
        let inputs      = form.querySelectorAll("input");
        let errors      = form.getElementsByClassName("errortext");
        let textareas   = form.querySelectorAll("textarea");
        
        form.reset();

        if ( inputs != null)
            inputs.forEach((input) =>{ 
                input.style = null;
                input.value = "";
            });

        if ( errors != null)
            Array.from(errors).forEach((error) =>{ error.style.visibility = "hidden"; });

        if ( textareas != null)
            textareas.forEach ((textarea) => { textarea.style = null; })

        document.getElementById("form-mode").value      = "INS";
        document.getElementById("input-id").value       = -1;
        document.getElementById("submitForm").innerHTML = "AGREGAR";
    }

})();