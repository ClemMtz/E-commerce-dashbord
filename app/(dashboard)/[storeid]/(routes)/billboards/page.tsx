import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";

import { BillboardColumn, columns } from "./components/columns";
import { GeneralClient } from "@/components/ui/general-client";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formatedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <GeneralClient
                    data={formatedBillboards}
                    type="billboards"
                    typeCapitalName="Billboards"
                    typeId="bilborardId"
                    columns={columns}
                />
            </div>
        </div>
    )
};


export default BillboardsPage; 