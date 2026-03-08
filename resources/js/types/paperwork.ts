export interface Paperwork {
    id?: number;
    title: string;
    description?: string;
    createdAt?: string;
};

export const columns = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'description',
        label:'Description',
    },
    {
        key: 'created_at',
        label: 'Insert At'
    },
    {
        key: 'status',
        label: 'Status'
    },
    {
        key: 'actions',
        label: '',
    },
];

export const chipColors: { [key: string]: "danger" | "success" | "warning" } = {
    open: "danger",
    closed: "success",
    pending: "warning",
}
