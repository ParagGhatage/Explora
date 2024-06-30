

import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  message:string;
  name:string;

}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,message,name
}) => (
    <div className='flex-wrap p-4 m-3'>
    <h1 >Name :{name}</h1>
    <p>This message is from VoyageVista:</p>
    <p>
    Message : {message}
    </p>
    <p className='text-2xl text-green-400'>Client Email : {email} </p>
    
  </div>
);
