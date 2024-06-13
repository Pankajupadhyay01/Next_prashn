import * as React from 'react';

interface EmailTemplateProps {
    username?: string,
    message?: string
}

export const forgetPass = ({ username, message }: EmailTemplateProps) => (
    <div>
        <h3 className='text-center'>Hii {username} </h3>
        <p>
            For restting you password please click on the given link below to reset your password <br />
            <b><i>{message}</i></b>
        </p>
        <br />
        <p>
            Please note that This Link is only valid for only <b>10 mins</b>
        </p>
        <br /><br />

        Thank You For Joining Us <br />

        <h5>
            *** Please do not reply to this email. As this is an machine genrated email. ***
        </h5>
    </div>
);
