const prisma = require('../utils/prisma');

/**
 * Creates a new Customer along with a Contact, automatically associating them.
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
export default async (email) => {
    const user = await prisma.user.get({
        where:{
            email: email
        }
    });

    return user;
};