// ver que Header recibe los porps, siempre se llaman asi 'props'
function Header(props) {

    console.log(props);

    return (
        <h1 className="font-back text-5xl text-center md:w-2/3 mx-auto">
            Seguimiento Pacientes {" "}
            <span className="text-indigo-600">Veterinaria</span>
        </h1>
        )
}

export default Header
