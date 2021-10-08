import { Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectState } from 'store/project.slice';




export const Projectmodal = () => {
    const dispatch = useDispatch()
    const projectState = useSelector(selectProjectState)
    return (
        <Drawer
            width={'100%'}
            onClose={() => dispatch(projectListActions.closeProjectModal())}
            visible={projectState.projectModelaOpen}>
            project modal
            <button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</button>
        </Drawer>
    );
}