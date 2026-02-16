"use client"
import React from 'react'
import { DeleteUserAction } from '../actions/DeleteUserAction'

function DeleteButton(params: any) {
    const { id } = params;
    return (
        <button onClick={() => {
            DeleteUserAction(id)
        }}>Delete</button>
    )
}
export default DeleteButton
