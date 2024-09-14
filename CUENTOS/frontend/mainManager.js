import * as tweens from "../components/tweenControls.js";


document.addEventListener('DOMContentLoaded', () => {
    InitializeEvents();
    SetupToggleMenus();
});

function InitializeEvents()
{
    const loginbttn = document.getElementById("to-login");
    if (loginbttn != null)
    {
        loginbttn.addEventListener('click', GoToAuthenticate);
    }
    else{
        document.getElementById("new-book").addEventListener('click', GoToNewBook);
        document.getElementById("library").addEventListener('click', GoToYourLibrary);
        document.getElementById("logout").addEventListener('click', Logout);

        GetLoggedUserInfo();
    }
}

function SetupToggleMenus()
{
    // const tween_bookfilters = gsap.to("#menu-bookfilters", { duration: 0.5, xPercent: 100,  opacity: 1, ease: "sine.inOut", paused: true })
    // const tween_accountmenu = gsap.to("#menu-useraccount",  { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true })

    // document.getElementById("openBookFilters").addEventListener('click', ()=>{ tweens.PlayAnimation(tween_bookfilters) });
    // document.getElementById("closeBookFilters").addEventListener('click', ()=>{ tweens.ReverseAnimation(tween_bookfilters) });
    // document.getElementById("openAccountMenu").addEventListener('click', ()=>{ tweens.PlayAnimation(tween_accountmenu) });
    // document.getElementById("closeAccountMenu").addEventListener('click', ()=>{ tweens.ReverseAnimation(tween_accountmenu) });
}

function GoToAuthenticate() { window.location = "view/auth.html"; }
function GoToNewBook() {
    const userid = document.getElementById("menu-useraccount").dataset.userid;
    window.location = `view/create_book.php?userid=${userid}`; 
}
async function Logout()
{
    const formdata = new FormData();
    formdata.append("action","logout");
    try {
        const response = await fetch("backend/includes/UserHandler.php",{
            method:"post",
            body:formdata
        });
        if (response.ok)
        {
            window.location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}

function GoToYourLibrary()
{
    window.location = "view/user_library.php";
}

async function GetLoggedUserInfo()
{
    const formdata = new FormData();
    formdata.append("action", "getUserInfo");
    try {
        const response = await fetch("backend/includes/UserHandler.php", {
            method: "post",
            body: formdata
        });
        if (response.ok)
        {
            const result = await response.json();
            const data = result.data;

            document.getElementById("menu-useraccount").dataset.userid = data.UIUser
            document.getElementById("logged-username").textContent = data.Username;
            document.getElementById("logged-userimg").src = `images/users_avatars/${data.Image}`;
            document.getElementById("author-of-books").textContent = data.AuthorOfBooks;
            document.getElementById("coauthor-of-books").textContent = data.CoauthorOfBooks;

        }
    } catch (error) {
        console.error(error);
    }
}