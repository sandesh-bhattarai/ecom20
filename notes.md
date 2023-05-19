## React 
    - Library 

## Requirement 
    - build ===> babel 


## Functions use 
function functionName(params) {
    // function body
    return value;
}

const functionName = function(params){
    return Value;
}

const functionName = (parmeters, cb) =>  {
    
    cb(value)
}

functionName({args}, (ret)=>{
    // manipulate
})
ret


const abc = async () => {
    try{
        return value
    } catch(err) {
        throw err
    }
}

// async return => resolve 
// async throw  => reject 


const xyz = async () => {
    try{
        let result = await abc()
    } catch(err) {
        // 
    }
}

abc().then((resolve) => {
// resolve
}).catch((reje) => {
// rej
})

## Synchronous and Asynchronous 
let ret1 = await func1()  
let ret2 = await func2(ret1) 
let ret3 = await func3(ret2) 
let res4 = await func4(ret3) 

promise define => asynchronous 
By using callback functions 
by using .then() .catch()
by using try catch with async and await
## OOP use 
    functional component 
    class based 
    class ClassName{
        data, 
        constructor(){
            // code base execute
        }
        methodName = () => {

        }
    }

    let obj = new ClassName()
    obj.methodName()
    obj.data;

    let arr = []

    txt.methodName()
    arr.map()


## React app Folder structure 
npx create-react-app folderName
    - node_modules 
        - to store vendors and all the packages 
    - public 
        - where all the execution happens 
        - NOTE: index.html should always present here 
    - src 
        - all the code base for react app should be inside this 
        - NOTE: index.js should always be present in this folder

## TO run the project 
    - get inside root dir of your project
    - run 
        npm start

## Component


## Import export 

    ES5 and ES6
    require, module.exports

    import and export 

        export => default 
            named export 

        default import => import name from "package"
        named export => import {name} from "module/package"
        import "module/package"


### Components 
    -> UI element represents View 
    -> Can be a page , component with a single line of code for a view
    - Two types 
        a. Statefull / Class based 
        b. Stateless / Functional 
            - 16.8 web hook was introduced

### Lifecylce of Component 
    - Mounting Phase 
        constructor, render, componentDidMount
    - Updating Phase 
        render, componentDidUpdate
    - Unmounting Phase
        componentWillUnmount

### Web Hook    
    - use

    a. State Hook 
        useState()
    b. Effect Hook
        useEffect()
    c. Context Hook
        createContext() 
        useContext()
    d. Performance Hook 
        useMemo(), useCallback()
    e. Reference Hook 
        useRef()


API URL 
    -> https://exp-18.sandeshbhattara.repl.co/api/v1/


Postman Document endpoint: 
    -> https://documenter.getpostman.com/view/1318483/2s93JqRQPW


Cookie 
    - a domain can have max of 50 cookie
    - A cookie can store 4096 chars
    - maturity self delete
    - cookie is depenent on domain and path
    document.cookie = "name=name;value=sandesh Bhattarai;expiry=time"

localStoage / SessionStorage
    - any numbers of items
    - max limit of 5mb
    - never matures
    - domain or tab dependent

    localStorage.setItem('name', value)
    sessionStorage.setItem('name', value)

    localStorage.getItem('name')
    sessionStorage.getItem('name')

    localStorage.removeItem('name')
    sessionStorage.removeItem('name')

    localStorage.clear()
    sessionStorage.clear()


Non loggedin user tries to change the password. 
-> Forget password logic 
    -> Form Open to get user email (registered email ) (FE)
        - API Submit 
            (BE) => Email check registered ( otp code, token forget_pwd_reset_token, otp_code)
                -> email with a link or otp to reset password
                    http://localhost:3000/reset-password?token=token_generated
                    OTP value set 
        success (FE) => OTP => Open a new Form to receive OTP Code
                    http://localhost:3000/reset-password?otp=1234
                        email => notify email has been sent follow the steps 
            <!-- (BE) otp => API otp => user serach 
                success  -->

            (FE) => open a form password and confirm password
                    --- 
                    API Call {
                        password: ,
                        confirm_password: ,
                        <!-- otp_code: 123, -->
                        token: token
                    }
            (BE) => 


### 
<input type ="file" onChange={(e) => {
    let selImage = Object.values(e.files);
    // selImage => [{}]

}}>

rule => image: Yup.array(Yup.object())

// formData => formData.append('image', )