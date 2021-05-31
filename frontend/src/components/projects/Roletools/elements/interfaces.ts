

export interface Login {
    user : string,
    pass : string
}

export interface Register {
    user  : string,
    pass  : string,
    email : string
}

export interface Recovery {
    email : string
}