import { prismadb } from "@/lib/prisamdb";


import { FormHandler } from "@/components/ui/form-handler";

const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <FormHandler
                    initialData={billboard}
                    type="billboard"
                    Type="Billboard"
                    typeId={params.billboardId}
                    types="billboards"
                    formLabelOne="name"
                    formLabelTwo="imageUrl"
                    hex=""
                />
            </div>
        </div>
    )
};

export default BillboardPage;