import React from 'react'
import { Loading } from '../Loading'

const SECURITY_CODE = 'paradigma';
class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
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
            console.log("Doing the validation");
            setTimeout(() => {

                this.setState({loading: false});

                if(SECURITY_CODE === this.state.value){
                    this.setState({ error: false, loading: false })
                }
                else{
                    this.setState({ error: true, loading: false })
                }

                console.log("The validation was completed");
            }, 2000);
        }

        // console.log("Updating...")
    }

    render() {
        return (
            <div>
                <h2>Delete {this.props.name}</h2>

                <p>Please enter the security code</p>

                {
                    (this.state.error && !this.state.loading) && (
                        <p className='error'>Error: Security code is incorrect</p>
                    )
                }
                {
                    this.state.loading && (
                        < Loading />
                    )
                }
                <input 
                    placeholder="Security Code" 
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({value: event.target.value })
                    }}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" && event.shiftKey === false) {
                            this.setState({ loading: true})
                        }
                    }}
                />
                <button
                    className={`${this.state.value === SECURITY_CODE && !this.state.error ? "check" : ""}`}
                    onClick={() => { this.setState({ loading: true }) }}
                >Check</button>
            </div>
        );
    }
}

export { ClassState }