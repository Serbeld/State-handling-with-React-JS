import React from 'react'

const SECURITY_CODE = 'paradigma';
const itemName = "reactv2"
const initialValue = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

function UseState({ name }) {

    const [state, setState] = React.useState(initialValue);

    const loadJsonLocalStorage = () => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;

            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue));
                parsedItem = initialValue;
            } else {
                try {
                    parsedItem = JSON.parse(localStorageItem);
                } catch (error) {
                    parsedItem = initialValue;
                }
            }
            console.log(parsedItem)
            // setState(parsedItem)
        } catch (error) {
            console.warn(error.message)
        }
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        });
    }

    const onWrite = (event) => {
        setState({
            ...state,
            value: event.target.value
        });
    }

    const commentEnterSubmit = (event) => {
        if (event.key === "Enter" && event.shiftKey === false) {
            return onCheck();
        }
    }

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        });
    }

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true
        });
    }

    const onDelete = () => {
        setState({
            ...state,
            loading: true,
            deleted: true
        });
    }

    const onReset = () => {
        setState({
            ...state,
            loading: true,
            deleted: false,
            confirmed: false,
            value: ''
        });
    }

    React.useEffect(() => {
        // console.log("Starting the effect");

        if (!!state.loading) {
            console.log("Doing the validation");
            setTimeout(() => {

                if (state.value === SECURITY_CODE) {
                    onConfirm();
                }
                else {
                    onError();
                }

                loadJsonLocalStorage();

                console.log("The validation was completed");
            }, 1000);
        }

        // console.log("Finishing the effect");

        localStorage.setItem(itemName, JSON.stringify(state));

    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>

                <p>Please enter the security code</p>

                {(state.error && !state.loading) && (
                    <p className='error'>Error: Security code is incorrect</p>
                )}
                {state.loading && (
                    <p className='loading'>Loading...</p>
                )}

                <input
                    placeholder="Security Code"
                    value={state.value}
                    onChange={onWrite}
                    onKeyPress={commentEnterSubmit}
                />

                <button
                    className={`${state.value === SECURITY_CODE && !state.error ? "check" : ""}`}
                    onClick={onCheck}
                >Check</button>
            </div>
        );
    }
    else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <div>
                    <p>Are you agree to delete this state?</p>
                    <button
                        className='background-red'
                        onClick={onDelete}
                    >Delete</button>
                    <button
                        onClick={onReset}
                    >Cancel</button>
                </div>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <div>
                    <p>The react state was deleted</p>
                    <button
                        className='background-red'
                        onClick={onReset}
                    >Return the react state again</button>
                </div>
            </React.Fragment>
        );
    }
}

export { UseState }