import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [registering , setRegistering]=useState<boolean>(false);
    const [email,setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')
    const [confirm,setConfirm]= useState<string>('')
    const [error,setError]= useState<string>('')

    const history=useHistory();

    const signUpWithEmailAndPassword=()=>{
        console.log("ok")
        if (error !== '') 
            setError('')
        
        if (password !== confirm)
        {
            setError('Please make sure your passwords match.');
            return;
        }
        setRegistering(true);

        auth.createUserWithEmailAndPassword(email,password)
        .then(result=>{
            console.log('umm')
            logging.info(result);
            history.push('/login');
            

        })
        .catch(error=>{
            logging.error(error);
            console.log('hmm')
            if (error.code.includes('auth/weak-password'))
            {
                setError("Please eneter a strong password");
            }
            else if (error.code.includes("auth/email-already-in-use")){
                setError("Email already in use.")
            }
            else
            {
                setError("Unable to register. Please Try Again Later ")
            }
            setRegistering(false);
            
        })
        



    }
    
    return (
        <AuthContainer header="register">
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
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value ={confirm}
                
                />

            </FormGroup>
            <Button
                disabled={registering}
                color="success"
                block
                onClick={()=> signUpWithEmailAndPassword()}
            
            >
                Sign Up
            </Button>
            <small>
                <p className='m-1 text-center'> Already Have An Account ?<Link to ="/login">Login.</Link></p>
            </small>
            <ErrorText error={error}></ErrorText>
        </AuthContainer>
    );
}

export default RegisterPage;