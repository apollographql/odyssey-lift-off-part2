const prisma = new PrismaClient()

async function registerSeller(id) {
  const seller = await prisma.seller.findUnique({
    where: { id },
  })
  return seller
}
