const { makeExecutableSchema } = require('graphql-tools')

// const { gql, addMockFunctionsToSchema, makeExecutableSchema } = require('apollo-server-express')
const casual = require('casual')

const typeDefs = gql`
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
// const schema = makeExecutableSchema({typeDefs})



// const schema = makeExecutableSchema({ typeDefs })

module.exports = typeDefs