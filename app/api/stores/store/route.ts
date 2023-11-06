import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisamdb";



export async function GET(
    _req: Request

) {
    try {
        const store = await prismadb.store.findMany();
        const storeId = store.find((store) => store.id === store.id)

        if (!store) {
            return NextResponse.json({ error: 'store Id not found' }, { status: 400 });
        }
        return NextResponse.json(storeId);

    } catch (error) {
        console.log('[STOREID_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}