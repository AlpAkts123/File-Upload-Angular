
    export class MilServiceStatus {
        [key: number]: string;
    }

    export class Departments {
        [key: number]: string;
    }

    export class EducationState {
        [key: string]: number;
    }

    export class getSelectBoxesModel {
        milServiceStatus: MilServiceStatus=new MilServiceStatus();
        departments: Departments=new Departments();
        educationState: EducationState=new EducationState();;
    }