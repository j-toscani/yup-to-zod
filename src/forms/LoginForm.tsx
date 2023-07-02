
export const LoginForm = () => {
    
    return (<form >
        <h1>
            Login
        </h1>
        <fieldset>
            <input type="email" placeholder='E-mail' />
            <input type="password" placeholder='Passwort' />
        </fieldset>

        <button type="submit"> Submit </button>
    </form>
    )
}