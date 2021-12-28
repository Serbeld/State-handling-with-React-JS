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

    React.useEffect(() => {
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
            setState(parsedItem)
        } catch (error) {
            console.warn(error.message)
        }
    }, []);

    const onClick = () => {
        setState({
            ...state,
            loading: true
        });
    }

    const onChange = (event) => {
        setState({
            ...state,
            value: event.target.value
        });
    }

    const commentEnterSubmit = (event) => {
        if (event.key === "Enter" && event.shiftKey === false) {
            return onClick();
        }
    }

    React.useEffect(() => {
        // console.log("Starting the effect");

        if (!!state.loading) {
            console.log("Doing the validation");
            setTimeout(() => {

                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        loading: false,
                        error: false,
                        confirmed: true,
                    });
                }
                else {
                    setState({
                        ...state,
                        loading: false,
                        error: true
                    });
                }

                localStorage.setItem(itemName, JSON.stringify(state));

                console.log("The validation was completed");
            }, 1000);
        }

        // console.log("Finishing the effect");
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
                    onChange={onChange}
                    onKeyPress={commentEnterSubmit}
                />

                <button
                    className={`${state.value === SECURITY_CODE && !state.error ? "check" : ""}`}
                    onClick={onClick}
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
                        onClick={() => {
                            setState({
                                ...state,
                                deleted: true
                            });
                        }}
                    >Delete</button>
                    <button
                        onClick={() => {
                            setState({
                                ...state,
                                confirmed: false,
                                value: ''
                            });
                        }}
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
                        onClick={() => {
                            setState({
                                ...state,
                                deleted: false,
                                confirmed: false,
                                value: ''
                            });
                        }}
                    >Return the react state again</button>
                </div>
            </React.Fragment>
        );
    }
}

export { UseState }