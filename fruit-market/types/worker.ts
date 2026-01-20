import { ResolverError } from "react-hook-form";

export type Role = 'admin' | 'packer' | 'driver';

export interface Worker {
    id:string;
    phone_number: string;
    name:string;
    role:Role;
    password:string;
}