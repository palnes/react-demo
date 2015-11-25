import React from 'react';


export default class JsonDisplay extends React.Component {
    static propTypes = {
        json: React.PropTypes.object.isRequired
    }

    render() {
        return <pre>{JSON.stringify(this.props.json)}</pre>;
    }
}
