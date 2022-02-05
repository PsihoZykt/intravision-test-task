import React, {useState} from 'react';
import s from './index.module.css'
import Button from "../UI/button";

const Tasks = ({selectTask, openNewTaskWindow, openEditTaskWindow, tasks, priorities}) => {
    let tasksElement = tasks.map(task => {
        return <Task priorities={priorities}
                     id={task.id}
                     openEditTaskWindow={openEditTaskWindow}
                     name={task.name}
                     selectTask={selectTask}
                     initiatorName={task.initiatorName}
                     statusName={task.statusName}
                     statusRgb={task.statusRgb}
                     task={task}
                     comment={task.comment}
                     executorId={task.executorId}
                     executorName={task.executorName}
                     statusId={task.statusId}
                     priorityId={task.priorityId}/>
    })

    return (
        <div className={s.tasks}>
            <Button onClick={openNewTaskWindow}> Создать заявку </Button>
            <TasksRowLabels/>
            <Delimiter/>
            {tasksElement}
        </div>
    );
};
const Task = ({
                  selectTask,
                  executorId,
                  executorName,
                  statusId,
                  task,
                  id,
                  name,
                  statusName,
                  initiatorName,
                  priorityId,
                  priorities,
                  comment,
                  statusRgb = "#ffffff"
              }) => {
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
    const [selectedExecuter, setSelectedExecuter] = useState({id: executorId, name: executorName})
    const [selectedStatus, setSelectedStatus] = useState({id: statusId, name: statusName, rgb: statusRgb})


    const getPriorityColor = (priorityId) => {
        return priorities.find(priority => {
            return priority.id === priorityId
        }).rgb
    }
    return (
        <div onClick={() => selectTask(task)} className={s.taskItem}>
            <div className={s.priority} style={{backgroundColor: getPriorityColor(priorityId)}}/>
            <div className={s.id}> {id} </div>
            <div className={s.name}> {name}</div>
            <div style={{backgroundColor: statusRgb}} className={s.statusName}> {statusName}</div>
            <div className={s.executor}> {executorName}</div>
        </div>
    )
}
const TasksRowLabels = () => {
    return (
        <div className={s.tasksRowLabels}>
            <div className={s.id}>ID</div>
            <div className={s.name}>Название</div>
            <div className={s.statusName}>Статус</div>
            <div className={s.initiatorName}>Исполнитель</div>
        </div>
    )
}
const Delimiter = () => {
    return <div className={s.delimiter}>
    </div>
}

export default Tasks;