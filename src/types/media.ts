export interface CastMember {
    id: string;
    name: string;
    role: string;
}

export interface Movie{
    id: string;
    title: string;
    rating: string;
    runtime: string; // ISO 8601 duration format preferred for machine reading
    runtimeHuman: string // "2h 15m"
    year: number;
    genre: string;
    synopsis: string;
    cast: CastMember[]
}