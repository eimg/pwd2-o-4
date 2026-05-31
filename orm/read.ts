import { prisma } from "./lib/prisma";

async function read() {
    const roles = await prisma.role.findMany();
    console.log(roles);
}

read();
