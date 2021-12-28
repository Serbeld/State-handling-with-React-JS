import React from 'react'

class Loading extends React.Component {

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    render() {
        return (
            <React.Fragment>
                <p className='loading'>Loading...</p>
            </React.Fragment>
        );
    }
}

export { Loading }