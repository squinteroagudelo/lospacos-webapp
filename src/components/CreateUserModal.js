import React, {useState, useEffect} from 'react';
import {Modal, Button, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import UserService from '../services/UserService'
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

function CreateUserModal(props){
    // props
    const {show, handleClose} = props;
    // estados
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [address, setAddress] = useState(null);
    const [rolId, setRolId] = useState(1);
    const [rol, setRol] = useState(null);

    const[errorEmail, seterrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorRol, setErrorRol] = useState(null);

const handleOnChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    switch(name) {
        case "id":
            setId(value ? value : null);
            break;
        case "name":
            setName(value ? value : null);
            break;
        case "lastName":
            setLastName(value ? value : null);
            break;
        case "phone":
            setPhone(value ? value : null);
            break;
        case "email":
            setEmail(value ? value : null);
            break;
        case "password":
            setPassword(value ? value : null);
            break;

        case "password2":
            setPassword2(value ? value : null);
            break;
        case "address":
            setAddress(value ? value : null);
            break;
        case "rol":
            setRol(value ? value : null);
            break;
        default:
            break;
    }
}

useEffect(() =>{
    console.log(email);
    if(!email){
        seterrorEmail(null);
        
        return;
    }
   // const expression =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)-(\.\w{2,3})+$/;
   const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-.]{2,3})+$/;
    if(!expression.test(email)){
        seterrorEmail('Email no valido');
    }else{
        seterrorEmail(null);
    }
}, [email])

useEffect(() =>{
    console.log(password);
    if(!password){
        setErrorPassword(null);
        return;
    }

    console.log(password.length);

    if(password.length < 3){
        setErrorPassword('El password debe ser mayor o igual a 3 Carácteres');
    }else{
        setErrorPassword(null);
        return;
    }
}, [password])

useEffect(() =>{
    console.log(rol);
    if(!rol){
        setErrorPassword(null);
        return;
    }

    if(rol == 3){
        setRolId(3);
        return;
    }else{
        setRolId(1);
        setErrorRol('El Codigó es incorecto');
    }
}, [rol])

const handleLogin = async () => {
    console.log(email, password);
    try{
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Por favor espere...'
        });
        Swal.showLoading();

        const user ={email, password};
        const resp = await AuthService.login(user);
        Swal.close();
        console.log(resp.data);
        localStorage.setItem('token', JSON.stringify(resp.data)); //JSON.parse(''); de String a objeto
       props.handleClose();
        window.location.reload();
    }catch(error){
        Swal.close();
        console.log(error);
        Swal.fire({
            allowOutsideClick: false,
            title: 'Error',
            icon: 'error',
            text: 'Usuario y/o contraseña incorrecta'
        })
    }
}

const handleSaveUser = async (User) =>{
    
    Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Por favor espere...',
    })

    Swal.showLoading();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-1',
          cancelButton: 'btn btn-danger mr-1'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: 'Registro',
        text: "¿Quieres Registrar el nuevo usuario?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        cancelButtonText: 'No registrar',
        reverseButtons: true
 
      }).then((result) => {
        if (result.isConfirmed) {
         
            UserService.create(User)
            .then((resp) =>{
                console.log(resp)
                swalWithBootstrapButtons.fire({
                    allowOutsideClick: false,
                    title:'¡Registrado!',
                    text:'Regitrodo exitosamente',
                    icon:'success',
                    timer: 2500
                 }).then(()=>{
                    handleLogin();
                 })
                 handleClose();
            }, (err) => {
                swalWithBootstrapButtons.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Se presentó un error al registar al usuario',
                });
                console.log(err)
            });            
        } else if (
     
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            {   title: 'Los Cambios no se an guardado',     
                icon: 'info',
            })
        }
      })                         
}
    return(
        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear un usuario nuevo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>

                    <FormLabel>
                            Cedula
                        </FormLabel>
                        <FormControl 
                            name="id"
                            onChange={handleOnChange}
                            value={id ? id : ""}/>
                            

                        <FormLabel>
                            Nombre 
                        </FormLabel>
                        <FormControl 
                            name="name"
                            onChange={handleOnChange}
                            value={name ? name : ""}/>

                        <FormLabel>
                            Apellido
                        </FormLabel>
                        <FormControl 
                            name="lastName"
                            onChange={handleOnChange}
                            value={lastName ? lastName : ""}/>

                        <FormLabel>
                            Número Telefonico
                        </FormLabel>
                        <FormControl 
                            name="phone"
                            onChange={handleOnChange}
                            value={phone ? phone : ""}/>

                        <FormGroup>
                        <FormLabel>
                            Correo electronico
                        </FormLabel>
                        <FormControl 
                            name="email"
                            onChange={handleOnChange}
                            value={email ? email : ""}/>
                            <span className="text-danger">{errorEmail}</span>
                        </FormGroup>
                        <FormGroup>
                        <FormLabel>
                            Contraseña
                        </FormLabel>
                        <FormControl
                            name= "password"
                            onChange={handleOnChange}
                            value={password ? password : ""}/>
                            <span className="text-danger">{errorPassword}</span>
                        </FormGroup>
                        <FormLabel>
                            Corroborar Contraseña
                        </FormLabel>
                        <FormControl
                            name= "password2"
                            onChange={handleOnChange}
                            value={password2 ? password2 : ""}/>
                        <FormLabel>
                            Dirrecion Recidencia
                        </FormLabel>
                        <FormControl
                            name= "address"
                            onChange={handleOnChange}
                            value={address ? address : ""}/>
                         <FormLabel>
                           Codigo tipo de usuario administrador
                        </FormLabel>
                        <FormControl
                            name= "rol"
                            onChange={handleOnChange}
                            value={rol ? rol : ""}/>
     
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close</Button>
                <Button 
                    variant="success"   
                    onClick={() => handleSaveUser({
                        id,
                        name,
                        lastName,
                        phone,
                        email,
                        password,
                        address,
                        rolId:{
                            id: rolId
                        }
                    })}
                    disabled={!id || !name || !lastName || !phone || !email || !password || !address || errorEmail || errorPassword}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CreateUserModal