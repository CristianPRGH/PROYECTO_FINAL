export function InputJson(id, inputclasses = "")
{
    console.log(id);
    const input = document.getElementById(id);
    const classes = inputclasses == "" ? Array.from(input.classList).join(' ') : inputclasses;
    return {
        "id":input.id,
        "classes":classes,
        "value": input.type != "file" ? input.value : input.files[0]
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