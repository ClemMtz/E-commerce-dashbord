import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";


import { CategoryColumn, columns } from "./components/columns";
import { Client } from "@/components/ui/client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
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
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Client
                    data={formatedCategories}
                    type="categories"
                    typeCapitalName="Categories"
                    typeId="categoryId"
                    columns={columns}
                />
            </div>
        </div>
    )
};


export default CategoriesPage; 