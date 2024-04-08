import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {add} from './api';

export default class TodoAdd extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            redirect: false,
            deedTitleError: '',
            deedDescError: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.resetErrorMessages = this.resetErrorMessages.bind(this);

        this.clearFormData();
    }

    clearFormData()
    {
        this.formData = {
            title: '',
            desc: '',
            image: ''
        };
    }

    handleTitleChange(evt)
    {
        this.formData.title = evt.target.value;
    }

    handleDescChange(evt)
    {
        this.formData.desc = evt.target.value;
    }

    handleImageChange(evt)
    {
        const cFiles = evt.target.files;
        if (cFiles.length > 0) {
            const fileReader = new FileReader(),
                me = this;

            fileReader.onload = () => {
                me.formData.image = fileReader.result;
            }

            fileReader.readAsDataURL(cFiles[0]);
        } else {
            this.formData.image = '';
        }
    }

    async handleFormSubmit(evt)
    {
        evt.preventDefault();

        if (!this.validate()) {
            return;
        }

        const newDeed = {...this.formData},
            date = new Date();

        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();

        const addedDeed = await add(this.props.currentUser, newDeed);
        this.props.add(addedDeed);

        this.setState((state) => ({redirect: true}));
    }

    resetErrorMessages()
    {
        this.setState((state) => ({
            errorTitle: '',
            errorDesc: ''
        }));
    }

    validate()
    {
        this.resetErrorMessages();

        if (!this.formData.title) {
            this.setState((state) => ({
                errorTitle: 'Поле заголовка не заполнено'
            }));

            return false;
        }

        if (!this.formData.desc) {
            this.setState((state) => ({
                errorDesc: 'Поле примечания не заполнено'
            }));

            return false;
        }

        return true;
    }

    render()
    {
        if (!this.props.currentUser) {
            return <Navigate to="/login" replace />;
        }

        if (this.state.redirect) {
            return <Navigate to="/" />;
        }

        return (
            <section>
                <h1>Создание нового дела</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="field">
                        <label className="label">Заголовок</label>
                        <div className="control">
                            <input className="input" onChange={this.handleTitleChange} />
                        </div>
                        {
                            this.state.errorTitle &&
                                <p className="help is-danger">
                                    {this.state.errorTitle}
                                </p>
                        }
                    </div>
                    <div className="field">
                        <label className="label">Примечание</label>
                        <div className="control">
                            <textarea className="textarea" onChange={this.handleDescChange} />
                        </div>
                        {
                            this.state.errorDesc &&
                            <p className="help is-danger">
                                {this.state.errorDesc}
                            </p>
                        }
                    </div>
                    <div className="field">
                        <div className="file">
                            <label className="file-label">
                                <input className="file-input"
                                       type="file"
                                       accept="image/*"
                                       onChange={this.handleImageChange}
                                />
                                <span className="file-cta">
                                    <span className="file-label">
                                        Графическая иллюстрация...
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset"
                                   className="button is-link is-light"
                                   value="Сброс"
                                   onClick={() => {
                                       this.resetErrorMessages();
                                       this.clearFormData();
                                   }}
                            />
                        </div>
                        <div className="control">
                            <input type="submit"
                                   className="button is-primary"
                                   value="Создать дело"
                            />
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}