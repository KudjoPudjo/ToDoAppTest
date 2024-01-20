import React, {useRef, useState} from "react"
import {Statuses, TaskState} from "../../interfaces/ITask";
import {Button, Card, Select} from "antd";
import classes from "./Card.module.scss"
import {useDispatch} from "react-redux";
import {changeStatus, deleteTask, editTask} from "../../features/TaskSlice/TaskSlice";
import ModalAddTask from "../UI/ModalAddTask/ModalAddTask";
import {DeleteOutlined} from "@ant-design/icons";

export type Props = {
    task:TaskState,
}

function CardCustom ({task}:Props){
    const dispatcher = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
   const cardRef = useRef<HTMLDivElement>(null)
    const handleChangeStatus = (value:number)=>{
        dispatcher(changeStatus({id:task.id,newStatus:value}))
    }

    const handleDeleteTask = ()=>{
       if(cardRef.current)cardRef.current.classList.add(classes.delete)
       setTimeout(()=>{
           dispatcher(deleteTask(task.id))
       },1500)
    }

    return (
        <Card ref={cardRef} title={<div className={classes.header} style={{marginBottom:"20px"}}>
            <h2>Задача номер: {task.id}</h2>
            <Button onClick={()=>setIsModalOpen(true)} type={"primary"} size={"large"}>Редактировать задачу.</Button>
        </div>} bordered={false} bodyStyle={{padding:'12px'}}>
            <div className={classes.body}>
                <div>
                    <p className={classes.label}>{task.text}</p>
                    <p className={classes.label}>До: {task.date}</p>
                </div>
                <div>
                    <Select
                        style={{ width: 120 }}
                        value={task.status}
                        options={[
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
                        onChange={handleChangeStatus}
                    >
                    </Select>
                    <Button
                        style={{marginLeft:"8px"}}
                        size="middle"
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteTask}
                    ></Button>
                </div>
            </div>

            <ModalAddTask
                isOpen={isModalOpen}
                handleCancel={()=> {
                    setIsModalOpen(false)
                }}
                handleOk={(newTask:{ text:string,date:string })=> {
                    dispatcher(editTask({id:task.id,newTask}))
                    setIsModalOpen(false)
                }}
                state={task}
                okText="Редактировать задачу"
                cancelText="Отмена"
            ></ModalAddTask>
        </Card>
    )
}

export default CardCustom