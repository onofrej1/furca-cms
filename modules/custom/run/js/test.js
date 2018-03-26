import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from './Image';
//import 'react-table/react-table.css'
import ReactTable from 'react-table';
import axios from 'axios';

class Welcome extends React.Component {
/*render: function () {
      return <h1>Hello {this.props.message} ee! <Image /> </h1>;
    }*/

constructor() {
  super();
  this.state = {data:[]};
}

stripTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

    componentDidMount() {
      const url = 'http://localhost/web/drupal/clanky?title=prva&_format=json';
      axios
      .get(url)
      .then(result => {
        this.setState({data: result.data});
        console.log(result.data);
      });
    }

render() {     
    const columns = [{
      Header: 'Title',
      accessor: 'title',
      Cell: props => <span dangerouslySetInnerHTML={{__html: props.value}}></span>
    }, {
      Header: 'Created',
      accessor: 'created',      
    }, {      
      Header: 'Body',
      accessor: 'body',
      Cell: props => <span>{this.stripTags(props.value)}</span>
    }]
  
    return <ReactTable
      data={this.state.data}
      columns={columns}
    />
  }
}
  
  ReactDOM.render(<Welcome message="World" />, document.getElementById('root'));

    var app = new Vue({
        el: '#app',
        delimiters: ['${', '}'],
        data: {
          message: 'Hello Vue!'
        }
      })

    console.log( "ready!" );
    

