
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";


actor Turisteando {
  type UserId = Nat32;
  type Usuario = {
      
      nombre: Text;
      apellidoP: Text;
      apellidoM: Text;
      telefono: Text;
      email: Text;
      bio: Text;
    };

  stable var userId: UserId = 0;
  let usuarioList = HashMap.HashMap<UserId, Usuario>();

  func crearUsuario(nombre: Text, apellidoP: Text, apellidoM: Text, telefono: Text, email: Text, bio: Text): async Usuario {
    userId := userId + 1;
    let usuario: Usuario = {
      id = userId;
      nombre = nombre;
      apellidoP = apellidoP;
      apellidoM = apellidoM;
      telefono = telefono;
      email = email;
      bio = bio;
    };
    await usuarioList.put(userId, usuario);
    return usuario;
  };

  func buscarUsuario(id: UserId): async ?Usuario {
    let usuario = await usuarioList.get(id);
    return usuario;
  };

   public func verificarCuentaUsuario(id:Text) : async Text {
    let u: ?Usuario = usuarios.get(id);
    if (u != null) {
      return "¡Verificada!";
    } else {
      return "No verificada, intenta de nuevo.";
    }
  };

  func actualizarUsuario(id: Text, nombre: Text, apellidoP: Text, apellidoM: Text, telefono: Text, email: Text, bio: Text): async ?() {
    let usuario = await usuarioList.get(id);
    if (usuario == null) {
      return null;
    } else {
      let usuarioActualizado: Usuario = {
        id = id;
        nombre = nombre;
        apellidoP = apellidoP;
        apellidoM = apellidoM;
        telefono = telefono;
        email = email;
        bio = bio;
      };
      await usuarioList.put(id, usuarioActualizado);
      return ?();
    }
  };

  func eliminarUsuario(id: Text): async () {
    await usuarioList.delete(id);
  };

  type ServicioId = Nat32;
type Servicio = {
		
		nombre: Text;
   		tipo: Text;
		descripcion: Text;
   		ubicacion: Text;
    	precio: Text;
	};

stable var servicioId: ServicioId = 0;
let servicioList = HashMap.HashMap<ServicioId, Servicio>();

func crearServicio(nombre: Text, tipo: Text, descripcion: Text, ubicacion: Text, precio: Text): async Servicio {
	servicioId := servicioId + 1;
	let servicio: Servicio = {
		id = servicioId;
		nombre = nombre;
		tipo = tipo;
		descripcion = descripcion;
		ubicacion = ubicacion;
		precio = precio;
	};
	await servicioList.put(servicioId, servicio);
	return servicio;
};

func buscarServicio(id: ServicioId): async ?Servicio {
	let servicio = await servicioList.get(id);
	return servicio;
};

func actualizarServicio(id: ServicioId, nombre: Text, tipo: Text, descripcion: Text, ubicacion: Text, precio: Text): async ?() {
	let servicio = await servicioList.get(id);
	if (servicio == null) {
		return null;
	} else {
		let servicioActualizado: Servicio = {
			id = id;
			nombre = nombre;
			tipo = tipo;
			descripcion = descripcion;
			ubicacion = ubicacion;
			precio = precio;
		};
		await servicioList.put(id, servicioActualizado);
		return ?();
	}
};

func eliminarServicio(id: ServicioId): async () {
	await servicioList.delete(id);
};
// Definición de tipo para los comentarios
type ComentarioId = Nat32;
type Comentario = {
	id: ComentarioId;
	servicioId: ServicioId;
	texto: Text;
};

// Variable para almacenar los comentarios
let comentarioList = HashMap.HashMap<ComentarioId, Comentario>();

// Función para insertar un comentario
func insertarComentario(servicioId: ServicioId, texto: Text): async Comentario {
	var comentarioId = comentarioList.size();
	comentarioId := comentarioId + 1;
	let comentario: Comentario = {
		id = comentarioId;
		servicioId = servicioId;
		texto = texto;
	};
	await comentarioList.put(comentarioId, comentario);
	return comentario;
};

// Función para calificar un servicio
func calificarServicio(id: ServicioId, calificacion: Float): async ?() {
	let servicio = await servicioList.get(id);
	if (servicio == null) {
		return null;
	} else {
		servicio.calificacion := calificacion;
		await servicioList.put(id, servicio);
		return ?();
	}
};
}
