import Header from "./components/Header";
import s from './App.module.css'
import 'normalize.css'
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import {useEffect, useState} from "react";
import EditTask from "./components/EditTask";
import axios from "axios";

const App = () => {
  const [newTaskIsOpen, setNewTaskIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState([{"id":191646,"name":"Заказать обед","description":"<p style=\"color: #e5e5e5;\">Уха</p> из трех видов рыб. Салат с телятиной. МОРС КЛЮКВЕННЫЙ","createdAt":"2022-02-03T15:19:30.0199866+03:00","updatedAt":"2022-02-03T15:19:30.0199866+03:00","price":100,"taskTypeId":70105,"taskTypeName":"Стандартный","statusId":120210,"statusName":"Открыта","statusRgb":"#fd5e53","priorityId":103508,"priorityName":"Средний","serviceId":70104,"serviceName":"Еда > Заказ обедов","resolutionDatePlan":"2022-02-03T15:19:30.0199866+03:00","initiatorId":70106,"initiatorName":"Иванов Андрей","executorId":70105,"executorName":"Петров Борис","executorGroupId":70104,"executorGroupName":"Офис менеджеры","tags":[{"id":103507,"name":"Салат"},{"id":103506,"name":"Суп"}]}])
  const openNewTaskWindow = () => {
    setNewTaskIsOpen(true)
  }
  const closeNewTaskWindow = () => {
    setNewTaskIsOpen(false)
  }
  const selectTask = (task) => {
    setSelectedTask(task)
    setEditTaskWindowIsOpen(true)
  }
  const [tasks, setTasks] = useState([{"id":191646,"name":"Заказать обед","description":"<p style=\"color: #e5e5e5;\">Уха</p> из трех видов рыб. Салат с телятиной. МОРС КЛЮКВЕННЫЙ","createdAt":"2022-02-03T15:19:30.0199866+03:00","updatedAt":"2022-02-03T15:19:30.0199866+03:00","price":100,"taskTypeId":70105,"taskTypeName":"Стандартный","statusId":120210,"statusName":"Открыта","statusRgb":"#fd5e53","priorityId":103508,"priorityName":"Средний","serviceId":70104,"serviceName":"Еда > Заказ обедов","resolutionDatePlan":"2022-02-03T15:19:30.0199866+03:00","initiatorId":70106,"initiatorName":"Иванов Андрей","executorId":70105,"executorName":"Петров Борис","executorGroupId":70104,"executorGroupName":"Офис менеджеры","tags":[{"id":103507,"name":"Салат"},{"id":103506,"name":"Суп"}]}])
  const [editTaskWindowIsOpen, setEditTaskWindowIsOpen] = useState(false)
  const openEditTaskWindow = () => {
    setEditTaskWindowIsOpen(true)
  }
  const closeEditTaskWindow = () => {
    setEditTaskWindowIsOpen(false)
  }

  console.log(JSON.stringify(tasks[0]))
  useEffect(() => {
    axios.get(`http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=${process.env.REACT_APP_API_GUID}`).then(
        res => setTasks(res.data.value)
    )


  }, [])

  return <div className={s.app}>
    <Header/>
    <Tasks selectTask={selectTask} openEditTaskWindow={openEditTaskWindow} openNewTaskWindow={openNewTaskWindow}/>
    {newTaskIsOpen && <NewTask closeNewTaskWindow={closeNewTaskWindow}/> }
    {editTaskWindowIsOpen && <EditTask closeEditTaskWindow={closeEditTaskWindow} task={selectedTask}/> }
  </div>
}
export default App;
