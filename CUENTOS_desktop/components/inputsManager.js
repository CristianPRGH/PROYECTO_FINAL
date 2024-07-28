export function InputJson(id, inputvalidations = "")
{
    const input = document.getElementById(id);
    const validations = inputvalidations == "" ? Array.from(input.classList).join(' ') : inputvalidations;
    return {
        "id":input.id,
        "validations":validations,
        "type":input.type,
        // Si el input NO es de tipo FILE dejo el valor SINO deja el input
        "value": input.type != "file" ? 
                    input.value : input.files[0] != null ? input.files[0] : null
    }
}

export function SetInputsToFormData(inputs, files = null)
{
    const imgfile = document.getElementById(files);
    const formdata = new FormData();

    if (files != null)
        formdata.append("imgfile", imgfile.files[0]);

    let jsonInputs = [];

    inputs.forEach(input => {
        if (input.type != "file") jsonInputs.push(input);
    });
    
    formdata.append("inputs", JSON.stringify(jsonInputs));
    return formdata;
}