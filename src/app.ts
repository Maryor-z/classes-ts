abstract class Department {
    static fiscalYear = 2020;
    // name: string;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.name = n;
        console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return {name: name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe(): void {
        console.log('ITDepartment - ID: ' + this.id)
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found...')
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!!')
        }
        this.addReport(value)
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', [])
        return this.instance;
    }

    describe() {
        console.log('Accounting Department - ID: ' + this.id)
    }

    addEmployee(name: string){
        if (name === 'Maryor') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports)
    }
}


const employee1 = Department.createEmployee('Mayo');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('1id', ['May']);


it.addEmployee('Maryr');
it.addEmployee('Maryor');

// accounting.employees[2] = 'Anna';

console.log(it)
it.describe();
it.printEmployeeInformation();


// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting1 = AccountingDepartment.getInstance();

console.log(accounting, accounting1)

accounting.mostRecentReport = 'Year end report';
accounting.addReport('Something went wrong...');

accounting.describe();

// console.log(accounting.mostRecentReport);


accounting.addEmployee('Maryor');
accounting.addEmployee('Max');

accounting.printReports();

// const accountingCopy = { name: 'Dummy', describe: accounting.describe };

// accountingCopy.describe();