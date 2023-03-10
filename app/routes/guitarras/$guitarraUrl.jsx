//Routin dinamico esto es para añadir mas elemtos a la tienda o a otros enlaces
import { useState } from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server';
import Exito from '~/components/Exito'


export async function loader({ params }) {

    const { guitarraUrl } = params

    const guitarra = await getGuitarra(guitarraUrl);

    if (guitarra.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Guitarra No Encontrada'

        })
    }
    return guitarra
}


export function meta({ data }) {

    if (!data) {
        return {
            title: ' GuitarLA - Guitarra No Encontrada',
            description: `Guitarras, venta de guitarras, guitarra no encontrada`
        }
    }

    return {
        title: `GuitarLA - ${data.data[0].attributes.nombre}`,
        description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre} `
    }
}


function Guitarra() {

    const { agregarCarrito } = useOutletContext()
    const [cantidad, setCantidad] = useState(0);
    const [exito, setExito] = useState(false);
    const guitarra = useLoaderData();
    const { descripcion, imagen, precio, nombre } = guitarra.data[0].attributes;

    const handleSubmit = e => {
        e.preventDefault();

        if (cantidad < 1) {
            alert('Debes de seleccionar una cantidad')
            return
        }
        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.formats.medium.url,
            nombre,
            precio,
            cantidad
        }
        setExito(true)
        setTimeout(() => {
            setExito(false)
        }, 5000);



        agregarCarrito(guitarraSeleccionada)
    }


    return (
        <div className="guitarra">

            <img className='imagen' src={imagen.data.attributes.formats.medium.url} alt={`Imagen guitarra ${nombre}`} />
            <div className="contenido">
                {exito && <Exito  mensaje="Agregado al carrito" />}
                <h3>{nombre}</h3>

                <p className="texto">{descripcion}</p>
                <p className="precio">${precio}</p>

                <form onSubmit={handleSubmit} className='formulario'  >

                    <label htmlFor='cantidad'>Cantidad</label>

                    <select
                        onChange={e => setCantidad(parseInt(e.target.value))}
                        id='cantidad'
                    >
                        <option value="0">-- Seleccione --</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>

                    <input type="submit" value='Agregar al Carrito' />
                </form>
            </div>
        </div>
    )
}

export default Guitarra