function CreateDataTable(tableData, data, mainID)
{
    if (data.code === 0)
    {
        data.datos.forEach(registro => {
            let lastRow = tableData.rows[tableData.rows - 1];
            let row = tableData.insertRow(lastRow);
            let col = null;

            // CREA EL ICONO PARA MODIFICAR EL USUARIO
            col = row.insertCell(0);
            col.setAttribute("class", "material-symbols-rounded pointer");
            col.setAttribute("onclick", "UpdateRegister("+registro[mainID]+")");
            let text = document.createTextNode("edit");
            col.appendChild(text);

            // CREA EL ICONO DE ELIMINAR USUARIO
            col = row.insertCell(1);
            col.setAttribute("class", "material-symbols-rounded pointer");
            col.setAttribute("onclick", "OpenModal('DLT',"+registro[mainID]+")");
            text = document.createTextNode("close");
            col.appendChild(text);

            let i = 2;
            for (const columna in registro)
            {
                col = row.insertCell(i);
                col.innerHTML = registro[columna];
                i++;
            }

        });
    }
    else    // Si no hay datos muestra un mensaje en la tabla
    {
        let cols = document.getElementById("columnsTitles").rows[0].cells.length;   // retorna el numero de columnas (basado en la cantidad de TH)
        let row = tableData.insertRow(0);
        let col = row.insertCell(0);
        col.setAttribute("colspan", cols);  // hace que la fila ocupe todo el ancho de la tabla
        col.style.textAlign = "center";
        col.innerHTML = data.descripcion;
    }
}