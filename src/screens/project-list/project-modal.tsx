import { Drawer } from 'antd';
import React from 'react';




export const Projectmodal = (props: { projectModalOpen: boolean, onClose: () => void }) => {
    return (
        <Drawer
            width={'100%'}
            onClose={props.onClose}
            visible={props.projectModalOpen}>
            Projectmodal
            <button onClick={props.onClose}>关闭</button>
        </Drawer>
    );
}