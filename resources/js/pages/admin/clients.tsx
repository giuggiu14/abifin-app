import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure,
} from '@heroui/react';
import { Head, router, useForm } from '@inertiajs/react';
import { Eye, Paperclip, Plus, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { paperworks } from '@/routes';
import { clients } from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';
import type { Client, ClientFormData } from '@/types/client';
import { columns } from '@/types/client';
import { ClientForm } from './client';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: clients(),
    },
];

export default function Clients({
    listClients,
}: Readonly<{ listClients: Client[] }>) {
    const [selectedClient, setSelectedClient] = useState<Client | undefined>();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const confirmDeleteModal = useDisclosure();
    const form = useForm<ClientFormData>({
        company_name: '',
        email: '',
        address: '',
        phone: '',
        vat_number: '',
    });

    const handleOpenModal = useCallback(
        (client?: Client) => {
            setSelectedClient(client);
            onOpen();
        },
        [onOpen, setSelectedClient],
    );

    const renderCell = useCallback(
        (item: Client, columnKey: React.Key) => {
            const cellValue = item[columnKey as keyof Client];

            if (columnKey === 'actions') {
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
                                    confirmDeleteModal.onOpen();
                                }}
                            />
                        </Tooltip>
                        <Tooltip
                            color="primary"
                            content="Vedi Pratiche Cliente"
                        >
                            <Button
                                color="primary"
                                endContent={<Paperclip />}
                                onPress={() =>
                                    router.visit(
                                        paperworks(item.id ? item.id : 0),
                                    )
                                }
                            />
                        </Tooltip>
                    </div>
                );
            } else {
                return cellValue;
            }
        },
        [confirmDeleteModal, handleOpenModal],
    );

    const handleDelete = () => {
        if (selectedClient) {
            console.log('Deleting...');
            form.delete(`/clients/${selectedClient.id}`, {
                onSuccess: () => {
                    confirmDeleteModal.onClose();
                },
            });
        }
    };

    const handleSave = () => {
        if (selectedClient) {
            form.put(`/clients/${selectedClient.id}`, {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            form.post('/clients', {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex flex-col gap-4 p-8">
                <div className="flex items-center justify-end">
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
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={listClients}
                        emptyContent="Nessun cliente trovato"
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {selectedClient ? 'Modifica' : 'Nuovo'} Cliente
                            </ModalHeader>
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
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <Button
                            variant="flat"
                            onPress={confirmDeleteModal.onClose}
                        >
                            Annulla
                        </Button>
                        <Button color="danger" onPress={() => handleDelete()}>
                            Conferma
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </AppLayout>
    );
}
