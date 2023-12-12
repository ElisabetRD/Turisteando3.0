import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useCanister } from '@connect2ic/react';
import  ServicioT  from "./ServicioT";
import './estilos.css';

function ServicioM () {
     // Estado para el modal3
  const [modalIsOpen3, setModalIsOpen3] = useState(false);

  // Funciones para abrir y cerrar el modal del modal 1
  const openModal3 = () => {
    setModalIsOpen3(true);
  };

  const closeModal3 = () => {
    setModalIsOpen3(false);
  };

   // Estado para el modal2
   const [modalIsOpen4, setModalIsOpen4] = useState(false);

   // Funciones para abrir y cerrar el modal
   const openModal4 = async () => {
    console.log("Abriendo modal y buscando eventos...");
    await handleBuscarEv(); // Realiza la búsqueda al abrir el modal
    setModalIsOpen4(true);
  };

  const closeModal4 = () => {
    setModalIsOpen4(false);
  };
      

    const [backend] = useCanister("backend");

    const [servicio, setservicio] = useState([]);

    const [id,setid] = useState('')
    const [nombre,setnombre] = useState('')
    const [tipo,settipo] = useState('')
    const [descripcion,setdescripcion] = useState('')
    const [ubicacion,setubicacion] = useState('')
    const [precio,setprecio] = useState('')

    const handleBuscarEv = async () => {
        try {
            const result: any = await backend.buscarUsuarios(); ///agregacionde any
            setservicio(result.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));  // Ordenar posts por ID

        } catch(e) {
            console.log(e);
        }
    }

    const handleSubmitEv = async (e) =>{
        e.preventDefault();
        try{
            const result = await backend.crearservicio(
                id,
                nombre,
                tipo,
                descripcion,
                ubicacion,
                precio)
            console.log(result)
        }catch(error){
            console.error(error)
        }
        
    }

    const modalContentClass = servicio.length > 1 ? 'many-records' : '';

 return (
    <div>
      {/* Otros componentes */}

      <button className='button' onClick={openModal3}>Agregar servicio</button>

      <button className='button' onClick={openModal4}>Buscar servicio</button>   
    

    <Modal isOpen={modalIsOpen3}
        onRequestClose={closeModal3}
        contentLabel="Modal 3"
        className="custom-modal">

        <button className="modal-items-button" onClick={closeModal3}>X</button>
        {/* Campos del formulario */}
        <form onSubmit={handleSubmitEv}>
        <div>
        <br></br><br></br><label id="modal-items-text">Introduce el id</label>
        <br></br><input id="id"  className="modal-items"placeholder='id' value={id} onChange={(e) => setid(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce el nombre</label>
        <br></br><input id="nombre"  className="modal-items"placeholder='nombre' value={nombre} onChange={(e) => setnombre(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce el tipo</label>
        <br></br><input id="tipo"  className="modal-items"placeholder='tipo' value={tipo} onChange={(e) => settipo(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce la descripcion</label>
        <br></br><input id="descripcion" className="modal-items" placeholder='descripcion' value={descripcion} onChange={(e) => setdescripcion(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce la ubicacion</label>
        <br></br><input id="ubicacion" className="modal-items"placeholder='ubicacion' value={ubicacion} onChange={(e) => setubicacion(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce el precio</label>
        <br></br><input id="precio" className="modal-items" placeholder='precio' value={precio} onChange={(e) => setprecio(e.target.value)}/>
        <br></br><br></br><button id='button' type="submit">Enviar</button>
        </div>
        </form>
    </Modal>
    {/* Buscar Evento */}
    <Modal isOpen={modalIsOpen4}
        onRequestClose={closeModal4}
        contentLabel="Modal 4"
        className={`custom-modal modal-content ${modalContentClass}`}>
        <button className="modal-items-button" onClick={closeModal4}>X</button>
               <div className="user-records-container">
    {servicio.map((Evento) => (
<div key={servicio[0]} className="user-record">
  <ServicioT servicio={servicio} refresh={handleBuscarEv} />
  </div>
))}
</div>
</Modal>
</div>
    
  );
}


export default ServicioM;