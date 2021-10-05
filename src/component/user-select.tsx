import React from 'react'

import { IdSelect } from 'component/id-select'
import { useUsers } from 'hooks/use-users'


export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: users } = useUsers()
    // return (
    //     <IdSelect options={users || []} {...props} />
    // )
    return (
        <div>...</div>
    )
}