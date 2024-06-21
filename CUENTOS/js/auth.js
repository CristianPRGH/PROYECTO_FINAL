let loginForm = registerForm = null;
let loginClassList = registerClassList = null;

document.addEventListener("DOMContentLoaded", ()=>{
    InitializeVariables();
    InitializeEvents();
})

function InitializeVariables()
{
    loginForm           = document.getElementById("login-form");
    registerForm        = document.getElementById("register-form");
    loginClassList      = Array.from(loginForm.classList);
    registerClassList   = Array.from(registerForm.classList);
}

function InitializeEvents()
{
    document.getElementById("to-signup").addEventListener('click', ToggleAnimation);
    document.getElementById("submit-register").addEventListener('click', ToggleAnimation);
    document.getElementById("submit-login").addEventListener('click', ToggleAnimation);

    // loginForm.addEventListener('transitionend', ShowHideForm);
    // registerForm.addEventListener('transitionend', ShowHideForm);
}

function ToggleAnimation()
{
    ToggleClasses(loginForm,    loginClassList.includes("show") ? "hide" : "show", loginClassList.includes("show") ? "show" : "hide");
    console.log("gasap");
    gsap.to(".hide", {yPercent: -100, duration: 1});
    // gsap.to(".hide", {yPercent: -100, opacity: 1, duration: 1});
    // ToggleClasses(registerForm, registerClassList.includes("show") ? "hide" : "show", registerClassList.includes("show") ? "show" : "hide");
}

function ShowHideForm(e)
{
    console.log(e);
    if (e.propertyName == "opacity")
    {
        const classList = Array.from(e.target.classList);
        ToggleClasses(e.target,    classList.includes("show") ? "flex-column" : "display-none", classList.includes("show") ? "display-none" : "flex-column");
        // ToggleClasses(registerForm, registerClassList.includes("show") ? "display-none" : "flex-column", registerClassList.includes("show") ? "flex-column" : "display-none");
    }
}

function ToggleClasses(element, addClass = "", removeClass = "")
{

    console.log(element);
    console.log(addClass);
    console.log(removeClass);

    if (removeClass != "") element.classList.remove(removeClass);
    if (addClass != "")    element.classList.add(addClass);

    
    console.log(element);
}