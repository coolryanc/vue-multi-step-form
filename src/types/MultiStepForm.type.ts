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
    validator?: (value: string | number) => void
    errorHint?: string
}

export type FormSteps = FormStep[]