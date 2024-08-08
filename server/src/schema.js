// // Define schema and resolvers
// export const typeDefs = gql`
//   type User {
//     name: String
//     id: Int
//     token: String
//   }

//   type Query {
//     register(id: Int, name: String, password: String): User
//   }

//   type Mutation {
//     login(id: Int, password: String): User
//   }
// `

// // Array to simulate a user database
// const storedUsers = []

// // JWT secret key (for demo purposes, should be stored securely)
// const secretKey = new TextEncoder().encode("your_jwt_secret_key")

// // Function to generate JWT
// const generateToken = async (payload) => {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("1h")
//     .sign(secretKey)
// }

// // Function to verify JWT
// const verifyToken = async (token) => {
//   try {
//     const { payload } = await jwtVerify(token, secretKey)
//     return payload
//   } catch (err) {
//     console.error("JWT verification failed:", err)
//     throw new Error("Invalid token")
//   }
// }

// // Dummy function to simulate password verification
// const verifyPassword = (storedPassword, inputPassword) => {
//   return storedPassword === inputPassword
// }

// export const resolvers = {
//   Query: {
//     register: async (_parent, args) => {
//       const { id, name, password } = args

//       // Check if user already exists
//       const existingUser = storedUsers.find((user) => user.id === id)
//       if (existingUser) {
//         throw new Error("User already exists. Please login.")
//       }

//       // Hash the password and add user to the array
//       const passwordHash = await bcrypt.hash(password, 10)
//       storedUsers.push({ id, name, password: passwordHash })

//       // Generate JWT token
//       const token = await generateToken({ id, name })
//       return {
//         name,
//         id,
//         token,
//       }
//     },
//   },
//   Mutation: {
//     login: async (_parent, args) => {
//       const { id, password } = args

//       // Find user by id
//       const user = storedUsers.find((user) => user.id === id)

//       // Check if user exists and password is correct
//       if (user && (await bcrypt.compare(password, user.password))) {
//         // Generate JWT token
//         const token = await generateToken({ id: user.id, name: user.name })

//         return {
//           name: user.name,
//           id: user.id,
//           token,
//         }
//       } else {
//         throw new Error("Invalid credentials")
//       }
//     },
//   },
// }

import { PrismaClient } from "@prisma/client"
import { SignJWT } from "jose"
import bcrypt from "bcrypt"
import { gql } from "graphql-tag"
const prisma = new PrismaClient()

// JWT secret key (for demo purposes, should be stored securely)
const secretKey = new TextEncoder().encode("your_jwt_secret_key")

export const typeDefs = gql`
  type Seller { name: String
    id: Int
    token: String
    role: String
  }

  type Query {
    registerSeller(id: Int, name: String, password: String): Seller
  }

  type Mutation {
    loginSeller(id: Int, password: String): Seller
    registerSeller(id: Int, name: String, password: String): Seller
  }
`

const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey)
}

export const resolvers = {
  Query: {
    registerSeller: async (_parent, args) => {
      const { id, name, password } = args
      const role = "SELLER" // Role for shopkeepers

      return registerSellerWithRole({ id, name, password, role })
    },
  },
  Mutation: {
    loginSeller: async (_parent, args) => {
      const { id, password } = args

      // Find seller by id
      const seller = await prisma.seller.findUnique({
        where: { id },
      })

      // Check if seller exists and password is correct
      if (seller && (await bcrypt.compare(password, seller.password))) {
        const token = await generateToken({
          id: seller.id,
          name: seller.name,
          role: seller.role,
        })

        return { name: seller.name, id: seller.id, token, role: seller.role }
      } else {
        throw new Error("Invalid credentials")
      }
    },
    registerSeller: async (_parent, args) => {
      const { id, name, password } = args
      const role = "SELLER" // Role for shopkeepers

      return registerSellerWithRole({ id, name, password, role })
    },
  },
}

const registerSellerWithRole = async ({ id, name, password, role }) => {
  const existingSeller = await prisma.seller.findUnique({
    where: { id },
  })

  if (existingSeller) {
    throw new Error("Seller already exists. Please login.")
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const seller = await prisma.seller.create({
    data: { id, name, password: passwordHash, role },
  })

  const token = await generateToken({
    id: seller.id,
    name: seller.name,
    role: seller.role,
  })
  return { name: seller.name, id: seller.id, token, role: seller.role }
}
