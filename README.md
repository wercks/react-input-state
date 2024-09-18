# React Input State

&lt;input&gt; and &lt;select&gt; state management, content validator, sanitizer and content replacer

## Installing

### Yarn

```sh
yarn add react-input-state
```

### Npm

```sh
npm i react-input-state
```

## **useInputState** hook

Set the element root containing the inputs, selects and optionally
set the submit element ref for disable it when user types invalid data

```tsx
import useInputState from 'react-input-state'

const MyApp = () => {
    const myRootElement = createRef<HTMLDivElement>()
    const submitButton = createRef<HTMLButtonElement>()

    // second argument is optional
    const [state] = useInputState(myRootElement, {
        initialState: {},
        submitButton,
        onValidate: (name, isValid, validationType) => {}
        inputInvalidClasses: string
    })

    const handleSubmit = () => {
        if (!state.isValid) {
            return
        }
        sendDataToBackend('/endpoint', state.values)
    }

    // SOME EXAMPLES, see more below

    return <div ref={myRef}>
       <input type="text" name="any" required

        data-regex-validation="YOUR_REGEX_PATTERN"
        data-validators="credit_card,cpf,cnpj"

       />
       {/* You do not need to hide this div, it will be made automatically */}
       <div data-error-for="any">Invalid data!</div>

        {/* transforming text */}

       <input type="email" name="email" required

        data-validators="email"
        data-transform="lowercase,trim"

       />
       <div data-error-for="email">Invalid email!</div>

       {/* mask, use 9 for numbers */}

       <input type="text" name="date" required

        data-mask="99/99/9999"

       />

        {/* check if given password is strong */}

       <input type="password" name="password" required

        data-validators="strong_password"

       />
       <div data-error-for="password">Please provide a strong password!</div>

       {/* Set data-private and it will not be returned in state.values */}
       <input type="text" name="my-any-name" required

        data-private="true"

       />

      {/* Validating conditionally */}

       <input type="text" name="any-name"

        data-greater-or-equal="5"

       />

       {/* this field will be ignored */}

       <input type="text" name="any-name"

        data-ignore="true"

       />

       {/* You can use select elements as well */}

       <select name="my-select" required>
            <option value="">Choose</option>
            <option value="any">Text</option>
            <option value="any2">Text2</option>
       </select>

       <button ref={submitButton} onClick={handleSubmit}>Submit</button>
    </div>
}

export default MyApp
```

## data-validators

#### You can combine any validator separating it by comma

```html
<input type="text" name="any" data-validators="credit_card,ean,iban" />
```

**Possible values**

```text
email - cpf - cnpj - bic_swift - btc - credit_card - ean - iban - imei - json - magnet_uri - numeric - octal - strong_password
```

## data-transform

```html
<input type="text" name="any" data-transform="trim,urlsafe" />
```

**Possible values**

```text
lowercase - uppercase - titlecase - trim - urlsafe
```

## data-mask

```html
<input type="text" name="any" data-mask="(99) 99999-9999" />
```

-   9 - accept digit
-   A - accept alpha
-   S - accept alphanumeric

## data-remove

Regular expression pattern to remove unwanted characters

```html
<input type="text" name="any" data-remove="\D+" />
```

## data-regex-validation

Regular expression pattern to validate content based on a regex pattern

```html
<input type="text" name="any" data-regex-validation="^[a-z]+$" />
```

## data-reload-component

Determine if you want to reload the component on input/select changes

```html
<select name="any" data-reload-component="true"></select>
<input type="text" name="any" data-reload-component="true" />
```

## Conditional validators

**_data-equals_** and **_data-not-equals_** accept string or numbers as well

```html
<input type="text" name="any" data-equals="..." />
<input type="text" name="any" data-greater-or-equal="5" />
<input type="text" name="any" data-greater-than="5" />
<input type="text" name="any" data-less-or-equal="5" />
<input type="text" name="any" data-less-than="5" />
<input type="text" name="any" data-not-equals="..." />
```

This feature does not check types, 1 (number) will be equals to "1" (string)

## data-private

This feature removes the input/select value from state values

```html
<select name="any" data-private="true"></select>
<input type="text" name="any" data-private="true" />
```

Private values can be obtained calling **myStateName.privateValues**

```typescript
const [myStateName] = useInputState(rootRef)

// private values
myStateName.privateValues
```

## data-ignore

If you don't want this input/select to be managed by this lib

```html
<select name="any" data-ignore="true"></select>
<input type="text" name="any" data-ignore="true" />
```

## Setting value programmatically

```typescript
state.setValue('my-input-or-select-name', anyData)
```

**caution:** If the input or select does not exists, an Error will be thrown,
you can surround it by try / catch

## Individual values

```typescript
const value = state.value('input-or-select-name')
```

## Setting initialState after initialization

```typescript
state.setInitialState({})
```

## Reloader

The second entry returned by _**useInputState**_ is a component reloader utility, you can use it in some specific situations

```tsx
const MyApp = () => {
    const [state, reloader] = useInputState(myRootElement)

    return (
        <select
            name="any"
            onChange={() => {
                if (state.value('any') == 'any_other_value') {
                    reloader.reload()
                }
            }}
        >
            <option></option>
        </select>
    )
}
```

## Configuration properties

```typescript
const MyApp = () => {
    // Second hook argument
    const [state, reloader] = useInputState(myRootElement, {
            initialState?: {}
            /**
             * zero = forever
             */
            closeErrorMessageMilliseconds: 3000

            /**
             * Reference
             */
            submitButton:

            /**
             * boolean, disable submit button if content is invalid
             */
            disableSubmitButton: boolean

            /**
             * Called when validating a field
             */
            onValidate: (name, isValid, validationType) => {}

            /**
             * Add classes to input when it contains invalid data
             */
            inputInvalidClasses: '...'
    })

    return null
}
```

## Configuration properties GLOBAL

```typescript
import { ReactInputStateConfig } from 'react-input-state'

ReactInputStateConfig.closeErrorMessageMilliseconds = 3000
ReactInputStateConfig.inputInvalidClasses = '...'
//....
```
