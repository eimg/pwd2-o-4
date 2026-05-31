import { prisma } from "./lib/prisma";

async function create() {
    const role = await prisma.role.create({
        data: {
            name: "User",
        }
    });

    console.log(role);
}

create();
