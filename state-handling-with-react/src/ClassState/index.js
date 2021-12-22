import React from 'react'
import { Loading } from '../Loading'

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            loading: false
        };
    }

    // UNSAFE_componentWillMount(){
    //     console.log("componentWillMount")
    // }

    // componentDidMount(){
    //     console.log("componentDidMount")
    // }

    componentDidUpdate(){

        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Doing the validation");

                this.setState({loading: false});

                console.log("Finishing the validation");
            }, 3000);
        }

        console.log("Updating...")
    }

    render() {
        return (
            <div>
                <h2>Delete {this.props.name}</h2>

                <p>Please enter the security code</p>

                {
                    this.state.error && (
                        <p>Error: Security code is incorrect</p>
                    )
                }
                {
                    this.state.loading && (
                        < Loading />
                    )
                }
                <input placeholder="Security Code" />
                <button
                    onClick={() => { this.setState({ loading: true }) }}
                >Check</button>
            </div>
        );
    }
}

export { ClassState }