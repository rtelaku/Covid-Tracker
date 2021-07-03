 export interface Patient{
        id: string;
        name: string;
        personalId: string,
        date: Date | null;
        dateOfBirth: Date | null,
        description: string;
        category: string;
        city: string;
    }

    export interface Photo {
        id: string;
        url: string;
        isMain: boolean;
    }