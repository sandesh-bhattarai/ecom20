import {Component} from "react";
import {H4Text} from "../component/typography/text.component";

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageTitle: "Login",
            props: {...this.props}
        }
        console.log("I am Constructor")
    }

    componentDidMount = ()=>{
        this.setState({
            pageTitle: "UPdated Title"
        })
        console.log("I am component did mount")
    }

    componentDidUpdate = () => {
        console.log("Component Did Update")
        // this.setState({
        //     pageTitle: "Login Page"
        // })
    }
    componentWillUnmount = () => {
        console.log("I am component will unmount")
    }

    render = () =>{
        
        console.log("I am render function")
        return (<>
            <div className="container">
                <div className="row my-5">
                    <div className="col-12">
                        <H4Text title={this.state.pageTitle} />
                        <hr />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        {this.props.name}
                    </div>
                </div>
            </div>
        </>)
    }
}

export default HomePage