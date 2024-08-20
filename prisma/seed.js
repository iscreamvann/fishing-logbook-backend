import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function seed() {
  const user1 = await createUser(
    'kyle@test.com',
    'test123',
    'Kyle',
    'Vann',
  )

  const user2 = await createUser(
    'test@test.com',
    'test123',
    'Test',
    'User',
  )

  const fish1 = await createFish({
    name:"Test Fish",
    breed:"Catfish",
    weight: 2.4,
    location: "Bletchley",
    userId: user1.id,
    catchBait: "Loud Shouting"
  })

  const fish2 = await createFish({
    name:"Stink Joe",
    breed:"Guppy",
    weight: 0.1,
    location: "Bletchley",
    userId: user1.id,
    catchBait: "Mcdonalds"
  })

  const fish3 = await createFish({
    name:"Stupid Fish",
    breed:"Goldfish",
    weight: 0.1,
    location: "Fish Tank",
    userId: user2.id,
    catchBait: "Swam into net"
  })


  process.exit(0)
}

async function createUser(
  email,
  password,
  firstName,
  lastName,
) {
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 8),
      profile: {
        create: {
          firstName,
          lastName,
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.info(`user created`, user)

  return user
}

async function createFish({
  name,
  breed,
  weight,
  location,
  userId,
  catchBait
}) {

  const fish = await prisma.fish.create({
    data: {
      name,
      breed,
      weight,
      location,
      userId,
      catchBait,
    },
  })

  console.info(`fish created`, fish)

  return fish
}



seed().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
