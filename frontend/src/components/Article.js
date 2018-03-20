import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarLayout from "./Common/SidebarLayout";
import { fetchResourceData } from "./../actions/index";
import FontAwesome from "react-fontawesome";

class Article extends Component {
  render() {
    let { article } = this.props;

    const Tags = ({ tags }) =>
      tags.map((tag, i) => (
        <span>
          {!!i && ", "}
          {tag.title}
        </span>
      ));

    return (
      <SidebarLayout contentTitle="Články / Príspevky">
        <h3>{article.title[0].value}</h3>
        <p>
          <FontAwesome name="edit" /> {article.author}{" "}
          <FontAwesome name="globe" /> Zdroj: {article.source || "neuvedený"}{" "}
          <FontAwesome name="tag" />
          Značky:
        </p>
        <p dangerouslySetInnerHTML={{ __html: article.body[0].value }} />
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  let article = state.resourceData.clanky.find(
    article => article.nid[0].value === parseInt(id, 10)
  );

  return {
    article
  };
};

export default connect(mapStateToProps, { fetchResourceData })(Article);
