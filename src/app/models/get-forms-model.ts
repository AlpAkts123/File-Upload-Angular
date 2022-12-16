export class File {
    fileName: string;
    path: string;
    storageType?: any;
    id: string;
    deletedBy?: any;
    deletedAt?: any;
    updatedBy?: any;
    createdBy?: any;
    createdAt: Date;
    updatedAt?: any;
    isDeleted?: any;
}

export class ApplyForm {
    name: string;
    surname: string;
    birthDay: Date;
    departmentName:string;
    gender: boolean;
    militaryServiceStatus?: any;
    educationstring
    militaryServiceDelayTime: Date;
    whiteCollar: boolean;
    educationState?: any;
    files: File[];
    departmenAppliedFor?: any;
    driverLicence: string;
    id: string;
    deletedBy?: any;
    deletedAt?: any;
    updatedBy?: any;
    createdBy?: any;
    createdAt: Date;
    updatedAt?: any;
    isDeleted?: any;
}

export class GetFormsModel {
    applyForms: ApplyForm[];
}



