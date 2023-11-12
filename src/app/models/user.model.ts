export interface UserInterface {
    id: string;
    name: string;
    surname: string;
    age: number;

    getMessage(): string;
}

export interface ProfileInterface {
    name: string;
    profileUrl: string;
    isActive: boolean;
}

export type OnlyName = string;
export type FullName = Pick<UserInterface, 'name' | 'surname'>;
export type OnlyAge = Omit<UserInterface, 'id' | 'name' | 'surname' | 'getMessage'>;
export type Wrapped<T> = { value: T };