import React from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onClick = (event) => {
        setLoading(true);
    }

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const commentEnterSubmit = (event) => {
        if (event.key === "Enter" && event.shiftKey === false) {
            return onClick(event);
        }
    }

    React.useEffect(() => {
        // console.log("Starting the effect");

        if (!!loading) {                
            console.log("Doing the validation");
            setTimeout(() => {

                if(value === SECURITY_CODE){
                    setLoading(false);
                    setError(false)
                }
                else{
                    setLoading(false);
                    setError(true);
                }

                console.log("The validation was completed");
            }, 2000);
        }

        // console.log("Finishing the effect");
    }, [loading]);

    return (
        <div>
            <h2>Delete {name}</h2>

            <p>Please enter the security code</p>

            {(error && !loading) && (
                <p>Error: Security code is incorrect</p>
            )}
            {loading && (
                <p>Loading...</p>
            )}

            <input 
                placeholder="Security Code"
                value={value}
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