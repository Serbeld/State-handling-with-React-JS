import React from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {

    const [state, setState] = React.useState(
        {
            value: '',
            error: false,
            loading: false, 
        }
    );

    // const [value, setValue] = React.useState('');
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    const onClick = (event) => {
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
            return onClick(event);
        }
    }

    React.useEffect(() => {
        // console.log("Starting the effect");

        if (!!state.loading) {                
            console.log("Doing the validation");
            setTimeout(() => {

                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        loading: false,
                        error: false
                    });
                }
                else{
                    setState({
                        ...state,
                        loading: false,
                        error: true
                    });
                }

                console.log("The validation was completed");
            }, 2000);
        }

        // console.log("Finishing the effect");
    }, [state.loading]);

    return (
        <div>
            <h2>Delete {name}</h2>

            <p>Please enter the security code</p>

            {(state.error && !state.loading) && (
                <p>Error: Security code is incorrect</p>
            )}
            {state.loading && (
                <p>Loading...</p>
            )}

            <input 
                placeholder="Security Code"
                value={state.value}
                onChange={onChange}
                onKeyPress={commentEnterSubmit}
            />

            <button
                onClick={onClick}
            >Check</button>
        </div>
    );
}

export { UseState }