import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'


export const ProjectScreen = memo(() => {

    return (
        <div>
            <h1>ProjectScreen</h1>
            {/* react-router5.x */}
            <Link to={'kanban'} >看板</Link>
            <Link to={'epic'} >任务组</Link>
            <Switch>
                <Redirect exact from={'/projects/:projectId'} to={'/projects/:projectId/kanban'} />
                <Route path={'/projects/:projectId/kanban'} component={KanbanScreen} />
                <Route path={'/projects/:projectId/epic'} component={EpicScreen} />
            </Switch>


            {/* react-router6.x */}
            {/* <Link to={'kanban'} >看板</Link>
            <Link to={'epic'} >任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<KanbanScreen />} />
                <Route path={'/epic'} element={<EpicScreen />} />
                <Navigate to={window.location.pathname + '/kanban'} replace={true} />
            </Routes> */}
        </div>

    )
})