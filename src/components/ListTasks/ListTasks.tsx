import React, {useMemo, useState} from "react"
import {Button, Select, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Statuses} from "../../interfaces/ITask";
import CardCustom from "../Card/Card";
import classes from "./ListTasks.module.scss";
import ModalAddTask from "../UI/ModalAddTask/ModalAddTask";
import {addTask} from "../../features/TaskSlice/TaskSlice";
import dayjs from "dayjs";


function ListTasks (){
    const tasks = useSelector((state: RootState) => state.tasks)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const [filters,setFilters] = useState({status:0,isOverdue:false})

    const tasksFiltered = useMemo(()=>{
        let result = [...tasks]
        if(filters.status){
            result = result.filter(elem=>elem.status == filters.status)
        }
        if(filters.isOverdue){
            result = result.filter(elem=> {
                let date = dayjs(elem.date,"YYYY-MM-DD")
                if(dayjs().isBefore(date))return false
                else return true
            })
        }
        return result
    },[tasks,filters])



    return (
        <div>
            <div className={classes.header}>
                <h2 className={classes.header_title}>Список задач.</h2>
                <Button onClick={()=>setIsModalOpen(true)} type="primary" size="large">Добавить задачу</Button>
            </div>
            <div className={classes.filters}>
                <h2 className={classes.header_title}>Фильтры:</h2>
                <div className={classes.filters_wrap}>
                    <div>
                        <Typography.Title level={5}>По статусу задачи</Typography.Title>
                        <Select
                            defaultValue={"Не выбранно"}
                            style={{width:150}}
                            options={[
                                {
                                    value:Statuses.default,
                                    label: "Не выбранно"
                                },
                                {
                                    value:Statuses.new,
                                    label:"Новая"
                                },
                                {
                                    value:Statuses.inProgress,
                                    label:"В прогрессе"
                                },
                                {
                                    value:Statuses.finished,
                                    label:"Выполнена"
                                }
                            ]}
                            onChange={(value)=>{setFilters(prevState => ({...prevState,status:+value}))}}
                        >
                        </Select>
                    </div>
                    <div>
                        <Typography.Title level={5}>Просроченые задачи</Typography.Title>
                        <Select
                            defaultValue={"Не выбранно"}
                            style={{width:150}}
                            options={[
                                {
                                    value:true,
                                    label: "Да"
                                },
                                {
                                    value:false,
                                    label:"Нет"
                                }
                            ]}
                            onChange={(value)=>{setFilters(prevState => ({...prevState,isOverdue:!!value}))}}
                        >
                        </Select>
                    </div>
                </div>


            </div>
            {tasksFiltered.length?<div className={classes.body}>
                {tasksFiltered.map(elem => (<CardCustom task={elem} key={elem.id}/>))}
            </div>:<div className={classes.empty}>
                <h2>В данный момент задачи отсутсвуют.</h2>
            </div>}
            <ModalAddTask
                isOpen={isModalOpen}
                handleCancel={()=> {
                    setIsModalOpen(false)
                }}
                handleOk={(task:{ text:string,date:string })=> {
                    dispatch(addTask(task))
                    setIsModalOpen(false)
                }}
                okText="Добавить задачу"
                cancelText="Отмена"
            ></ModalAddTask>
        </div>
    )
}


export default ListTasks