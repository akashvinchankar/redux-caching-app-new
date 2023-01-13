import React from 'react';
import { useFetchScreensQuery } from '../../features/campaign/screensSlice';

const Screens = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useFetchScreensQuery();

  console.log(data);

  return (
    <div>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data.map((scr) => {
            return <div key={scr.code}>{scr.screen}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Screens;
