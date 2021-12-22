import React from 'react'

class Loading extends React.Component {

    componentWillUnmount(){
        console.log("componentWillUnmount")
    }

    render() {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
}

export { Loading }