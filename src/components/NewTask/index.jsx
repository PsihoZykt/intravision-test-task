import React, {useState} from 'react';
import s from './index.module.css'
import Button from "../UI/button";
import closeButton from '../../assets/img/closeButton.svg'
import axios from "axios";
const NewTask = ({closeNewTaskWindow}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const createTask = () => {
        if(name.length !== 0 && description !== "" ) {
            axios.post(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/tasks`, {name, description}).then(
                res => console.log(res)
            )
        }
    }
    return (
        <div className={s.newTask}>

            <div className={s.header}>
                <div> Новая заявка </div>
                <div onClick={closeNewTaskWindow} className={s.closeButton}> <img src={closeButton} alt="X button"/></div>
            </div>
            <div className={s.nameWrapper}>
                <div className={s.nameLabel}>Название</div>
                <input value={name} onChange={e => setName(e.target.value)} className={s.name} />
            </div>
            <div className={s.descriptionWrapper}>
                <div className={s.descriptionLabel}>Описание</div>
                <input value={description} onChange={e => setDescription(e.target.value)} className={s.description} />
            </div>
            <Button onClick={createTask} style={{margin: "72px 0 0 37px"}}> Сохранить </Button>
        </div>
    );
};

export default NewTask;