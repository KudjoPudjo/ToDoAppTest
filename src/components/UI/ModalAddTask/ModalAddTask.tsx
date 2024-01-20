import React, {ChangeEventHandler, useEffect, useState} from "react"
import {DatePicker, DatePickerProps, Input, Modal, Space, Typography} from "antd";
import {TaskState} from "../../../interfaces/ITask";
import type { GetProps } from 'antd';
import dayjs, {Dayjs } from "dayjs";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
};

export type Props = {
    isOpen:boolean,
    handleCancel:()=>void,
    handleOk:({text,date}: { text:string,date:string })=>void,
    state?:TaskState,
    okText:string,
    cancelText:string
}

function ModalAddTask ({
    isOpen,
    handleOk,
    handleCancel,
    okText,
    cancelText,
    state
}:Props){
    const [date,setDate] = useState<Dayjs | null>(),
        [text,setText] = useState<string>(),
        [validDate,setValidDate] = useState(false),
        [validText,setValidText] = useState(false)

    useEffect(()=>{
        if(state){
            setDate(dayjs(state.date,'YYYY-MM-DD'))
            setText(state.text)
        }
    },[state])

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setValidDate(false)
        setDate(date)
    };
    const onChangeText:ChangeEventHandler<HTMLInputElement> = (event)=>{
        setValidText(false)
        setText(event.target.value)
    }
    const onSubmit = ()=>{
        if(!text)setValidText(true)
        if(!date)setValidDate(true)
        if(text && date){
            handleOk({text:text,date:date.format('YYYY-MM-DD')})
        }
    }
    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            onOk={onSubmit}
            okText={okText}
            cancelText={cancelText}
            centered={true}
        >
            <h2 >{state?"Редактирование задачи":"Добавление задачи"}</h2>
            <div>
                <Typography.Title level={3}>Задание</Typography.Title>
                <Input
                    onChange={onChangeText}
                    status={!date && validText?"error":""}
                    value={text}
                />
            </div>
            <div>
                <Typography.Title level={3}>До какого числа сделать</Typography.Title>
                <Space direction="vertical" size={12}>
                    <DatePicker
                        onChange={onChange}
                        disabledDate={disabledDate}
                        value={date}
                        status={!date && validDate?"error":""}
                    />
                </Space>
            </div>
        </Modal>
    )
}

export default ModalAddTask