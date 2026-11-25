function initialize()
{
    initEmail();
    initPhone();
    initNavigation();
    initReveal();
}

/* ---------- Email / phone obfuscation (unchanged) ---------- */

function initEmail()
{
    const elements = document.querySelectorAll(".domail");

    for (const element of elements)
    {
        const sourceEmail = element.getAttribute("href");
        const targetEmail = rewriteMail(sourceEmail);

        const sourceContent = element.innerHTML;
        const targetContent = rewriteMail(sourceContent);

        element.setAttribute("href", `mailto:${targetEmail}`);
        element.innerHTML = targetContent;
    }
}

function initPhone()
{
    const elements = document.querySelectorAll(".docall");

    for (const element of elements)
    {
        const sourcePhone = element.getAttribute("href");
        const targetPhone = rewritePhone(sourcePhone);

        const sourceContent = element.innerHTML;
        const targetContent = rewritePhone(sourceContent);

        element.setAttribute("href", `tel:${targetPhone}`);
        element.innerHTML = targetContent;
    }
}

function rewriteMail(sourceEmail)
{
    return sourceEmail.replace(/-monkeywithtail-/g, "@");
}

function rewritePhone(sourcePhone)
{
    const numbers = sourcePhone.replace(/\D/g, '');

    return `+${ numbers.substring(0, 2) } (${ numbers.substring(2, 3) })${ numbers.substring(3, 5) } ${ numbers.substring(5) }`;
}

/* ---------- Navigation ---------- */

function initNavigation()
{
    const nav = document.querySelector("nav.nav");
    const toggle = document.querySelector("button.menu-toggle");

    if (!nav || !toggle) return;

    // Highlight the link for the current page
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    nav.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href").replace(/\/+$/, "") || "/";

        if (href === path)
        {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Toggle the mobile menu panel
    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link is clicked or Escape is pressed
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    // Close the menu when clicking outside of it
    document.addEventListener("click", event => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    // Close the menu when resizing to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMenu();
    });

    function closeMenu()
    {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    }
}

/* ---------- Scroll reveal (subtle fade + rise) ---------- */

function initReveal()
{
    if (!document.documentElement.classList.contains("js")) return;

    const targets = document.querySelectorAll("#introduction, .tiles article, #information > div, footer");

    // Stagger items that share a parent (e.g. cards in the same grid)
    const groups = new Map();

    targets.forEach(element => {
        element.classList.add("reveal");

        const key = element.parentElement ? element.parentElement.id || element.parentElement.className : "root";
        const index = groups.get(key) || 0;
        element.style.transitionDelay = `${Math.min(index, 5) * 70}ms`;
        groups.set(key, index + 1);
    });

    const observer = new IntersectionObserver(entries => {
        for (const entry of entries)
        {
            if (entry.isIntersecting)
            {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(element => observer.observe(element));
}

window.addEventListener('load', initialize);
