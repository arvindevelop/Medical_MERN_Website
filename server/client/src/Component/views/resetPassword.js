import React from 'react';

const resetPassword = () => {

    return (
        <>
            <h1>Reset password</h1>
            <form action="" method="post">
                <label for="password">password</label>
                <input type="password" name="password" id="password"/>
                <br/>
                <label for="password2">confirm password</label>
                <input type="password" name="password2" id="password2"/>
                <br/>
                <input type="submit" value="reset password"/>

            </form>
        </>
    )
}

export default resetPassword;