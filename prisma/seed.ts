import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.mail.deleteMany();
    await prisma.user.deleteMany();
    const sampleUser = await prisma.user
      .create({
        data: {
          email: "johndoe@gmail.com",
          name: "John doe",
        },
      })
      .then((user) => {
        console.log("Created new sample user");
        console.log(user);
        return user;
      })
      .catch((error) => {
        console.log("Error creating new sample user");
        throw error;
      });

    const sampleMessages = Array.from({ length: 10 }).map(() => {
      return {
        userId: sampleUser.id,
        content: faker.lorem.paragraph(3),
        subject: faker.lorem.sentence(3),
      };
    });
    await prisma.mail
      .createMany({
        data: sampleMessages,
      })
      .catch((error) => {
        console.log("Error creating sample messages");

        throw error;
      });
    console.log(`Created ${sampleMessages.length} sample messages`);
  } catch (error) {
    console.log("Error seeding database");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
