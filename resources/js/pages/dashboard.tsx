import React, { useMemo } from 'react';
import {
    Card, CardHeader, CardBody,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Chip, Divider
} from "@heroui/react";
import { chipColors, Paperwork } from '@/types/paperwork';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

interface DashboardProps {
    paperworks: Paperwork[];
}

const breadcrumbs: BreadcrumbItem[] = [];

const Dashboard: React.FC<DashboardProps> = ({ paperworks }) => {

    const statsPratiche = useMemo(() => {
        return paperworks.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [paperworks]);

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
                        {Object.entries(statsPratiche).map(([stato, count]) => (
                            <div key={stato} className="text-center">
                                <p className="text-tiny uppercase font-bold text-default-400">Pratiche {stato}</p>
                                <p className="text-3xl font-semibold text-secondary">{count}</p>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="font-bold">Lista Pratiche</CardHeader>
                    <CardBody>
                        <Table aria-label="Tabella ultime pratiche" removeWrapper>
                            <TableHeader>
                                <TableColumn>PRATICA</TableColumn>
                                <TableColumn>STATO</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"Nessuna pratica trovata"}>
                                {paperworks.map((p) => (
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
