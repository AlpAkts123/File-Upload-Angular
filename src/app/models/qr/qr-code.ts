export class QrCode {
    qrAddress: string;
    city: string;
    country: string;
    id: string;
    deletedBy?: any;
    deletedAt?: any;
    updatedBy?: any;
    createdBy?: any;
    createdAt: Date;
    updatedAt?: any;
    isDeleted?: any;
}

export class GetQrListModel {
    qrCode: QrCode[];
}