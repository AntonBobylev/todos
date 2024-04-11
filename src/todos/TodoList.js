import {Navigate} from 'react-router-dom';
import TodoItem from "./TodoItem";

export default function TodoList (props) {
    if (!props.currentUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <section>
            <h1>Дела</h1>
            <table className="table is-hoverable is-fullwidth">
                <tbody>
                {props.list.map((item) => (
                    <TodoItem key={item.key}
                              item={item}
                              setDone={props.setDone}
                              delete={props.delete}
                    />
                ))}
                </tbody>
            </table>
        </section>
    );
}
