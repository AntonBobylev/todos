import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {login} from './api';

export default class Login extends Component
{
    constructor(props) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.clearFormData();
    }

    clearFormData()
    {
        this.formData = {
            email: '',
            password: ''
        }
    }

    handleEmailChange(evt)
    {
        this.formData.email = evt.target.value;
    }

    handlePasswordChange(evt)
    {
        this.formData.password = evt.target.value;
    }

    async handleFormSubmit(evt)
    {
        evt.preventDefault();

        const result = await login(this.formData.email, this.formData.password);
        if (typeof result !== 'object') {
            console.log(result);
        }
    }

    render()
    {
        if (this.props.currentUser) {
            return <Navigate to="/" replace />
        }

        return (
            <section>
                <h1>Авторизация</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="field">
                        <label className="label">Адрес электронной почты</label>
                        <div className="control">
                            <input type="email"
                                   className="input"
                                   onChange={this.handleEmailChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Пароль</label>
                        <div className="control">
                            <input type="password"
                                   className="input"
                                   onChange={this.handlePasswordChange}
                            />
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="submit"
                                   className="button is-primary"
                                   value="Войти"
                            />
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}
