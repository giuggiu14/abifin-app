import { Paperwork } from "@/types/paperwork";
import { Button, Form, Input, ModalBody, ModalFooter, Textarea } from "@heroui/react";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

interface PaperworkFormProps {
    form: ReturnType<typeof useForm<Paperwork>>;
    initialData: Paperwork | undefined;
    onSave: () => void;
    onClose: () => void;
}

export const PaperworkForm = ({ form, initialData, onSave, onClose }: PaperworkFormProps) => {
    const { data, setData } = form;

    useEffect(() => {
        if (initialData) {
            setData({
                'title': initialData.title,
                'description': initialData.description,
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
                        name="title"
                        label="Titolo"
                        variant="bordered"
                        isRequired
                        defaultValue={initialData?.title}
                        onValueChange={(v) => setData('title', v)}
                        errorMessage="Il titolo è obbligatorio"
                    />
                    <Textarea
                        name="description"
                        label="Descrizione"
                        variant="bordered"
                        type=""
                        defaultValue={initialData?.description}
                        onValueChange={(v) => setData('description', v)}
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
