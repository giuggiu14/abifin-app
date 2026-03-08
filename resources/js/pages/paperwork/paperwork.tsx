import {
    Button,
    Form,
    Input,
    ModalBody,
    ModalFooter,
    Textarea,
} from '@heroui/react';
import type { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import type { Paperwork, PaperworkFormData } from '@/types/paperwork';

interface PaperworkFormProps {
    form: ReturnType<typeof useForm<PaperworkFormData>>;
    initialData: Paperwork | undefined;
    onSave: () => void;
    onClose: () => void;
}

export const PaperworkForm = ({
    form,
    initialData,
    onSave,
    onClose,
}: PaperworkFormProps) => {
    const { data, setData } = form;

    useEffect(() => {
        if (initialData) {
            setData({
                title: initialData.title,
                description: initialData.description,
            });
        }
    }, [initialData, setData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        onSave();
    };

    return (
        <Form onSubmit={handleSubmit} className="w-full">
            <ModalBody>
                <div className="flex w-full flex-col gap-4">
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
                <Button color="primary" type="submit">
                    {initialData ? 'Aggiorna' : 'Salva'}
                </Button>
            </ModalFooter>
        </Form>
    );
};
