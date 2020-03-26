import React from 'react';
import PropTypes from "prop-types";
import { getAdminData, dataPrepeating } from "./logic/logic";
// Must be render by div`s
export default class AdminTable extends React.Component {
    static propTypes = {
        adminRawData: PropTypes.array.isRequired,
        setAdminRawData: PropTypes.func.isRequired,
    }

    componentDidMount(){
        const { setAdminRawData } = this.props;
        getAdminData()
        .then(response => response.json())
        .then(result => dataPrepeating(result))
        .then(result => setAdminRawData(result))
        .catch(error => console.log(error))
    }

    render() {
        const { resources } = this.props.dictionary;
        const { adminRawData } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th>{resources.number}</th>
                        <th>{resources.login}</th>
                        <th>{resources.activeSessions}</th>
                        <th>{resources.popularMode}</th>
                        <th>{resources.CRUD}</th>
                        <th>{resources.useChat}</th>
                        <th>{resources.device}</th>
                        <th>{resources.geo}</th>
                        <th>{resources.city}</th>
                        <th>{resources.publicIP}</th>
                        <th>{resources.browser}</th>
                    </tr>
                </thead>
                <tbody>
                    {adminRawData.map((item, index) => 
                        <tr key={performance.now()}>
                            <td>{index + 1}</td>
                            <td>{item.login}</td>
                            <td>{item.session}</td>
                            <td>{item.mode}</td>
                            <td>{item.CRUD}</td>
                            <td>{item.messages}</td>
                            <td>{item.device}</td>
                            <td>{item.geo}</td>
                            <td>{item.city}</td>
                            <td>{item.ip}</td>
                            <td>{item.browser}</td>
                        </tr>    
                    )}
                </tbody>
            </table>
        )
    }
}