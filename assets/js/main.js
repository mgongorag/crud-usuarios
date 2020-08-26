const url = "http://localhost:53862/api/";
const btnAgregarUsuario = document.getElementById('btnAgregarUsuario');
const btnActualzarUsuario = document.getElementById('btnActualizar');
const eventoClickTabla = document.querySelector('#cuerpo-tabla');




// EVENTOS

btnAgregarUsuario.addEventListener('click', agregarUsuario);
eventoClickTabla.addEventListener('click', obtenerOpcion);
btnActualzarUsuario.addEventListener('click', actualizarUsuario);

window.addEventListener("load", function () {

     obtenerUsuarios();


})


// Funcion para traer todos los usuarios
function obtenerUsuarios() {
     // let url = "http://localhost:53862/api/ObtenerUsuarios";
     let bodyTable = document.getElementById('cuerpo-tabla');

     fetch(url + 'ObtenerUsuarios', {
               method: 'POST'
          })
          .then(function (response) {
               return response.json();
          })
          .then(function (data) {
               let html = '';
               console.log(data);
               console.log(data.IdUsuario);
               if (data.length > 0) {

                    data.forEach(function (data) {
                         html += `
                         <tr>
                         <th class="text-center" scope="row">${data.IdUsuario}</th>
                         <td class="text-center">${data.TxtNombres}</td>
                         <td class="text-center">${data.TxtDireccion}</td>
                         <td class="text-center">${data.TxtEmail}</td>
                         <td class="text-center"><button type="button" class="btn btn-link p-0 btn-editar">Editar</button></td>
                         <td class="text-center"><button type="button"class="btn btn-link text-danger p-0 btn-eliminar">Eliminar</button></td>
                         </tr>
                         `;

                    })

               } else {
                    html = `
                    <div class="alert alert-danger d-block" role="alert">
                         Parece que no hay ningun usuario registrado
                    </div> 
                    `
               }
               bodyTable.innerHTML = html;
          })
          .catch(function (error) {
               divError = `
               <div class="alert alert-danger d-block" role="alert">
                         Ha Ocurrido un Error con la consulta
               </div>
               `;
               document.querySelector('.table').innerHTML = divError;
          })

}

function agregarUsuario(e) {
     e.preventDefault();
     let alertAgregarUsuario = document.getElementById('alertAgregarUsuario');
     let nombres,
          apellidos,
          direccion,
          email,
          password;

     nombres = document.getElementById('txtNombres').value;
     apellidos = document.getElementById('txtApellidos').value;
     direccion = document.getElementById('txtDireccion').value;
     email = document.getElementById('txtEmail').value;
     password = document.getElementById('txtPassword').value;

     /*
     console.log(nombres);
     console.log(apellidos);
     console.log(direccion);
     console.log(email);
     console.log(password);
     */

     fetch(url + 'AgregarUsuario', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    "TxtNombres": nombres,
                    "txtApellidos": apellidos,
                    "TxtEmail": email,
                    "TxtDireccion": direccion,
                    "TxtPassword": password
               })
          })

          .then(function (response) {
               return response.json();
          })
          .then(function (data) {
               document.getElementById('spinnerAgregarUsuario').classList.remove('d-none');
               console.log(data);
               setTimeout(function () {
                    if (data.length > 0) {
                         alertAgregarUsuario.classList.add('alert-success');
                         alertAgregarUsuario.classList.remove('d-none');
                         alertAgregarUsuario.innerHTML = "Usuario Agregado Correctamente";
                         let nodo = document.createElement('tr');
                         let html = `
                         
                         <th class="text-center" scope="row">${data[0].Resultado}</th>
                         <td class="text-center">${nombres + ' ' + apellidos}</td>
                         <td class="text-center">${direccion}</td>
                         <td class="text-center">${email}</td>
                         <td class="text-center"><button type="button" class="btn btn-link p-0 btn-editar">Editar</button></td>
                         <td class="text-center"><button type="button"class="btn btn-link text-danger p-0 btn-eliminar">Eliminar</button></td>
                         
                         `;

                         nodo.innerHTML = html;
                         console.log(html);
                         document.getElementById('cuerpo-tabla').appendChild(nodo);
                         document.getElementById('formAgregarUsuario').reset();

                    } else {
                         alertAgregarUsuario.classList.add('alert-danger');
                         alertAgregarUsuario.classList.remove('d-none');
                         alertAgregarUsuario.innerHTML = "Ocurrio un error a la hora de agregar el usuario";
                    }

                    document.getElementById('spinnerAgregarUsuario').classList.add('d-none');
               }, 2000);

               setTimeout(function () {
                    alertAgregarUsuario.classList.add('d-none');
               }, 5000)
          })
}

/*
 *FUNCION PARA OBTENER QUE BOTON HA SIDO CLICKEADO
 */
