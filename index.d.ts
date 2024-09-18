import React from 'react'
interface FormValidationState {
    [key: string]: {
        [key: string]: boolean
    }
}

type Reloader = {
    reload: () => any
}

type Mixed<T = any, V = any> = {
    [P in keyof T]: V
}

interface Config {
    initialState?: Mixed
    /**
     * zero = forever
     */
    closeErrorMessageMilliseconds?: number

    /**
     * Reference
     */
    submitButton?: React.MutableRefObject<Element> | React.RefObject<Element>

    /**
     * Disable submit button if content is invalid
     */
    disableSubmitButton?: boolean

    /**
     * Called when validating a field
     */
    onValidate?: (name: string, isValid: boolean, validationType: string) => any

    inputInvalidClasses?: string
}

type Field = HTMLInputElement | HTMLSelectElement

export const ReactInputStateConfig: Config

type Item = {
    name: string
    validators: string[]
    transformers: string[]
    remove: string
    mask: string
    actions: Mixed
    field: Field
    errorElement: HTMLElement | null
    lastErrorElementPosition: string
    lastErrorElementTop: string
    touched: boolean
    regexValidation: string
    conditional: Mixed
}

declare class ReactInputState {
    private state: Mixed

    /**
     * Return key/value pair from input and select elements
     */
    get values(): Mixed

    /**
     * Return key/value pair from input and select elements with -private in name
     */
    get private(): Mixed

    private validation: FormValidationState

    private fields: {
        [name: string]: Item
    }

    private reloader: Reloader

    private config: Config | undefined

    constructor(reloader: Reloader, config?: Config)

    /**
     *
     * Set initial values for inputs and selects
     */
    setInitialState(initialState: Mixed): void

    /**
     * Get individual value from input or select
     */
    value(name: string): any

    private addField(data: {
        field: Field
        type: 'select' | 'input'
        root: Element
    }): void

    private addEvents(): void

    private runActions(): void

    private addTouchEvents(item: Item): void

    private addChangeEvent(item: Item): void

    private mask(name: string): void

    private remove(name: string): void

    private transform(name: string): void

    /**
     * Validates value from input
     */
    validate(name: string): void

    private displayError(): void

    private validateAll(): void

    /**
     * Check if all values is valid based on validators set
     */
    get isValid(): boolean

    setValue(name: string, value: any): void

    init(root: Element): void
}

export default function useInputState(
    ref: React.MutableRefObject<Element> | React.RefObject<Element>,
    config?: Config
): [ReactInputState, Reloader]
