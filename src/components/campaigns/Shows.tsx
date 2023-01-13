import React from 'react';
import { useFetchShowsQuery } from '../../features/campaign/showsSlice';

const Shows = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useFetchShowsQuery();

  return (
    <div>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data.map((sho) => {
            return <div key={sho.id}>{sho.show}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Shows;
