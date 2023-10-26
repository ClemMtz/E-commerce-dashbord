

import { prismadb } from "@/lib/prisamdb";


import { FormHandler } from "@/components/ui/form-handler";




const ColorPage = async ({ params }: { params: { colorId: string } }) => {
    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <FormHandler
                    initialData={color}
                    type="color"
                    Type="Color"
                    typeId={params.colorId}
                    types="colors"
                    formLabelOne="name"
                    formLabelTwo="value"
                    hex="#000"
                />
            </div>
        </div>
    )
};

export default ColorPage;