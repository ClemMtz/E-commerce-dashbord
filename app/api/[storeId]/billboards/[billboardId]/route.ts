import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisamdb";



export async function GET(
    _req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log(`[BILLBOARD_GET]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();
        console.log(userId)

        const body = await req.json();

        const { name, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthentificated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                name,
                imageUrl
            }
        });
        console.log(billboard)

        return NextResponse.json(billboard);
    } catch (error) {
        console.log(`[BILLBOARD_PATCH]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthentificated", { status: 401 });
        }


        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,

            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log(`[BILLBOARD_DELETE]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


