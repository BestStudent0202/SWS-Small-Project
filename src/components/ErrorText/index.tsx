import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
export interface IErrorTextProps {
    error:string;
 }

const AuthRoute: React.FunctionComponent<IErrorTextProps> = props => {
    const { error } = props;

    if (error === '')
    {
        return null
    }

    return (
        <small className="text-danger">
            {error}
        </small>
    );
}

export default AuthRoute;