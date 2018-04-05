import React, { Component } from 'react';

import SingleSound from './SingleSound';

class AllSoundsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <SingleSound />
            </div>
        )
    }
}

export default AllSoundsPage;