import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Tabs from "Components/Tabs";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-siae: 12px;
  opacity: 0.7;
  line-height: 1.8;
  width: 50%;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const More = styled.div`
  .tab-list {
    margin-top: 40px;
    display: flex;
  }
  .tab-list-item {
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    padding: 10px 20px;
    opacity: 0.5;
    cursor: pointer;
  }
  .tab-list-active {
    opacity: 1;
  }
  .tab-content {
    padding: 20px;
    max-width: 500px;
    max-height: 400px;
    overflow-y: auto;
  }
`;

const Tab = styled.div``;

const List = styled(Link)`
  display: block;
  margin-bottom: 10px;
  opacity: 0.5;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
`;

const Companies = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 400px;
`;

const Company = styled.div`
  margin-bottom: 20px;
  margin-right: 30px;
  opacity: 0.7;
  text-align: center;
  &:hover {
    opacity: 1;
  }
`;

const CompanyLogo = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100px;
  img {
    max-width: 100px;
    max-height: 50px;
    display: block;
    margin-bottom: 10px;
  }
`;

const CompanyName = styled.div`
  font-size: 10px;
  opacity: 0.5;
  max-width: 100px;
`;

const Series = styled.div`
  margin-bottom: 20px;
  opacity: 0.7;
  width: 300px;
  text-align: center;
  display: flex;
  &:hover {
    opacity: 1;
  }
  img {
    max-width: 60px;
    display: block;
  }
`;

const Summary = styled.div`
  display: block;
  margin-left: 10px;
  text-align: left;
  font-size: 10px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Dflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Dflix
        </title>
      </Helmet>
      <BackDrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noImage.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : "undefind"}{" "}
              {/* 추가: 런타임 없는 경우 대응 */}
              min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>{" "}
            {result.imdb_id && (
              <>
                <Divider>·</Divider>
                <Item>
                  <SLink to={`https://www.imdb.com/title/${result.imdb_id}`}>
                    <img
                      src={require("assets/icon_imdb.svg")}
                      alt="Go IMDb"
                      style={{ width: 25 }}
                    />
                  </SLink>
                </Item>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>{" "}
          <More>
            <Tabs>
              <Tab label="Video">
                {result.videos.results &&
                  result.videos.results.map(video => (
                    <List
                      key={video.id}
                      to={`https://www.youtube.com/watch?v=${video.key}`}
                      target="blank"
                    >
                      {video.name}
                    </List>
                  ))}
              </Tab>
              <Tab label="Companies">
                <Companies>
                  {result.production_companies &&
                    result.production_companies.map(company => (
                      <Company key={company.id}>
                        <CompanyLogo>
                          <img
                            src={
                              company.logo_path
                                ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                : require("assets/noImage.png")
                            }
                            alt={company.name}
                          />
                        </CompanyLogo>
                        <CompanyName>{company.name}</CompanyName>
                      </Company>
                    ))}
                </Companies>
              </Tab>
              <Tab label="Countries">
                {result.production_countries
                  ? result.production_countries.map(country => (
                      <List
                        key={country.id}
                        to={`https://duckduckgo.com/?q=${country.name}`}
                        target="blank"
                      >
                        {country.name}
                      </List>
                    ))
                  : result.origin_country &&
                    result.origin_country.map(country => (
                      <List
                        to={`https://duckduckgo.com/?q=${country}`}
                        target="blank"
                      >
                        {country}
                      </List>
                    ))}
              </Tab>
              <Tab label="Series">
                {result.belongs_to_collection ? (
                  <Series key={result.belongs_to_collection.id}>
                    <img
                      src={
                        result.belongs_to_collection.poster_path
                          ? `https://image.tmdb.org/t/p/original${result.belongs_to_collection.poster_path}`
                          : require("assets/noImage.png")
                      }
                      alt={result.belongs_to_collection.name}
                    />
                    <Summary>
                      <div style={{ marginBottom: 5 }}>
                        {result.belongs_to_collection.name}
                      </div>
                    </Summary>
                  </Series>
                ) : (
                  result.seasons &&
                  result.seasons.map(season => (
                    <Series key={season.id}>
                      <img
                        src={
                          season.poster_path
                            ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                            : require("assets/noImage.png")
                        }
                        alt={season.name}
                      />
                      <Summary>
                        <div style={{ marginBottom: 5, fontSize: 12 }}>
                          {season.name}
                        </div>
                        <div>{`${season.overview.substring(0, 290)}...`}</div>
                      </Summary>
                    </Series>
                  ))
                )}
              </Tab>
            </Tabs>
          </More>
        </Data>
      </Content>
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
