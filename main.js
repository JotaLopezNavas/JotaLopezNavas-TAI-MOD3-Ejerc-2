// 1. Simulamos la base de datos con un array de objetos
const usuariosDB = [
  { id: 1, nombre: 'Ana', correo: 'ana@example.com' },
  { id: 2, nombre: 'Carlos', correo: 'carlos@example.com' },
  { id: 3, nombre: 'Luis', correo: 'luis@example.com' }
];

// 2. Creamos la función que devuelve la promesa
function buscarUsuarioPorId(id) {
  return new Promise((resolve, reject) => {
    
    // Opcional: Usamos setTimeout para simular el tiempo que tarda 
    // una base de datos real en responder (1 segundo en este caso)
    setTimeout(() => {
      // Buscamos el usuario en nuestro array
      const usuario = usuariosDB.find(u => u.id === id);

      if (usuario) {
        // Si el usuario existe, la promesa se cumple (resolve)
        resolve(usuario);
      } else {
        // Si no existe, la promesa se rechaza (reject) con un error
        reject(`Error: No se encontró ningún usuario con el ID ${id} en la base de datos.`);
      }
    }, 1000); 

  });
}

// 3. Consumimos la promesa usando async/await y try/catch
async function mostrarUsuario(id) {
  try {
    console.log(`Buscando en la base de datos al usuario ${id}...`);
    
    // Pausamos la ejecución hasta que la promesa se resuelva o se rechace
    const datosUsuario = await buscarUsuarioPorId(id);
    
    // Si llegamos a esta línea, es porque la promesa se resolvió con éxito
    console.log('¡Usuario encontrado, hermano!', datosUsuario);
    
  } catch (error) {
    // Si la promesa es rechazada, el flujo salta directamente a este bloque catch
    console.error(error);
  }
}

// --- Ejecución de las pruebas ---

// Caso de éxito: El ID 2 existe en nuestro array
mostrarUsuario(2); 

// Caso de error: El ID 5 NO existe en nuestro array
// Lo ejecutamos con un pequeño retraso solo para que los console.log no se mezclen en la terminal
setTimeout(() => {
  mostrarUsuario(5);
}, 2000);