import {useParams} from 'react-router-dom';

export default function TodoDetail(props)
{
    const {key} = useParams(),
        deed = props.getDeed(key);

    return (
        <section>
            {deed.done &&
                <p className="has-text-success">
                    Выполнено
                </p>
            }
            <h1>{deed.title}</h1>
            <p>{deed.createdAt}</p>
            {deed.desc && <p>{deed.desc}</p>}
            {deed.image && <p><img src={deed.image} alt="Иллюстрация" /></p>}
        </section>
    );
}
