declare module 'dd-types' {
    export interface Project {
        name: string;
        description: string;
        url: string;
        categories: string[];
        technologies: string[];
        image?: string;
    }
}
