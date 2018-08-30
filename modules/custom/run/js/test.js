import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from './Image';
//import 'react-table/react-table.css'
import ReactTable from 'react-table';
import axios from 'axios';
import { Formik } from 'formik';

class Welcome extends React.Component {
/*render: function () {
      return <h1>Hello {this.props.message} ee! <Image /> </h1>;
    }*/
 token;

constructor() {
  super();
  this.state = {data:[], search: ''};
  this.search = this.search.bind(this);
  this.getData = this.getData.bind(this);
}

search(e) {
  this.setState({search: e.target.value});
  var url = 'http://localhost/web/drupal/clanky?_format=json&title='+e.target.value;
  this.getData(url);
}

stripTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

    componentDidMount() {
      var url = 'http://localhost/web/drupal/clanky?_format=json';
      this.getData(url);
      this.getToken();
    }

    getToken() {
      axios
      .get('http://localhost/web/drupal/session/token')
      .then(result => {
        this.token = result.data;
        console.log(result.data);
      });
    }

    getData(url) {
      axios
      .get(url)
      .then(result => {
        this.setState({data: result.data});
        console.log(result.data);
      });
    }

    handleSubmit(values) {
      console.log('submit');
    }

render() {     
    const columns = [{
      Header: 'Title',
      accessor: 'title',
      Cell: props => <span dangerouslySetInnerHTML={{__html: props.value}}></span>
    }, {
      Header: 'Created',
      accessor: 'changed',      
    }, {      
      Header: 'Body',
      accessor: 'body',
      Cell: props => <span>{this.stripTags(props.value)}</span>
    }];

    let token = this.token;
    console.log(token);

    return <div>Title
      <input name='title' onChange={this.search} />

    <Formik
      initialValues={{
        title: '',
        body: '',
      }}
      
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        console.log(values);
        //values.token = token;
        console.log(values);
        let post = {
          title: [{'value': values.title}],
          body: [{'value': values.body}],
          type: [{'target_id': 'page'}]
        }
        console.log(post);

        axios({url: 'http://localhost/web/drupal/node?_format=json',
        data: post,
        method: 'post',
        headers: {'X-CSRF-Token': token}})
        .then(result => {
          
          console.log(result.data);
        }, error => console.log('chyba'+error));


      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          
          <input
            name="body"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
          />
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    />

      <ReactTable
      data={this.state.data}
      columns={columns}
    />
    


    </div>
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
    

