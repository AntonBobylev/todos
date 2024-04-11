import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {login} from '../backend/api';

export default class Login extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            errorEmail: '',
            errorPassword: '',
            errorSubmit: ''
        };

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

        if (this.validate()) {
            const result = await login(this.formData.email, this.formData.password);
            if (typeof result !== 'object') {
                this.showErrorMessage(result);
            }
        }
    }

    resetErrorMessages()
    {
        this.setState((state) => ({
            errorEmail: '',
            errorPassword: '',
            errorSubmit: ''
        }));
    }

    validate()
    {
        this.resetErrorMessages();

        if (!this.formData.email) {
            this.setState((state) => ({
                errorEmail: 'Адрес электронной почты не указан'
            }));

            return false;
        }

        if (!this.formData.password) {
            this.setState((state) => ({
                errorPassword: 'Пароль не указан'
            }));

            return false;
        }

        return true;
    }

    showErrorMessage(code)
    {
        this.resetErrorMessages();

        switch (code) {
            case 'auth/invalid-email':
                this.setState((state) => ({
                    errorEmail: 'Не правильный адрес электронной почты'
                }));

                return;
            case 'auth/wrong-password':
                this.setState((state) => ({
                    errorPassword: 'Не правильный пароль'
                }));

                return;
            case 'auth/user-disabled':
                this.setState((state) => ({
                    errorSubmit: 'Пользователь отключён'
                }));

                return;
            case 'auth/user-not-found':
                this.setState((state) => ({
                    errorSubmit: 'Пользователь не найден'
                }));

                return;
            case 'auth/invalid-credential':
                this.setState((state) => ({
                    errorSubmit: 'Введённые данные не корректны'
                }));

                return;
            default:
                return;
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
                        {
                            this.state.errorEmail &&
                            <p className="help is-danger">
                                {this.state.errorEmail}
                            </p>
                        }
                    </div>

                    <div className="field">
                        <label className="label">Пароль</label>
                        <div className="control">
                            <input type="password"
                                   className="input"
                                   onChange={this.handlePasswordChange}
                            />
                        </div>
                        {
                            this.state.errorPassword &&
                            <p className="help is-danger">
                                {this.state.errorPassword}
                            </p>
                        }
                    </div>

                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="submit"
                                   className="button is-primary"
                                   value="Войти"
                            />
                        </div>
                    </div>

                    {
                        this.state.errorSubmit &&
                        <p className="help is-danger">
                            {this.state.errorSubmit}
                        </p>
                    }
                </form>
            </section>
        );
    }
}
