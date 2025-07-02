import { Role } from "./role.type";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    roleId?: number;
    therapistId?: string;
}