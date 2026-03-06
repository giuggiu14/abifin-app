import AppLayout from "@/layouts/app-layout";
import { clients } from "@/routes/admin";
import { BreadcrumbItem } from "@/types";
import { Client, columns } from "@/types/client";
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@heroui/react";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: clients(),
    },
];

const rows = [
    {
        id: 1,
        company_name: 'John Doe',
        email: 'test@test.com',
    },
];

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/clients');
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClients();
    }, []);

    const renderCell = useCallback((item: Client, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof Client];

        switch (columnKey) {
        case "nome":
            return (
            <User description={item.email} name={cellValue}>
                {item.email}
            </User>
            );
        case "actions":
            return (
            <div className="relative flex items-center gap-2">
                <Tooltip content="Dettagli">
                <button onClick={() => console.log("Edit", item.id)}>👁️</button>
                </Tooltip>
                <Tooltip color="danger" content="Elimina">
                <button onClick={() => console.log("Delete", item.id)}>🗑️</button>
                </Tooltip>
            </div>
            );
        default:
            return cellValue;
        }
    }, []);

    
    return (
         <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="p-8 flex flex-col gap-4">
                <div className="flex justify-end items-center">
                    <div className="flex gap-3">
                        <Button
                            color="primary"
                            endContent={<Plus />}
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
                        items={clients}
                        emptyContent="Nessun cliente trovato"
                        loadingContent={<Spinner label="Loading..." />}
                        isLoading={isLoading}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
