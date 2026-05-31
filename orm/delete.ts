import { prisma } from "./lib/prisma";

async function remove() {
    const role = await prisma.role.delete({
        where: { id: 1 }
    });

    console.log(role);
}

remove();
