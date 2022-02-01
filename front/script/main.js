
function listAdmins(){
    const url = "http://localhost:3000/admin/list"

    axios.get(url)
    .then(response => {
        const data = response.data
        let admins = document.getElementById("admins")
       
        for(let i = 0; i < data.length; i++){
            let tr = admins.insertRow();

            let tdName = tr.insertCell();
            let tdEmail = tr.insertCell();
            let tdRole = tr.insertCell(); 

            tdName.innerText = data[i].name;
            tdEmail.innerText = data[i].email;
            tdRole.innerText = data[i].role;
        }   
    })
    .catch(error => console.log(error))
}
listAdmins()


/* const newAdmin = {
    name: "Test Front",
    email: "testfront@test.com",
    password: "1234",
    role: "admin"
} */

/* function createAdmin(){
    const url = "http://localhost:3000/admin/create"
    axios.post(url, newAdmin)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => console.log(error))
}
createAdmin() */