function obtenerOpcion(e) {
     let usuario = e.target.parentElement.parentElement;
     
     

     if (e.target.classList.contains('btn-editar')) {
          ObtenerDatosUsuario(usuario);
     } else if (e.target.classList.contains('btn-eliminar')) {
          eliminarUsuario(usuario);
     }
}

/*
 *   Funcion para eliminar usuario
 */

function eliminarUsuario(usuario) {
     let idUsuario = usuario.querySelector('th').textContent;

     fetch(url + 'EliminarUsuario', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    "idUsuario": idUsuario
               })
          })
          .then(function (response) {
               return response.json();
          })
          .then(function (data) {
               let divAlert = document.createElement('div');
               divAlert.classList.add('alert');
               if(data[0].Resultado > 0){
                    divAlert.classList.add('alert-warning');
                    divAlert.innerHTML = "Usuario Eliminado correctamente";
                    document.getElementById('table').appendChild(divAlert);
                    usuario.remove();

                    setTimeout(function () {
                         divAlert.remove();
                    }, 2500)
               }
          })
}



/*
 * FUNCION PARA OBTENER DATOS USUARIO
 */
function ObtenerDatosUsuario(usuario) {
     let idUsuario = usuario.querySelector('th').textContent;
     console.log(idUsuario);
     let btnActualizar = document.getElementById('btnActualizar');
     let btnGuardar = document.getElementById('btnAgregarUsuario');
     let inputIdUsuario = document.getElementById('idUsuario');
     
     let padreBtnActualizar = btnActualizar.parentElement;
     let padreBtnGuardar = btnGuardar.parentElement;
     let padreInputIdUsuario = inputIdUsuario.parentElement;

     padreBtnGuardar.classList.add('d-none');
     padreBtnActualizar.classList.remove('d-none');
     padreInputIdUsuario.classList.remove('d-none');


     fetch(url + 'ObtenerDatosUsuario', {
          method : 'POST',
          headers : {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({
               "idUsuario" : idUsuario
          })
     })
     .then(function(response){
          return response.json();
     })
     .then(function(data){
          console.log(data);
          document.getElementById('idUsuario').value = data[0].IdUsuario;
          document.getElementById('txtNombres').value = data[0].TxtNombres;
          document.getElementById('txtApellidos').value = data[0].TxtApellidos;
          document.getElementById('txtDireccion').value = data[0].TxtDireccion;
          document.getElementById('txtEmail').value = data[0].TxtEmail;
          document.getElementById('txtPassword').value = data[0].TxtPassword;
     })
     
}

/*
 *   FUNCION PARA ACTUALIZAR
*/

function actualizarUsuario(e){
     e.preventDefault();

     let btnActualizar = document.getElementById('btnActualizar');
     let btnGuardar = document.getElementById('btnAgregarUsuario');
     let inputIdUsuario = document.getElementById('idUsuario');
     
     let padreBtnActualizar = btnActualizar.parentElement;
     let padreBtnGuardar = btnGuardar.parentElement;
     let padreInputIdUsuario = inputIdUsuario.parentElement;

     let alertAgregarUsuario = document.getElementById('alertAgregarUsuario');
     let  idUsuario,
          nombres,
          apellidos,
          direccion,
          email,
          password;

     idUsuario = document.getElementById('idUsuario').value;
     nombres = document.getElementById('txtNombres').value;
     apellidos = document.getElementById('txtApellidos').value;
     direccion = document.getElementById('txtDireccion').value;
     email = document.getElementById('txtEmail').value;
     password = document.getElementById('txtPassword').value;

     fetch(url + 'ActualizarUsuario', {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                                   "idUsuario" : idUsuario,
                                   "TxtNombres": nombres,
                                   "txtApellidos": apellidos,
                                   "TxtEmail": email,
                                   "TxtDireccion": direccion,
                                   "TxtPassword": password
          })
     })
     .then(function(response){
          return response.json();
     })
     .then(function(data){

          document.getElementById('spinnerAgregarUsuario').classList.remove('d-none');
               console.log(data);
               setTimeout(function () {
                    if (data.length > 0) {
                         alertAgregarUsuario.classList.add('alert-success');
                         alertAgregarUsuario.classList.remove('d-none');
                         alertAgregarUsuario.innerHTML = "Usuario Actualizado Correctamente";
                         padreBtnGuardar.classList.remove('d-none');
                         padreBtnActualizar.classList.add('d-none');
                         padreInputIdUsuario.classList.add('d-none');


                         document.getElementById('formAgregarUsuario').reset();

                    } else {
                         alertAgregarUsuario.classList.add('alert-danger');
                         alertAgregarUsuario.classList.remove('d-none');
                         alertAgregarUsuario.innerHTML = "Ocurrio un error a la hora de actualizar el usuario";
                    }

                    document.getElementById('spinnerAgregarUsuario').classList.add('d-none');
               }, 2000);

               setTimeout(function () {
                    alertAgregarUsuario.classList.add('d-none');
                    location.reload()
               }, 3500)
          
     })

}