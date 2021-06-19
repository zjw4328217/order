import React, { Component } from 'react'
import Axios from 'axios'

export default class Identifi extends Component {
    componentDidMount() {
        console.log(this.props.match.params.tel)
        Axios.post('/api/getuserone',{
            tel:this.props.match.params.tel
        }).then(res => {
            console.log(res.data)
        })
    }
    
    render() {
        return (
            <div>
                66666666
            </div>
        )
    }
}
