const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')

const typeDefs = `
    type Curso {
        id:ID!
        titulo: String!
        descripcion: String!
        profesor: Profesor
        rating: Float
        comentarios: [Comentario]
    }

    type Profesor {
        id: ID!
        nombre: String! @deprecated
        # nation
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }

    enum Genero {
        
        MASCULINO
        FEMENINO
    }

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        comentarios: [Comentario]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }
`

const cursos = [{
    id: 1,
    titulo: 'GraphQL',
    descripcion: 'GraphQL server for responding queries'
},{
    id: 2,
    titulo: 'React Native',
    descripcion: 'Create mobile apps using your React skills'
}]

const profesores = [
    {
        id:1,
        nombre:'Luis',
        nacionalidad: 'Venezolano',
    },
    {
        id:2,
        nombre:'Alexander',
        nacionalidad: 'Ruso',
    }
]

const comentario =[
    {
        id: 1,
        nombre: 'szluis',
        cuerpo: 'me pareció genial'
    },
    {
        id: 2,
        nombre: 'lsalazar',
        cuerpo: 'excelente material'

    }
]

const profesor =
    {
        id: 1,
        nombre:'Luis',
        nacionalidad: 'Venezolano',
    }
const resolvers = {
    Query:{
        cursos: () => cursos,
        profesores: () => profesores,

    },

    Curso:{
        profesor: () => profesor,
        comentarios: () => comentario
    }

}



const schema = makeExecutableSchema({ typeDefs, resolvers })

addMockFunctionsToSchema({
    schema,
    mocks:{
        Curso: () => {
            return {
                id: casual.uuid,
                titulo: casual.sentence,
                descripcion: casual.sentences(2)
            }            
        },
        Comentario: () => {
            return {
                id: casual.uuid,
                nombre: casual.name,
                cuerpo: casual.sentences(2)
            }
        },
        Profesor: () => {
            return {
                id: casual.uuid,
                nombre: casual.name,
                nacionalidad: casual.country
            }
        }
    },
    preserveResolvers:false
})

module.exports = schema