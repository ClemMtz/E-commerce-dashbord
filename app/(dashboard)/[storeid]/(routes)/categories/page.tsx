import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";


import { CategoryColumn, columns } from "./components/columns";
import { Client } from "@/components/ui/client";

const CategoriesPage = async ({ params }: { params: { storeid: string } }) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeid
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formatedCategories: CategoryColumn[] = categories.map((item: any) => ({
        id: item.id,
        name: item.name,
        billboardName: item.billboard.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Client
                    data={formatedCategories}
                    type="categories"
                    Types="Categories"
                    typeId="categoryId"
                    columns={columns}
                />
            </div>
        </div>
    )
};


export default CategoriesPage; 