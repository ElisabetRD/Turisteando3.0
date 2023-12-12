import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useCanister } from '@connect2ic/react';
import usuarioT from "./usuarioT";
import './estilos.css';
import UsuarioT from './usuarioT';

function usuarioM () {

    // Estado para el modal1
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Funciones para abrir y cerrar el modal del modal 1
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
 
   const [modalIsOpen2, setModalIsOpen2] = useState(false);
   const openModal2 = async () => {
    console.log("Abriendo modal y buscando usuarios...");
    await handleBuscarUsr(); // Realiza la búsqueda al abrir el modal
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
  };

    const [backend] = useCanister("backend");

    const [usuarios, setUsuarios] = useState([]);

    const [nombre,setnombre] = useState('')
    const [apellidop,setapellidop] = useState('')
    const [apellidom,setapellidom] = useState('')
    const [telefono,settelefono] = useState('')
    const [email,setemail] = useState('')
    const [bio,setbio] = useState('')


    const handleBuscarUsr = async () => {
        try {
          
          const result: any = await backend.buscarUsuarios(); ///agregacionde any
            setUsuarios(result.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));  // Ordenar posts por ID
        } catch(e) {
            console.log(e);
        }
    }

    const handleSubmitUsr = async (e) =>{
        e.preventDefault();
        try{
            const result = await backend.crearUsuario(
                nombre,
                apellidop,
                apellidom,
                telefono,
                email,
                bio)
            console.log(result)
        }catch(error){
            console.error(error)
        }
        
    }

    const modalContentClass = usuarios.length > 1 ? 'many-records' : '';

 return (
    <div>
      {/* Otros componentes */}
      <button className='button'  onClick={openModal}>Agregar Usuario</button>
      <button className='button' onClick={openModal2}>Buscar Usuario</button>

    <Modal isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal 1"
        className="custom-modal">
    <button className="modal-items-button" onClick={closeModal}>X</button>
    <form onSubmit={handleSubmitUsr}>
        
        {/* Campos del formulario */}
        <br></br><label id="modal-items-text">Usuario: {nombre}</label>
        <br></br><label>Introduce el nombre</label>
        <br></br><label id="modal-items-text">Nombre</label>
        <br></br><input id="nombre" className="modal-items2" placeholder='Nombre' value={nombre} onChange={(e) => setnombre(e.target.value)}/>
        <br></br><label id="modal-items-text">Apellido Paterno</label>
        <br></br><input id="apellidop" className="modal-items2" placeholder='Apellido Paterno' value={apellidop} onChange={(e) => setapellidop(e.target.value)}/>
        <br></br><label id="modal-items-text">Apellido Materno</label>
        <br></br><input id="apellidom"  className="modal-items2" placeholder='Apellido Materno' value={apellidom} onChange={(e) => setapellidom(e.target.value)}/>
        <br></br><label id="modal-items-text">Teléfono</label>
        <br></br><input id="telefono" className="modal-items2" placeholder='Teléfono' value={telefono} onChange={(e) => settelefono(e.target.value)}/>
        <br></br><label id="modal-items-text">Correo</label>
        <br></br><input id="email"  className="modal-items2" placeholder='Correo' value={email} onChange={(e) => setemail(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce una descripcion</label>
        <br></br><input id="tipo"  className="modal-items2" placeholder='Tipo' value={bio} onChange={(e) => setbio(e.target.value)}/>
        <br></br><br></br><button id='button' type="submit">Enviar</button>
    </form>

    

    </Modal>

    {/* Buscar Usuario */}
    <Modal isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        contentLabel="Modal 2"
        className={`custom-modal modal-content ${modalContentClass}`}>   
          <button className="modal-items-button" onClick={closeModal2}>X</button>
          <div className="user-records-container">
          {usuarios.map((usuario) => (
      <div key={usuario[0]} className="user-record">
        <UsuarioT usuario = {usuario} refresh={handleBuscarUsr} />
        </div>
    ))}
  </div>
    </Modal>

    </div>
  );
}


export default usuarioM;