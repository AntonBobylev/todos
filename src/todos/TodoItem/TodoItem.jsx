import {Component} from 'react';
import {Link} from "react-router-dom";

export default class TodoItem extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            data: props.item,
            setDone: props.setDone,
            delete: props.delete
        }
    }

    render()
    {
        return (
            <tr>
                <td>
                    <Link to={`/${this.state.data.key}`}>
                        {this.state.data.done && <del>{this.state.data.title}</del>}
                        {!this.state.data.done && this.state.data.title}
                    </Link>
                </td>
                <td>
                    <button
                        className="button is-success"
                        title="Пометить как сделанное"
                        disabled={this.state.data.done}
                        onClick={(e) => this.state.setDone(this.state.data.key)}
                    >
                        &#9745;
                    </button>
                </td>
                <td>
                    <button
                        className="button is-danger"
                        title="Удалить"
                        onClick={(e) => this.state.delete(this.state.data.key)}
                    >
                        &#9746;
                    </button>
                </td>
            </tr>
        );
    }
};
