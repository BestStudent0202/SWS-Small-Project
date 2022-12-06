import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const ForgotPasswordPage: React.FunctionComponent<IPageProps> = props => {
    const [authenticating , setAuthenticating]=useState<boolean>(false);
    const [email,setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')
    const [error,setError]= useState<string>('')

    const history=useHistory();
    const signInWithEmailAndPassword=()=>{
        if(error!=='') setError('');

        setAuthenticating(true)

        auth.signInWithEmailAndPassword(email,password)
        .then(result=>{
            logging.info(result);
            history.push('/');
        })
        .catch(error=>{
            logging.error(error);
            setAuthenticating(false);
            setError("Unable to log in, Please Try Again Later")
        })

    }
    
    return (
        <AuthContainer header="Login">
            <FormGroup>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={event => setEmail(event.target.value)}
                    value ={email}
                
                />

            </FormGroup>
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={event => setPassword(event.target.value)}
                    value ={password}
                
                />

            </FormGroup>
            <Button
                disabled={authenticating}
                color="success"
                block
                onClick={()=> signInWithEmailAndPassword() }
            
            >
      page          LogIn
            </Button>
            <small>
                <p className='m-1 text-center'> Dont Have A Account ?<Link to ="/Register">Login.</Link></p>
            </small>
            <ErrorText error={error}></ErrorText>
        </AuthContainer>
    );
}

export default ForgotPasswordPage;