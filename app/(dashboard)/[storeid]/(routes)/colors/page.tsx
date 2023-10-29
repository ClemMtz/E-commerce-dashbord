import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";

import { ColorColumn, columns } from "./components/columns";
import { Client } from "@/components/ui/client";

const ColorsPage = async ({ params }: { params: { storeid: string } }) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formatedColors: ColorColumn[] = colors.map((item: any) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Client
                    data={formatedColors}
                    type="colors"
                    Types="Colors"
                    typeId="colorId"
                    columns={columns}
                />
            </div>
        </div>
    )
};


export default ColorsPage; 