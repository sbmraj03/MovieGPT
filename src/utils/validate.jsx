// on submitting the form, first we have to validate the entries of our form
// for that we are using regex for the form validation

export const checkValidData = (email, password) => {
    const isEmailValid = 
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)

    const isPasswordValid = 
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)


    if(!isEmailValid || !isPasswordValid) return "Email or Password is not correct"
    return null;

}