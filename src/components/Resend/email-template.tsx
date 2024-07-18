

import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  message:string;
  name:string;

}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,message,name
}) => (
    <div className='flex-wrap p-4 m-3'>
    <p >Name :{name}</p>
    <p>This message is from Contact Me Explora :</p>
    <p>
    Message : {message}
    </p>
    <p className='text-2xl text-green-400'>Client Email : {email} </p>
    
  </div>
);

export default EmailTemplate
