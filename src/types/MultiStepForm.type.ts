export enum FormElement {
    Text,
    Date,
    Email,
    Password
}

export interface FormStep {
    type: FormElement
    key: string
    label: string
}

