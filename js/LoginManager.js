const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let loginUrl = "../php_logic/LoginManager.php";

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
        const res = await fetch(loginUrl,{
            method:"post",
            body:formData
        });
        if (!res.ok) throw {ok:false, msg:"error"};
        let data = await res.json();

        console.log(data);
        if (data.code == 1)
        {
            document.getElementById("err-login").innerHTML = data.description;
        }
            
    } catch (error) {
        console.error(error);
    }
   
})