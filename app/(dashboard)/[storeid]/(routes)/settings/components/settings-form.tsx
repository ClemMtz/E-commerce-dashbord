"use client";

import { Store } from "@prisma/client";

interface SettingsFormProps {
    initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    return (
        <div>
            Setting Form
        </div>
    )
};