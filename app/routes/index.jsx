import { getGuitarras } from "~/models/guitarras.server"
import { getPosts } from "~/models/posts.server";
import { getCursos } from "~/models/cursos.server";

import { useLoaderData } from '@remix-run/react';
import ListadoGuitarras from "~/components/listado-guitarras";
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCursos from '~/styles/curso.css'
import ListadoPosts from "~/components/listado-posts";
import ListadoCursos from "~/components/listado-cursos";


export function meta() {
  return {
    title: 'GuitarLA - Tienda Guitarras',
    description: 'Venta de guitarras y más'
  }
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCursos
    }
  ]
}

export async function loader() {
  const [guitarras, posts, cursos] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCursos()
  ])
  //Esto esta bien pero no es recomendable ya que tanto guitarras y los post son indenpendientes se pueden llmar al mismo tiempo y no es necesario qyue esperea que uno se carge primero 
  /*   const guitarras = await getGuitarras();
    const posts = await getPosts();*/

  /* console.log(posts);
  console.log(guitarras); 
  console.log(cursos); */
  return {
    guitarras: guitarras.data,
    posts: posts.data,
    cursos: cursos.data
  }
}



function Index() {

  const { guitarras, posts, cursos } = useLoaderData();


  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>
      <ListadoCursos 
      cursos={cursos.attributes}
      />
     

      <section className="contenedor">
        <ListadoPosts
          posts={posts}
        />
      </section>




    </>
  )
}

export default Index