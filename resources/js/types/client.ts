export interface Client {
    id?: number;
    company_name: string;
    email: string;
    phone: string;
    address: string;
    vat_number: string;
    created_at: string;
}

export const columns = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'company_name',
        label: 'Company Name',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'phone',
        label: 'Phone',
    },
    {
        key: 'address',
        label: 'Address',
    },
    {
        key: 'vat_number',
        label: 'VAT Number',
    },
    {
        key: 'actions',
        label: '',
    },
];

export type ClientFormData = Omit<Client, 'id' | 'created_at'>;
