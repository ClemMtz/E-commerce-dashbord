"use client"

import { ColumnDef } from "@tanstack/react-table";


import { CellAction } from "@/components/ui/cell-action";


export type BillboardColumn = {
    id: string;
    name: string;
    createdAt: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} type="billboard" typeCapitalName="Billboard" pathName="billboards" />
    }

]
