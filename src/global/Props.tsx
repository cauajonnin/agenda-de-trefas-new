export interface AuthContextType {
    taskList: PropCard[];
    onOpen: () => void;
    handleEdit: (item: PropCard) => void;
    handleDelete: (item: PropCard) => void;
    taskListBackup: PropCard[];
    filter: (t: string) => void;
}

export interface PropCard {
    description: string;
    flag: 'urgente' | 'opcional';
    item: number;
    timeLimit: string;
    title: string;
    completed?: boolean;
}

export type PropFlags = 'urgente' | 'opcional';