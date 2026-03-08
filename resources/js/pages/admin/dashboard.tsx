import React, { useMemo } from 'react';
import {
    Card, CardHeader, CardBody,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Chip, Divider
} from "@heroui/react";
import { Client } from '@/types/client';
import { chipColors, Paperwork } from '@/types/paperwork';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

interface DashboardProps {
    clients: Client[];
    paperworks: Paperwork[];
}

const breadcrumbs: BreadcrumbItem[] = [];

const Dashboard: React.FC<DashboardProps> = ({ clients, paperworks }) => {

    const statsPratiche = useMemo(() => {
        return paperworks.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [paperworks]);

    const ultimiClienti = [...clients].slice(-5).reverse();
    const ultimePratiche = [...paperworks].slice(-5).reverse();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 min-h-screen">

                <Card className="md:col-span-2 shadow-sm">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md font-bold text-primary">Panoramica Generale</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex flex-row flex-wrap gap-8 justify-around p-6">
                        <div className="text-center">
                            <p className="text-tiny uppercase font-bold text-default-400">Totale Clienti</p>
                            <p className="text-3xl font-semibold">{clients.length}</p>
                        </div>
                        {Object.entries(statsPratiche).map(([stato, count]) => (
                            <div key={stato} className="text-center">
                                <p className="text-tiny uppercase font-bold text-default-400">Pratiche {stato}</p>
                                <p className="text-3xl font-semibold text-secondary">{count}</p>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="font-bold">Ultimi 5 Clienti Registrati</CardHeader>
                    <CardBody>
                        <Table aria-label="Tabella ultimi clienti" removeWrapper>
                            <TableHeader>
                                <TableColumn>NOME</TableColumn>
                                <TableColumn>DATA</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"Nessun cliente trovato"}>
                                {ultimiClienti.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-small font-medium">{c.company_name}</span>
                                                <span className="text-tiny text-default-400">{c.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-tiny">{c.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="font-bold">Ultime 5 Pratiche Aperte</CardHeader>
                    <CardBody>
                        <Table aria-label="Tabella ultime pratiche" removeWrapper>
                            <TableHeader>
                                <TableColumn>PRATICA</TableColumn>
                                <TableColumn>STATO</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"Nessuna pratica trovata"}>
                                {ultimePratiche.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-small font-medium">{p.title}</span>
                                                <span className="text-tiny text-default-400">{p.description}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color={chipColors[p.status] || "default"}
                                            >
                                                {p.status}
                                            </Chip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

            </div>
        </AppLayout>
    );
};

export default Dashboard;
