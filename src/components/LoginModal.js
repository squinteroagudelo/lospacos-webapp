import React, { useState, useEffect } from 'react';
import {Form, FormGroup, FormLabel, FormControl, Modal, Button  } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

function LoginModal(props){
    const[email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const[errorEmail, seterrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);


    const handleOnChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
    
        switch(name) {
            case "email":
                setEmail(value ? value : null);
                break;
            case "password":
                setPassword(value ? value : null);
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


    return(
        <Modal backdrop="static" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>

                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl 
                            type ="email"
                            name="email"
                            onChange={(e) => handleOnChange(e)}
                            value={email ? email : ""}/>
                        <span className="text-danger">{errorEmail}</span>    
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            password
                        </FormLabel>
                        <FormControl 
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            value={password ? password : ""}/>
                         <span className="text-danger">{errorPassword}</span> 
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleClose}>
                    Close</Button>
                <Button 
                    variant="success"
                    onClick={handleLogin}> 
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
} 
export default LoginModal;