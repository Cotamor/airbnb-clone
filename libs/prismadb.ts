import { PrismaClient } from '@prisma/client'

// global definetion of prisma
declare global {
  var prisma: PrismaClient | undefined
}

// nextjs hot reload creates bunch of new PrismaClient, this will avoid it while development
const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb
