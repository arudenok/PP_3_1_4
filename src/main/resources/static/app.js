async function app() {

    const response = await fetch("api");

    if (response.ok) {
        let json = await response.json()
            .then(data => replaceTable(data));
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    function replaceTable(data) {

        const placement = document.getElementById("usersTable")
        placement.innerHTML = "";
        data.forEach(({id, name, lastname, age, username, roles}) => {
            let userRoles = "";
            roles.forEach((role) => {
                userRoles = userRoles + role.name + " ";
            })
            const element = document.createElement("tr");
            element.innerHTML = `
            <th scope="row">${id}</th>
            <td>${name}</td>
            <td>${lastname}</td>
            <td>${age}</td>
            <td>${username}</td>
            <td>${userRoles}</td>
            <td>
                <button type="button" class="btn btn-info text-white" data-bs-userId=${id}
                    data-bs-userName=${name} data-bs-userSurname=${lastname} data-bs-userAge=${age}
                    data-bs-userEmail=${username} data-bs-toggle="modal"
                    data-bs-target="#ModalEdit">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" data-bs-userId=${id}
                    data-bs-userName=${name} data-bs-userSurname=${lastname} data-bs-userAge=${age}
                    data-bs-userEmail=${username} data-bs-toggle="modal"
                    data-bs-target="#ModalDelete">Delete</button>
            </td>            
            `
            placement.append(element);
        })
    }
}

//Изменить юзера
const formEdit = document.getElementById("formEdit");
formEdit.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(formEdit);
    const object = {
        roles:[]
    };

    formData.forEach((value, key) => {
        console.log(key)
        if (key === "rolesId"){


            const roleId = value.split(" ")[0];
            const roleName = value.split(" ")[1];
            const role = {
                id : roleId,
                name : roleName
            };

            object.roles.push(role);
        } else {
            object[key] = value;
        }
    });
    fetch("api/", {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(object)
    })
        .then(() => app());
    $("#ModalEdit").modal("hide");
    formEdit.reset();
})
// модальное окно EDIT
const editModal = document.getElementById('ModalEdit')
editModal.addEventListener('show.bs.modal', event => {

    const button = event.relatedTarget

    const userId = button.getAttribute('data-bs-userId')
    const userName = button.getAttribute('data-bs-userName')
    const userSurname = button.getAttribute('data-bs-userSurname')
    const userAge = button.getAttribute('data-bs-userAge')
    const userEmail = button.getAttribute('data-bs-userEmail')


    const modaluserId = editModal.querySelector('#userId')
    const modaluserName = editModal.querySelector('#userName')
    const modaluserSurname = editModal.querySelector('#userSurname')
    const modaluserAge = editModal.querySelector('#userAge')
    const modaluserEmail = editModal.querySelector('#userEmail')

    modaluserId.value = userId
    modaluserName.value = userName
    modaluserSurname.value = userSurname
    modaluserAge.value = userAge
    modaluserEmail.value = userEmail


})

//удалить юзера
const formDelete = document.getElementById('formDelete')
formDelete.addEventListener('submit', e =>{
    e.preventDefault();
    const formData = new FormData(formDelete);
    fetch("api/"+formData.get("id"), {
        method: "DELETE"
    })
        .then(() => app());
    $("#ModalDelete").modal("hide");
    formDelete.reset();
})
//модальное окно DELETE
const DeleteModal = document.getElementById('ModalDelete')
DeleteModal.addEventListener('show.bs.modal', event => {

    const Dbutton = event.relatedTarget

    const DuserId = Dbutton.getAttribute('data-bs-userId')
    const DuserName = Dbutton.getAttribute('data-bs-userName')
    const DuserSurname = Dbutton.getAttribute('data-bs-userSurname')
    const DuserAge = Dbutton.getAttribute('data-bs-userAge')
    const DuserEmail = Dbutton.getAttribute('data-bs-userEmail')

    const DmodaluserId = DeleteModal.querySelector('#userIdDelete')
    const DmodaluserName = DeleteModal.querySelector('#userNameDelete')
    const DmodaluserSurname = DeleteModal.querySelector('#userSurnameDelete')
    const DmodaluserAge = DeleteModal.querySelector('#userAgeDelete')
    const DmodaluserEmail = DeleteModal.querySelector('#userEmailDelete')

    DmodaluserId.value = DuserId
    DmodaluserName.value = DuserName
    DmodaluserSurname.value = DuserSurname
    DmodaluserAge.value = DuserAge
    DmodaluserEmail.value = DuserEmail

})
//добавить юзера

const addForm = document.getElementById("addForm");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addForm);
    const object = {
        roles:[]
    };

    formData.forEach((value, key) => {
        if (key === "rolesId"){

            const roleId = value.split(" ")[0];
            const roleName = value.split(" ")[1];
            const role = {
                id : roleId,
                name : roleName
            };
            object.roles.push(role);
        } else {
            object[key] = value;
        }
    });

    fetch("api/", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(object)
    })
        .then(() => app())
        .then(() => addForm.reset());


    return show('Page1','Page2');

})