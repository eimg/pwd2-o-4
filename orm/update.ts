import { prisma } from "./lib/prisma";

async function update() {
    const role = await prisma.role.update({
        where: { id: 1 },
        data: { name: 'Guest' }
    });

    console.log(role);
}

update();
