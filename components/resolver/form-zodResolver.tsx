import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


export const formSchema = z.object({

    name: z.string().min(1),
    value: z.string().min(1),
    // billboardId: z.string().min(1)


});

export const zodResolverServer = zodResolver(formSchema);