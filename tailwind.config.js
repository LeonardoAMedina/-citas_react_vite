module.exports = {
  // esto monta la aplicacion en index.html y busca todos los archivos
  // de src con extension jsx para eliminar todos los estilos sin usar
  content: [
    "./index.html", "./src/**/*.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
