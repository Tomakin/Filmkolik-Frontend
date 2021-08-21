import React, {useState, useEffect} from 'react'

import { authenticationService } from '../_services/index';

function HomePage() {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue)
    useEffect(() => {
    }, [])
    return (
        <div className="col-md-6 offset-md-3">
            <h1>Ana Sayfa</h1>
            <p>Hoşgeldin {currentUser.firstName} {currentUser.lastName}</p>
        </div>
    )
}

export {HomePage}
