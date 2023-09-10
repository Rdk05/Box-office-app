import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvmaze'; 
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorGrid from '../components/actors/ActorGrid';


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
    <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
