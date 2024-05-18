
let bbddData = null;
let urlAlter = "../php_logic/AddEmployee.php";
let urlGet   = "../php_logic/GetEmployees.php";

const GetEmployees = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw {ok:false, msg:"Error al retornar los empleados"};
        bbddData = await res.json();
        CreateEmployeesTable(bbddData);
    } catch (error) {
        console.error(error);
    }
}

// AGREGA / MODIFICA / ELIMINA UNA ENTRADA EN LA TABLA DE EMPLEADOS
const AlterEmployeeTable = async(formData) => {
    try {
        const res = await fetch(urlAlter, {
            method:"POST",
            body:formData
        });
        if(!res.ok) throw {ok:false, msg: "No hay datos"};
        // let data = await res.json();
        ResetForm();
        GetEmployees(urlGet);
    } catch (error) {
        console.log(error);
    }
}

GetEmployees("../php_logic/GetEmployees.php");

// CREA LA TABLA DE EMPLEADOS
function CreateEmployeesTable(data)
{

    let namesFilterList = document.getElementById("name-filter-list");
    namesFilterList.innerHTML = "";

    let tableData = document.getElementById("employeesTableBody");
    tableData.innerHTML = "";

    if (data.code === 0)
    {
        data.datos.forEach(element => {
            let lastRow = tableData.rows[tableData.rows - 1];

            let row = tableData.insertRow(lastRow);

            let i = 0;
            let col = null;
            for (const item in element) {
                if (!isNaN(parseInt(item)))
                {
                    col = row.insertCell(i);
                    // if (i === 0) col.setAttribute("class", "hidden");
                    col.innerHTML = element[item];
                    i++;
                }
            }

            col = row.insertCell(row.cells.length);
            col.setAttribute("class", "material-symbols-rounded pointer");
            col.setAttribute("onclick", "UpdateEmployee("+element.id+")");
            let text = document.createTextNode("person_edit");
            col.appendChild(text);

            col = row.insertCell(row.cells.length);
            col.setAttribute("class", "material-symbols-rounded pointer");
            // col.setAttribute("onclick", "RemoveEmployee("+element.id+")");
            col.setAttribute("onclick", "OpenModal('DLT',"+element.id+")");
            text = document.createTextNode("person_remove");
            col.appendChild(text);

            let nameOption = document.createElement("option");
            nameOption.innerHTML = element.nombre + " " + element.apellidos;
            namesFilterList.appendChild(nameOption);

        });
    }
    else
    {
        let cols = document.getElementById("columnsTitles").rows[0].cells.length;
        let row = tableData.insertRow(0);
        let col = row.insertCell(0);
        col.setAttribute("colspan", cols);
        col.style.textAlign = "center";
        col.innerHTML = data.descripcion;
    }
}



let insertForm = document.getElementById("workwith-employee");

insertForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // CAMPOS DEL FORMULARIO
    let formMode = document.getElementById("form-mode").value;
    let inputID  = document.getElementById("input-id").value;
    let campos = [
        document.getElementById("input-dni"),
        document.getElementById("input-nombre"),
        document.getElementById("input-apellidos"),
        document.getElementById("input-fechanac"),
        document.getElementById("input-telefono"),
        document.getElementById("input-direccion"),
        document.getElementById("input-email"),
    ];

    // ERRORES DE LOS CAMPOS
    let errores = [
        document.getElementById("error-dni"),
        document.getElementById("error-nombre"),
        document.getElementById("error-apellidos"),
        document.getElementById("error-fechanac"),
        document.getElementById("error-telefono"),
        document.getElementById("error-direccion"),
        document.getElementById("error-email"),
    ];

    let formData = ValidaCampos(campos, errores);
    formData.append("mode", formMode);
    if (inputID.value !== -1) formData.append("id", inputID); // SOLO PARA MODIFICAR

    console.log(formData);

    if (formData.get("formErrors") === "false")
    {
        campos.forEach(campo => {
            formData.append(campo.name, campo.value);
        });
        AlterEmployeeTable(formData);
    }
});

// RELLENA EL FORMULARIO CON LOS DATOS DEL EMPLEADO A MODIFICAR
function UpdateEmployee(id)
{
    if (id !== -1)
    {
        let data = bbddData.filter((item) => item.id == id);

        // console.log(data);
        
        if (data.length > 0)
        {
            document.getElementById("submitForm").value         = "Modificar";
            document.getElementById("form-mode").value          = "UPD";
            document.getElementById("input-id").value           = data[0].id || -1;
            document.getElementById("input-dni").value          = data[0].dni || "";
            document.getElementById("input-nombre").value       = data[0].nombre || "";
            document.getElementById("input-apellidos").value    = data[0].apellidos || "";
            document.getElementById("input-fechanac").value     = data[0].fechanacimiento || "";
            document.getElementById("input-telefono").value     = data[0].telefono || "";
            document.getElementById("input-direccion").value    = data[0].direccion || "";
            document.getElementById("input-email").value        = data[0].email || "";

            document.getElementById("workwith-employee").focus();
        }
        else
        {
            console.log("No se encontró el elemento a modifica.");
        }
    }
}

// ELIMINA EL EMPLEADO SELECCIONADO
function DeleteEmployee(id)
{
    if (id !== -1)
    {
        window.location.href = urlAlter+"?mode=DLT&id="+id;
        GetEmployees(urlGet);
    }
}




// FORMULARIO DE FILTROS
let filtersForm = document.getElementById("form-filters");
filtersForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let filters = url = "";

    let formInputs = filtersForm.querySelectorAll("input");
    formInputs.forEach(input => {
        if (input.value.length > 0) filters += input.name + '=' + input.value;
    })

    if (filters.length > 0)
    {
        url = urlGet+'?'+filters;
        GetEmployees(url);
    }
})


function ResetForm()
{
    document.getElementById("workwith-employee").reset();
    document.getElementById("form-mode").value  = "INS";
    document.getElementById("input-id").value   = -1;
    document.getElementById("submitForm").value = "AGREGAR";
}