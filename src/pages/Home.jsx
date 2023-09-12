import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvmaze'; 
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorGrid from '../components/actors/ActorGrid';
import styled, { css, ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    main: 'red',
  },
};

const Container = styled.div`
  text-align: center;
`


const Button = styled.button`
 background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: ${props => props.theme.colors.main};
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};

    ${props =>
    props.fontSize &&
    css`
      font-size: $[props.fontSize]px;
    `};


    
`;


const Home = () => {
    const [filter, setFilter] = useState(null);

    const { data: apiData, error: apiDataError } = useQuery({
        queryKey: ['search', filter],
        queryFn: () => 
        filter.searchOption === 'shows'
         ? searchForShows(filter.q)
         : searchForPeople(filter.q),
        enabled: !!filter,
        refetchOnWindowFocus: false,
    });
  
//   const [apiData, setApiData] = useState(null);
//   const [apiDataError, setApiDataError] = useState(null);

  const onSearch = async ({ q, searchOption}) => {
    setFilter({ q, searchOption });

  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if(apiData?.length === 0) {

        return <div>No results</div>
    }

    if (apiData) {
      return apiData[0].show ?(
       <ShowGrid shows = {apiData} />
       ) : (
       <ActorGrid actors = {apiData} />
       );
    }

    return null;
  };

  return (
    <div>
    <ThemeProvider theme={theme}>
    <Container>
    <Button type='button' primary >hello</Button>
    <Button type='button' $fontSize={20}>hello</Button>
    </Container>

    </ThemeProvider>
    <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
