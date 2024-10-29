import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.course.deleteMany()

  // Create a beginner course
  await prisma.course.create({
    data: {
      title: 'Next.js 14 Fundamentals',
      description: 'Learn the basics of Next.js 14',
      level: 'BEGINNER',
      modules: {
        create: [
          {
            title: 'Getting Started',
            description: 'Setup and basic concepts',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to Next.js 14',
                  content: 'Next.js is a React framework for production...',
                  type: 'THEORY',
                  order: 1,
                },
                {
                  title: 'Setting Up Your First Project',
                  content: 'Learn how to create a new Next.js project...',
                  type: 'PRACTICE',
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })