"use client"

import { ColumnDef } from "@tanstack/react-table";


import { CellAction } from "@/components/ui/cell-action";


export type CategoryColumn = {
    id: string;
    name: string;
    billboardName: string;
    createdAt: string;
}


export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboardName",
        header: "Billboard",
        cell: ({ row }) => row.original.billboardName,
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} type="category" typeCapitalName="Category" pathName="categories" />
    }


]
