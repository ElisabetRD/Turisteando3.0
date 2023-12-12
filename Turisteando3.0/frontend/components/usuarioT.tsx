import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";
import './estilos.css';


function usuarioT (props) {
    const { usuario, refresh} = props;

    const [backend] = useCanister("backend");

    const [nombre,setnombre] = useState(usuario[1].nombre)
    const [apellidoP,setapellidoP] = useState(usuario[1].apellidoP)
    const [apellidoM,setapellidoM] = useState(usuario[1].apellidomM)
    const [telefono,settelefono] = useState(usuario[1].telefono)
    const [email,setemail] = useState(usuario[1].email)
    const [bio,setbio] = useState(usuario[1].bio)

    const [visible, setVisible] = useState(false);

    const [update, setUpdate] = useState(false);

    const handleUpdateUsr = async (servicio) => {
        servicio.preventDefault();

        try {
            await backend.actualizarUsuario(
                usuario[0], 
                nombre,
                apellidoP,
                apellidoM,
                telefono,
                email,
                bio);
            await refresh();
        } catch(e) {
            console.log(e);
        } finally {
            setVisible(false);
        }
    }

    const handleDeleteUsr = async (servicio) => {
        servicio.preventDefault();
        try {
            await backend.eliminarUsuario(usuario[0]);
            await refresh();
        } catch(e) {
            console.log(e);
        } finally {
            setVisible(false);
        }
    }


  return (
    <div>
        <div>
        <br></br><label id="modal-items-text">Usuario: {nombre}</label>
        <br></br><label>Introduce el nombre</label>
        <br></br><label id="modal-items-text">Nombre</label>
        <br></br><input id="nombre" className="modal-items2" placeholder='Nombre' value={nombre} onChange={(e) => setnombre(e.target.value)}/>
        <br></br><label id="modal-items-text">Apellido Paterno</label>
        <br></br><input id="apellidop" className="modal-items2" placeholder='Apellido Paterno' value={apellidoP} onChange={(e) => setapellidoP(e.target.value)}/>
        <br></br><label id="modal-items-text">Apellido Materno</label>
        <br></br><input id="apellidom"  className="modal-items2" placeholder='Apellido Materno' value={apellidoM} onChange={(e) => setapellidoM(e.target.value)}/>
        <br></br><label id="modal-items-text">Teléfono</label>
        <br></br><input id="telefono" className="modal-items2" placeholder='Teléfono' value={telefono} onChange={(e) => settelefono(e.target.value)}/>
        <br></br><label id="modal-items-text">Correo</label>
        <br></br><input id="email"  className="modal-items2" placeholder='Correo' value={email} onChange={(e) => setemail(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce una descripcion</label>
        <br></br><input id="tipo"  className="modal-items2" placeholder='Tipo' value={bio} onChange={(e) => setbio(e.target.value)}/>
        <br></br><br></br>
        <div style={{display:'flex' ,flexDirection:'row'}}><button id='button' onClick={handleUpdateUsr}>Actualizar</button>
        <button id='button' onClick={handleDeleteUsr}>Borrar</button></div>
        
        </div>


    </div>
  )
}

export default usuarioT;