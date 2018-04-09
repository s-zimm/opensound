import React, { Component } from 'react';
import axios from 'axios';

import SingleSound from './SingleSound';

class AllSoundsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {
        axios.get('/api/sounds')
            .then(data => {
                console.log(data);
            })
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