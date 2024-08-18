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
function GoToNewBook() { window.location = "view/create_book.php"; }
async function Logout()
{
    try {
        const response = await fetch("backend/includes/user.logout.php");
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
    try {
        const response = await fetch("backend/includes/user.getuserinfo.php");
        if (response.ok)
        {
            const result = await response.json();
            const username = result.data.username;
            const userimg = result.data.image;

            document.getElementById("logged-username").textContent = username;
            document.getElementById("logged-userimg").src = `images/users_avatars/${userimg}`;
        }
    } catch (error) {
        console.error(error);
    }
}