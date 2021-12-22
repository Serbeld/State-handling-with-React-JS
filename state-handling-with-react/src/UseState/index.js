import React from 'react'

function UseState({ name }) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("Starting the effect");

        if (!!loading) {
            setTimeout(() => {
                console.log("Doing the validation");

                setLoading(false);

                console.log("Finishing the validation");
            }, 3000);
        }

        console.log("Finishing the effect");
    }, [loading]);

    return (
        <div>
            <h2>Delete {name}</h2>

            <p>Please enter the security code</p>

            {error && (
                <p>Error: Security code is incorrect</p>
            )}
            {loading && (
                <p>Loading...</p>
            )}

            <input placeholder="Security Code" />

            <button
                onClick={() => setLoading(true)}
            >Check</button>
        </div>
    );
}

export { UseState }