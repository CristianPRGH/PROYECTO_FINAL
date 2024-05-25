// async function LoadContent(page, container) {
//     try {
//         const response = await fetch(page);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const content = await response.text();
//         const contentDiv = document.getElementById(container);
//         contentDiv.innerHTML = content;

//         // Encontrar y ejecutar scripts en el contenido cargado
//         const scripts = contentDiv.querySelectorAll('script');
//         scripts.forEach(oldScript => {
//             const newScript = document.createElement('script');
//             if (oldScript.src) {
//                 newScript.src = oldScript.src;
//             } else {
//                 newScript.textContent = oldScript.textContent;
//             }
//             document.body.appendChild(newScript);
//             // Opcional: remover el script después de la ejecución si no es necesario mantenerlo en el DOM
//             document.body.removeChild(newScript);
//         });
//     } catch (error) {
//         console.error('Error loading content:', error);
//     }
// }



// Cargar contenido inicial si es necesario
// document.addEventListener("DOMContentLoaded", () => {
//     LoadContent('Users.html'); // O cualquier contenido por defecto
// });

function LoadContent(page, container)
{
    // Crear una nueva instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Configurar la solicitud AJAX
    xhr.open('GET', page, true);

    // Definir una función que se ejecutará cuando cambie el estado de la solicitud
    xhr.onreadystatechange = function()
    {
        // Verificar si la solicitud se ha completado (readyState 4) y fue exitosa (status 200)
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            const contentDiv = document.getElementById(container);
            contentDiv.innerHTML = xhr.responseText;

            // Encontrar y ejecutar scripts en el contenido cargado
            const scripts = contentDiv.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                if (scripts[i].src) {
                    newScript.src = scripts[i].src;
                } else {
                    newScript.text = `(function() { ${scripts[i].text} })()`;;
                }
                document.head.appendChild(newScript).parentNode.removeChild(newScript); // Ejecutar y eliminar el script
            }
        }
    }

    xhr.send();
}