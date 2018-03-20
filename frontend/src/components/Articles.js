import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResourceData } from "./../actions/index";
import { Link } from "react-router-dom";
import SidebarLayout from "./Common/SidebarLayout";
import { Media } from "reactstrap";
import { truncate, removeTags } from "./../Helpers/index";

class Articles extends Component {
  static defaultProps = {
    articles: []
  };

  componentDidMount() {
    this.props.fetchResourceData("clanky");
  }

  render() {
    let articles = this.props.articles;
    console.log(articles);

    return (
      <SidebarLayout contentTitle="Clanky">
        <div className="App">
          {articles.map(article => {
            console.log(article);
            let link = "/clanok/" + article.nid[0].value;
            return (
              <Media>
                <Media left href={link}>
                  <Media
                    object
                    className="img-thumbnail"
                    src="http://via.placeholder.com/140x100"
                    alt="Generic placeholder image"
                  />
                </Media>
                <Media body>
                  <Media heading>
                    <Link to={link}>{article.title[0].value}</Link>
                  </Media>
                  <p dangerouslySetInnerHTML={{__html: truncate(removeTags(article.body[0].value), 200)}} />
                </Media>
              </Media>
            );
          })}
        </div>
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    articles: state.resourceData.clanky
  };
};

export default connect(mapStateToProps, { fetchResourceData })(Articles);
