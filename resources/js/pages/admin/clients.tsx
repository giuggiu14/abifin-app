import AppLayout from "@/layouts/app-layout";
import { clients } from "@/routes/admin";
import { BreadcrumbItem } from "@/types";
import { Client, columns } from "@/types/client";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@heroui/react";
import { Head, useForm } from "@inertiajs/react";
import { Eye, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { ClientForm } from "./createnew";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: clients(),
    },
];

export default function Clients({ listClients } : Readonly<{ listClients: Client[] }>) {
    const [selectedClient, setSelectedClient] = useState<Client | undefined>();
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const confirmDeleteModal = useDisclosure();
    const form = useForm<Client>({
        company_name: '',
        email: '',
        address: '',
        phone: '',
        vat_number: '',
    });

    const handleOpenModal = (client?: Client) => {
        setSelectedClient(client);
        onOpen();
    };

    const renderCell = useCallback((item: Client, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof Client];

        if (columnKey==="actions") {
            return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Dettagli">
                            <Button
                                endContent={<Eye />}
                                color="secondary"
                                onPress={() => handleOpenModal(item)}
                            />
                        </Tooltip>
                        <Tooltip color="danger" content="Elimina">
                            <Button
                                color="danger"
                                endContent={<Trash2 />}
                                onPress={() => {
                                    setSelectedClient(item);
                                    confirmDeleteModal.onOpen()
                                }}
                            />
                        </Tooltip>
                    </div>
                );
        } else {
            return cellValue;
        }
    }, []);

    const handleDelete = () => {
        if (selectedClient) {
            console.log("Deleting...");
            form.delete(`/clients/${selectedClient.id}`, {
                onSuccess: () => {
                    console.log("Deleted");
                    confirmDeleteModal.onClose();
                }
            });
        }
    }

    const handleSave = () => {
        if (selectedClient) {
            console.log("Inizio l'update");
            form.put(`/clients/${selectedClient.id}`, {
                onSuccess: () => {
                    console.log("Salvataggio terminato");
                    onClose();
                },
                onError: (err) => {
                    console.log("Sono andato in errore: ", err);
                }
            });
        } else {
            form.post('/clients', {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    return (
         <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="p-8 flex flex-col gap-4">
                <div className="flex justify-end items-center">
                    <div className="flex gap-3">
                        <Button
                            color="primary"
                            endContent={<Plus />}
                            onPress={() => handleOpenModal()}
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <Table aria-label="Tabella clienti">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody
                        items={listClients}
                        emptyContent="Nessun cliente trovato"
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>{selectedClient ? "Modifica" : "Nuovo"} Cliente</ModalHeader>
                            <ClientForm
                                form={form}
                                initialData={selectedClient}
                                onSave={handleSave}
                                onClose={onClose}
                            />
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={confirmDeleteModal.isOpen}
                onOpenChange={confirmDeleteModal.onOpenChange}
            >
                <ModalContent>
                    <ModalHeader>
                        Sei sicuro di voler cancellare il cliente?
                    </ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" onPress={confirmDeleteModal.onClose}>
                            Annulla
                        </Button>
                        <Button
                            color="danger"
                            onPress={ () => handleDelete() }
                        >
                            Conferma
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </AppLayout>
    );
}
