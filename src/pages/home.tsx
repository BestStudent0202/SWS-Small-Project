import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { Button } from 'antd';
import 'antd/dist/reset.css';

const user = auth.currentUser;
let userName:string | null | undefined='';

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile?.providerId);
    console.log("  Provider-specific UID: " + profile?.uid);
    console.log("  Name: " + profile?.displayName);
    console.log("  Email: " + profile?.email);
    userName=profile?.email;
    console.log("  Photo URL: " + profile?.photoURL);
  });
}
const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (
        <Container>
            <Card>
                <CardBody>
                    <p>
                        Welcome to this page that is protected by Friebase auth! {userName}<br />
                        Change your password <Link to="/change">here</Link>.
                        
                    </p>
                    <p>
                        User: {auth.currentUser?.email}<br />
                        Click <Link to="/logout">here</Link> to logout.
                    </p>
                    
                </CardBody>
            </Card>
        </Container>
    );
}

export default HomePage;