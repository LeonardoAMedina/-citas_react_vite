import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  
  // Hook
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  // este useEfect va a obtener lo que se encuentre en localStorage, se ejectuta
  // por primera vez y inicializa el segundo localStorage
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS);
    }
    obtenerLS();
  }, []);

  useEffect(() => {    
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes]);

  const eliminarPaciente = (id) => { 
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );
    setPacientes(pacientesActualizados);
  }

  // Ejemplo props
  const imprime2mas2 = () => {
    console.log(2 + 2);
    
  }

  return (
    <div className="container mx-auto mt-20">
      #-- ejemplo props --
      <Header 
        numero= {1}
        isAdmin={false}
        fn={imprime2mas2}
      />

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          // paso setPaciente para limpiarlo en memoria del
          // formulario en una actualizacion
          setPaciente = {setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
