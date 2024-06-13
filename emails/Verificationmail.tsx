import * as React from 'react';

interface EmailTemplateProps {
    username?: string,
    code?: string
}

export const EmailTemplate = ({
    username, code
}: EmailTemplateProps) => (
    <div>
        <h3 className='text-center'>Hii {username} ! Thank you for signing up at Prashn </h3>
        <p>
            For the next step You need to verify your email. <br /><br />
            Your verification code is <b><i>{code}</i></b>
        </p>
        <br />
        <p>
            Please note that This Code is only valid for only <b>10 mins</b>
        </p>
        <br /><br />

        Thank You For Joining Us <br />

        <h5>
            *** Please do not reply to this email. As this is an machine genrated email. ***
        </h5>
    </div>
);
