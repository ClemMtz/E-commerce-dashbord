import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";

import { BillboardColumn, columns } from "./components/columns";
import { Client } from "@/components/ui/client";

const BillboardsPage = async ({ params }: { params: { storeid: string } }) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formatedBillboards: BillboardColumn[] = billboards.map((item: any) => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Client
                    data={formatedBillboards}
                    type="billboards"
                    Types="Billboards"
                    typeId="bilborardId"
                    columns={columns}
                />
            </div>
        </div>
    )
};


export default BillboardsPage; 