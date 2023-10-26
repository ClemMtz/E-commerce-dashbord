
import { prismadb } from "@/lib/prisamdb";


import { FormHandler } from "@/components/ui/form-handler";


const SizePage = async ({ params }: { params: { sizeId: string } }) => {
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <FormHandler
                    initialData={size}
                    type="size"
                    Type="Size"
                    typeId={params.sizeId}
                    types="sizes"
                    formLabelOne="name"
                    formLabelTwo="value"
                    hex=""
                />
            </div>
        </div>
    )
};

export default SizePage;