"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ProductColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ProductClientProps {
    data: ProductColumn[]
}


export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button onClick={() => router.push(`/${params.storeid}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading title="API" description="API calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="bilboradId" />
        </>
    )
}