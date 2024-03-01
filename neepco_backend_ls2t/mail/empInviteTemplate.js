const empInviteTempalte = (officialEmail, officialPassword) => {
    return `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invite To Register Your Organisaton on NEEPCO Procurement and Payment System.</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
        </style>
    </head>

    <body>
        <p>Respected Officer Incharge,</p>
        <br />
        <p>Greetings from NEEPCO Procurement and Payment System Platform..!</p>
        <p>You have been registered by the Admin as Employee Role to the platform. Here is your credentials. Head to the login page to continue to login.</p>
        <br />
        <p>EmailID: ${officialEmail}</p>
        <p>Password: ${officialPassword}</p>
        <br />
        <p>Regards,</p>
        <p>NEEPCO Procurement and Payment System</p>
    </body>

    </html>`;
}

export default empInviteTempalte;