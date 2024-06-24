document.addEventListener('DOMContentLoaded', () => {
    const menus = [
        {
            menu: document.getElementById("index-leftmenu"),
            toggle: document.getElementById("toggleLeftMenu"),
            active: false,
            tween: gsap.to("#index-leftmenu", { duration: 0.5, xPercent: 100, opacity: 1,ease: "sine.inOut", paused: true })
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
            menus[index].active ? tween.play() : tween.reverse();
        });
    });
});