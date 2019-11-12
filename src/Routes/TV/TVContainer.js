import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airing: null,
    error: null,
    loading: true
  };

  render() {
    const { topRated, popular, airing, error, loading } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airing={airing}
        error={error}
        loading={loading}
      />
    );
  }
}
