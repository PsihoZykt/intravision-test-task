import React, {useState} from 'react';
import s from "./index.module.css";
import closeButton from "../../assets/img/closeButton.svg";
import Button from "../UI/button";
import axios from "axios";

const EditTask = ({task, closeEditTaskWindow}) => {
    const {
        name,
        id,
        description,
        statusId,
        statusName,
        statusRgb,
        comment,
        tags,
        executorId,
        executorName,
        initiatorName,
        priorityId,
        priorityName,
        resolutionDatePlan,
    } = task;
    //     createdAt: "2022-02-03T15:19:30.0199866+03:00"
// description: "<p style=\"color: #e5e5e5;\">Уха</p> из трех видов рыб. Салат с телятиной. МОРС КЛЮКВЕННЫЙ"
// executorGroupId: 70104
// executorGroupName: "Офис менеджеры"
// executorId: 70105
// executorName: "Петров Борис"
// id: 191646
// initiatorId: 70106
// initiatorName: "Иванов Андрей"
// name: "Заказать обед"
// price: 100
// priorityId: 103508
// priorityName: "Средний"
// resolutionDatePlan: "2022-02-03T15:19:30.0199866+03:00"
// serviceId: 70104
// serviceName: "Еда > Заказ обедов"
// statusId: 120210
// statusName: "Открыта"
// statusRgb: "#fd5e53"
// tags: Array [ {…}, {…} ]
// taskTypeId: 70105
// taskTypeName: "Стандартный"
// updatedAt: "2022-02-03T15:19:30.0199866+03:00"
    const [newCommentaryText, setNewCommentaryText] = useState("")
    let [commentaries, setCommentaries] = useState([])

    const commentariesElement = commentaries?.map(commentary => {
        return <div> {commentary.text} </div>
    })
    const addCommentary = () => {
        axios.put(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Tasks`, {
            id,
            executorId,
            priorityId,
            statusId,
            comment: "Testing"
        }).then(
            res => console.log(res)
        )

    }
console.log(task)
    return (
        <div className={s.editTask}>

            <div className={s.header}>
                <div className={s.id}>{id}</div>
                <div className={s.name}> {name} </div>
                <div onClick={closeEditTaskWindow} className={s.closeButton}><img src={closeButton} alt="X button"/>
                </div>
            </div>
            <div className={s.mainPage}>
                <div className={s.leftSide}>
                    <div className={s.descriptionWrapper}>
                        <div className={s.descriptionLabel}>Описание</div>
                        <div className={s.description}>{description}</div>
                    </div>
                    <div className={s.addCommentaryWrapper}>
                        <div className={s.addCommentaryLabel}>
                            Добавление комментариев
                        </div>
                        <div className={s.addCommentary}>
                            <input value={newCommentaryText} onChange={e => setNewCommentaryText(e.target.value)}/>
                        </div>
                        <Button
                            onClick={addCommentary}
                            style={{marginLeft: "0"}}> Сохранить </Button>
                        <div className={s.commentaries}>
                            {comment}
                        </div>


                    </div>
                </div>
                <div className={s.rightSide}>
                    <div className={s.status}>{statusName}</div>
                    <div className={s.initiatorName}>{initiatorName}</div>
                    <div className={s.createdBy}>Создана кем то</div>
                    <div className={s.executorName}>{executorName}</div>
                    <div className={s.priority}>{priorityName}</div>
                    <div className={s.term}>{resolutionDatePlan}</div>
                    <div className={s.tags}>{tags.map(tag => <div>{tag.name}</div>)}</div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;