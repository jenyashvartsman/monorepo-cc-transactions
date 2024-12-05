import { Account, PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

(async (): Promise<void> => {
  try {
    // wipe db
    console.log('Wiping database');
    await prisma.transaction.deleteMany();
    await prisma.creditCard.deleteMany();
    await prisma.account.deleteMany();
    await prisma.business.deleteMany();

    // businesses
    console.log('Creating businesses');
    const business = await prisma.business.createManyAndReturn({
      data: Array.from({ length: 15 }, () => {
        return {
          name: faker.company.name(),
          owner: faker.person.fullName(),
          phone: faker.phone.number(),
        };
      }),
    });
    console.log(`Created ${business.length} businesses`);

    // accounts
    console.log('Creating accounts');
    const accounts = await prisma.account.createManyAndReturn({
      data: Array.from({ length: 100 }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
          name: faker.person.fullName({ firstName, lastName }),
          email: faker.internet.email({ firstName, lastName }),
        };
      }),
    });
    console.log(`Created ${accounts.length} accounts`);

    // credit cards
    console.log('Creating credit cards');
    accounts.forEach(async (account) => {
      await prisma.creditCard.createMany({
        data: Array.from(
          { length: faker.number.int({ min: 1, max: 3 }) },
          () => {
            return {
              accountId: account.id,
              number: faker.finance.creditCardNumber(),
            };
          }
        ),
      });
    });
    const creditCardsCount = await prisma.creditCard.count();
    console.log(`Created ${creditCardsCount} credit cards`);

    // transactions
    console.log('Creating transactions');
    const creditCards = await prisma.creditCard.findMany();
    creditCards.forEach(async (creditCard) => {
      await prisma.transaction.createMany({
        data: Array.from(
          { length: faker.number.int({ min: 1, max: 20 }) },
          () => {
            return {
              creditCardId: creditCard.id,
              businessId: faker.helpers.arrayElement(business).id,
              amount: faker.number.float({
                min: 1,
                max: 5_000,
                fractionDigits: 2,
              }),
              createAt: faker.date.past({ years: 5 }),
            };
          }
        ),
      });
    });
    const transactionsCount = await prisma.transaction.count();
    console.log(`Created ${transactionsCount} transactions`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();
