
export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    earnings: number;
    position_id: number;
    position?: string;
}
