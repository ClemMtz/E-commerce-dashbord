import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";
import { formatteur } from "@/lib/utils";


import { ProductColumn, columns } from "./components/columns";
import { Client } from "@/components/ui/client";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item: any) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatteur.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Client
                    data={formattedProducts}
                    type="products"
                    typeCapitalName="Products"
                    typeId="productId"
                    columns={columns}
                />
            </div>
        </div>
    )
};


export default ProductsPage; 