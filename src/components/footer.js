import React from 'react';
import { Row, Button, Navbar } from 'react-bootstrap';
import LogoApp from '../assets/img/logolospacos.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhoneAlt, faClock, faMapMarkedAlt, faAt } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (

    <div className="mt-3 py-3 px-5 text-dark footer">
        <div className="row">
            <div className="col-sm-4 mb-2 mb-sm-0">
                <Navbar.Brand href="/">
                    <img
                        src={LogoApp}
                        width="200"
                        className="d-inline-block align-top logo-lospacos"
                        alt="Minimercado Los Pacos logo"
                    />
                </Navbar.Brand><i class="fas "></i>
                <address>
                    <p className="mb-1"><FontAwesomeIcon icon={faMapMarkedAlt} /> Carrera 36a # 38 - 54</p>
                    <p className="mb-1"><FontAwesomeIcon icon={faPhoneAlt} /> (4) 2167147</p>
                    <p className="mb-1"><FontAwesomeIcon icon={faWhatsapp} /> (+57) 3006011632</p>
                    <h6 className="text-dark">Medellín - Colombia</h6>
                    <p className="mt-n2 mb-1">Barrio El Salvador</p>
                </address>
            </div>

            <div className="col-sm-4 mb-2 mb-sm-0">
                <div>
                    <h5>HORARIO DE ATENCIÓN</h5>
                    <p className="mb-1"><FontAwesomeIcon icon={faClock} /> Horario de atención</p>
                    <p className="mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} /> Lun. A Dom. 8:30am — 11:30pm </p>
                </div>
                <hr/>
                <div>
                    <h6>PAC BANCOLOMBIA</h6>
                    <p className="mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} /> Lun. A Sáb. 11:00am — 7:00pm</p>
                </div>
            </div>

            <div className="col-sm-4 mb-2 mb-sm-0 mt-3 mt-sm-0">
                <address>
                    <h5>DESARROLLADORES</h5>
                    <h6 className="text-muted">Información de contacto</h6>
                    <p className="d-inline-block">John Esteban Álvarez Piedrahita</p>
                    <span><FontAwesomeIcon icon={faAt} /> esteban.ea145@gmail.com</span>
                    <span><FontAwesomeIcon icon={faPhoneAlt} /> 3215801523</span>
                    <p className="d-inline-block">Samuel Ricardo Quintero Agudelo</p>
                    <span><FontAwesomeIcon icon={faAt} /> squinteroagudelo18@gmail.com</span>
                    <span><FontAwesomeIcon icon={faPhoneAlt} /> 3207101960</span>
                </address>
            </div>

            {/*
            <div className="col col-sm-2 mb-3 mb-sm-0 pl-lg-4">
                <h5>Mapa del sitio</h5>
                <div className="d-flex flex-sm-column flex-wrap justify-content-center">

                    <p className="mb-0 mr-4">
                        <input type={Button} className="nav-link bg-transparent border-0 p-0" value="Inicio" onclick="google.script.run.withSuccessHandler(actualizarBody).withUserObject(this).getPage('home')" />
                    </p>
                    <p className="mb-0 mr-4">
                        <input type={Button} className="nav-link bg-transparent border-0 p-0" data-toggle="modal" onclick="showModal('compras')" value="Compras" />
                    </p>
                    <p className="mb-0 mr-4">
                        <input type={Button} className="nav-link bg-transparent border-0 p-0" value="Ventas" onclick="showModal('ventas')" />
                    </p>
                    <p className="mb-0 mr-4">
                        <input type={Button} className="nav-link bg-transparent border-0 p-0" value="Contacto" onclick="google.script.run.withSuccessHandler(actualizarBody).withUserObject(this).getPage('contact')" />
                    </p>
                </div>
            </div>
            */}
        </div>
    </div>
);

export default Footer;