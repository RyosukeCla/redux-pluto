import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { hackerNewsSelector } from "../../../redux/modules/reducer";
import { fetchItems } from "../../../redux/modules/hackerNews";
import HackerNews from "./HackerNews";
import { HackerNewsItem } from "../../../types/HackerNews";

type Props = {
  items: HackerNewsItem[];
  loading: boolean;
};

export default compose<Props, {}>(
  asyncLoader((props, { dispatch }) => dispatch(fetchItems())),
  connect((state, ownProps: any) => ({
    hackerNews: hackerNewsSelector(state as any),
    title: ownProps.route.title,
  })),
)((props: any) => <HackerNews {...props.hackerNews} title={props.title} />);
