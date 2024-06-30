
export const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
export const bookFiltersTween = gsap.to("#menu-bookfilters", { duration: 0.5, xPercent: 100, opacity: 1,ease: "sine.inOut", paused: true })

export function PlayAnimation(tween)
{tween.play();}
export function ReverseAnimation(tween)
{tween.reverse();}