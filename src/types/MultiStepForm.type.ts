export enum FormElement {
    Text,
    Date,
    Email,
    Password
}

export type ErrorHint = string
export interface FormStep {
    type: FormElement
    key: string
    label: string
    required?: boolean
    ruleValidator?: (value: any) => ErrorHint | undefined
}

export type FormSteps = FormStep[]