import * as tweens from "../components/tweenControls.js";
import { InitializeMain } from "../frontend/booksManager.js";

document.addEventListener('DOMContentLoaded', async () => {
    InitializeMain();
    SetupToggleMenus();

    document.getElementById("to-login").addEventListener('click', GoToLogin);
    document.getElementById("new-book").addEventListener('click', GoToNewBook);
    // document.getElementById("library").addEventListener('click', GoToLogin);
    // document.getElementById("logout").addEventListener('click', GoToLogin);
});

function SetupToggleMenus()
{
    /* -- Menus laterales -- */
    const menus = [
        {
            menu: document.getElementById("menu-bookfilters"),
            toggle: document.getElementById("toggleLeftMenu"),
            active: false,
            tween: gsap.to("#menu-bookfilters", { duration: 0.5, xPercent: 100, opacity: 1,ease: "sine.inOut", paused: true })
        },
        {
            menu: document.getElementById("index-rightmenu"),
            toggle: document.getElementById("toggleRightMenu"),
            active: false,
            tween: gsap.to("#index-rightmenu", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true })
        }
    ];

    menus.forEach(({ toggle, tween }, index) => {
        toggle.addEventListener('click', () => {
            menus[index].active = !menus[index].active;
            menus[index].active ? tweens.PlayAnimation(tween) : tweens.ReverseAnimation(tween);
        });
    });
}

function GoToLogin() { window.location = "pages/auth.html"; }
function GoToNewBook() { window.location = "pages/create_book.html"; }