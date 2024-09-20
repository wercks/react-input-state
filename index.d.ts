import React, { DependencyList } from 'react'

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

    virtualState?: Virtual
}

declare type Virtual = {
    [key: string]: {
        private: boolean
        value: any
    }
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
    /**
     * Return key/value pair from input and select elements
     */
    get values(): Mixed

    /**
     * Return key/value pair from input and select elements with -private in name
     */
    get privateValues(): Mixed

    /**
     * Return key/value pair from virtual values
     */
    get virtualValues(): Mixed

    constructor(reloader: Reloader, config?: Config)

    /**
     *
     * Set initial values for inputs and selects
     */
    setInitialState(initialState: Mixed): void

    /**
     *
     * Set initial virtual values
     */
    setVirtualState(virtualState: Virtual): void

    /**
     * Get individual value from input or select
     */
    value(name: string): any

    /**
     * Get virtual individual value
     */
    virtual(name: string): any

    /**
     * Delete virtual value
     */
    deleteVirtual(name: string, reloadComponent?: boolean): void

    /**
     * Validates value from input
     */
    validate(name: string): void

    /**
     * Check if all values is valid based on validators set
     */
    get isValid(): boolean

    setValue(name: string, value: any): void

    setVirtual(name: string, value: any, isPrivate?: boolean): void

    /**
     * Manually disable submit button
     */
    disableSubmitButton(): void

    /**
     * Manually enabled submit button
     */
    enableSubmitButton(): void
}

export default function useInputState(
    ref: React.MutableRefObject<Element> | React.RefObject<Element>,
    config?: Config,
    deps?: DependencyList
): [ReactInputState, Reloader]
