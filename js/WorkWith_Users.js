
// FUNCIÓN IIFE : SIRVE PARA NO TENER QUE REDECLARAR VARIABLES AL CARGAR LA PÁGINA CON AJAX
(function() {
    let allData = null;
    
    let urlAlter    = "../php_logic/AddUser.php";
    let urlGet      = "../php_logic/GetUsers.php";
    let urlGetRoles = "../php_logic/GetRoles.php";

    LoadData();

    async function LoadData() {
        await GetRoles(urlGetRoles);
        GetUsers(urlGet);
    }

    // Rrecoge los roles para llenar el input SELECT del formulario
    let userRoles = null;
    async function GetRoles(url)
    {
        try {
            const res = await fetch(url);
            if (!res.ok) throw {ok:false, msg:"Error al retornar los roles"};
            userRoles = await res.json();

            let selectRoles =  document.getElementById("input-rol");

            let option = document.createElement("option");
            option.value = "";
            option.innerHTML = "- Seleccione un rol para el usuario -";
            selectRoles.appendChild(option);

            userRoles.datos.forEach(rol => {
                let option = document.createElement("option");
                option.value     = rol.rolid;
                option.innerHTML = rol.nombre;

                selectRoles.appendChild(option);
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function GetUsers(url)
    {
        try {
            const res = await fetch(url);
            if (!res.ok) throw {ok:false, msg:"Error al retornar los usuarios"};
            allData = await res.json();
            CreateUsersTable(allData);
        } catch (error) {
            console.error(error);
        }
    }

    // AGREGA / MODIFICA / ELIMINA UNA ENTRADA EN LA TABLA DE EMPLEADOS
    async function AlterUsersTable(formData)
    {
        try {
            const res = await fetch(urlAlter, {
                method:"POST",
                body:formData
            });
            if(!res.ok) throw {ok:false, msg: "No hay datos"};
            ResetForm();
            GetUsers(urlGet);
        } catch (error) {
            console.log(error);
        }
    }

    // CREA LA TABLA DE EMPLEADOS
    function CreateUsersTable(data)
    {

        // let namesFilterList = document.getElementById("name-filter-list");
        // namesFilterList.innerHTML = "";

        // console.log(userRoles);

        let tableData = document.getElementById("tablebody");
        tableData.innerHTML = "";

        // CREA UN MAPA DE ROLES PARA ACCEDER RAPIDAMENTE AL NOMBRE MEDIANTE EL 'ID'
        const rolesMap = userRoles.datos.reduce((map, rol) => {
            map[rol.rolid] = rol.nombre;
            return map;
        }, {})


        // AQUI DENTRO SE HARÁN LOS CAMBIOS NECESARIO PARA MOSTRAR EN LA TABLA
        const nuevosDatos = data.datos.map( (usuario) => {

            const nuevoUsuario = {...usuario};

            for (const columna in usuario) {
                if (columna === 'rolid')
                {
                    // CAMBIA EL DATO DEL CAMPO 'ROLID' POR EL NOMBRE DEL ROL PARA MOSTRARLO POR PANTALLA
                    nuevoUsuario[columna] = rolesMap[nuevoUsuario.rolid];
                    break;
                }
            }

            return nuevoUsuario;
        });

        CreateDataTable(tableData, data, 'userid');
    }



    let insertForm = document.getElementById("workwith-users");

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
            document.getElementById("input-usuario"),
            document.getElementById("input-password"),
            document.getElementById("input-rol")
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
            document.getElementById("error-usuario"),
            document.getElementById("error-password"),
            document.getElementById("error-rol")
        ];

        let formData = ValidaCampos(campos, errores);
        if (formData.get("formValid") === "true")
        {
            formData.append("mode", formMode);
            if (inputID.value !== -1) formData.append("id", inputID); // SOLO PARA MODIFICAR

            campos.forEach(campo => {
                formData.append(campo.name, campo.value);
            });
            AlterUsersTable(formData);
        }
    });



    
    
    
    
    // FORMULARIO DE FILTROS
    let filtersForm = document.getElementById("form-filters");
    filtersForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let filters = "";
        let url = "";
        
        let formInputs = filtersForm.querySelectorAll("input");
        formInputs.forEach(input => {
            if (input.value.length > 0) filters += input.name + '=' + input.value + '&';
        });
        
        if (filters.length > 0) {
            url = urlGet + '?' + filters.slice(0, -1); // Eliminar el último '&'
            GetUsers(url);
        } else {
            GetUsers(urlGet);
        }
    });


        
    // ELIMINA EL EMPLEADO SELECCIONADO
    function DeleteRegister(id)
    {
        if (id !== -1)
        {
            window.location.href = urlAlter+"?mode=DLT&id="+id;
            GetUsers(urlGet);
        }
    }
    function ConfirmDelete()
    {
        let id = document.getElementById("confirm-id").innerHTML;
        DeleteRegister(id);
        CloseModal();
    }

    // RELLENA EL FORMULARIO CON LOS DATOS DEL EMPLEADO A MODIFICAR
    function UpdateRegister(id)
    {
        if (id !== -1)
        {
            let data = allData.datos.filter((item) => item.userid == id);

            if (data.length > 0)
            {
                document.getElementById("submitForm").innerHTML     = "MODIFICAR";
                document.getElementById("form-mode").value          = "UPD";
                document.getElementById("input-id").value           = data[0].userid || -1;
                document.getElementById("input-dni").value          = data[0].dni || "";
                document.getElementById("input-nombre").value       = data[0].nombre || "";
                document.getElementById("input-apellidos").value    = data[0].apellidos || "";
                document.getElementById("input-fechanac").value     = data[0].fechanacimiento || "";
                document.getElementById("input-telefono").value     = data[0].telefono || "";
                document.getElementById("input-direccion").value    = data[0].direccion || "";
                document.getElementById("input-email").value        = data[0].email || "";
                document.getElementById("input-usuario").value      = data[0].usuario || "";
                // document.getElementById("input-password").value     = data[0].password || "";
                document.getElementById("input-rol").value          = data[0].rolid || "";
                

                window.location.href = "#"+document.getElementById("workwith-users").id;
            }
            else
            {
                console.log("No se encontró el elemento a modifica.");
            }
        }
    }



    // ESTAS FUNCIONES AL ESTAR DENTRO DE UNA FUNCIÓN 'IIFE' ES NECESARIO EXPONERLAS GLOBALMENTE PARA PODER SER UTILIZADAS DESDE OBJETOS EXTERNOS
    window.UpdateRegister = UpdateRegister;
    window.ConfirmDelete  = ConfirmDelete;
    
})();
