export class Sort {
    field: string;
    dir: string;
}


export class Filter {
    field: string;
    operator: string;
    value: string;
    logic?: string;
    filters?: Filter[]=[];
}

export class Dynamic {
    sort: Sort[];
    filter: Filter=new Filter;
}

export class DynamicRootObject {
    dynamic: Dynamic=new Dynamic();
}