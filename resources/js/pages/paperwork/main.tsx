import {
    Button,
    Chip,
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
import { Head, useForm } from '@inertiajs/react';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { paperworks } from '@/routes';
import type { Client } from '@/types/client';
import { chipColors, columns } from '@/types/paperwork';
import type { Paperwork, PaperworkFormData } from '@/types/paperwork';
import { PaperworkForm } from './paperwork';

export default function Paperworks({
    listPaperworks,
    client,
    can,
}: Readonly<{
    listPaperworks: Paperwork[];
    client: Client;
    can: { doActions: boolean; create: boolean };
}>) {
    const [selectedPaperwork, setSelectedPaperwork] = useState<
        Paperwork | undefined
    >();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const confirmDeleteModal = useDisclosure();
    const form = useForm<PaperworkFormData>({
        title: '',
    });

    const basePath = paperworks(client.id ? client.id : 0).url;

    const handleOpenModal = useCallback(
        (paperwork?: Paperwork) => {
            setSelectedPaperwork(paperwork);
            onOpen();
        },
        [onOpen, setSelectedPaperwork],
    );

    const renderCell = useCallback(
        (item: Paperwork, columnKey: React.Key) => {
            const cellValue = item[columnKey as keyof Paperwork];

            if (columnKey === 'actions' && can.doActions) {
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
                                    setSelectedPaperwork(item);
                                    confirmDeleteModal.onOpen();
                                }}
                            />
                        </Tooltip>
                    </div>
                );
            } else if (columnKey === 'status') {
                return (
                    <Chip
                        color={chipColors[cellValue as keyof typeof chipColors]}
                        variant="flat"
                    >
                        {cellValue?.toString().toUpperCase()}
                    </Chip>
                );
            } else {
                return cellValue;
            }
        },
        [can.doActions, confirmDeleteModal, handleOpenModal],
    );

    const handleDelete = () => {
        if (selectedPaperwork) {
            form.delete(`${basePath}/${selectedPaperwork.id}`, {
                onSuccess: () => {
                    confirmDeleteModal.onClose();
                },
            });
        }
    };

    const handleSave = () => {
        if (selectedPaperwork) {
            form.put(`${basePath}/${selectedPaperwork.id}`, {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            form.post(basePath, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Pratiche" />
            <div className="flex flex-col gap-4 p-8">
                {can.create && (
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
                )}
                <Table aria-label="Tabella Pratiche">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={listPaperworks}
                        emptyContent="Nessun paperwork trovato"
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
                                {selectedPaperwork ? 'Modifica' : 'Nuovo'}{' '}
                                Pratica
                            </ModalHeader>
                            <PaperworkForm
                                form={form}
                                initialData={selectedPaperwork}
                                onClose={onClose}
                                onSave={handleSave}
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
