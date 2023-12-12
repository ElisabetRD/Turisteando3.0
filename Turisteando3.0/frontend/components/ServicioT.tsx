import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";



function ServicioT (props) {
    const { servicio , refresh} = props;

    const [backend] = useCanister("backend");

    const [id,setid] = useState(servicio[1].id)
    const [nombre,setnombre] = useState(servicio[1].nombre)
    const [tipo,settipo] = useState(servicio[1].tipo)
    const [descripcion,setdescripcion] = useState(servicio[1].descripcion)
    const [ubicacion,setubicacion] = useState(servicio[1].ubicacion)
    const [precio,setprecio] = useState(servicio[1].precio)

    const [visible, setVisible] = useState(false);

    const [update, setUpdate] = useState(false);


    const handleUpdateEv = async (servicio) => {
        servicio.preventDefault();

        try {
            await backend.actualizarservicio(
                servicio[0],
                id,
                nombre,
                tipo,
                descripcion,
                ubicacion,
                precio);
            await refresh();
        } catch(e) {
            console.log(e);
        } finally {
            setVisible(false);
        }
    }

    const handleDeleteEv = async (servicio) => {
        servicio.preventDefault();
        try {
            await backend.eliminarservicio(servicio[0]);
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
        <br></br><label>Evento: {id}</label>
        <br></br><br></br><label id="modal-items-text">Introduce el id</label>
        <br></br><input id="id" className="modal-items2" placeholder='id' value={id} onChange={(e) => setid(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce el nombre</label>
        <br></br><input id="nombre" className="modal-items2" placeholder='nombre' value={nombre} onChange={(e) => setnombre(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce el tipo</label>
        <br></br><input id="tipo" className="modal-items2" placeholder='tipo' value={tipo} onChange={(e) => settipo(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce la descripcion</label>
        <br></br><input id="descripcion" className="modal-items2" placeholder='descripcion' value={descripcion} onChange={(e) => setdescripcion(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce la ubicacion</label>
        <br></br><input id="ubicacion" className="modal-items2" placeholder='ubicacion' value={ubicacion} onChange={(e) => setubicacion(e.target.value)}/>
        <br></br><label id="modal-items-text">Introduce la precio</label>
        <br></br><input id="precio" className="modal-items2" placeholder='precio' value={precio} onChange={(e) => setprecio(e.target.value)}/>
        <br></br><br></br>
        
        <div style={{display:'flex' ,flexDirection:'row'}}>
        <button  id='button'onClick={handleUpdateEv}>Actualizar</button>
                <button id='button' onClick={handleDeleteEv}>Borrar</button>
        </div>
        </div>

        
        

        
    </div>
  )
}

export default ServicioT;