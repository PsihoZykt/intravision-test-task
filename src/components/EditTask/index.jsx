import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import closeButton from "../../assets/img/closeButton.svg";
import Button from "../UI/button";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import axios from "axios";

const EditTask = ({task, closeEditTaskWindow, changeStatus, changeExecutor, statuses, users}) => {
    const {
        name,
        id,
        description,
        statusId,
        statusName,
        statusRgb,
        tags,
        executorId,
        executorName,
        initiatorName,
        priorityId,
        priorityName,
        resolutionDatePlan,
    } = task;


    useEffect(() => {
        axios.get(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Tasks/${id}`).then(res => {
            console.log(res.data)
            setCurrentTask(res.data)
        })
    }, [])
    const [selectedExecutor, setSelectedExecutor] = useState({name: executorName, id: executorId})
    const [selectedStatus, setSelectedStatus] = useState({id: statusId, name: statusName, rgb: statusRgb})
    const [currentTask, setCurrentTask] = useState({task})
    const [commentary, setCommentary] = useState("")
    const addCommentary = () => {
        axios.put(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Tasks`, {
            id, statusId, priorityId, executorId, comment: commentary
        }).then(res => {
            axios.get(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Tasks/${id}`).then(res => {
                console.log(res.data)
                setCurrentTask(res.data)
            })
        })
    }
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
                            <input value={commentary} onChange={e => setCommentary(e.target.value)}/>
                        </div>
                        <Button
                            onClick={addCommentary}
                            style={{marginLeft: "0"}}> Сохранить </Button>
                        <div className={s.commentaries}>
                            {currentTask.lifetimeItems?.map(lifetimeItem => {
                               return <div> {lifetimeItem.comment} </div>
                            })}
                        </div>


                    </div>
                </div>
                <div className={s.rightSide}>
                    <Dropdown className={s.dropdown} options={statuses.map(statusItem => statusItem.name)}
                              onChange={(statusName) => {
                                  changeStatus(id, statusName, priorityId, executorId)
                              }} value={selectedStatus.name}
                              menuClassName={s.dropdownMenu}
                              placeholder="Select an option"/>
                    {/*<div className={s.status + " " + "Dropdown-control"}>{selectedStatus.name}</div>*/}
                    <div className={s.initiatorName}>{initiatorName}</div>
                    <div className={s.createdBy}>Создана кем то</div>
                    <Dropdown className={s.dropdown} options={users.map(userItem => userItem.name)}
                              menuClassName={s.dropdownMenu}
                              onChange={(executorName) => {
                                  changeExecutor(id, executorName, statusId, priorityId, executorId)
                              }}
                              value={selectedExecutor.name}
                    >{selectedExecutor.name}</Dropdown>
                    <div className={s.priority}>{priorityName}</div>
                    <div className={s.term}>{resolutionDatePlan}</div>
                    <div className={s.tags}>{tags.map(tag => <div>{tag.name}</div>)}</div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;