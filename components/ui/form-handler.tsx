"use client";


import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { zodResolverServer } from '@/components/resolver/form-zodResolver';
import { zodResolverServerCategorie } from "../resolver/form-zodResolverCategorie";
import { zodResolverServerBillboard } from "../resolver/form-zodResolverBillboard";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { AlertModal } from "@/components/modals/alert-modals";



type DataFormValues = {
    name: string;
    value: string;
    bilboardId: string;
    imageUrl: string;
};


export type FormHandlerProps = {
    type: string;
    Type: string;
    types: string;
    typeId: string;
    hex: string;
    initialData: any;
    billboards?: any;
    formLabelOne: any;
    formLabelTwo: any;
}

export const FormHandler = ({ initialData, type, Type, types, formLabelOne, formLabelTwo, hex, billboards }: FormHandlerProps) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? `Edit ${type}` : `Create ${type}`;
    const description = initialData ? `Edit ${type}` : `Add a new ${type}`;
    const toastMessage = initialData ? `${Type} updated` : `${Type} created`;
    const action = initialData ? "Save changes" : "Create";



    const form = useForm<DataFormValues>({
        resolver: Type === 'Categorie' ? zodResolverServerCategorie : Type === "Billboard" ? zodResolverServerBillboard : zodResolverServer,
        defaultValues: initialData || {
            name: "",
            value: "",
            billboardId: "",
            imageUrl: ""
        }
    });




    const onSubmit = async (data: DataFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeid}/${types}/${params.typeId}`, data);
            } else {
                await axios.post(`/api/${params.storeid}/${types}`, data);
            }
            router.refresh();
            router.push(`/${params.storeid}/${types}`);
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeid}/${types}/${params.typeId}`);
            router.refresh();
            router.push(`/${params.storeid}/${types}`);
            toast.success(`${Type} deleted.`);
        } catch (error) {
            toast.error(`Make sure you removed all products using this ${type} first.`);
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name={formLabelOne}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formLabelOne}</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={`${Type} name`}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            Type === "Billboard" ?
                                <FormField
                                    control={form.control}
                                    name={formLabelTwo}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>background image</FormLabel>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value ? [field.value] : []}
                                                    disabled={loading}
                                                    onChange={(url) => field.onChange(url)}
                                                    onRemove={() => field.onChange("")}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                : Type === "Categorie" ?
                                    <FormField
                                        control={form.control}
                                        name={formLabelTwo}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>billboard</FormLabel>
                                                <Select
                                                    disabled={loading}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                defaultValue={field.value}
                                                                placeholder="Select a billboard" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {billboards.map((billboard: { id: string; name: string; }) => (
                                                            <SelectItem key={billboard.id} value={billboard.id}>
                                                                {billboard.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    :
                                    <FormField
                                        control={form.control}
                                        name={formLabelTwo}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{formLabelTwo}</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-x-2 ">
                                                        <Input disabled={loading} placeholder={`${Type} value ${hex}`}  {...field} />
                                                        {Type === "Color" &&
                                                            <div
                                                                className="border p-4  rounded-full"
                                                                style={{ backgroundColor: field.value }}
                                                            />
                                                        }
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                        }

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form >
            </Form >
        </>
    )
};