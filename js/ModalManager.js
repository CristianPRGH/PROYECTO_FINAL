let modal = null;

function OpenModal(context, data)
{
    if (context === "DLT")
    {
        modal = document.getElementById("confirm-modal");
        document.getElementById("confirm-id").innerHTML = data;
        document.getElementById("confirm-msg").innerHTML = "Confirma la eliminación del empleado "+data+"?";
    }

    modal.style.display = "block";
}

function CloseModal()
{    
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) CloseModal();
}

function Confirm()
{
    let id = document.getElementById("confirm-id").innerHTML;
    DeleteEmployee(id);
    CloseModal();
}