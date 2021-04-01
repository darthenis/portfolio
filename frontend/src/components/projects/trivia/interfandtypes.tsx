

export interface questions {

  pregunta: string,

  opcion1: string,

  opcion2: string,

  opcion3: string,

  opcion4: string,

  correcta: number,


}

export interface players {

  nombre: string,

  edad: number,

  pais: string,

  dificultad: string,

  aciertos: number

}

export type Pages = {
  page1: boolean,
  page2: boolean,
  page3: boolean,
  page4: boolean,
  page5: boolean,

}


export type User = {
  nombre: string,
  edad: string,
  pais: string,
  dificultad: string,
  aciertos: number
}

