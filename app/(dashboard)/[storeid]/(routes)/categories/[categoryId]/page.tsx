import { prismadb } from "@/lib/prisamdb";


import { FormHandler } from "@/components/ui/form-handler";

const CategoryPage = async ({ params }: { params: { categoryId: string, storeId: string } }) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <FormHandler
                    billboards={billboards}
                    initialData={category}
                    type="categorie"
                    Type="Categorie"
                    typeId="categorieId"
                    types="categories"
                    formLabelOne="name"
                    formLabelTwo="billboard"
                    hex=""
                />
            </div>
        </div>
    )
};

export default CategoryPage;