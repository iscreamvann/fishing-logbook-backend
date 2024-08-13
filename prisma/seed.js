import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function seed() {
  const student = await createUser(
    'student@test.com',
    'Testpassword1!',
    'Joe',
    'Bloggs',
  )


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

seed().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
