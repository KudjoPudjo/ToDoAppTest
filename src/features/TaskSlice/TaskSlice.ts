import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from "@reduxjs/toolkit";
import {Statuses, TaskState} from "../../interfaces/ITask";

/** Специально добавил вам просроченую задачу что бы вы могли проверить работает ли фильтр по просроченности */
const initialState: TaskState[] =localStorage.getItem('tasksState')?[...JSON.parse(localStorage.getItem('tasksState')|| '[]'),{
        date:"2024-01-19",
        id:Math.random(),
        status:2,
        text:"Задача 1",
}]:[]


export function saveState (state:TaskState[]){
    localStorage.setItem('tasksState',JSON.stringify(state))
}

/** Создаем слайс задач */
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask:(state,action:PayloadAction<{ text:string,date:string }>)=>{
            let obj:TaskState = {...action.payload,status:Statuses.new, id:Math.random()}
            state.push(obj)
            saveState(state)
        },
        changeStatus:(state,action:PayloadAction<{id:number,newStatus:number}>)=>{
            let newState = [...state]
            let index = newState.findIndex(elem=>elem.id == action.payload.id)
            newState[index].status = action.payload.newStatus
            state = newState
            saveState(state)
        },
        editTask:(state,action:PayloadAction<{id:number,newTask:{ text:string,date:string }}>)=>{
            let index = state.findIndex(elem=>elem.id == action.payload.id)
            let obj = {...state[index],...action.payload.newTask}
            state.splice(index,1,obj)
            saveState(state)
        },
        deleteTask:(state,action:PayloadAction<number>)=>{
            let index = state.findIndex(elem=>elem.id == action.payload)
            state.splice(index,1)
            saveState(state)
        }
    },
})
export const { addTask, changeStatus, editTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer