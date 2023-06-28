
function initialize()
{
    initForm();
    initEmail();
    initPhone();
}

function initForm()
{
    const form = document.querySelector("#contact form");
    const button = document.querySelector("#contact submit-button");

    button.onclick = () =>
    {
        form.channel.value = 'indirect';
        form.requestSubmit();
    }
}

function initEmail()
{
    const elements = document.querySelectorAll(".domail");

    for (const element of elements)
    {
        const email = element.innerHTML.replace(/-monkeywithtail-/g, "@");

        element.innerHTML = `<a href="mailto:${ email }">${ email }<a>`;
    }
}

function initPhone()
{
    const elements = document.querySelectorAll(".docall");

    for (const element of elements)
    {
        const numbers = element.innerHTML.replace(/\D/g, '');
        const phone = `+${ numbers.substring(0, 2) } (${ numbers.substring(2, 3) })${ numbers.substring(3, 5) } ${ numbers.substring(5) }`;

        element.innerHTML = `<a href="tel:${ phone }">${ phone }<a>`;
    }
}

window.addEventListener('load', initialize);
