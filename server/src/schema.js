import { gql } from "graphql-tag"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcrypt"

// Define schema and resolvers
export const typeDefs = gql`
  type User {
    name: String
    id: Int
    token: String
  }

  type Query {
    register(id: Int, name: String, password: String): User
  }

  type Mutation {
    login(id: Int, password: String): User
  }
`

// Array to simulate a user database
const storedUsers = []

// JWT secret key (for demo purposes, should be stored securely)
const secretKey = new TextEncoder().encode("your_jwt_secret_key")

// Function to generate JWT
const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey)
}

// Function to verify JWT
const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (err) {
    console.error("JWT verification failed:", err)
    throw new Error("Invalid token")
  }
}

// Dummy function to simulate password verification
const verifyPassword = (storedPassword, inputPassword) => {
  return storedPassword === inputPassword
}

export const resolvers = {
  Query: {
    register: async (_parent, args) => {
      const { id, name, password } = args

      // Check if user already exists
      const existingUser = storedUsers.find((user) => user.id === id)
      if (existingUser) {
        throw new Error("User already exists. Please login.")
      }

      // Hash the password and add user to the array
      const passwordHash = await bcrypt.hash(password, 10)
      storedUsers.push({ id, name, password: passwordHash })

      // Generate JWT token
      const token = await generateToken({ id, name })
      return {
        name,
        id,
        token,
      }
    },
  },
  Mutation: {
    login: async (_parent, args) => {
      const { id, password } = args

      // Find user by id
      const user = storedUsers.find((user) => user.id === id)

      // Check if user exists and password is correct
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const token = await generateToken({ id: user.id, name: user.name })

        return {
          name: user.name,
          id: user.id,
          token,
        }
      } else {
        throw new Error("Invalid credentials")
      }
    },
  },
}
