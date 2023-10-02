import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";






export const formSchema = z.object({

    name: z.string().min(1),
    imageUrl: z.string().min(1)


});

export const zodResolverServerBillboard = zodResolver(formSchema);