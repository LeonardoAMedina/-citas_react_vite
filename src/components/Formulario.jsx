// importo los hooks
import { useState, useEffect } from 'react'
import Error from './Error';

const Formulario = ( {pacientes, setPacientes, paciente, setPaciente} ) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta, setAlta] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    // proceso los objetos que quiero manejar el cambio
    useEffect(() => {
        // paso los valores del paciente editado al formulario
        if ( Object.keys(paciente).length > 0 ) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setAlta(paciente.alta);
            setSintomas(paciente.sintomas);
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando formuario!!!");

        //Validacion basica
        if ( [nombre, propietario, email, alta, sintomas].includes('') ) {
            console.log('hay almenos un imput vacio');
            setError(true);
            return;
        }
        setError(false);

        // objeto de pacient, al tener los mismos nombres 
        // definidos en useState se bindean automaticamente
        const objetoPaciente= {
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }
        
        // verifico si es una edicion o nuevo
        if (paciente.id) {
            // Editando !!!
            // paciente es el objeto actualizado mientras el objetoPaciente
            // es el que queremos actualizar
            objetoPaciente.id = paciente.id;
            console.log("Editando");

            const pacientesActualizados = pacientes.map( pacienteState => 
                pacienteState.id === paciente.id ? objetoPaciente : pacienteState );
            
            // termino la actualizacion pasando al state
            setPacientes(pacientesActualizados);
            // limpio el paciente en memoria que ya no necesito
            setPaciente({});
        } else {
            // Creando !!!
            objetoPaciente.id = generarId();
            // esta es la forma de pasar un objeto inmutable en react
            // estamos agregando info del state
            // ... pacientes copia el array donde se le pasa el nuevo objetoPacientes
            setPacientes([... pacientes, objetoPaciente]);
        }


        // reiniciar formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setAlta('');
        setSintomas('');
    }

    return (
    <div className='md:w-1/2 lg:w-2/5'>
        <h2 className='font-black text-3xl text-center'>
            Seguimiento Paciente</h2>

            <p className='text-lg mt-5 text-center mb-10'>
                Añade Paciente y {''}
                <span className='text-indigo-600 font-bold'>
                    Administralos
                </span>
            </p>

            <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'
                onSubmit={handleSubmit}
            >
                {error && 
                    <Error><p>Todos los campos son obligatorios</p></Error>
                }

                <div className='mb-5'>
                    <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
                        Nombre Mascota:
                    </label>
                    <input id='mascota' type="text" placeholder='Nombre de la Mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rouneded-md'
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value) }/>
                </div>

                <div className='mb-5'>
                    <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
                        Nombre Propietario:
                    </label>
                    <input id='propietario' type="text" placeholder='Nombre del propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rouneded-md'
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value) }/>
                </div>

                <div className='mb-5'>
                    <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
                        email contacto:
                    </label>
                    <input id='email' type="email" placeholder='email'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rouneded-md'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }/>
                </div>

                <div className='mb-5'>
                    <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
                        Alta:
                    </label>
                    <input id='alta' type="date" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rouneded-md'
                        value={alta}
                        onChange={ (e) => setAlta(e.target.value) }/>
                    
                </div>

                <div className='mb-5'>
                    <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
                        Sintomas:
                    </label>
                    <textarea id='sintomas' placeholder='Describe los sintomas'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rouneded-md'
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value) }
                    />
                    
                    <input
                        type="submit"
                        className=' bg-indigo-600 w-full p-3 text-white uppercase font-bold
                        hover:bg-indigo-700 cursor-pointer transition-colors'
                        value="Agregar Paciente"
                    />
                </div>

            </form>
    </div>
  )
}

export default Formulario