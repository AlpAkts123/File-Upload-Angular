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

export class DepartmenAppliedFor {
    departmentName: string;
    id: string;
    deletedBy?: any;
    deletedAt?: any;
    updatedBy?: any;
    createdBy?: any;
    createdAt?: any;
    updatedAt?: any;
    isDeleted?: boolean;
}

export class ApplyForm {
    name: string;
    surname: string;
    birthDay: Date;
    gender: boolean;
    militaryServiceStatus: number;
    militaryServiceDelayTime: Date;
    whiteCollar: boolean;
    educationState: number;
    educationstring: string;
    departmentName: string;
    files: File[]=[];
    departmenAppliedFor: DepartmenAppliedFor=new DepartmenAppliedFor();
    driverLicence: string;
    cancidateNotes: CancidateNote[]=[];
    formStatus: number;
    formStatusString: string;
    qrCode?: any;
    id: string;
    deletedBy?: any;
    deletedAt?: any;
    updatedBy?: any;
    createdBy?: any;
    createdAt: Date;
    updatedAt?: any;
    isDeleted?: any;
}

export class GetAllFormsModel {
    applyForms: ApplyForm[]=[];
}
export class GetSingleFormModel {
    applyForm: ApplyForm=new ApplyForm();
}
export class CancidateNote {
    description: string;
    id: string;
    deletedBy?: any;
    deletedAt?: any;
    updatedBy?: any;
    createdBy?: any;
    createdAt: Date;
    updatedAt?: any;
    isDeleted: boolean;
}