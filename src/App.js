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
  const [tasks, setTasks] = useState([{
    "id": 191646,
    "name": "Заказать обед",
    "description": "<p style=\"color: #e5e5e5;\">Уха</p> из трех видов рыб. Салат с телятиной. МОРС КЛЮКВЕННЫЙ",
    "createdAt": "2022-02-03T15:19:30.0199866+03:00",
    "updatedAt": "2022-02-03T15:19:30.0199866+03:00",
    "price": 100,
    "taskTypeId": 70105,
    "taskTypeName": "Стандартный",
    "statusId": 120210,
    "statusName": "Открыта",
    "statusRgb": "#fd5e53",
    "priorityId": 103508,
    "priorityName": "Средний",
    "serviceId": 70104,
    "serviceName": "Еда > Заказ обедов",
    "resolutionDatePlan": "2022-02-03T15:19:30.0199866+03:00",
    "initiatorId": 70106,
    "initiatorName": "Иванов Андрей",
    "executorId": 70105,
    "executorName": "Петров Борис",
    "executorGroupId": 70104,
    "executorGroupName": "Офис менеджеры",
    "tags": [{"id": 103507, "name": "Салат"}, {"id": 103506, "name": "Суп"}]
  }])
  const [priorities, setPriorities] = useState([{
    id: 103508,
    name: "Средний",
    rgb: "#f75394",
  }])
  const [editTaskWindowIsOpen, setEditTaskWindowIsOpen] = useState(false)
  const openEditTaskWindow = () => {
    setEditTaskWindowIsOpen(true)
  }
  const closeEditTaskWindow = () => {
    setEditTaskWindowIsOpen(false)
  }
  const [statuses, setStatuses] = useState([{
    "rgb": "#3cb371",
    "id": 120206,
    "name": "Закрыта"
  }])
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(`http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=${process.env.REACT_APP_API_GUID}`).then(
        res => {
          setTasks(res.data.value)
        }
    )
  }, [])

  useEffect(() => {
    axios.get(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Statuses`).then(
        res => setStatuses(res.data)
    )
    axios.get(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Users`).then(res => {
      setUsers(res.data)
    })
  }, [])
  console.log(tasks)
  useEffect(() => {
    axios.get(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Priorities`).then(
        res => setPriorities(res.data)
    )

  }, [])
  const changeStatus = (taskId, statusName, priorityId, executorId) => {
    console.log(taskId, statusName, priorityId, executorId)
    let newSelectedStatus = statuses.find(statusItem => statusItem.name === statusName.value)
    return axios.put(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Tasks`, {
      id: taskId, statusId: newSelectedStatus.id, priorityId, executorId
    }).then(res => {
      let newTasks = [...tasks]
      newTasks.forEach(task => {
        if(task.id === taskId) {
          task.statusId = newSelectedStatus.id
          task.statusRgb = newSelectedStatus.rgb
          task.statusName = newSelectedStatus.name

        }

        setTasks(newTasks)
      })
    })

  }
  const changeExecutor = (taskId, executorName, statusId, priorityId, executorId) => {
    let newSelectedExecutor = users.find(userItem => userItem.name === executorName.value)
    return axios.put(`http://intravision-task.test01.intravision.ru/api/${process.env.REACT_APP_API_GUID}/Tasks`, {
      id: taskId, executorId: newSelectedExecutor.id, priorityId, executorName: executorName.value, statusId
    }).then(res => {
      let newTasks = [...tasks]
      newTasks.forEach(task => {
        if(task.id === taskId) {
          task.executorName = executorName.value
          task.executorId = executorId
        }
        setTasks(newTasks)
      })
    })
  }
  return <div className={s.app}>
    <Header/>
    <Tasks tasks={tasks} priorities={priorities} selectTask={selectTask} openEditTaskWindow={openEditTaskWindow}
           openNewTaskWindow={openNewTaskWindow}/>

    {newTaskIsOpen && <NewTask closeNewTaskWindow={closeNewTaskWindow}/>}

    {editTaskWindowIsOpen &&
        <EditTask statuses={statuses} users={users} changeExecutor={changeExecutor} changeStatus={changeStatus}
                  closeEditTaskWindow={closeEditTaskWindow}
                  task={selectedTask}/>}
  </div>
}
export default App;
