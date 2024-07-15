
function initialize()
{
    initEmail();
    initPhone();
}

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

window.addEventListener('load', initialize);
