import { Client } from "@/types/client";
import { Button, Form, Input, ModalBody, ModalFooter } from "@heroui/react";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface ClientFormProps {
    form: ReturnType<typeof useForm<Client>>;
    initialData: Client | undefined;
    onSave: () => void;
    onClose: () => void;
}

export const ClientForm = ({ form, initialData, onSave, onClose }: ClientFormProps) => {
    const { data, setData } = form;

    useEffect(() => {
        if (initialData) {
                setData({
                'company_name': initialData.company_name,
                'email': initialData.email,
                'address': initialData.address,
                'phone': initialData.phone,
                'vat_number': initialData.vat_number,
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        onSave();
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="w-full"
        >
            <ModalBody>
                <div className="flex flex-col gap-4 w-full">
                    <Input
                        name="company_name"
                        label="Ragione sociale"
                        variant="bordered"
                        isRequired
                        defaultValue={initialData?.company_name}
                        onValueChange={(v) => setData('company_name', v)}
                        errorMessage="La Ragione Sociale è obbligatoria"
                    />
                    <Input
                        name="email"
                        label="Email"
                        variant="bordered"
                        type="email"
                        isRequired
                        defaultValue={initialData?.email}
                        onValueChange={(v) => setData('email', v)}
                        errorMessage="L'Email è obbligatoria"
                    />
                    <Input
                        name="address"
                        label="Indirizzo"
                        variant="bordered"
                        isRequired
                        defaultValue={initialData?.address}
                        onValueChange={(v) => setData('address', v)}
                        errorMessage="L'Indirizzo è obbligatorio"
                    />
                    <Input
                        name="phone"
                        label="Telefono"
                        variant="bordered"
                        isRequired
                        defaultValue={initialData?.phone}
                        onValueChange={(v) => setData('phone', v)}
                        errorMessage="Il numero di telefono è obbligatorio"
                    />
                    <Input
                        name="vat_number"
                        label="Partita IVA"
                        variant="bordered"
                        isRequired
                        defaultValue={initialData?.vat_number}
                        onValueChange={(v) => setData('vat_number', v)}
                        errorMessage="La pratita IVA è obbligatoria"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                    Annulla
                </Button>
                <Button
                    color="primary"
                    type="submit"
                >
                    {initialData ? "Aggiorna" : "Salva"}
                </Button>
            </ModalFooter>
        </Form>
    );
}
