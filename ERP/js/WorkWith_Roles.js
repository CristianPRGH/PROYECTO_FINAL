
(function() {

    let allData = null;
    let urlAlter = "../php_logic/AddRole.php";
    let urlGet   = "../php_logic/GetRoles.php";

    LoadData();

    function LoadData()
    {
        GetRoles(urlGet)
    }


    async function GetRoles(url)
    {
        try {
            const res = await fetch(url);
            if (!res.ok) throw {ok:false, msg:"Error al retornar los roles"};
            allData = await res.json();
            CreateRolesTable(allData);
        } catch (error) {
            console.error(error);
        }
    }

    // AGREGA / MODIFICA / ELIMINA UNA ENTRADA EN LA TABLA DE EMPLEADOS
    async function AlterRolesTable(formData)
    {
        try {
            const res = await fetch(urlAlter, {
                method:"POST",
                body:formData
            });
            if(!res.ok) throw {ok:false, msg: "No hay datos"};
            ResetForm();
            GetRoles(urlGet);
        } catch (error) {
            console.log(error);
        }
    }

    // CREA LA TABLA DE EMPLEADOS
    function CreateRolesTable(data)
    {
        // let namesFilterList = document.getElementById("name-filter-list");
        // namesFilterList.innerHTML = "";

        let tableData = document.getElementById("tablebody");
        tableData.innerHTML = "";

        CreateDataTable(tableData, data, 'rolid');
    }

    let insertForm = document.getElementById("workwith-roles");

    insertForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // CAMPOS DEL FORMULARIO
        let formMode = document.getElementById("form-mode").value;
        let inputID  = document.getElementById("input-id").value;
        let campos = [
            document.getElementById("input-nombre"),
            document.getElementById("action-read"),
            document.getElementById("action-edit"),
            document.getElementById("action-delete")
        ];

        // ERRORES DE LOS CAMPOS
        let errores = [
            document.getElementById("error-nombre"),
            document.getElementById("error-read"),
            document.getElementById("error-edit"),
            document.getElementById("error-delete")
        ];

        let formData = ValidaCampos(campos, errores);
        if (formData.get("formValid") === "true")
        {
            formData.append("mode", formMode);
            if (inputID.value !== -1) formData.append("id", inputID); // SOLO PARA MODIFICAR

            campos.forEach(campo => {
                // console.log(campo);
                if (campo.type === "checkbox")
                {
                    let valor = (campo.checked) ? 1 : 0;
                    formData.append(campo.name, valor);
                }else
                    formData.append(campo.name, campo.value);
            });
            AlterRolesTable(formData);
        }
    });


    // RELLENA EL FORMULARIO CON LOS DATOS DEL EMPLEADO A MODIFICAR
    function UpdateRegister(id)
    {
        if (id !== -1)
        {
            let data = allData.datos.filter((item) => item.rolid == id);

            // console.log(data);
            
            if (data.length > 0)
            {
                document.getElementById("submitForm").innerHTML     = "MODIFICAR";
                document.getElementById("form-mode").value          = "UPD";
                document.getElementById("input-id").value           = data[0].rolid || -1;
                document.getElementById("input-nombre").value       = data[0].nombre || "";
                document.getElementById("action-read").checked      = data[0].leer || "";
                document.getElementById("action-edit").checked      = data[0].editar || "";
                document.getElementById("action-delete").checked    = data[0].eliminar|| "";

                window.location.href = "#"+document.getElementById("workwith-roles").id;
            }
            else
            {
                console.log("No se encontró el elemento a modificar.");
            }
        }
    }

    // ELIMINA EL EMPLEADO SELECCIONADO
    function DeleteRole(id)
    {
        if (id !== -1)
        {
            window.location.href = urlAlter+"?mode=DLT&id="+id;
            GetRoles(urlGet);
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
            GetRoles(url);
        }
        else{
            GetRoles(urlGet);
        }
    })


    function ConfirmDelete()
    {
        let id = document.getElementById("confirm-id").innerHTML;
        DeleteRole(id);
        CloseModal();
    }


    window.UpdateRegister = UpdateRegister;
    window.ConfirmDelete  = ConfirmDelete;

})();